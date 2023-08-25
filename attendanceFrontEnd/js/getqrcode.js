import { GetDataFromServer} from "./fetch.js";
import { preloaderScrollbar, isLoggedIn } from "./utils/utils.js";


let database = await GetDataFromServer();
let logout = document.querySelector("#logoutBtn");
let qrAlert = document.querySelector(".qrAlert");
let qrContainer = document.getElementById("qrcode-container");
let qrBox = document.querySelector(".qrbox")

const loginSuccess = () => {
  let QR = document.querySelector(".generateQR");
  QR.addEventListener("click", (e) => {
    qrContainer.style.display = "none";
    let id = document.getElementById("id").value;
    let uniqueIds = new Set();

    for (let user of database) {
      // Add the user's ID to the Set if it's not already there
      uniqueIds.add(user.id);
    }

    console.log(uniqueIds);
    let userFound = 0;
    // Loop through the unique IDs
    for (let unqid of uniqueIds) {
      if (unqid == id) {
        userFound = 1;
        // Find the user with the current ID in the database
        let employee = database.find((user) => user.id === +id);
        // console.log(employee);
        console.log("test", id);
        // Fetch user data from the database using the ID
        let qrcodeContainer = document.getElementById("qrcode");
        qrcodeContainer.innerHTML = "";
        let qrcodeData = {
          ID: id,
          Name: employee.name,
          Phone: employee.phone,
        };
        new QRCode(qrcodeContainer, JSON.stringify(qrcodeData));
        console.log(qrcodeData);
        qrContainer.style.display = "block";
        qrAlert.innerHTML = `<b style="color:white">Name: ${qrcodeData.Name}</b>`;
        document.getElementById(
          "downloadLink"
        ).download = `${qrcodeData.ID}_${qrcodeData.Name}.png`;
        document.getElementById("downloadLink").href =
          qrcodeContainer.children[0].toDataURL();
        break;
      }
    }

    if (userFound === 0) {
      qrAlert.innerHTML = `<b style="color: red">Not Found!!! Try with correct data...</b>`;
      setTimeout(() => {
        qrAlert.innerHTML = ``;
        qrBox.reset();
      }, 3000);
      //  Reloader(3);
    }
  });
  const idInput = document.getElementById("id");

  // Add event listener for "keypress" event
  idInput.addEventListener("keypress", (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.querySelector(".generateQR").click();
    }
  });

}

isLoggedIn(loginSuccess, logout);
preloaderScrollbar();
