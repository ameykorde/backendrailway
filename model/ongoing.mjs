import mongoose from 'mongoose';

// Define the schema for the "ongoing" collection
const ongoingSchema = new mongoose.Schema({
	semester: { 
		type: String, 
		required: true 
	},
	section: { 
		type: String, 
		required: true 
	},
	day: { 
		type: Number, 
		required: true 
	},
	subject: { 
		type: String, 
		required: true 
	},
	teacher: { 
		type: String, 
		required: true 
	},
	startTime: { 
		type: String, 
		required: true 
	},
	endTime: { 
		type: String, 
		required: true 
	},
});

// Export the model for the "ongoing" collection
export default mongoose.model("ongoing", ongoingSchema);





