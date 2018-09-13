import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Datepicker from './Datepicker';

class ChatDisplay extends Component {
  render() {
    const { messages, onSubmitDate } = this.props;
    if (messages === null) return null;

    return (
      <ul>
        { messages.map( message => {
          return (
            <li key={message.timestamp}>
              {message.from}:<br />
              {message.text}<br />
              {message.showDatepicker && <Datepicker onSubmitDate={onSubmitDate} /> }
            </li>
          );
        })}
      </ul>
    );
  }
}

ChatDisplay.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    timestamp: PropTypes.object.isRequired,
    from: PropTypes.oneOf([
      'bot',
      'user',
    ]).isRequired,
    text: PropTypes.string.isRequired,
    showDatepicker: PropTypes.bool,
  })),
}

export default ChatDisplay;
