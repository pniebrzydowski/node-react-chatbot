module.exports = {
  getGreeting: () => {
    return {
      messageText: 'When would you like to book an appointment?',
      showDatepicker: true,
    };
  },

  getDateReply: (selectedDate) => {
    return {
      messageText: 
        'I have made an appointment for ' +
        selectedDate.format('LL') + ' at ' + selectedDate.format('LT'),
    };
  }
}