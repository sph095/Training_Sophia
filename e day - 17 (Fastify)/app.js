const Fastify = require("fastify");
const app = Fastify({
    logger:true
});

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

// PATCH - Update specific fields
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
app.listen({port:3000});

