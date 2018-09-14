import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';

import Datepicker from './Datepicker';

const DisplayContainer = styled.li`
  background: linear-gradient(32deg, #fff, #f4f4f4, #fff);
  border: 1px solid #ccc;
  min-width: 60%;
  max-width: 85%;
  padding: 20px 40px 20px 20px;
  margin-left: ${props => props.message.from === 'bot' ? '20px' : '0'};
  margin-right: ${props => props.message.from === 'user' ? '20px' : '0'};
  border-radius: 18px;
  float: ${props => props.message.from === 'bot' ? 'left' : 'right'};
  clear: both;
  position: relative;
  margin-bottom: 10px;

  &:before {
    content: '';
    position: absolute;
    top: 20px;
    left: ${props => props.message.from === 'bot' ? '-20px' : 'auto'};
    right: ${props => props.message.from === 'user' ? '-20px' : 'auto'};
    width: 0; 
    height: 0;
    border: 20px solid transparent;
    border-right-color: #ccc;
    border-left-color: #ccc;
    border-right-width: ${props => props.message.from === 'bot' ? '20px' : '0'};
    border-left-width: ${props => props.message.from === 'user' ? '20px' : '0'};
  }

  p {
    &:last-child {
      margin-bottom: 10px;
    }
  }
`;

const Timestamp = styled.span`
  display: block;
  font-size: 0.7em;
  font-style: italic;
  margin-bottom: 5px;
`

class ChatMessage extends Component {
  render() {
    const { message, onSubmitDate } = this.props;

    const now = moment();
    const msgTime = message.timestamp.isSame(now, 'day') ?
      message.timestamp.format('hh:mm'):
      message.timestamp.format('DD.MM.YYYY hh:mm');

    return (
      <DisplayContainer {...this.props}>
        <Timestamp>{msgTime}</Timestamp>
        {message.text.map( (text, idx) => {
          return <p key={idx}>{text}</p>;
        })}
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
    text: PropTypes.arrayOf(PropTypes.string.isRequired),
    showDatepicker: PropTypes.bool,
  }).isRequired,
  onSubmitDate: PropTypes.func.isRequired,
}

export default ChatMessage;
