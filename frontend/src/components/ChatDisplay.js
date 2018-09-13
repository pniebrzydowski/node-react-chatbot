import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Datepicker from './Datepicker';

const DisplayContainer = styled.section`
  padding: 20px;
  border-bottom: 2px ridge #444;
  flex: 1 1 auto;
`;

class ChatDisplay extends Component {
  render() {
    const { messages, onSubmitDate } = this.props;
    if (messages === null) return null;

    return (
      <DisplayContainer>
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
    text: PropTypes.string.isRequired,
    showDatepicker: PropTypes.bool,
  })),
}

export default ChatDisplay;
