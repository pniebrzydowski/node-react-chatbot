import React, { Component } from 'react';
import moment from 'moment';
import ajaxService from '../services/ajax';

import './App.css';
import ChatDisplay from './ChatDisplay';
import ChatForm from './ChatForm';

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
    const result = await ajaxService.get('greeting');
    if (result.status === 200) {
      this.addMessages('bot', result.messages);
    }
  }

  async resetApp() {
    this.setState({ messages: [] });
    const result = await ajaxService.get('reset');
    if (result.status === 200) {
      this.addMessages('bot', result.messages);
    }
  }

  onSubmitMessage(message) {
    if (message.toLowerCase().replace(/ /g, '').includes('reset')) {
      this.resetApp();
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
    let timestamp = moment();

    newMessages.forEach(message => {
      messages.push({
        timestamp: timestamp,
        from: from,
        text: message.messageText,
        showDatepicker: message.showDatepicker,
      });
    });
    this.setState({ messages });
  }

  render() {
    const { messages } = this.state;
    return (
      <main>
        <ChatDisplay messages={messages} onSubmitDate={this.sendDate} />
        <ChatForm onSubmit={this.onSubmitMessage} />        
      </main>
    );
  }
}

export default App;
