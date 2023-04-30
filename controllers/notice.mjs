// Import required modules
import Notice from '../model/notice.mjs';
import moment from 'moment';

// Function to add new notice
const newNotice = async (req, res) => {
	try {
		// Get data from request body
		const { title, content, date, time } = req.body;

		// Create new notice object
		const notice = new Notice({
			title, content, date, time
		});

		// Save notice to database
		await notice.save();

		// Send response with success message
		res.send({ message: "Added Successfully" });
	} catch (error) {
		// Send response with error message if something went wrong
		res.send({ error: "Please Enter Data" });
	}
}

// Function to delete notice by ID
const deleteNotice = async (req, res) => {
	try {
		// Delete notice from database using ID
		const result = await Notice.deleteOne({ _id: req.params.id });

		// Send response with deletion result
		res.send(result);
	} catch (error) {
		// Send response with error message if something went wrong
		res.send({ error: "Something Went Wrong" });
	}
};

// Function to get notices with filter by date and time
const getData = async (req, res) => {
	try {
		// Get current date and time
		const currentDate = moment().format('YYYY-MM-DD');
		const currentTime = moment().format('HH:mm')

		// Find notices with filtering conditions
		const filterNotice = await Notice.find({
			$and: [
				{
					$or: [
						{ date: { $gte: currentDate } }, // events on or after today
						{ date: '' } // events with no date specified
					]
				},
				{
					$or: [
						{ date: { $gt: currentDate } }, // events on future dates
						{
							$and: [
								{ date: currentDate }, // events on current date
								{ time: { $gte: currentTime } }, // events with start time on or after current time
								{ time: { $ne: '' } } // events with start time specified
							]
						},
						{ time: '' } // events with no start time specified
					]
				}
			]
		}).sort({ date: 1, time: 1 }); // sort events by date in ascending order and then by time in ascending order

		// Send response with filtered notices
		res.json(filterNotice);
	} catch (error) {
		// Send response with error message if something went wrong
		res.send({ error: "Error in Fetching the Data" });
	}
}

// Function to delete all expired notices by date
const deleteNoticeByTime = async (req, res) => {
	try {
		// Get current date
		const currentDate = moment().format('YYYY-MM-DD');

		// Delete expired notices from database after the date passed
		const result = await Notice.deleteMany({
			date: { $lt: currentDate, $ne: '' }
		});

		// Send response with deletion result
		res.status(200).send(result.deletedCount + ' documents deleted');

	} catch (err) {
		// Send response with error message if something went wrong
		console.error(err);
		res.status(500).send(err);
	}

}

// This function updates an existing notice with the given id
const updateNotice = async (req, res) => {
	try {
		const { id } = req.params; // Get the notice id from the request parameters
		const { title, content, date, time } = req.body; // Extract the updated notice details from the request body
		const updatedNotice = await Notice.findByIdAndUpdate( // Find and update the notice by id
			id,
			{ title, content, date, time },
			{ new: true } // Return the updated notice after update is complete
		);
		res.status(200).json(updatedNotice); // Send the updated notice in the response
	} catch (error) {
		res.status(400).json({ message: error.message }); // Handle any errors that occur during the update process
	}
};

// Export the functions 
export { newNotice, getData, deleteNotice, deleteNoticeByTime, updateNotice };


