import TimeTable from '../model/timeTable.mjs';

// Get all timetables
const getTimeTable = async (req, res) => {
	try {
		const data = await TimeTable.find();
		res.send(data);
	} catch (error) {
		// Send error message if there's an error
		res.send({ error: error.message });
	}
};

// Upload a new timetable
const timeTableUpload = async (req, res) => {
	try {
		const { semester } = req.body;
		const images = req.files.map((file) => ({ filename: file.filename }));

		// Create new document in database
		const timeTable = new TimeTable({
			semester,
			images,
		});
		await timeTable.save();

		// Send success message if the timetable is added successfully
		res.status(200).json({ message: 'TimeTable Added Successfully' });
	} catch (error) {
		// Send error message if there's an error
		console.error(error);
		res.status(500).send('Error uploading files');
	}
};

// Delete a timetable
const deleteTimetable = async (req, res) => {
	try {
		const { id } = req.params;
		await TimeTable.findByIdAndDelete(id);

		// Send success message if the timetable is deleted successfully
		res.json({ message: 'Timetable deleted successfully' });
	} catch (error) {
		// Send error message if there's an error
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
};

// Export the functions to be used in other files
export { getTimeTable, timeTableUpload, deleteTimetable };
