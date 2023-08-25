let getDateTime = () => {
    const date = new Date();
    // const currentDate = date.getDate();
    // const currentMonth = date.getMonth() + 1; // the getMonth() method returns a zero-based value, so we need to add 1 to get the correct month
    const currentDate = ("0" + date.getDate()).slice(-2);
    const currentMonth = ("0" + (date.getMonth() + 1)).slice(-2);
    const currentYear = date.getFullYear();
    const currentHours = date.getHours();
    const currentMinutes = date.getMinutes();
    const currentSeconds = date.getSeconds();

    return {
      // today: `01/01/2023`,
      today: `${currentDate}/${currentMonth}/${currentYear}`,
      time: `${currentHours}:${currentMinutes}:${currentSeconds}`
    }
}
export let dateTime = getDateTime();

// console.log(getDateTime())
// console.log(dateTime.today,dateTime.time);
// export {dateTime};