import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import styled from 'styled-components';

import 'react-datepicker/dist/react-datepicker.css';

const DatepickerContainer = styled.div`
  margin: 10px 0;

  .react-datepicker {
    display: inline-block;
  }

  .react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range,
  .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--selected {
    background: linear-gradient(to bottom, #ee5457, #f13134);
    color: white;
    font-weight: bold;
  }
`;

const SelectButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  background: linear-gradient(0deg, #444, #343434, #444);
  border-radius: 5px;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  margin-top: 5px;
  cursor: pointer;
`;

class Datepicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: moment().add(1, 'days').seconds(0).milliseconds(0),
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
    setTimeout(() => {onSubmitDate(selectedDate)}, 100);
  }

  render() {
    const { selectedDate, visible } = this.state;
    if (!visible) return null;
    return (
      <DatepickerContainer>
        <DatePicker
          inline
          showTimeSelect
          timeFormat="HH:mm"
          minDate={moment().add(1, 'days')}
          selected={selectedDate}
          onChange={this.onSelectDate} />
        <SelectButton onClick={this.submitDate}>Select Date</SelectButton>
      </DatepickerContainer>
    );
  }
}

Datepicker.propTypes = {
  onSubmitDate: PropTypes.func.isRequired,
}

export default Datepicker;
