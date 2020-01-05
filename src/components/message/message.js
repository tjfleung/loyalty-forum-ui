import React from "react";
import Messages from "../messages/messages";
import Reply from "../reply/reply";

class Message extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isReply: false
        }
    }

    prepareReply() {
        this.setState({isReply: !this.state.isReply})
    }

    render() {
        return (
            <div>
                <div className="card-deck">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-title">{this.props.message.username}</h6>
                            <h6 className="card-subtitle">{this.props.message.postedDate}</h6>
                            <p className="card-text">{this.props.message.comment}</p>
                            <button className="btn btn-primary" onClick={this.prepareReply.bind(this)}>Reply</button>
                            {this.state.isReply ? <Reply id={this.props.message.id}/> : null}
                        </div>
                    </div>
                </div>

                <ul>
                    <Messages messages={this.props.message.childMessages} />
                </ul>
            </div>
        )
    }
}

export default Message