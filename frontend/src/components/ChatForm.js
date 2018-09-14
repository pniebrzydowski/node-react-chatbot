import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FormContainer = styled.section`
  flex: 0 0 auto;
  display: flex;
  font-size: 20px;

  textarea {
    flex: 1 1 auto;
    padding: 10px;
    min-height: 100px;
  }

  button {
    padding: 30px;
    background: linear-gradient(0deg, #444, #343434, #444);
    color: white;
    font-weight: bold;
    text-transform: uppercase;
    border-left: 2px solid #000;
  }
`;

class ChatForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
    this.submit = this.submit.bind(this);
    this.change = this.change.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  keyPress(e) {
    if(e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      this.submit(e);
    }
  }
  change(e) {
    const message = e.target.value;
    this.setState({ message });
  }
  submit(e) {
    // throttling would be good here
    const { message } = this.state;
    if (message === '') return;
    const { onSubmit } = this.props;
    e.preventDefault();
    this.setState({ message: '' });
    onSubmit(message);
  }

  render() {
    const { message } = this.state;

    return (
      <form onSubmit={this.submit}>
        <FormContainer>
          <textarea type="text" name="messageInput"
            value={message} onChange={this.change} onKeyDown={this.keyPress} />
          <button type="submit">Send</button>
        </FormContainer>
      </form>
    );
  }
}

ChatForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default ChatForm;
