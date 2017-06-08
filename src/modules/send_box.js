import React, { Component } from 'react';


class SendBox extends Component {
    constructor(props) {
        super(props);
        this.state = { message: '' };
    }

    handleChange(e) {
        e.preventDefault();

        this.setState({ message: e.target.value });
    }

    handleKeyDown(e) {
        if(e.key === 'Enter') {
            e.preventDefault();

            this.props.getMessage(this.state.message);

            this.setState({ message: '' });
        }
    }

    render() {
        return (
            <div>
                <textarea className="textInput" value={this.state.message} onChange={this.handleChange.bind(this)} onKeyDown={this.handleKeyDown.bind(this)}></textarea>
            </div>
        );
    }
}

export default SendBox;
