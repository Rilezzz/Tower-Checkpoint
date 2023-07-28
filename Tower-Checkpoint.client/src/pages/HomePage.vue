<template>
  <div class="container-fluid">
    <div class="row justify-content-center m-3 ">
      <div class="col-11 m-3 bg-info d-flex justify-content-around p-2 rounded">
        <button class="btn btn-outline-light" @click="filterBy = ''">All</button>
        <button class="btn btn-outline-light" @click="filterBy = 'concert'">Concerts</button>
        <button class="btn btn-outline-light" @click="filterBy = 'convention'">Conventions</button>
        <button class="btn btn-outline-light" @click="filterBy = 'sport'">Sports</button>
        <button class="btn btn-outline-light" @click="filterBy = 'digital'">Online Events</button>
        <button class="btn btn-outline-light" @click="filterBy = 'training'">Training</button>
      </div>
    </div>
  </div>

  <div class="row justify-content-center">
    <div class="col-md-3 col-12 m-3" v-for="towerevent in TowerEvents" :key="towerevent.id">
      <EventCard :towerevent='towerevent' />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import Pop from '../utils/Pop.js'
import { towereventsService } from '../services/TowerEventsService.js'
import { AppState } from '../AppState.js'

export default {
  setup() {

    const filterBy = ref('')
    async function getEvents() {
      try {
        await towereventsService.getEvents()
      } catch (error) {
        Pop.error(error.message)
      }
    }
    onMounted(() => {
      getEvents()
    })
    return {
      filterBy,
      TowerEvents: computed(() => {
        if (filterBy.value == "") {
          return AppState.TowerEvents

        } else {
          return AppState.TowerEvents.filter(event => event.type == filterBy.value)
        }
      })
    }
  },
  myTickets: computed(() => AppState.myTickets)
}

</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  .event-Card {
    background-color: rgba(0, 0, 0, 0.938);
    border-radius: 5px;
    box-shadow: 4px 4px rgb(255, 0, 200);
  }
}
</style>
