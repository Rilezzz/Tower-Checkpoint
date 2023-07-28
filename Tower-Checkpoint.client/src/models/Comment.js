export class Comment {
    constructor(data) {
        this.id = data.id
        this.eventId = data.eventId
        this.creatorId = data.creatorId
        this.isAttending = data.isAttending
        this.createdAt = data.createdAt ? new Date(data.createdAt).toLocaleString() : new Date()
        this.body = data.body
        this.creator = data.creator
    }
}

