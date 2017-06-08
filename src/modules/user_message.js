import React from 'react';

const UserMessage = (props) => {
    return (
        <div className="messageWrapper">
            <div className="message userMessage">{props.msg.msg}</div>
        </div>


    );
};

export default UserMessage;
