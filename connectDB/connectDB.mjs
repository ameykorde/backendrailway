// db/conn.js

// Import required modules
import mongoose from 'mongoose';

// Create connection to MongoDB database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected!');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

// Export the connectDB function for use in other modules
export default connectDB;