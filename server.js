const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());

//"mongodb://127.0.0.1:27017/mern-todo"
mongoose.connect("mongodb://127.0.0.1:27017/mern-todo",{  //"mern-todo" is DB name
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(() => console.log("Connected to DB"))
  .catch(console.error);

  const Todo = require('./models/Todo');

  app.get('/todos', async(req,res) => {
    const todos = await Todo.find();

    res.json(todos);
  });

  app.post('/todo/new', (req,res) => {
    const todo = new Todo({
        text : req.body.text
    });

    todo.save();
    res.json(todo);
  });

  app.delete('/todo/delete/:id', async(req,res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
  });

  app.get('/todo/complete/:id', async (req,res) => {
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete;

    todo.save();

    res.json(todo);
  
});


  app.put('/todo/complete/:id', async(req,res) => {
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete;

    todo.save();
  })


//heroku step 2
//Add Handler for Client Build
//Add the following code to your index.js (server) file. This tells the server to look for a build of the react app
__dirname = path.resolve();  
if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'./client/build')));
    // const path = require("path");
    app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname ,'./client/build/index.html'));
    });
   }
   


  let port = process.env.PORT || 3000; //means let port equal to what HEROKU has setup
  // if (port == null || port == "") { //if heroku hasn't set one, then we gonna use our local one i.e, 3000
  //   port = 3000;
  // }

  app.listen(port, () => console.log("Server started on port 3000"));