import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the register schema
const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength:6
    },
    is_admin: {
        type: Boolean,
        default: false
    }
});

// Hash the password before saving the user to the database
registerSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Create the User model using the register schema and export it
const User = mongoose.model('users', registerSchema);
export default User;
