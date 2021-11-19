let express = require("express");
let path = require('path');
let app = express();
let dojos = ['Costa Rica', 'Ecuador', 'Mexico', 'Burbank']
let languages = ['Javascript', 'Python', 'Java', 'Ruby', 'Fortran']
let ninja;
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));


app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render("form", {'dojos': dojos, 'languages':languages});
})

// app.post('/add', function(req, res) {
//     ninja = req.body;
//     res.redirect('/show')
// })

// app.get('/show', function(req, res) {
//     res.render("result", {'user': ninja});
// })

// tell the express app to listen on port 8000
let server = app.listen(1500, function() {
 console.log("listening on port 1500");
});

const io = require('socket.io')(server);


io.on('connection', function (socket) { //2
  
    socket.emit('greeting', { msg: 'Greetings, from server Node, brought to you by Sockets! -Server' }); //3
    socket.on('posting_form', function (data) { //7
      let message = `You emitted the following information to the server: ${JSON.stringify(data.msg)}`
      socket.emit('updated_message', {msg: message})
      let number = Math.floor(Math.random()*1000+1);
      socket.emit('random_number', {msg: number})
    });
      
  });