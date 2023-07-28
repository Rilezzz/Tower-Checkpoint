<template>
    <div class="text-shadow d-flex justify-content-between event-Card card elevation-4 p-2">
        <div>

            <div class="card bg-dark mb-2 p-1">
                <h4>Event: {{ towerevent.name }}</h4>
                <p>Location: {{ towerevent.location }}</p>
                <p>Date: {{ towerevent.startDate }}</p>
                <p>Event Type: {{ towerevent.type }}</p>
                <p>Ticket Number: {{ towerevent.capacity }}</p>
                <div class="d-flex justify-content-end m-2">
                    <!-- <button class="btn btn-success" @click="createTicket()">Get Ticket<i class="mdi "></i></button> -->
                    <!-- <button class="btn btn-success" @click="deleteTicket()">Return Ticket <i
                        class="mdi mdi-trash-can-outline"></i></button> -->
                </div>
            </div>
            <router-link :to="{ name: 'EventDetails', params: { eventId: towerevent.id } }">Click Image to View Details:<img
                    class="justify-content-bottom rounded" :src="towerevent.coverImg" alt="Picture">
            </router-link>
        </div>
    </div>
</template>


<script>
export default {
    props: { towerevent: { type: Object, required: true } },

    setup() {
        return {}
    }
}
</script>


<style lang="scss" scoped>
img {
    height: 25vh;
    width: 100%;
    object-fit: cover;


}

.text-shadow {
    color: rgb(219, 216, 230);
    text-shadow: 1px 1px 8px rgb(243, 13, 86);
}

.event-Card {
    background-color: rgba(0, 0, 0, 0.938);
    border-radius: 5px;
    box-shadow: 4px 4px rgb(255, 0, 200);
}
</style>