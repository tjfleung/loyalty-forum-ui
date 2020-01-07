import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import Message from "./components/message/message";
import Messages from "./components/messages/messages";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            location: '',
            comment: '',
            resp: '',
            'messages': [],
            'allMessages': []
        }
    }

    fetchAllMessages() {
        //const url = 'http://localhost:5000/messages/';
        const url = 'http://loyaltyforumapi-env-1.i6bzdysfve.ca-central-1.elasticbeanstalk.com/messages/';

        fetch(url)
            .then(res => {
                return res.json();
            })
            .then((data) => {
                this.setState({'allMessages': data})
                //console.log(data)
            })
            .catch(console.log)
    }

    componentDidMount() {
        this.fetchAllMessages();
    }

    postMessage(e) {
        e.preventDefault();

        this.setState({resp: ''});

        //const url = 'http://localhost:5000/messages';
        const url = 'http://loyaltyforumapi-env-1.i6bzdysfve.ca-central-1.elasticbeanstalk.com/messages';

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                //"Access-Control-Allow-Origin": "*",
            }
        };

        axios.post(url, {
            'username': this.state.username,
            'comment': this.state.comment,
            'location': {
                'location': this.state.location
            }
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
            'messages': []
        });

        this.fetchAllMessages()
    }

    resetPage() {
        this.setState(
            {
                username: '',
                location: '',
                comment: '',
                resp: '',
                'messages': []
            }
        );
        this.fetchAllMessages()
    }

    getMessagesByUsername() {
        //const url = 'http://localhost:5000/messages/' + this.state.username;
        const url = 'http://loyaltyforumapi-env-1.i6bzdysfve.ca-central-1.elasticbeanstalk.com/messages/' + this.state.username;

        fetch(url)
            .then(res => {
                return res.json();
            })
            .then((data) => {
                this.setState({'messages': data})
                //console.log(data)
            })
            .catch(console.log)
    }

    render() {
        return (
            <div className="App">
                <form onSubmit={this.postMessage.bind(this)}
                      onReset={this.resetPage.bind(this)}>

                    <div className="form-group row">
                        <label>Username</label>
                        <input type="text" name="username" id="username"
                               className="form-control"
                               value={this.state.username}
                               onChange={e => this.setState({username: e.target.value})}
                               onBlur={event => this.getMessagesByUsername()}
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
                        <button type="reset" className="btn btn-secondary mx-2" id="resetButton">Reset</button>
                    </div>

                </form>

                <br/>

                <div className="container">
                    {this.state.resp ? <h2>{this.state.resp.username} Posted</h2> : null }
                    {this.state.resp ? <Message message={this.state.resp} /> : null }
                </div>

                <br/>

                <div className="container">
                    {this.state.username ? <h2>Comments From {this.state.username}</h2> : null }
                    <Messages messages={this.state.messages} />
                </div>

                <div className="container">
                    <h2>All Comments</h2>
                    <Messages messages={this.state.allMessages} />
                </div>
            </div>
        );
    }
}

export default App;
