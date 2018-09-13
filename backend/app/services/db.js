module.exports = (db) => {
  return {
    addAppointment: (selectedDate) => {
      db.appointments.push( selectedDate );
    },

    clear: () => {
      db.appointments = [];
    }
  }
};
