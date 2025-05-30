import mongoose, { Schema } from "mongoose";

const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: [ true, 'Name is required' ],
        unique: true,
    },
    available: {
        type: Boolean,
        default: false,
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    }

});

categorySchema.set('toJSON', {
    virtuals: true, // convierte el objectId en string
    versionKey: false, // Elimina la version del documento
    transform: function(doc, ret, options) {
        delete ret._id; // ELimina el _id del documento
    }
});

export const CategoryModel = mongoose.model('Categories', categorySchema);