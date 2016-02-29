import React, {Component} from 'react';
import Messages from './Messages';
import Rebase from 're-base';

const base = Rebase.createClass("https://chat-react-app-pandafireball.firebaseio.com/  ");

export default class App extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {
      messages: [],
      input: '',
      name:''
    };
  }

  render() {
    return (
      <div className="container">
        <Messages messages={this.state.messages} />
        <input
          className="input"
          type="text"
          placeholder="SPEAK!"
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          value={this.state.input}
        />
      </div>
    );
  }

  componentDidMount(){
    let name = prompt("What is your name?");
    this.setState({name})
    base.syncState('messages', {
      context: this,
      state: 'messages',
      asArray: true
    });
  }

    // If the user is scrolled to the bottom...
  componentWillUpdate(nextProps, nextState) {
    this.shouldScrollBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
  }

  // Scroll the messages list to the bottom
  componentDidUpdate(prevProps, prevState) {
    if (this.shouldScrollBottom) document.body.scrollTop = document.body.scrollHeight;
  }

  handleChange(event) {
    this.setState({input: event.target.value});
  }

  handleKeyDown(event) {
    if (event.key === 'Enter') {
      let messages = [...this.state.messages, {
        name: this.state.name,
        text: this.state.input,
        time: JSON.stringify(new Date())
      }];
      this.setState({
        messages,
        input: ''
      });
    }
  }

}