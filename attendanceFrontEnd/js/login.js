import { dateTime } from "./getDateTime.js";
import { preloaderScrollbar } from "./utils/utils.js";
import { SendDataToServer,GetDataFromServer } from "./fetch.js";
import { getOverallAttendance,getTodayAttendance } from "./getAttendance.js";

const form = document.getElementById('myForm');
const adminPanel = document.getElementById('adminPanel');
export let todayList = document.querySelector('.todayList');       
let logout = document.querySelector('#logoutBtn');
export  let overAll = document.querySelector('.overall');
export  let presentToday = document.querySelector('.presentToday');
export  let presentOverall = document.querySelector('.presentOverall');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let formData = new FormData(form);

    let formObj = {};
    for (const [key, value] of formData) {
        formObj[key] = value;
    }
    
    SendDataToServer('admin',formObj)
    .then(data => {
        //is login successful
        if(data.name === 'admin') {
            localStorage.setItem("isLoggedIn", "yes");
            loggedIn() ;
        } else {
            let alertLogin = document.querySelector('.alertLogin');
            alertLogin.innerHTML =`Something Went Wrong! TRY Again...`;
        } 
    });
});


function loggedIn() {
        let container = document.querySelector('.container');
        let cssLink = document.querySelector("link[href='./css/login.css']");
        if(cssLink) {
            cssLink.parentNode.removeChild(cssLink);
        }

        let link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "./css/dashboard.css";
        document.getElementsByTagName("head")[0].appendChild(link);
        container.style.display = 'none';
        adminPanel.style.visibility = 'visible';

        logout.addEventListener('click',()=>{
            // localStorage.clear();
            localStorage.removeItem("isLoggedIn");
            location.reload();
            console.log('logout successful')
        })
        
        async function getAttendance() {
            let database = await GetDataFromServer();
            getOverallAttendance(database);
            getTodayAttendance(database);            
        }
        getAttendance();
}

if (localStorage.isLoggedIn === 'yes') {
    console.log('local storage ok')
    loggedIn();
}

preloaderScrollbar();