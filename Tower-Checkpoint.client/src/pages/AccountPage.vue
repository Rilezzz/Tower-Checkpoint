<template>
  <div class="container-fluid">
    <div class="row justify-content-center text-shadow">
      <h1>My Tickets: </h1>
      <div class="col-3 m-3 p-2 d-flex flex-column event-Card" v-for="ticket in myTickets" :key="ticket.id">
        <div class="text-center">
          <img class="ticket-Img" src="https://www.computalabel.com/Images/C128.png" alt="">
        </div>
        <div class="m-2 text-center">
          <h4>Event: {{ ticket.event?.name }}</h4>
          <p>Venue: {{ ticket.event.location }}</p>
          <p>Date: {{ ticket.event.startDate }}</p>
        </div>
        <div class="text-end">
          <button class="btn btn-info" @click="deleteTicket()">Sale Ticket </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
import { ticketsService } from '../services/TicketsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
export default {
  setup() {

    return {
      myTickets: computed(() => AppState.myTickets),
      account: computed(() => AppState.account),
      event: computed(() => AppState.TowerEvents),
      tickets: computed(() => AppState.tickets),
      async deleteTicket() {
        try {
          const wantsToDeleteTicket = await Pop.confirm(`Are you sure you want to delete this post?`)
          if (!wantsToDeleteTicket) {
            return
          }
          const ticketToRemove = AppState.myTickets.find(ticket => ticket.accountId == AppState.account.id)
          const ticketId = ticketToRemove.id
          await ticketsService.deleteTicket(ticketId)
          AppState.TowerEvents.ticketCount--
        } catch (error) {
          logger.error(error)
          Pop.error(error.message, 'error')
        }

      },



    }
  },

}
</script>

<style scoped>
.ticket-Img {
  height: 15vh;
  width: 35vh;
  border-radius: 5px;


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
