import Teacher from '../model/teachers.mjs';

// Get all teachers
const getTeacher = async (req, res) => {
  try {
    const data = await Teacher.find();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Failed to fetch teachers!' });
  }
};

// Create a new teacher
const postTeacher = async (req, res) => {
  try {
    const { name, email } = req.body;
    const file = req.file.filename;
    const teacher = new Teacher({ name, email, file });
    // Save the teacher object to the database
    await teacher.save();
    res.status(200).send({ message: 'Teacher added successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to add teacher!' });
  }
};

// Delete a teacher
const deleteTeacher = async (req, res) => {
  try {
    const teacherId = req.params.id;
    await Teacher.findByIdAndDelete(teacherId);
    res.status(200).send({ message: 'Teacher deleted successfully!' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Failed to delete teacher!' });
  }
};

// Update a teacher
const updateTeacher = async (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;

  try {
    let teacher = await Teacher.findById(id);

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    teacher.name = name || teacher.name;
    teacher.email = email || teacher.email;

    if (req.file) {
      teacher.file = req.file.filename;
    }

    teacher = await teacher.save();
    res.json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to update teacher!' });
  }
};

export { getTeacher, postTeacher, deleteTeacher, updateTeacher };
