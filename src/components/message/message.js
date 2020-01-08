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
                            <h3 className="card-title">{this.props.message.username}</h3>
                            <h6 className="card-subtitle text-muted">{this.props.message.postedDate}</h6>
                            <p className="card-text">{this.props.message.comment}</p>
                            <button className="btn btn-primary" onClick={this.prepareReply.bind(this)}>Reply</button>
                            {this.state.isReply ? <Reply id={this.props.message.id}/> : null}
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">{this.props.message.location.location}</h3>
                            <h6 className="card-subtitle text-muted">{this.props.message.location.latitude},{this.props.message.location.longitude}
                                <ion-icon name="locate"></ion-icon>
                            </h6>
                            <p className="card-text">{this.props.message.location.temperature}
                                <ion-icon name="thermometer"></ion-icon>
                            </p>
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