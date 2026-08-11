const Fastify = require("fastify");
const { Sequelize, DataTypes, Op } = require("sequelize");

const fastify = Fastify({ logger: true });

const sequelize = new Sequelize(
  "sequelize_demo",
  "postgres",
  "09876543",
  {
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    logging: false,
  }
);

const Department = sequelize.define("Department", {
  name: DataTypes.STRING,
});

const Student = sequelize.define("Student", {
  name: DataTypes.STRING,
  age: DataTypes.INTEGER,
});

const Profile = sequelize.define("Profile", {
  city: DataTypes.STRING,
});

const Course = sequelize.define("Course", {
  title: DataTypes.STRING,
});

const StudentCourse = sequelize.define("StudentCourse", {});

Department.hasMany(Student);
Student.belongsTo(Department);

Student.hasOne(Profile);
Profile.belongsTo(Student);

Student.belongsToMany(Course, {
  through: StudentCourse,
});

Course.belongsToMany(Student, {
  through: StudentCourse,
});

async function seed() {
  await sequelize.sync({ force: true });

  const department = await Department.create({
    name: "Computer Science",
  });

  const john = await Student.create({
    name: "John",
    age: 22,
    DepartmentId: department.id,
  });

  const alice = await Student.create({
    name: "Alice",
    age: 19,
    DepartmentId: department.id,
  });

  await john.createProfile({
    city: "Chennai",
  });

  await alice.createProfile({
    city: "Bangalore",
  });

  const nodeCourse = await Course.create({
    title: "NodeJS",
  });

  const postgresCourse = await Course.create({
    title: "PostgreSQL",
  });

  await john.addCourses([nodeCourse, postgresCourse]);
  await alice.addCourse(nodeCourse);
}

fastify.get("/students", async () => {
  return Student.findAll({
    include: [Profile, Department, Course],
  });
});

fastify.get("/student/:name", async (request) => {
  return Student.findOne({
    where: {
      name: request.params.name,
    },
    include: [Profile, Department, Course],
  });
});

fastify.get("/students/age/:age", async (request) => {
  return Student.findAll({
    where: {
      age: request.params.age,
    },
  });
});

fastify.get("/students/gt/:age", async (request) => {
  return Student.findAll({
    where: {
      age: {
        [Op.gt]: Number(request.params.age),
      },
    },
  });
});

fastify.get("/students/name/:prefix", async (request) => {
  return Student.findAll({
    where: {
      name: {
        [Op.like]: `${request.params.prefix}%`,
      },
    },
  });
});

fastify.get("/students/literal", async () => {
  return Student.findAll({
    where: Sequelize.literal('"age" > 20'),
  });
});

async function start() {
  try {
    await sequelize.authenticate();
    await seed();

    await fastify.listen({
      port: 3000,
      host: "0.0.0.0",
    });

    console.log("Server running on http://localhost:3000");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();