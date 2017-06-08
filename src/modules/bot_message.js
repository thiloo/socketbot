import React from 'react';

const BotMessage = (props) => {
    return (
        <div className="messageWrapper botMessageWrapper">
            <div className="message botMessage">{props.msg.msg}</div>
        </div>

    );
};

export default BotMessage;
