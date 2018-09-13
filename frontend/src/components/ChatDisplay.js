import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChatDisplay extends Component {
  render() {
    const { messages } = this.props;
    if (messages === null) return null;

    return (
      <ul>
        { messages.map( message => {
          return <li key={message.id}>{message.from}: {message.text}</li>;
        })}
      </ul>
    );
  }
}

ChatDisplay.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    from: PropTypes.oneOf([
      'bot',
      'user',
    ]).isRequired,
    text: PropTypes.string.isRequired,
  })),
}

export default ChatDisplay;
