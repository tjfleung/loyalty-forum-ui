import React from "react";

class Message extends React.Component {
    render() {
        return (
            <div>
                <div className="card">
                    <div className="card-body">
                        <h6 className="card-title">{this.props.message.username}</h6>
                        <h6 className="card-subtitle">{this.props.message.postedDate}</h6>
                        <p className="card-text">{this.props.message.message}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Message