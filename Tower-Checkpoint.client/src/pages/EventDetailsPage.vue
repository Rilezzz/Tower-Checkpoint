<template>
    <div v-if="event" class="container-fluid">
        <div class="row m-3 justify-content-center text-shadow">
            <div class="col-md-10 col-12 d-flex event-Card">
                <div class="row justify-content-between">
                    <div class="col-md-4 col-12">
                        <img v-if="event.capacity == event.ticketCount"
                            class="img-fluid cover m-1 justify-content-bottom rounded "
                            src="https://pluspng.com/img-png/-2112.png" alt="Picture">
                        <img v-else-if="event.isCanceled == true"
                            class="img-fluid cover m-1 justify-content-bottom rounded "
                            src="https://counselling-matters.org.uk/wp-content/uploads/2020/05/cancelled-stamp.svg"
                            alt="Picture">
                        <img v-else class="img-fluid cover m-1 justify-content-bottom rounded " :src="event?.coverImg"
                            alt="Picture">

                    </div>
                    <div class="col-md-7 col-12 p-2">
                        <h2>{{ event.name }}</h2>
                        <p>Date: {{ new Date(event.startDate).toLocaleDateString() }}</p>
                        <p>Time: {{ new Date(event.startDate).toLocaleTimeString() }}</p>
                        <p>Location: {{ event.location }}</p>
                        <p>Tickets Available: {{ event.capacity - event.ticketCount }}</p>
                        <p>Details: {{ event.description }}</p>
                        <p>Tickets Sold: {{ event.ticketCount }}</p>
                        <div>

                            <button v-if="event.isCanceled == false && !isAttending" class="m-2 btn btn-outline-info"
                                @click="createTicket()">Get
                                Ticket
                            </button>

                            <div v-else-if="event.ticketCount == event.capacity" class="btn btn-danger">EVENT CLOSED</div>

                        </div>
                    </div>
                    <div class="text-end mb-3">
                        <button title="Cancel Event" v-if="event.creatorId == account.id" @click="cancelEvent(event.id)"
                            :disabled="event.isCanceled == true" class=" btn btn-danger fs-5"><i
                                class="mdi mdi-cancel "></i>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid">'
        <div class="row m-auto m-2 justify-content-center">
            <div class=" col-md-8 col-12 d-flex event-Card text-shadow pt-2">
                <div class=" rounded m-2 p-2">
                    <h2>Ticket Holders: {{ event?.ticketCount }}</h2>
                </div>
                <div class="m-3">
                    <img class="rounded profile-Img me-1" v-for="ticket in tickets " :key="ticket.id"
                        :src="ticket.profile?.picture" alt="">
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row m-auto justify-content-around">


            <div class="col-md-3 col-12 event-Card text-shadow mt-3 p-2">
                <form @submit.prevent="createComment()">
                    <div class="mb-3">
                        <div>
                            <h3>Leave a Comment...</h3>

                        </div>


                        <textarea required v-model="editable.body" maxlength="350" class="form-control" id="body"
                            rows="4"></textarea>
                    </div>
                    <div class="text-end">
                        <button class="btn btn-outline-info" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>


    <div class="container-fluid">
        <div>

        </div>
        <div class="row justify-content-center p-2">
            <div v-for=" comment  in  comments " :key="comment" class="col-md-7 col-12 mb-3 event-Card text-shadow p-2">
                <div>
                    <img class="rounded img-fluid profileImg" :src="comment.creator.picture" alt="">
                    <p>{{ comment.creator.name }}</p>

                </div>

                <p>{{ comment.body }}</p>
                <p>{{ comment.createdAt }}</p>
                <div class="text-end">
                    <button v-if="comment.creatorId == account.id" @click="deleteComment(comment.id)"
                        :disabled="event.isCanceled == true" class=" btn btn-info fs-5"><i
                            class="mdi mdi-trash-can-outline "></i>
                    </button>

                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { useRoute } from 'vue-router';
import { towereventsService } from '../services/TowerEventsService.js';
import Pop from '../utils/Pop.js';
import { computed, onMounted, ref, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import { commentsService } from '../services/CommentsService.js'
import { logger } from '../utils/Logger.js';
import { ticketsService } from '../services/TicketsService.js'

export default {

    setup() {
        const editable = ref({})
        const route = useRoute()

        async function getEventById() {
            try {
                const eventId = route.params.eventId
                await towereventsService.getEventById(eventId)
            } catch (error) {
                Pop.error(error.message)
            }
        }

        async function getCommentsByEventId() {
            try {
                const eventId = route.params.eventId
                await commentsService.getCommentsByEventId(eventId)
            } catch (error) {
                Pop.error(error.message)
            }

        }

        async function getEventTicketsByEventId() {
            try {
                const eventId = route.params.eventId
                await ticketsService.getEventTicketsByEventId(eventId)
            } catch (error) {
                logger.error(error)
                Pop.error(error.message, 'error')
            }
        }
        // onMounted(() => {
        //     getEventTicketsByEventId()
        // }

        // )
        watchEffect(() => {
            getEventById(route.params.eventId)
            getCommentsByEventId(route.params.eventId)
            getEventTicketsByEventId()
        })

        return {
            editable,
            tickets: computed(() => AppState.tickets),
            event: computed(() => AppState.activeEvent),
            comments: computed(() => AppState.comments),
            account: computed(() => AppState.account),
            isAttending: computed(() => {
                return AppState.tickets.find(ticket => ticket.accountId == AppState.account.id)
            }),


            async createComment() {
                try {
                    const commentData = editable.value
                    logger.log(commentData)
                    commentData.eventId = route.params.eventId
                    await commentsService.createComment(commentData)
                    editable.value = {}
                } catch (error) {
                    Pop.error(error.message)
                }
            },

            async deleteComment(commentId) {
                try {
                    const wantsToDeletePost = await Pop.confirm(`Are you sure you want to delete this comment?`)
                    if (!wantsToDeletePost) {
                        return
                    }
                    await commentsService.deleteComment(commentId)
                } catch (error) {
                    Pop.error(error.message)
                }


            },
            async createTicket() {
                try {
                    const activeEventId = route.params.eventId
                    const ticketData = { eventId: activeEventId }
                    await ticketsService.createTicket(ticketData)
                    AppState.activeEvent.ticketCount++
                } catch (error) {
                    logger.error(error)
                    Pop.toast(error.message, 'error')
                }
            },
            async cancelEvent() {
                try {
                    let event = AppState.activeEvent
                    await towereventsService.cancelEvent(event.id)
                    AppState.activeEvent.isCanceled = true
                    Pop.success('Event Cancelled')
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    },
}
</script>


<style lang="scss" scoped>
// .cover {
//     height: 30vh;
//     width: 100%;
//     object-fit: cover;

// }

.text-shadow {
    color: rgb(219, 216, 230);
    text-shadow: 1px 1px 8px rgb(243, 13, 86);
}

.event-Card {
    background-color: rgba(0, 0, 0, 0.938);
    border-radius: 5px;
    box-shadow: 4px 4px rgb(255, 0, 200);
}

.profile-Img {
    height: 5vh;
    width: 5vh;
    border-radius: 5px;


}

.create-btn {
    height: 5vw;
    width: 5vw;
    border-radius: 5px;
    border: none;
    padding: .5em;
    color: white;
    background-color: #c9026fb7;
    font-weight: bold;
}
</style>