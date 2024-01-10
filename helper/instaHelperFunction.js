
module.exports = {

  formatePoostedOnDate: (unixTimestamp) => {
    const convertedDate = new Date(unixTimestamp * 1000);
    const formattedTime = convertedDate.toISOString().replace('T', ' ').replace(/\.\d+Z$/, '');
    return formattedTime;
  },
};
