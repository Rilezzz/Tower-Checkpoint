import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController.js"
import { towereventsService } from "../services/TowerEventsService.js"
import { ticketsService } from "../services/TicketsService.js"
import { commentsService } from "../services/CommentsService.js"
export class TowerEventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getEvents)
            .get('/:eventId', this.getEventById)
            .get('/:eventId/tickets', this.getEventTickets)
            .get('/:eventId/comments', this.getEventComments)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
            .put('/:eventId', this.editEvent)
            .delete('/:eventId', this.cancelEvent)

    }
    async createEvent(req, res, next) {
        try {
            const eventData = req.body
            eventData.creatorId = req.userInfo.id
            const towerEvent = await towereventsService.createEvent(eventData)
            return res.send(towerEvent)
        } catch (error) {
            next(error)
        }

    }
    async getEventComments(req, res, next) {
        try {

            const eventId = req.params.eventId
            const comments = await commentsService.getEventComments(eventId)
            return res.send(comments)
        } catch (error) {
            next(error)
        }
    }





    async getEvents(req, res, next) {

        try {
            const events = await towereventsService.getEvents()
            return res.send(events)
        } catch (error) {
            next(error)
        }
    }
    async getEventById(req, res, next) {
        try {
            const eventId = req.params.eventId
            const event = await towereventsService.getEventById(eventId)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }
    async editEvent(req, res, next) {
        try {
            const eventId = req.params.eventId;
            const userId = req.userInfo.id
            const eventData = req.body
            const updatedEvent = await towereventsService.editEvent(eventId, userId, eventData);
            return res.send(updatedEvent)
        } catch (error) {
            next(error)

        }
    }
    async cancelEvent(req, res, next) {
        try {
            const eventId = req.params.eventId
            const userId = req.userInfo.id
            const event = await towereventsService.cancelEvent(eventId, userId,)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async getEventTickets(req, res, next) {
        try {

            const eventId = req.params.eventId
            const tickets = await ticketsService.getEventTickets(eventId)
            return res.send(tickets)
        } catch (error) {
            next(error)
        }
    }
}