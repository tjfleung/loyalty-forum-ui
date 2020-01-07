import React from "react";
import axios from "axios";

class Reply extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            location: '',
            comment: '',
        }
    }

    postMessage(e) {
        e.preventDefault();

        this.setState({resp: ''});

        //const url = 'http://localhost:5000/messages/' + this.props.id;
        const url = 'http://loyaltyforumapi-env-1.i6bzdysfve.ca-central-1.elasticbeanstalk.com/messages/' + this.props.id;

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                //"Access-Control-Allow-Origin": "*",
            }
        };

        axios.post(url, {
            'username': this.state.username,
            'comment': this.state.comment
        }, axiosConfig)
            .then(response => this.setState({resp: response.data}))
            .catch(error => {
                    console.log(error)
                }
            );

        this.setState({
            username: "",
            location: "",
            comment: "",
        });
    }

    render() {
        return (
            <form onSubmit={this.postMessage.bind(this)}>

                <div className="form-group row">
                    <label>Username</label>
                    <input type="text" name="username" id="username"
                           className="form-control"
                           value={this.state.username}
                           onChange={e => this.setState({username: e.target.value})}
                           placeholder="Username"
                           required
                    />
                </div>

                <div className="form-group row">
                    <label>Location</label>
                    <input type="text" name="location" id="location"
                           className="form-control"
                           value={this.state.location}
                           onChange={e => this.setState({location: e.target.value})}
                           placeholder="Location"
                           required
                    />
                </div>

                <div className="form-group row">
                    <label>Comment</label>
                    <input type="text" name="comment" id="comment"
                           className="form-control"
                           value={this.state.comment}
                           onChange={e => this.setState({comment: e.target.value})}
                           placeholder="Comment"
                           required
                    />
                </div>

                <div className="form-group row">
                    <button type="submit" className="btn btn-primary" id="doneButton">Done</button>
                </div>

            </form>
        )
    }
}

export default Reply