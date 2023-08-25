import { GetDataFromServer } from "./fetch.js";
import { preloaderScrollbar, isLoggedIn,PrintDocuments } from "./utils/utils.js";

let database = await GetDataFromServer();
let logout = document.querySelector("#logoutBtn");
let showReport = document.querySelector(".showReport");    
let dailyReport = document.querySelector("#generateDailyReportBtn");    
let monthlyReport = document.querySelector("#generateMonthlyReportBtn");    
let weeklyReport = document.querySelector("#generateWeeklyReportBtn");    
let daily = document.querySelector("#daily");    
let month = document.querySelector("#month");    
let week = document.querySelector("#week");   




dailyReport.addEventListener("click", (event) => {
  event.preventDefault();
  let selectedDate = new Date(daily.value).toLocaleDateString("en-GB");
  console.log(
    "daily btn clicked!",
    selectedDate,
    new Date(database[0].present_date).toLocaleDateString("en-GB")
  );

  let filteredData = database.filter((user) => {
    return (
      new Date(user.present_date).toLocaleDateString("en-GB") === selectedDate
    );
  });

  console.log(filteredData)
  showReport.innerHTML = "";
  if (filteredData.length===0) {
   showReport.innerHTML = `<div class="tbl-content">
                                <table cellpadding="0" cellspacing="0" border="0">
                                    <tbody class="dailyList">
                                      <tr><td colspan="6">No employee were present in this date!</td></tr>
                                    </tbody>
                                </table>
                            </div>
                          `; 
  } else {
     showReport.innerHTML = `
                            <h1>Present List of ${selectedDate} </h1>
                            
                            <div class="tbl-header">
                                <table cellpadding="0" cellspacing="0" border="0">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Dept./Sector</th>
                                            <th>Phone</th>
                                            <th>Role</th>
                                            <th>Join Time</th>
                                            <th>Exit Time <button><i class="gg-printer"></button></th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <div class="tbl-content">
                                <table cellpadding="0" cellspacing="0" border="0">
                                    <tbody class="dailyList">
                                    </tbody>
                                </table>
                            </div>
                          `;
    
    
  }

  for (let user of filteredData) {
    let dailyList = document.querySelector(".dailyList");    
    dailyList.innerHTML += `                        
                            <tr>
                              <td>${user.id}</td>
                              <td>${user.name}</td>
                              <td>${user.dept_name}</td>
                              <td>${user.phone}</td>
                              <td>${user.role}</td>
                              <td>${user.join_time}</td>
                              <td>${user.exit_time}</td>
                            </tr>        
                          `;
  }
  let css = ` <link rel="stylesheet" href="../css/admin.css">
              <link rel="stylesheet" href="../css/report.css">
              <link rel="stylesheet" type="text/css" href="../css/dashboard.css">
            `;
  PrintDocuments('.gg-printer',css, showReport);
});

// weeklyReport.addEventListener("click", (event) => {
//   event.preventDefault();
//   let selectedDate = week.value;
//   console.log("weekly btn clicked!",selectedDate);

// });

// monthlyReport.addEventListener("click", (event) => {
//   event.preventDefault();
//   let selectedDate = month.value;
//   console.log("monthly btn clicked!",selectedDate);

// });

// async function getTodayAttendance(database) {
//   for (let user of database) {
//     let today = dateTime.today;
//     let userDate = user.present_date
//       ? new Date(user.present_date).toLocaleDateString("en-GB")
//       : null;
//     if (today === userDate && user.status == true) {
//       todayUserLength++;
//       console.log(user.present_date);
//       let element = document.createElement("tr");
//       element.innerHTML = `<td>${user.id}</td>
//                                 <td>${user.name}</td>
//                                 <td>${user.join_time}</td>
//                                 <td>${user.exit_time}</td>
//                                 <td>${user.dept_name}</td>
//                                 <td>
//                                     <i class="gg-remove"></i><i class="gg-undo"></i>
//                                 </td>
//                                `;
//       todayList.appendChild(element);
//     }
//   }
//   // noUserAlert();
// }

const loginSuccess = () => {

}
isLoggedIn(loginSuccess, logout);
preloaderScrollbar();