import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TowerEventsService {
    async createEvent(eventData) {
        const newEvent = await dbContext.TowerEvents.create(eventData)
        await newEvent.populate('ticketCount')
        return newEvent
    }



    async getEvents() {
        const events = await dbContext.TowerEvents.find()
            .populate('creator', 'name picture')
            .populate('ticketCount')
        return events
    }
    async getEventById(eventId) {
        const event = await dbContext.TowerEvents.findById(eventId).populate('creator', 'name picture').populate('ticketCount')


        if (!event) {
            throw new BadRequest('Event does not exist.')
        }

        return event
    }

    async editEvent(eventId, userId, eventData) {
        const originalEvent = await dbContext.TowerEvents.findById(eventId)

        if (originalEvent.creatorId.toString() != userId) {
            throw new Forbidden('YOU ARE NOT THE CREATOR OF THIS EVENT!')
        }
        if (originalEvent.isCanceled == true) {
            throw new BadRequest('This event has been cancelled, you cannot edit it.')
        }

        originalEvent.name = eventData.name || originalEvent.name
        originalEvent.description = eventData.description || originalEvent.description


        await originalEvent.save()

        return originalEvent
    }
    async cancelEvent(eventId, userId) {
        const eventToCancel = await this.getEventById(eventId)

        if (eventToCancel.creatorId.toString() != userId) {
            throw new Forbidden('You are not the creator of this event. You cannot cancel it.')
        }

        eventToCancel.isCanceled = true
        await eventToCancel.save()
        return eventToCancel
    }

}
export const towereventsService = new TowerEventsService()