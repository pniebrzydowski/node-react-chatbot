import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChatForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
    this.submit = this.submit.bind(this);
    this.change = this.change.bind(this);
  }

  change(e) {
    const message = e.target.value;
    this.setState({ message });
  }
  submit(e) {
    const { message } = this.state;
    const { onSubmit } = this.props;
    e.preventDefault();
    this.setState({ message: '' });
    onSubmit(message);
  }

  render() {
    const { message } = this.state;

    return (
      <form onSubmit={this.submit}>
        <input type="text" name="messageInput" value={message} onChange={this.change} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

ChatForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default ChatForm;
