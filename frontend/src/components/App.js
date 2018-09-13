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
    this.sendMessage = this.sendMessage.bind(this);
    this.sendDate = this.sendDate.bind(this);
  }

  componentDidMount() {
    this.getGreeting();
  }

  async getGreeting() {
    const result = await this.get('greeting');
    this.addMessage('bot', result);
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

  async sendMessage(message) {
    const jsonData = {
      messageText: message,
    };
    const result = await this.post('message', jsonData);
    this.addMessage('user', result);
  }

  async sendDate(date) {
    const jsonData = {
      selectedDate: date,
    };
    const result = await this.post('appointment', jsonData);
    this.addMessage('bot', result);
  }

  addMessage(from, json) {
    const { messages } = this.state;
    messages.push({
      id: messages.length,
      from: from,
      text: json.messageText,
      showDatepicker: json.showDatepicker,
    });
    this.setState({ messages });
  }

  render() {
    const { messages } = this.state;
    return (
      <main>
        <ChatDisplay messages={messages} onSubmitDate={this.sendDate} />
        <ChatForm onSubmit={this.sendMessage} />        
      </main>
    );
  }
}

export default App;
