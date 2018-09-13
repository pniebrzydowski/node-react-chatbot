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
      showDatepicker: json.showDatepicker,
    });

    this.setState({ messages });
  }

  sendMessage(message) {
    const jsonData = {
      messageText: message,
    };
    const json = this.post(jsonData);

    const { messages } = this.state;
    messages.push({
      id: messages.length,
      from: 'user',
      text: json.messageText,
    });
    this.setState({ messages });
  }

  sendDate(date) {
    const jsonData = {
      selectedDate: date,
    };
    this.post('appointment', jsonData);
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
