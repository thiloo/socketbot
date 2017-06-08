const compression = require('compression');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const uuid = require('uuid/v1');
const port = process.env.PORT || 8080;
const axios = require('axios');
const npmRun = require('npm-run');
const apiai = require('apiai');

const bot = apiai('7d13e108ae484b8e872f084bbd97253e');

app.use(compression());

app.use(express.static('./build'));

app.get('/build', (req, res) => {
  npmRun.exec('react-scripts build', (err, out, derr) => {
    res.send(err, out, derr)
  });
})

app.get('*', (req, res) => {
    res.send('./build');
});

io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('chat message', function(msg){
        
        let obj = {
            id: uuid(),
            sender: 'user',
            msg: msg
        };
        socket.emit('chat message', obj);
        const request = bot.textRequest(msg, {sessionId: socket.id});
        request.on('response', (response) => {
          let obj = {
                    id: uuid(),
                    sender: 'user',
                    msg: response.result.fulfillment.speech
                };
          socket.emit('chat message', obj);
          console.log(response)
        });
        request.on('error', err => console.log(err));
        request.end();
        
    }); 
});


http.listen(port, () => {
    console.log('listening on port ', port);
});
