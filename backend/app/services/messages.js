const messageGroups = {
  greeting: {
    texts: [
      'When would you like to book an appointment?',
      'What time do you want to schedule an appointment?',
      'At what time should I book you an appointment?',
      'When should I book you?',
      'When would you like me to book?',
      'When can I book you an appointment?',
      'When is a good time for you?',
    ],
    showDatepicker: true,
  },

  dateReply: {
    texts: [
      'I have made an appointment for ',
      'Great, I have you down for ',
      'Your appointment is confirmed for ',
      'See you on ',
      'Your appointment is booked for ',
      'I have you booked for ',
    ],
  },

  unavailable: {
    texts: [
      'Sorry, that time slot is not available, please try another time',
      'Unfortunately, that time is already booked, please try again',
      'Sorry, but the time is already taken, try another time please',
      'The time you have chosen is not available, select another time slot',
      'Unfortunately, that time slot is unavailable. Please select a different time',
    ],
    showDatepicker: true,
  },

  finalReply: {
    texts: [
      'I have made the following appointments: ',
      'I have you down for the following three times ',
      'Your three appointments are shown below: ',
      'Here are your appointment times: ',
      'Here are your three appointments: ',
      'Your appointment times are: '
    ],
  },

  thankYou: {
    texts: [
      'Thank you for using our scheduling service, please send "reset" to start over',
      'Thanks for taking the time to schedule your appointments with us. You can start over by typing "reset"',
      'Thanks for scheduling with me! Start another session by entering "reset"',
      'Thanks for making your appointments with me. You can choose new appointments by sending "reset"',
    ],
  }
};

module.exports = {
  getRandomMessage: (key) => {
    const group = messageGroups[key];
    const messageLength = group.texts.length;
    const index = Math.floor((Math.random() * messageLength));
    return {
      messageText: group.texts[index],
      showDatepicker: group.showDatepicker,
    }
  },

  getDateText: (date) => {
    return {
      messageText: date.format('LL') + ' at ' + date.format('LT'),
    };
  },
}
