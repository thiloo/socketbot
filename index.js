const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 8080;
const view = __dirname + `/view/public`;

app.get('/', (req, res) => {
    res.sendFile(view + '/index.html');
});

app.use(express.static(view));

io.on('connection', (socket) => {
    console.log('new connection');
    socket.on('chat message', function(msg){
        socket.emit('chat message', msg);
    });
});

http.listen(port, () => {
    console.log('listening on port ', port);
});
