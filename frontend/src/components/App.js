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
  }

  componentDidMount() {
    this.fetchResults();
  }

  async fetchResults() {
    const response = await fetch('http://localhost:8000/greeting');
    const json = await response.json();
    const { messages } = this.state;
    messages.push({
      id: messages.length,
      from: 'bot',
      text: json.messageText,
    });
    this.setState({ messages });
  }

  sendMessage(message) {
    const jsonData = {
      messageText: message,
    };
    this.postMessage(jsonData);
  }

  async postMessage(data) {
    await fetch('http://localhost:8000/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(data)
    });
    const { messages } = this.state;
    messages.push({
      id: messages.length,
      from: 'user',
      text: data.messageText,
    });
    this.setState({ messages });
  }

  render() {
    const { messages } = this.state;
    return (
      <main>
        <ChatDisplay messages={messages} />
        <ChatForm onSubmit={this.sendMessage} />        
      </main>
    );
  }
}

export default App;
