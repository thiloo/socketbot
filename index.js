require('dotenv').config();
const compression = require('compression');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const uuid = require('uuid/v1');
const port = process.env.PORT || 8080;
const apiai = require('apiai');


const bot = apiai(process.env.APIAI_KEY);

app.use(compression());

app.use(express.static('./build'));

app.get('*', (req, res) => {
    res.send('./build');
});

io.on('connection', (socket) => {
    // initialize the coversation by putting a first message to the screen
    makeRequest('initialize', socket.id)
        .then(response => {
            let obj = chatResponse('bot', response.result.fulfillment.speech);
            socket.emit('chat message', obj);
        });
    // show the users messages on the screen
    socket.on('chat message', function(msg) {
        let obj = chatResponse('user', msg);
        socket.emit('chat message', obj);
        // make request to api.ai based on user input, the log response to screen
        makeRequest(msg, socket.id)
            .then(response => {
                let obj = chatResponse('bot', response.result.fulfillment.speech);
                socket.emit('chat message', obj);
            })
            .catch(err => console.log(err));
    });
});

// promised version of api.ai sdk
const makeRequest = (msg, sessionId) => {
    return new Promise((resolve, reject) => {
        const request = bot.textRequest(msg, { sessionId });

        request.on('response', (response) => {
            resolve(response);
        });
        request.on('error', err => reject(err));
        request.end();
    });
};

// transform input into object that can be rendered as message on screen
const chatResponse = (sender, msg) => {
    return {
        sender, msg,
        id: uuid(),
    };
};

http.listen(port, () => {
    console.log('listening on port ', port);
});
