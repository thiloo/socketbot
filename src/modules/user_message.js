import React from 'react';

const UserMessage = (props) => {
    console.log(props.msg);
    return (
        <div>{props.msg.msg}</div>
        
    );
};

export default UserMessage;
