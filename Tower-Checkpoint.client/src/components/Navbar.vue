<template>
  <nav class=" d-flex justify-content-between navbar navbar-expand-lg navbar-dark bg-black px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img alt="logo"
          src="https://images.vexels.com/media/users/3/132489/isolated/preview/babe59ebea2b054973757e1b96774ce7-antenna-tower-flat-icon-by-vexels.png"
          height="45" title="Tower Events" />
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <button class="create-btn btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#exampleModal">Create Event
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">

      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Create Event</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createEvent">
            <div class="mb-3">
              <label for="name" class="form-label">Event Name</label>
              <input v-model="editable.name" type="text" class="form-control" id="name" minlength="1" maxlength="35"
                required>
            </div>
            <div class="mb-3">
              <label for="coverImg" class="form-label">Event Image</label>
              <input v-model="editable.coverImg" type="url" class="form-control" id="coverImg" minlength="3"
                maxlength="250" required>
            </div>
            <div class="mb-3">
              <label for="location" class="form-label">Event Location</label>
              <input v-model="editable.location" type="text" class="form-control" id="location" minlength="3"
                maxlength="35" required>
            </div>
            <div class="mb-3">
              <label for="capacity" class="form-label">Event Capacity</label>
              <input v-model="editable.capacity" type="number" class="form-control" id="capacity" min="0" max="1000"
                required>
            </div>
            <div class="mb-3">
              <label for="startDate" class="form-label">Event Starting Date</label>
              <input v-model="editable.startDate" type="date" class="form-control" id="startDate" required>
            </div>
            <label for="type" class="form-label">Event Type</label>
            <select v-model="editable.type" class="form-select mb-3" aria-label="select category" required>
              <option value="concert" selected>Concert</option>
              <option value="convention">Convention</option>
              <option value="sport">Sport</option>
              <option value="digital">Digital</option>
            </select>
            <div class="mb-3">
              <label for="description" class="form-label">Event Description</label>
              <textarea v-model="editable.description" class="form-control" aria-label="eventDescription"
                required></textarea>
            </div>
            <button type="submit" class="btn btn-primary" title="Submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import Login from './Login.vue';
import { AppState } from '../AppState.js';
import { towereventsService } from '../services/TowerEventsService.js';
import { router } from '../router.js';
import { Modal } from 'bootstrap';
import Pop from '../utils/Pop.js';
export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async createEvent() {
        try {
          if (!AppState.account.id) {
            throw new Error('Login required to Create Event')
          }
          const event = await towereventsService.createEvent(editable.value)
          router.push({ name: 'EventDetails', params: { eventId: event.id } })
          editable.value = {}
          Modal.getOrCreateInstance(document.getElementById('exampleModal')).hide()
          Pop.success('Created Event!')
        } catch (error) {
          Pop.error(error)
        }

      }

    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
