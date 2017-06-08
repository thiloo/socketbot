const compression = require('compression');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const uuid = require('uuid/v1');
const port = process.env.PORT || 8080;
const axios = require('axios');

app.use(compression());

app.use(express.static('./build'));

app.get('*', (req, res) => {
    res.send('./build');
});

const instance = axios.create({
    headers: {
        Authorization: "Bearer 3d1f3404e25c436e9c38d41ee33fc3a5",
        'Content-Type': "application/json; charset=utf-8"
    }
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
        api(msg, 'abces')
            .then(data => {
                let obj = {
                    id: uuid(),
                    sender: 'user',
                    msg: data.speech
                };
                socket.emit('chat message', obj);
            })
            .catch(err => console.log(err));
    });
});

const api = (msg, id) => {
    return new Promise((resolve, reject) => {
        const post = {
            query: [msg],
            sessionId: id,
            lang: 'en'
        };

        instance.post('https://api.api.ai/v1/query?v=20170530', post)
            .then(res => resolve(res.data.result.fulfillment))
            .catch(err => reject(err.message));
    });

};

http.listen(port, () => {
    console.log('listening on port ', port);
});
