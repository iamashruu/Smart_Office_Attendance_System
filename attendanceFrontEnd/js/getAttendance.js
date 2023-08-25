import { dateTime } from "./getDateTime.js";
import { SendDataToServer } from "./fetch.js";
import { PrintDocuments } from "./utils/utils.js";
import { todayList, overAll,presentOverall,presentToday } from "./login.js";

let todayUserLength = 0;
let deletedUsers = [];
let css = ` <link rel="stylesheet" href="../css/admin.css">
                <link rel="stylesheet" type="text/css" href="../css/dashboard.css">
          `;
let noUserAlert = async (button = '') => {
    if (todayList.innerHTML === '') {
        if (button != '') {
           todayList.innerHTML = `<tr><td colspan="6">No users present today ${button}</td></tr>`;
        } else {
            todayList.innerHTML = `<tr><td colspan="6">No users present today</td></tr>`;
        }
    }
}

export async function getOverallAttendance(database) {
    let attendance = {};
  
    for (const user of database) {
        if (user.status === true && user.join_time !== null && user.exit_time !== null) {
          if (attendance[user.id]) {
            attendance[user.id].total_days_present++;
          } else {
            attendance[user.id] = {
              name: user.name,
              dept_name: user.dept_name,
              salary: user.salary,
              role: user.role,
              phone: user.phone,
              total_days_present: 1,
            };
           }
        }else {
            if (attendance[user.id]) {
                attendance[user.id].total_days_present= 0;
            } else {
                attendance[user.id] = {
                  name: user.name,
                  dept_name: user.dept_name,
                  salary: user.salary,
                  role: user.role,
                  phone: user.phone,
                  total_days_present: 0
            };
         }
        }
    }
  
    for (const id in attendance) {
        console.log(`ID: ${id} Name: ${attendance[id].name}  ${attendance[id].total_days_present} days present`);
        let overall = document.createElement('tr')   
        overall.innerHTML =`<td>${id}</td>
                            <td>${attendance[id].name}</td>
                            <td>${attendance[id].dept_name}</td>
                            <td>${attendance[id].phone}</td>
                            <td>${attendance[id].role}</td>
                            <td>${attendance[id].total_days_present} days</td>
                        `;
        overAll.appendChild(overall);
    }
    PrintDocuments('.printOverall',css,presentOverall)    
}

export async function getTodayAttendance(database) {
    for(let user of database) { 
        let today = dateTime.today;
        let userDate = user.present_date ? new Date(user.present_date).toLocaleDateString('en-GB') : null;
        if (today === userDate && user.status == true) {
            todayUserLength++;
            console.log(user.present_date);
            let element = document.createElement('tr')
            element.innerHTML =`<td>${user.id}</td>
                                <td>${user.name}</td>
                                <td>${user.join_time}</td>
                                <td>${user.exit_time}</td>
                                <td>${user.dept_name}</td>
                                <td>${user.role}</td>
                                <td>
                                    <i class="gg-remove"></i><i class="gg-undo"></i>
                                </td>
                               `;
            todayList.appendChild(element);     
        } 
    }
    noUserAlert();  

    todayList.addEventListener('click', (event) => {
        event.preventDefault();
         if (event.target.classList.contains('gg-remove')) {
            //  for delete from database
                let userId = event.target.parentElement.parentElement.firstChild.textContent;
                let deletedUser = database.find(user => user.id === +userId);
                deletedUser.present_date = dateTime.today;
                deletedUsers.push(deletedUser);
                SendDataToServer('deletePresent', deletedUser)
                .then(data => {
                    console.log(data); 
                    if(data.type=='deletePresent_done'){
                        event.target.parentElement.parentElement.remove();  // for delete from ui
                        noUserAlert(`<i class="gg-undo" style="margin-left: 82vw"></i>`);
                    }    
                });
            } 
            if (event.target.classList.contains('gg-undo')) {
                if (deletedUsers.length === todayUserLength) {
                    todayList.innerHTML = '';
                }
                if (deletedUsers.length > 0) {
                    // for add it into database
                    let userToAddBack = deletedUsers.pop();
                    SendDataToServer('addPresent', userToAddBack)
                    .then(data => {
                        console.log(data); 
                        if(data.type=='addPresent_done'){
                             // Add the user back to the UI
                            let element = document.createElement('tr');
                            element.innerHTML = `<td>${userToAddBack.id}</td>
                                                <td>${userToAddBack.name}</td>
                                                <td>${userToAddBack.join_time}</td>
                                                <td>${userToAddBack.exit_time}</td>
                                                <td>${userToAddBack.dept_name}</td>
                                                <td>${userToAddBack.role}</td>
                                                <td>
                                                    <i class="gg-remove"></i><i class="gg-undo"></i>
                                                </td>
                                                `;
                            todayList.appendChild(element); 
                        }    
                    });
                }   
            } 
    });
    PrintDocuments('.printToday',css, presentToday);
}


