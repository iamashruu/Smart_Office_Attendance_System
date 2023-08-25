let todayList = document.querySelector('.st_table');
let overAll = document.querySelector('.overall');



// let _data = {
//   title: "foo",
//   body: "bar", 
//   userId:1
// }

// fetch('https://jsonplaceholder.typicode.com/posts', {
//   method: "POST",
//   body: JSON.stringify(_data),
//   headers: {"Content-type": "application/json; charset=UTF-8"}
// })
// .then(response => response.json()) 
// .then(json => console.log(json));
// .catch(err => console.log(err));

 

let getDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    
    today = dd + '/' + mm + '/' + yyyy;
    // today = '13/5/22';
    console.log('the date is:'+ today);
    return today;
  }

async function getData() {
    let url = 'http://localhost:3001';
    // let url2 = 'https://jsonplaceholder.typicode.com/todos';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
  }
  // let database;
  async  function dbs() {
    let database = await getData();
    console.log(database[0])
    return database;
  }

dbs().then(database =>{
    let userID =[];
    for(let user of database) {
      let info = {
                  "ID": `${user.userid}`,
                  "Name": `${user.username}`,
                  "presentdate": user.presentdate
      }
      userID.push(info);
      // console.log(user)
    //   console.log(getDate())
    }
    console.log(userID);
   
    userID.forEach((user)=>{
        let length = user.presentdate.length-1;
        console.log(user.presentdate[length])
        let date = getDate();
        if(date === user.presentdate[length]){
            console.log(user.ID)
            let overall = document.createElement('div')
            let element = document.createElement('div')
            element.innerHTML =` 
                                    
                                    <div class="st_row">
                                        <div class="st_column _rank">${user.ID}</div>
                                        <div class="st_column _name">${user.Name}</div>
                                        <div class="st_column _surname">${user.presentdate[length]}</div>
                                    </div>
                               `;
            overall.innerHTML =` 
                                    <div class="st_row">
                                        <div class="st_column _rank">${user.ID}</div>
                                        <div class="st_column _name">${user.Name}</div>
                                        <div class="st_column _surname">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;${length}</div>
                                        <div class="st_column _surname">${user.presentdate}</div>
                                    </div>
                               `;
            todayList.appendChild(element);
            overAll.appendChild(overall);
        }
    });
});