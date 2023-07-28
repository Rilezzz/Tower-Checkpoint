import { AppState } from "../AppState.js"
import { TowerEvent } from "../models/TowerEvent.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TowerEventsService {
    async getEvents() {
        const res = await api.get('api/events')
        logger.log('[Got Events]', res.data)
        const events = res.data.map(event => new TowerEvent(event))
        AppState.TowerEvents = events
    }


    async getEventById(eventId) {
        const res = await api.get(`api/events/${eventId}`)
        logger.log('[Got Event by ID]', res.data)
        const event = new TowerEvent(res.data)
        AppState.activeEvent = event
    }
    async createEvent(eventId) {
        const res = await api.post('api/events', eventId)
        AppState.TowerEvents.unshift(res.data)
        return res.data
    }
    async cancelEvent(eventId) {
        const res = await api.delete(`api/events/${eventId}`)
        return res.data
    }
}
export const towereventsService = new TowerEventsService()