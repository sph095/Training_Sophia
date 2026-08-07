import Fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'

const fastify = Fastify()

await fastify.register(fastifyJwt, {
  secret: 'mysecret'
})
const users = [
  { id: 1, email: 'rory@test.com', password: '$2b$10$e6upKlck4ekrkQxOd4ipHu77/9JN6rqJkPBVXqGMb06YB2TwdXecC' }
]
app.get("/", async()=>{
    return{
        message:"Welcome Home!"
    };
});

app.get ("/employee/:id",async(request,reply) => {

    return {
        emp_id : request.params.id
    }
});

app.get ("/employee/:id/:name",async(request,reply) => {

    const {id,name} = request.params;
    return (`Hello ${name}, your employee id is ${id}`)
});
//query if, else if, else
app.get ("/employee",async(request) => {

    id: request.query.id;
    name : request.query.name;

    if(request.query.name && request.query.id)
        return (`Hello ${request.query.name}, your employee id is ${request.query.id}`)

    else if(request.query.id)
        return (`your employee id is ${request.query.id}`)

    else if(request.query.name)
        return (`your name is ${request.query.name}`)
        
    else{
        return ('Hi employee')}
    
});

app.get('/search', async (request, reply) => {
  item = request.query.item;
  return `Found: ${item}`
})



app.post("/role", async (request)=>{
    return( request.body);
});
   
app.post("/login", (request, reply) => {

    const { username, password } = request.body;
        if (username === "admin" && password === "1234") {
            return reply.send({
                 message: "Login Successful"
            });
        }

    return reply.send({
        message: "Invalid Username or Password"
    });

});
app.post("/employee", async (request) => {
  const { name, role } = request.body;

  return {
    message: "Employee created",
    name,
    role
  };
}); 

app.put("/employee/:id", async (request) => {
  const { id } = request.params;
  const { name, role } = request.body;

  return {
    message: `Employee ${id} updated`,
    name,
    role
  };
});

app.patch("/employee/:id", async (request) => {
  const { id } = request.params;

  return {
    message: `Employee ${id} patched`,
    updates: request.body
  };
});

app.delete("/employee/:id", async (request) => {
  const { id } = request.params;

  return {
    message: `Employee ${id} deleted`
  };
});

//onRequest
app.addHook("onRequest", async(request,reply)=>{
    // reply.send("Request received")
    console.log(`HTTP Method :${request.method} URL: ${request.url}`);
})

//preHandler
app.get('/admin', {
  preHandler: async (request, reply) => {
    const userRole = request.headers.authorization;

    if (userRole !== 'admin') {
      return reply.code(403).send({
        message: 'Forbidden'
      });
    }
  }
}, async (request, reply) => {
  return { message: 'Admin dashboard' };
});

async function auth(request, reply) {
    const userRole = request.headers.author;

    if (userRole !== 'admins') {
      return reply.code(403).send({
        message: 'Forbidden'
      });
    }
  }
    
app.get('/admins', {preHandler: auth}, async (request, reply) => {
  return { message: 'Admin dashboard' };
});

//preValidation
app.addHook('preValidation', async (request, reply) => {
  console.log('Running before validation');
});

app.post('/users', {
  preValidation: async (request, reply) => {
    // Modify request body before validation
    if (!request.body.role) {
      request.body.role = 'user';
    }
  },
  schema: {
    body: {
      type: 'object',
      required: ['name', 'role'],
      properties: {
        name: { type: 'string' },
        role: { type: 'string' }
      }
    }
  }
}, async (request, reply) => {
  return request.body;
});

async function verifyToken(request, reply) {
  const token = request.headers.authorization;

  if (!token) {
    return reply.code(401).send({
      message: 'Unauthorized'
    });
  }

  request.user = { id: 1 };
}

app.get('/profile', {
  preValidation: verifyToken
}, async (request, reply) => {
  return {
    user: request.user
  };
});


app.post('/login', async (request, reply) => {
  const { email, password } = request.body
  const user = users.find(u => u.email === email)

  if (!user) {
    return reply.code(401).send({ error: 'Invalid credentials' })
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    return reply.code(401).send({ error: 'Invalid credentials' })
  }

  const token = fastify.jwt.sign(
    { id: user.id, email: user.email },
    { expiresIn: '1h' }
  )

  return { token }
})


// app.listen({port:3000});
app.listen({ port: 3000 }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Server started');
});

