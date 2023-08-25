import { GetDataFromServer, SendDataToServer } from "./fetch.js";
import { preloaderScrollbar,isLoggedIn,Reloader, PrintDocuments } from "./utils/utils.js";

let database = await GetDataFromServer();

const getAllEmployee = (database,overAll) => {
  // Create a Set to store unique IDs
  let uniqueIds = new Set();
  for (let user of database) {
    // Add the user's ID to the Set if it's not already there
    uniqueIds.add(user.id);
  }

  // Loop through the unique IDs
  for (let id of uniqueIds) {
    // Find the user with the current ID in the database
    let user = database.find((user) => user.id === id);
    // Create a row for the table
    let overall = document.createElement("tr");
    overall.innerHTML = `<td contenteditable="true">${user.id}</td>
                          <td contenteditable="true">${user.name}</td>
                          <td contenteditable="true">${user.dept_name}</td>
                          <td contenteditable="true">${user.phone}</td>
                          <td contenteditable="true">${user.role}</td>
                          <td><i class="gg-close-o"></i><i class="gg-edit-markup"></i></td>
                      `;
    overAll.appendChild(overall);
    } 
    
    overAll.addEventListener("click", (event) => {
       event.preventDefault();
       if (event.target.classList.contains("gg-close-o")) {
         //  for delete from database
          let userId =
           event.target.parentElement.parentElement.firstChild.textContent;
          console.log(typeof userId);
          let deletedUser = database.find((user) => user.id === +userId);
          SendDataToServer("deleteEmployee", deletedUser).then((data) => {
            console.log(data);
            if (data.type == "deleteEmployee_done") {
              event.target.parentElement.parentElement.remove(); // for delete from ui
            }
          });
       }
        if (event.target.classList.contains("gg-edit-markup")) {
           let target = event.target.parentElement.parentElement;
           let id = target.firstChild.textContent;
           let name = target.children[1].textContent;
           let dept_name = target.children[2].textContent;
           let phone = target.children[3].textContent;
           let role = target.children[4].textContent;
           console.log(id, name, dept_name, phone, role);
           let updatedUser = { id, name, dept_name, phone, role };
           SendDataToServer("updateEmployee", updatedUser).then((data) => {
             console.log(data);
           });
       }
    });
};

let logout = document.querySelector("#logoutBtn");

const loginSuccess = () => {
  const employeeAddForm = document.getElementById("employeeAdd");

  let alertAddPresent = document.querySelector(".alertAddPresent");
  let openForm = document.querySelector(".open-button");
  let closeForm = document.querySelector(".cancel");
  let overAll = document.querySelector(".overall");

  openForm.addEventListener('click', e => {
      e.preventDefault();
      document.getElementById("employeeForm").style.display = "block";
  });

  closeForm.addEventListener('click', e => {
      e.preventDefault();
      document.getElementById("employeeForm").style.display = "none";
  });

  getAllEmployee(database, overAll);

  const alertMsg = (name, msg) => {
    name.innerHTML = `${msg}`;
    setTimeout(() => {
      name.innerHTML = ``;
      employeeAddForm.reset();
      Reloader(0);
    }, 3000);
  };

  employeeAddForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let formData = new FormData(employeeAddForm);

    let formObj = {};
    for (const [key, value] of formData) {
      formObj[key] = value;
    }

    SendDataToServer("addEmployee", formObj).then((data) => {
      if (data.type === "addEmployee_done") {
        alertMsg(
          alertAddPresent,
          `<b style="color: black">Data Added Successfully</b>`
        );
      } else {
        alertMsg(
          alertAddPresent,
          `<b style="color: red">Error!!! Try again with correct data...</b>`
        );
      }
      console.log(data);
    });
  });

  let employeeTable = document.querySelector('.employee');
  let employeeTable2 = document.querySelector('.employee2');
  let css = ` <link rel="stylesheet" href="../css/admin.css">
              <link rel="stylesheet" href="../css/dashboard.css">
              <link rel="stylesheet" href="../css/employee.css">
            `;
  PrintDocuments('.gg-printer', css,employeeTable,employeeTable2);
};

isLoggedIn(loginSuccess, logout);
preloaderScrollbar();


