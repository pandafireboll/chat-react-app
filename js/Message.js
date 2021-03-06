import React, {Component, PropTypes} from 'react';

export default class Message extends Component {

  render() {
    let {name, text, time} = this.props
    let date = new Date(JSON.parse(time))
    return (
      <li className="message">
        <div>
          <span className="name">{`${name}: `}</span>
          <span className="text">{text}</span>
        </div>
        <div className="time">{`${date.getHours()}:${date.getMinutes()}`}</div>
      </li>
    );
  }

  static propTypes = {
    name: PropTypes.string,
    text: PropTypes.string,
    time: PropTypes.string
  }

}