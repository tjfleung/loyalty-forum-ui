import React from "react";
import Message from "../message/message";

class Messages extends React.Component {
    render() {
        return (
            this.props.messages.map(function(message, index) {
                return (
                    <div key={index}>
                        <Message message={message}/>
                    </div>
                )
            })
        )
    }
}

export default Messages