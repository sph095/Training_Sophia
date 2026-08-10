const Student = require('../models/student');
const { sendWelcomeEmail } = require('../utils/mailer');

// CREATE
async function createStudent(request, reply) {
  try {
    const { name, email, course, age } = request.body;
    const student = await Student.create({ name, email, course, age });

    // Fire welcome email after successful creation (errors are logged, not thrown)
    sendWelcomeEmail(student.email, student.name);

    return reply.code(201).send({ success: true, data: student });
  } catch (error) {
    return reply.code(400).send({ success: false, message: error.message });
  }
}

// READ ALL
async function getAllStudents(request, reply) {
  try {
    const students = await Student.findAll();
    return reply.code(200).send({ success: true, data: students });
  } catch (error) {
    return reply.code(500).send({ success: false, message: error.message });
  }
}

// READ ONE
async function getStudentById(request, reply) {
  try {
    const student = await Student.findByPk(request.params.id);
    if (!student) {
      return reply.code(404).send({ success: false, message: 'Student not found' });
    }
    return reply.code(200).send({ success: true, data: student });
  } catch (error) {
    return reply.code(500).send({ success: false, message: error.message });
  }
}

// UPDATE
async function updateStudent(request, reply) {
  try {
    const student = await Student.findByPk(request.params.id);
    if (!student) {
      return reply.code(404).send({ success: false, message: 'Student not found' });
    }

    const { name, email, course, age } = request.body;
    await student.update({ name, email, course, age });

    return reply.code(200).send({ success: true, data: student });
  } catch (error) {
    return reply.code(400).send({ success: false, message: error.message });
  }
}

// DELETE
async function deleteStudent(request, reply) {
  try {
    const student = await Student.findByPk(request.params.id);
    if (!student) {
      return reply.code(404).send({ success: false, message: 'Student not found' });
    }

    await student.destroy();
    return reply.code(200).send({ success: true, message: 'Student deleted successfully' });
  } catch (error) {
    return reply.code(500).send({ success: false, message: error.message });
  }
}

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
