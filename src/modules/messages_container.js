import React, { Component } from 'react';
import UserMessage from './user_message';
import BotMessage from './bot_message';

class MessagesContainer extends Component {
    renderMessages() {
        return this.props.messages.map(msg => {
            if(msg.sender === 'user') {
                return <UserMessage key={msg.id} msg={msg} />;
            } else if (msg.sender === 'bot') {
                return <BotMessage key={msg.id} msg={msg} />;
            }
        });
    }

    componentDidUpdate() {
        const messageContainer = document.querySelector('.messageContainer');
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }

    render() {
        return (
            <div className="messageContainer">
                {this.renderMessages()}
            </div>
        );
    }
}

export default MessagesContainer;
