import { SendDataToServer } from "./fetch.js";
import { isLoggedIn,preloaderScrollbar } from "./utils/utils.js";

let logout = document.querySelector("#logoutBtn"); 

const loginSuccess = () => {
    const attendanceAddForm = document.getElementById("add-attendance");
    const attendanceDeleteForm = document.getElementById("delete-attendance");
    let alertAddPresent = document.querySelector(".alertAddPresent");
    let alertDeletePresent = document.querySelector(".alertDeletePresent");

    const alertMsg = (name, msg) => {
      name.innerHTML = `${msg}`;
      setTimeout(() => {
        name.innerHTML = ``;
        attendanceDeleteForm.reset();
        attendanceAddForm.reset();
      }, 3000);
    };

    attendanceAddForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let formData = new FormData(attendanceAddForm);

      let formObj = {};
      for (const [key, value] of formData) {
        formObj[key] = value;
      }

      SendDataToServer("add-attendance", formObj).then((data) => {
        if (data.type === "addPresent_done") {
          alertMsg(alertAddPresent, `<b style="color: green">Data Added Successfully</b>`);
        } else {
          alertMsg(alertAddPresent,`<b style="color: red">Not Found!!! Try again with correct data...</b>`);
        }
        console.log(data);
      });
    });

    attendanceDeleteForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let formData = new FormData(attendanceDeleteForm);
      let formObj = {};
      for (const [key, value] of formData) {
        formObj[key] = value;
      }

      SendDataToServer("delete-attendance", formObj).then((data) => {
        if (data.type === "deletePresent_done") {
          alertMsg(alertDeletePresent, `<b style="color: green">Data Deleted Successfully</b>`);
        } else {
          alertMsg(alertDeletePresent,`<b style="color: red">Not Found!!! Try again with correct data...</b>`);
        }
        console.log(data);
      });
    });
}

isLoggedIn(loginSuccess, logout);
preloaderScrollbar();
