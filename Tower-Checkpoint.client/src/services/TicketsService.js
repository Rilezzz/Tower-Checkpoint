import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"

class TicketsService {
    async getEventTicketsByEventId(eventId) {
        const res = await api.get(`api/events/${eventId}/tickets`)
        logger.log('[GETTING TICKETS]', res.data)
        AppState.tickets = res.data.map(ticket => new Ticket(ticket))
    }
    async getMyEventTickets() {
        try {
            const res = await api.get('account/tickets')
            logger.log('[GET MY TICKETS]', res.data)
            AppState.myTickets = res.data.map(ticket => new Ticket(ticket))
        } catch (error) {
            logger.error(error)
            Pop.error(error.message, 'error')
        }
    }
}
export const ticketsService = new TicketsService()