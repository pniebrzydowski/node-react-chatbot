import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class ChatDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: moment(),
    };
    this.onSelectDate = this.onSelectDate.bind(this);
    this.submitDate = this.submitDate.bind(this);
  }

  onSelectDate(selectedDate) {
    this.setState({ selectedDate });
  }

  submitDate() {
    const { onSubmitDate } = this.props;
    const { selectedDate } = this.state;
    onSubmitDate(selectedDate);
  }

  render() {
    const { selectedDate } = this.state;
    const { messages } = this.props;
    if (messages === null) return null;

    return (
      <ul>
        { messages.map( message => {
          return (
            <li key={message.id}>
              {message.from}:<br />
              {message.text}<br />
              {message.showDatepicker && <div>
                <DatePicker
                  inline
                  selected={selectedDate}
                  onChange={this.onSelectDate} />
                <br />
                <button onClick={this.submitDate}>Select Date</button>
              </div>}
            </li>
          );
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
    showDatepicker: PropTypes.bool,
  })),
  onSubmitDate: PropTypes.func.isRequired,
}

export default ChatDisplay;
