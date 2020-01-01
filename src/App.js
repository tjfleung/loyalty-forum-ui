import React, {Component} from 'react';
import './App.css';
import axios from 'axios';

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

        const url = 'http://localhost:8000/messages';

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

    //TODO create components for message display
    displayMessage() {
        if(this.state.resp) {
            return (
                <div>
                    <h2>{this.state.resp.username} Posted:</h2>
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-title">{this.state.resp.username}</h6>
                            <p className="card-text">{this.state.resp.message}</p>
                        </div>
                    </div>
                </div>
            )
        }
    }

    getMessagesByUsername() {
        const url = 'http://localhost:8000/messages/' + this.state.username;

        //console.log(url);

        // axios.get(url)
        //     .then(response => this.setState({messages: response.data}))
        //     .catch(console.log);

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

    displayMessagesByUsername() {
        //console.log(this.state.messages);

        return (
            this.state.messages.map(function(message, index) {
                return (
                    <div>
                        <div key={index}>
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title">{message.username}</h6>
                                    <p className="card-text">{message.message}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                )
            })
        )
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

                <div className="container">
                    {this.displayMessage()}
                </div>

                <div className="container">
                    {this.displayMessagesByUsername()}
                </div>
            </div>
        );
    }
}

export default App;
