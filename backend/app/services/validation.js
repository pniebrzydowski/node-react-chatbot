const moment = require('moment');

module.exports = (db) => {
  return {
    isSlotAvailable: (selectedDate) => {
      const taken = db.appointments.findIndex( appt => {
        console.log(selectedDate);
        console.log(appt);
        return selectedDate.isSame(appt);
      });
      return taken === -1;
    },
  }
};
