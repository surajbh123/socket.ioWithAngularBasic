const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


app.get('/', (req, res) => {
    res.send('<h1>Hey Socket.io</h1>');
});

users = {};

//start socket
io.on('connection', (socket) => {
    console.log('a user connected');
    
  // add new user to room 
    socket.on('new-user-joined', (name) => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',
            name)
    });

  
    socket.on("send", message => {
         socket.broadcast.emit("receive",message)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});



//socket listening at port
http.listen(3000, () => {
    console.log('listening on *:3000');
});