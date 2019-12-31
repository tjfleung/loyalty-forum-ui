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
            resp: ''
        }

    }

    postMessage(e) {
        e.preventDefault();

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

    render() {
        return (
            <div className="App">
                <form onSubmit={this.postMessage.bind(this)}>
                    <label>Username:</label>
                    <input type="text" name="username" id="username" value={this.state.username} onChange={e => this.setState({username: e.target.value})} cols="100" rows="1" />
                    <br/>

                    <label>Location:</label>
                    <input type="text" name="location" id="location" value={this.state.location} onChange={e => this.setState({location: e.target.value})} cols="100" rows="1" />
                    <br/>

                    <label>Message:</label>
                    <input type="text" name="message" id="message" value={this.state.message} onChange={e => this.setState({message: e.target.value})} cols="100" rows="4" />
                    <br/>

                    <button>Done</button>
                </form>
                <p>TODO display the submitted message</p>
                <p>TODO display message list submitted by user</p>
            </div>
        );
    }
}

export default App;
