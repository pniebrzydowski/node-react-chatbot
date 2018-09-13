import React, { Component } from 'react';
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
    const result = await this.get('greeting');
    this.addMessages('bot', result.messages);
  }

  async resetApp() {
    this.setState({ messages: [] });
    const result = await this.get('reset');
    this.addMessages('bot', result.messages);
  }

  async get(url) {
    const response = await fetch('http://localhost:8000/' + url);
    const result = await response.json();
    return result;
  }
  async post(url, data) {
    const response = await fetch('http://localhost:8000/' + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(data)
    });
    const json = await response.json();
    return json;
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
    const result = await this.post('message', jsonData);
    this.addMessages('user', result.messages);
  }

  async sendDate(date) {
    const jsonData = {
      selectedDate: date,
    };
    const result = await this.post('appointment', jsonData);
    this.addMessages('bot', result.messages);
  }

  addMessages(from, newMessages) {
    const { messages } = this.state;
    let id = messages.length;

    newMessages.forEach(message => {
      messages.push({
        id: id,
        from: from,
        text: message.messageText,
        showDatepicker: message.showDatepicker,
      });
      id++;
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
