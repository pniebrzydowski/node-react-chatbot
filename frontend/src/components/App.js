import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';

import ajaxService from '../services/ajax';
import ChatDisplay from './ChatDisplay';
import ChatForm from './ChatForm';

const AppContainer = styled.main`
  box-sizing: border-box;
  background: linear-gradient(-32deg, #ededed, #dedede, #fff);
  border: 2px ridge #444;
  border-radius: 8px;
  flex: 1 1 100%;
  display: flex;
  flex-direction: column;
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    }
    this.onSubmitMessage = this.onSubmitMessage.bind(this);
    this.sendDate = this.sendDate.bind(this);
  }

  componentDidMount() {
    this.getGreeting();
  }

  async getGreeting() {
    this.setState({ messages: [] });
    const result = await ajaxService.get('greet');
    if (result.status === 200) {
      this.addMessages('bot', result.messages);
    }
  }

  onSubmitMessage(message) {
    const adjustedMessage = message.toLowerCase().replace(/ /g, '');
    if (
      adjustedMessage.includes('reset') ||
      adjustedMessage.includes('startover') ||
      adjustedMessage.includes('restart') ||
      adjustedMessage.includes('clear')
    ) {
      this.getGreeting();
      return;
    }

    this.sendMessage(message);
  }

  async sendMessage(message) {
    const jsonData = {
      messageText: message,
    };
    const result = await ajaxService.post('message', jsonData);
    if (result.status === 200) {
      this.addMessages('user', [jsonData]);
    }
  }

  async sendDate(date) {
    const jsonData = {
      selectedDate: date,
    };
    const result = await ajaxService.post('appointment', jsonData);
    if (result.status === 200) {
      this.addMessages('bot', result.messages);
    }
  }

  addMessages(from, newMessages) {
    const { messages } = this.state;
    const content = [];
    let timestamp = moment();
    let showDatepicker = false;

    newMessages.forEach(message => {
      content.push(message.messageText);
      if (message.showDatepicker) showDatepicker = true;
    });
    messages.push({
      timestamp: timestamp,
      from: from,
      text: content,
      showDatepicker: showDatepicker,
    });
    this.setState({ messages });
    window.scrollTo(0,document.body.scrollHeight);
  }

  render() {
    const { messages } = this.state;
    return (
      <AppContainer>
        <ChatDisplay messages={messages} onSubmitDate={this.sendDate} />
        <ChatForm onSubmit={this.onSubmitMessage} />        
      </AppContainer>
    );
  }
}

export default App;
