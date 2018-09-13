import React, { Component } from 'react';
import './App.css';
import ChatDisplay from './ChatDisplay';

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    }
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

  render() {
    const { messages } = this.state;
    return (
      <ChatDisplay messages={messages} />
    );
  }
}

export default App;
