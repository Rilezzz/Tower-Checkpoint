<template>
  <div class="container-fluid">
    <div class="row justify-content-center text-shadow">
      <h1>My Tickets:
      </h1>
      <div class="col-3 m-3 p-2 d-flex flex-column event-Card" v-for="ticket in myTickets" :key="ticket.id">
        <div class="text-center">
          <img class="ticket-Img" src="https://www.computalabel.com/Images/C128.png" alt="">
        </div>
        <div class="m-2 text-center">
          <h4>Event: {{ ticket.event?.name }}</h4>
          <p>Venue: {{ ticket.event.location }}</p>
          <p>Date: {{ ticket.event.startDate }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
export default {
  setup() {
    return {

      myTickets: computed(() => AppState.myTickets),
      account: computed(() => AppState.account),
      event: computed(() => AppState.TowerEvents)
    }
  }
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
