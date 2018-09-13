import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class Datepicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: moment(),
      visible: true,
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
    this.setState({visible: false});
    setTimeout(() => {onSubmitDate(selectedDate)}, 200);
  }

  render() {
    const { selectedDate, visible } = this.state;
    if (!visible) return null;
    return (
      <div>
        <DatePicker
          inline
          showTimeSelect
          timeFormat="HH:mm"              
          selected={selectedDate}
          onChange={this.onSelectDate} />
        <br />
        <button onClick={this.submitDate}>Select Date</button>
      </div>
    );
  }
}

Datepicker.propTypes = {
  onSubmitDate: PropTypes.func.isRequired,
}

export default Datepicker;