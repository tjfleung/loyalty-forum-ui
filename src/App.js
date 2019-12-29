import React, {Component} from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            location: '',
            message: '',
            resp: ''
        }

    }

    postMessage(e) {
        e.preventDefault();

        const url = 'http://localhost:8000/message?message=' + this.state.message;

        axios.get(url).then(
            response => this.setState({resp: response.data})
        );
    }

    render() {
        return (
            <div className="App">
                <form onSubmit={this.postMessage.bind(this)}>
                    <label>Username:</label>
                    <input type="text" name="userName" id="userName" value={this.state.userName} onChange={e => this.setState({userName: e.target.value})} cols="100" rows="1" />
                    <br/>

                    <label>Location:</label>
                    <input type="text" name="location" id="location" value={this.state.location} onChange={e => this.setState({location: e.target.value})} cols="100" rows="1" />
                    <br/>

                    <label>Message:</label>
                    <input type="text" name="message" id="message" value={this.state.message} onChange={e => this.setState({message: e.target.value})} cols="100" rows="4" />
                    <br/>

                    <button>Done</button>
                </form>
                <p>{this.state.resp}</p>
            </div>
        );
    }
}

export default App;
