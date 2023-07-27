import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TicketsService {

    async getMyTickets(accountId) {
        const myTickets = await dbContext.Tickets.find({ accountId })
            .populate({
                path: 'event',
                populate: {
                    path: 'creator ticketCount'
                }
            })
        return myTickets
    }
    async getEventTickets(eventId) {
        const tickets = await dbContext.Tickets.find({ eventId }).populate('profile', 'name picture')
        return tickets

    }
    async createTicket(ticketData) {
        const newTicket = await dbContext.Tickets.create(ticketData)
        await newTicket.populate('profile', 'name picture')
        return newTicket
    }
    async deleteMyTicket(eventId, userId) {
        const ticketToDelete = await dbContext.Tickets.findById(eventId)

        if (!ticketToDelete) {
            throw new BadRequest(`This ticket does not exist.`)
        }

        if (ticketToDelete.accountId != userId) {
            throw new Forbidden('You cannot remove a ticket that is not yours')
        }

        await ticketToDelete.remove()
        return ticketToDelete
    }
}
export const ticketsService = new TicketsService()