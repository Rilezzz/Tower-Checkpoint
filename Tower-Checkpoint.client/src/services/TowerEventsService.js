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
}
export const towereventsService = new TowerEventsService()