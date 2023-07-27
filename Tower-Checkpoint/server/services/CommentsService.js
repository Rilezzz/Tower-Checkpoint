import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CommentsService {
    async getEventComments(eventId) {
        const comments = await dbContext.Comments.find({ eventId })
            .populate('creator', 'name picture')
        return comments
    }

    async createComment(commentData) {
        const newEvent = await dbContext.Comments.create(commentData)
        await newEvent.populate('creator', 'name picture')
        return newEvent
    }

    async deleteComment(commentId, userId) {
        const commentToDelete = await dbContext.Comments.findById(commentId)

        if (!commentToDelete) {
            throw new BadRequest(`Cannot find comment to delete.`)
        }

        if (commentToDelete.creatorId != userId) {
            throw new Forbidden('You cannot remove a comment you did not create.')
        }

        await commentToDelete.remove()
        return 'Comment Deleted'
    }
}
export const commentsService = new CommentsService()