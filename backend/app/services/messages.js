module.exports = {
  getGreeting: () => {
    return {
      messageText: 'When would you like to book an appointment?',
      showDatepicker: true,
    };
  },

  getDateReply: () => {
    return {
      messageText: 'I have made an appointment for: ',
    };
  },

  getDateText: (date) => {
    return {
      messageText: date.format('LL') + ' at ' + date.format('LT'),
    };
  },

  getUnavailable: () => {
    return {
      messageText: 'Sorry, that time slot is not available, please try another time',
      showDatepicker: true,
    };
  },

  getFinalReply: () => {
    return {
      messageText: 'I have made the following appointments: ',
    };
  },
}