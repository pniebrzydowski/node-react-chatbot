import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Datepicker from './Datepicker';

const DisplayContainer = styled.li`
  background: linear-gradient(32deg, #fff, #f4f4f4, #fff);
  border: 1px solid #ddd;
  min-width: 60%;
  max-width: 85%;
  padding: 20px 40px 20px 20px;
  margin-left: 20px;
  border-radius: 18px;
  float: ${props => props.message.from === 'bot' ? 'left' : 'right'};
  clear: both;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 20px;
    left: -20px;
    width: 0; 
    height: 0; 
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-right: 20px solid #ddd; 
  }


  p {
    margin: 10px 0;
  }
`;

const Timestamp = styled.span`
  display: block;
  font-size: 0.7em;
`

class ChatMessage extends Component {
  render() {
    const { message, onSubmitDate } = this.props;

    return (
      <DisplayContainer {...this.props}>
        <Timestamp>{message.timestamp.format('DD.MM.YYYY hh:mm')}</Timestamp>
        <p>{message.text}</p>
        {message.showDatepicker && <Datepicker onSubmitDate={onSubmitDate} />}
      </DisplayContainer>
    );
  }
}

ChatMessage.propTypes = {
  message: PropTypes.shape({
    timestamp: PropTypes.object.isRequired,
    from: PropTypes.oneOf([
      'bot',
      'user',
    ]).isRequired,
    text: PropTypes.string.isRequired,
    showDatepicker: PropTypes.bool,
  }).isRequired,
  onSubmitDate: PropTypes.func.isRequired,
}

export default ChatMessage;
