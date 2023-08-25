import { GetDataFromServer, SendDataToServer } from "./fetch.js";
import { preloaderScrollbar, isLoggedIn, Reloader, PrintDocuments } from "./utils/utils.js";

let database = await GetDataFromServer('addLeave');
console.log(database)

const getAllLeave = (database, overAll) => {
    // Create a row for the table
    for (let user of database) {
        if (user.leave_type) {
           let overall = document.createElement("tr");
           overall.innerHTML = `<td>${user.id}</td>
                                <td>${user.name}</td>
                                <td>${user.dept_name}</td>
                                <td>${user.leave_type}</td>
                                <td>${user.leave_desc}</td>
                                <td>${new Date(user.start_date).toLocaleDateString("en-GB")}</td>
                                <td>${new Date(user.end_date).toLocaleDateString("en-GB")}</td>
                                <td>${user.days}</td>  
                                `;
           overAll.appendChild(overall); 
        }    
    }
    let leaveList = document.querySelector('.leaveList');
    let css = `<link rel="stylesheet" href="../css/admin.css">
               <link rel="stylesheet" href="../css/dashboard.css">
               <link rel="stylesheet" href="../css/attendance.css">
               `;
    PrintDocuments('.gg-printer',css, leaveList);
    
};

let logout = document.querySelector("#logoutBtn");

const loginSuccess = () => {
    const addLeaveForm = document.getElementById("addLeave");
    let alertAddLeave = document.querySelector(".alertAddLeave");
    addLeaveForm.addEventListener('submit', e => {
      e.preventDefault();
      let formData = new FormData(addLeaveForm);

      let formObj = {};
      for (const [key, value] of formData) {
        formObj[key] = value;
      }
      const startDate = document.getElementById("startDate").value;
      const endDate = document.getElementById("endDate").value;
      const numberOfDays = getNumberOfDays(startDate, endDate);
      function getNumberOfDays(startDate, endDate) {
        const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diff = Math.round(Math.abs((end - start) / oneDay));
        return diff + 1; // include both start and end dates
      }
      formObj["numberOfDays"] = numberOfDays;
      console.log(numberOfDays);

      const alertMsg = (name, msg) => {
        name.innerHTML = `${msg}`;
        setTimeout(() => {
          name.innerHTML = ``;
          addLeaveForm.reset();
          Reloader(0);
        }, 3000);
      };

      SendDataToServer("addLeave", formObj).then((data) => {
        if (data.type === "addLeave_done") {
          alertMsg(
            alertAddLeave,
            `<b style="color: black">Data Added Successfully</b>`
          );
        } else {
          alertMsg(
            alertAddLeave,
            `<b style="color: red">Error!!! Try again with correct data...</b>`
          );
        }
        console.log(data);
      });
    });

  let overAll = document.querySelector(".overall");
  getAllLeave(database, overAll);
};

isLoggedIn(loginSuccess, logout);
preloaderScrollbar();
