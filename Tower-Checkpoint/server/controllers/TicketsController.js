import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController.js"
import { ticketsService } from "../services/TicketsService.js"

export class TicketsController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTicket)
            .delete('/:eventId', this.deleteMyTickets)

    }
    async createTicket(req, res, next) {
        try {
            const ticketData = req.body
            ticketData.accountId = req.userInfo.id
            const ticket = await ticketsService.createTicket
                (ticketData)
            return res.send(ticket)
        } catch (error) {
            next(error)

        }
    }
    async deleteMyTickets(req, res, next) {
        try {
            const eventId = req.params.eventId
            const userId = req.userInfo.id
            const ticket = await ticketsService.deleteMyTicket(eventId, userId)
            return res.send(ticket)
        } catch (error) {
            next(error)
        }
    }
}