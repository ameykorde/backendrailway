// Importing required modules
import ongoing from '../model/ongoing.mjs';
import moment from 'moment';

// Function to create a new ongoing class
const createNewOngoing = async (req, res) => {
	// Extracting data from request body
	const { semester, section, day, subject, teacher, startTime, endTime } = req.body;
	try {
		// Creating a new ongoing class object
		const newOngoing = new ongoing({
			semester,
			section,
			day,
			subject,
			teacher,
			startTime,
			endTime,
		});
		// Saving the new class to the database
		await newOngoing.save();
		res.status(201).json({ message: 'Data added successfully' });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// Function to get ongoing classes that are currently happening
const getFilteredOngoing = async (req, res) => {
	try {
		// Getting the current time and day
		const currentTime = moment().format('HH:mm')
		const currentDay = moment().day()
		// Finding ongoing classes that are happening currently
		const filterItems = await ongoing.find({
			startTime: { $lte: currentTime },
			endTime: { $gt: currentTime },
			day: { $eq: currentDay }
		}).sort({ semester: 1, section: 1 })
		res.json(filterItems)
	} catch (error) {
		res.send(error)
	}
}

// Function to get all ongoing classes
const getOngoing = async (req, res) => {
	try {
		// Finding all ongoing classes and sorting them
		const ongoingClasses = await ongoing.find().sort({ semester: 1, section: 1, day: 1, startTime: 1 });
		res.json(ongoingClasses);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

// Function to delete an ongoing class by ID
const deleteClass = async (req, res) => {
	const id = req.params.id
	try {
		// Deleting the class with the given ID
		await ongoing.deleteOne({ _id: id })
		res.send({ message: "deleted successfully" })
	} catch (error) {
		res.send("error")
	}
}

// Function to delete all ongoing classes
const deleteAllClass = async (req, res) => {
	try {
		// Deleting all ongoing classes
		await ongoing.deleteMany();
		res.send({ message: "deleted successfully" })
	} catch (error) {
		res.send("error")
	}
}

// Function to update an ongoing class by ID
const updateOngoingClass = async (req, res) => {
	try {
		// Extracting data from request params and body
		const { id } = req.params;
		const {
			semester,
			section,
			day,
			subject,
			teacher,
			startTime,
			endTime
		} = req.body;

		// Finding the class with the given ID and updating it
		const updatedClass = await ongoing.findOneAndUpdate(
			{ _id: id },
			{
				semester,
				section,
				day,
				subject,
				teacher,
				startTime,
				endTime
			},
			{ new: true }
		);

		// Checking if the class was found
		if (!updatedClass) {
			return res.status(404).json({ message: 'Class not found' });
		}

		res.status(200).json(updatedClass);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export { createNewOngoing, getOngoing, getFilteredOngoing, deleteClass, updateOngoingClass, deleteAllClass }
