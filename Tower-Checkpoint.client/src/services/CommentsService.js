import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CommentsService {

    async getCommentsByEventId(eventId) {
        const res = await api.get(`api/events/${eventId}/comments`)
        logger.log('[GETTING COMMENTS]', res.data)
        AppState.comments = res.data.map(comment => new Comment(comment))
        logger.log('[APP COMMENTS]', AppState.comments)
    }
    async createComment(commentData) {
        const res = await api.post(`api/comments`, commentData)
        logger.log('[CREATING COMMENT]', res.data)
        const comment = new Comment(res.data)
        AppState.comments.unshift(comment)
    }
    async deleteComment(commentId) {
        const res = await api.delete(`api/comments/${commentId}`)
        logger.log('[Deleted Comment]', res.data)
        const commentIndex = AppState.comments.findIndex(comment => comment.id == commentId)
        AppState.comments.splice(commentIndex, 1)
    }
}
export const commentsService = new CommentsService()