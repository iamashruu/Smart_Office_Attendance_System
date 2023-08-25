import { dateTime } from "./getDateTime.js";
import { GetDataFromServer, SendDataToServer } from "./fetch.js";
import { Reloader } from "./utils/utils.js";
import { isInsertBefore,addLocalStorage } from "./localStorage.js";

let card = document.querySelector('.card');

const sendingData = (timeName,msg) => {
  card.textContent =`${msg}`;       
  Reloader(7);
}
const sendingDataPost = async (user,timeName,typeName,msg) => {
  let formObj = {
                "present_date": dateTime.today,
                "id": user.id,  
                "time": dateTime.time,
                // "entry_name": user.join_time ? (user.exit_time ? 'done' : 'exit_time') : 'join_time'
                "entry_name": timeName
              }; 
  SendDataToServer('id',formObj)
  .then(data => {
    if(data.type==`${typeName}`){
      card.textContent =`${msg}`;
      Reloader(7);
    }    
  });
}

GetDataFromServer().then(database => { 
  console.log(database)

  function userPresentLength(user) {
    let arr = [];
    for (const employee of database) {
      if (employee.status === true) {
        arr.push(employee);
      }
    }
    arr = arr.filter(e => e.id == user.id && user.status == true);
    return arr.length;
  }

  let scanner = new Instascan.Scanner({ video: document.getElementById('preview'), mirror: false });
  Instascan.Camera.getCameras().then(function (cameras) {
    if(cameras.length > 0){
        scanner.start(cameras[0]);
    } else {
        console.error("Please enable Camera!");
    }
  }).catch(function (e) {
      Reloader(1);
      console.error(e);
  }); 
    
  scanner.addListener('scan', function (content) {
      console.log(content,typeof content)
  try{
    let getData = JSON.parse(content);
    // console.log(typeof getData.ID) //string input data
    let myArr = []; //let count =0;

    for(let user of database) {
      let today = dateTime.today;
      let userDate = user.present_date ? new Date(user.present_date).toLocaleDateString('en-GB') : null;
      user.id = `${user.id}`;

      if(getData.ID===`${user.id}`){
        userDate == null ? userDate = 'null' : userDate;
        console.log(today,userDate,user.present_date);
        if((today===userDate) && (user.status==true)  && user.join_time!==null && user.exit_time!==null){
          sendingData('time',`${user.name},Already your present done. Come back next day again!`);
        } else if ((userDate == 'null') && (user.status !== true) && user.join_time == null) {
          if(!isInsertBefore(today,user)) {
              sendingDataPost(user,'join_time','join_time_ok',`${user.name},go to work and come back again before leaving office for completing attendance.`);
              addLocalStorage(today,user);  
          }
        }else if((today===userDate) && (user.status!==true) && user.join_time!==null && user.exit_time==null){
          sendingDataPost(user,'exit_time','exit_time_ok',`${user.name},your present done. Come back next day again!`);
        } else {
          //inserting today attendance as no id and date match 
          if (user.present_date && userDate!==today && user.status === true) {
            myArr.push({ "userDate": userDate, "status": user.status });
          }
        }

        if((userPresentLength(user))===myArr.length && user.present_date!==today && !isInsertBefore(today,user)){
            // count++;
            if(user.status==false && user.exit_time==null){
              // console.log('exiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiitttttttttttttttttttttt')
            }else {
                // Insert a new attendance record for the employee with the desired date
                sendingDataPost(user,'join_time','join_time_ok',`${user.name},go to work and come back again before leaving office for completing attendance.`);
                addLocalStorage(today, user);
            }
        } 
      }
      else {
        // console.log('its not working and false')
      }
    };
      
    if(!getData.ID) {
      card.textContent = `Invalid or Not Found!`;
      Reloader(5);
    }     
  } catch (e) {
      card.textContent =`Invalid or Not Found!${e}`;
      Reloader(5);
    }
  }); 
});

// Reloader(10);
