module.exports = {
  now: () => {
    const currentDate = new Date().toLocaleString([], {
      timeZone: "Asia/Jakarta",
      hour12: false
    });

    return currentDate.replace(",", "");
  }
};
