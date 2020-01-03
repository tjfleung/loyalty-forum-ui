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
            message: '',
            resp: '',
            'messages': []
        }
    }

    postMessage(e) {
        e.preventDefault();

        this.setState({resp: ''});

        const url = 'http://localhost:5000/messages';

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                //"Access-Control-Allow-Origin": "*",
            }
        };

        axios.post(url, {
            'username': this.state.username,
            'message': this.state.message
        }, axiosConfig)
            .then(response => this.setState({resp: response.data}))
            .catch(error => {
                console.log(error)
            }
        );

        this.setState({
            username: "",
            location: "",
            message: ""
        });
    }

    getMessagesByUsername() {
        const url = 'http://localhost:5000/messages/' + this.state.username;

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
                <form onSubmit={this.postMessage.bind(this)}>

                    <div className="form-group row">
                        <label>Username</label>
                        <input type="text" name="username" id="username"
                               className="form-control"
                               value={this.state.username}
                               onChange={e => this.setState({username: e.target.value})}
                               onBlur={event => this.getMessagesByUsername()}
                               cols="100" rows="1"
                               placeholder="Username"
                        />
                    </div>

                    <div className="form-group row">
                        <label>Location</label>
                        <input type="text" name="location" id="location"
                               className="form-control"
                               value={this.state.location}
                               onChange={e => this.setState({location: e.target.value})}
                               cols="100" rows="1"
                               placeholder="Location"
                        />
                    </div>

                    <div className="form-group row">
                        <label>Message</label>
                        <input type="text" name="message" id="message"
                               className="form-control"
                               value={this.state.message}
                               onChange={e => this.setState({message: e.target.value})}
                               cols="100" rows="4"
                               placeholder="Message"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Done</button>
                </form>

                <br/>

                <div className="container">
                    {this.state.resp ? <h2>{this.state.resp.username} Posted:</h2> : null }
                    {this.state.resp ? <Message message={this.state.resp} /> : null }
                </div>

                <br/>

                <div className="container">
                    <Messages messages={this.state.messages} />
                </div>
            </div>
        );
    }
}

export default App;
