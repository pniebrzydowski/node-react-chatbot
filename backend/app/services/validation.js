const moment = require('moment');

module.exports = (db) => {
  return {
    isSlotAvailable: (selectedDate) => {
      const taken = db.appointments.findIndex( appt => {
        return selectedDate.isSame(appt);
      });
      return taken === -1;
    },

    isFinalSelection: () => {
      return db.appointments.length === 2;
    },
  }
};
