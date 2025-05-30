import mongoose from "mongoose";


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [ true, 'Name is required' ],
    },
    email: {
        type: String,
        required: [ true, 'Email is required' ],
        unique: true,
    },
    emailValidated: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: [ true, 'Password is required' ],
    },
    img: {
        type: String,
    },
    role: {
        type: [String],
        default: ['USER_ROLE'],
        enum: ['ADMIN_ROLE', 'USER_ROLE'],
    },

});

userSchema.set('toJSON', {
    virtuals: true, // convierte el objectId en string
    versionKey: false, // Elimina la version del documento
    transform: function(doc, ret, options) {
        delete ret._id; // ELimina el _id del documento
        delete ret.password; // Elimina el password del documento
    }
});

export const UserModel = mongoose.model('Users', userSchema);