import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ChatMessage from './ChatMessage';

const DisplayContainer = styled.section`
  padding: 15px 10px;
  border-bottom: 2px ridge #444;
  flex: 1 1 auto;

  @media (min-width: 450px) {
    padding: 20px;
  }
`;

class ChatDisplay extends Component {
  render() {
    const { messages, onSubmitDate } = this.props;
    if (messages === null) return null;

    return (
      <DisplayContainer>
        <ul>
          { messages.map( message => {
            return <ChatMessage key={message.timestamp.format('DD.MM.YYYY hh:mm:ss')} message={message} onSubmitDate={onSubmitDate} />;
          })}
        </ul>
      </DisplayContainer>
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
    text: PropTypes.arrayOf(PropTypes.string).isRequired,
    showDatepicker: PropTypes.bool,
  })),
  onSubmitDate: PropTypes.func.isRequired,
};

export default ChatDisplay;
