import React, {Component} from 'react';
import './App.css';
import io from 'socket.io-client';
import SendBox from './modules/send_box.js';
import MessagesContainer from './modules/messages_container';

const socket = io();



class App extends Component {
    constructor(props) {
        super(props);

        this.state = { messages: [ ] };
        this.handleMessage = this.handleMessage.bind(this);

        socket.on('connect', () => console.log('socket connected'));

        socket.on('chat message', (payload) => {
            this.updateMessagesFromSocket(payload);
        });
    }

    updateMessagesFromSocket(payload) {
        this.setState({ messages: [...this.state.messages, payload] });
    }

    handleMessage(msg){
        socket.emit('chat message', msg);
    }

    render() {
        console.log(this.state.messages);
        return (
            <div className="container">
                <MessagesContainer messages={this.state.messages} />
                <SendBox getMessage={this.handleMessage}/>
            </div>
        );
    }
}

export default App;
