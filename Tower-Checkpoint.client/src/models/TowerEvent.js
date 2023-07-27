export class TowerEvent {
    constructor(data) {
        this.creatorId = data.creatorId
        this.name = data.name
        this.description = data.description
        this.coverImg = data.coverImg
        this.location = data.location
        this.location = data.location
        this.capacity = data.capacity
        this.startDate = data.startDate ? new Date(data.startDate).toLocaleString() : new Date()
        this.isCanceled = data.isCanceled
        this.type = data.type
        this.creator = data.creator
        this.ticketCount = data.ticketCount
    }
} 