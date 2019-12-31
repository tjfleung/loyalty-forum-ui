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

        //const formData = new FormData();
        //formData.append('username', this.state.username);
        //formData.append('message', this.state.message);

        //console.log(this.state.username);
        //console.log(this.state.message);

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
        return (
            <div>
                <p>{this.state.resp.username}</p>
                <p>{this.state.resp.message}</p>
            </div>
        )
    }

    getMessagesByUsername() {
        const url = 'http://localhost:8000/messages/' + this.state.username;

        console.log(url);

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
        console.log(this.state.messages);

        return (
            <ul>
                {this.state.messages.map(function(message, index) {
                    return (
                        <div key={index}>
                            <h6>{message.username}</h6>
                            <p>{message.message}</p>
                        </div>
                    )
                })}
            </ul>
        )
    }

    render() {
        return (
            <div className="App">
                <form onSubmit={this.postMessage.bind(this)}>
                    <label>Username:</label>
                    <input type="text" name="username" id="username" value={this.state.username}
                           onChange={e => this.setState({username: e.target.value})}
                           onBlur={event => this.getMessagesByUsername()}
                           cols="100" rows="1"
                    />
                    <br/>

                    <label>Location:</label>
                    <input type="text" name="location" id="location" value={this.state.location} onChange={e => this.setState({location: e.target.value})} cols="100" rows="1" />
                    <br/>

                    <label>Message:</label>
                    <input type="text" name="message" id="message" value={this.state.message} onChange={e => this.setState({message: e.target.value})} cols="100" rows="4" />
                    <br/>

                    <button>Done</button>
                </form>

                {this.displayMessage()}

                {this.displayMessagesByUsername()}
            </div>
        );
    }
}

export default App;
