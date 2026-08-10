const studentController = require('../controllers/studentController');
const {
  createStudentSchema,
  updateStudentSchema,
  getStudentSchema,
  deleteStudentSchema,
} = require('../schemas/studentSchema');

async function studentRoutes(fastify, options) {
  fastify.post('/students', studentController.createStudent);
  fastify.get('/students', studentController.getAllStudents);
  fastify.get('/students/:id', studentController.getStudentById);
  fastify.put('/students/:id', studentController.updateStudent);
  fastify.delete('/students/:id', studentController.deleteStudent);
}

module.exports = studentRoutes;
