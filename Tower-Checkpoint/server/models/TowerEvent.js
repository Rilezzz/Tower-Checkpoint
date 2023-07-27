import { Schema } from "mongoose";

export const TowerEventSchema = new Schema({
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    name: { type: String, required: true, minlength: 3, maxlength: 30 },
    description: { type: String, required: true, minlength: 5 },
    coverImg: { type: String, required: true, maxlength: 250 },
    location: { type: String, required: true, minlength: 2, maxlength: 50 },
    capacity: { type: Number, required: true },
    startDate: { type: Date, required: true },
    isCanceled: { type: Boolean, default: false },
    type: { type: String, enum: [`concert`, `convention`, `sport`, `digital`, `training`] }
},
    { timestamps: true, toJSON: { virtuals: true } })

TowerEventSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})
TowerEventSchema.virtual('ticketCount', {

    localField: '_id',
    ref: 'Ticket',
    foreignField: 'eventId',
    count: true
}
)