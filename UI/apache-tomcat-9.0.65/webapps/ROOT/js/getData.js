
// getUser()
// getAchievement()
// getDocuments()
// getComplain()

// function getUser() {
//     let table = ""
//     fetch("http://localhost:8081/api/admin/user",{
//         headers:{
//             // mode: 'no-cors',
//             // "Authorization":jwtTokenBearer,
//             "Content-Type":"application/json",
            
//         }
//     })
//     .then((response)=>response.json())
//     .then((data)=> {
//         console.log(data);
//         table += `<h2 style="display: inline-table; text-align: center;">User</h2>`

//         table += `<tr style="width: 100%; display: flex; justify-content: space-between;" class="tablepoint">
//         <th style="width: 20%;" class="toptable ">Name</th>
//         <th style="width: 20%;" class="toptable ">PhoneNumber</th>
//         <th style="width: 20%;" class="toptable ">Email</th>
//         <th style="width: 20%;" class="toptable ">Cnic</th>
//         <th style="width: 20%;" class="toptable ">Area Name </th>
//         </tr>`
//         for (let i = 0; i < data.length; i++) {
//             table += `

//         <tr class="tablepoint" style="width: 100%; display: flex; justify-content: space-between;" >
//             <td style="width: 20%;" class="datatable">${data[i].firstname + " " + data[i].lastname}</td>
//             <td style="width: 20%;" class="datatable">${data[i].phoneNumber}</td>
//             <td style="width: 20%;" class="datatable">${data[i].email}</td>
//             <td style="width: 20%;" class="datatable">${data[i].cnic}</td>
//             <td style="width: 20%;" class="datatable">${data[i].area.name}</td>
//         </tr>`
//         }
//         document.getElementById("usertable").innerHTML = table;
//     })
// }
// function getAchievement() {
//     let table = ""
//     fetch("http://localhost:8081/api/admin/achievement",{
//         headers:{
//             // mode: 'no-cors',
//             // "Authorization":jwtTokenBearer,
//             "Content-Type":"application/json",
            
//         }
//     })
//     .then((response)=>response.json())
//     .then((data)=> {
//         console.log(data);
//         table += `<h2 style="display: inline-table;text-align: center;">Achievement</h2>`

//         table += `<tr style="width: 100%; display: flex; justify-content: space-evenly;" class="tablepoint">
//         <th style="width: 20%;" class="toptable ">Title</th>
//         <th style="width: 20%;" class="toptable ">Description</th>
//         <th style="width: 20%;" class="toptable ">Date</th>
//         <th style="width: 20%;" class="toptable ">Time</th>
//         <th style="width: 20%;" class="toptable ">Picture</th>
//         </tr>`

//         for (let i = 0; i < data.length; i++) {
//             table += `

//         <tr class="tablepoint " style="width: 100%; display: flex; justify-content: space-evenly;" >
//             <td style="width: 20%;" class="datatable">${data[i].title}</td>
//             <td style="width: 20%;" class="datatable">${data[i].description}</td>
//             <td style="width: 20%;" class="datatable">${data[i].date}</td>
//             <td style="width: 20%;" class="datatable">${data[i].time}</td>
//             <td style="width: 20%;" class="datatable">${data[i].pictureUrl}</td>
//         </tr>`
//         }
//         document.getElementById("achivementtable").innerHTML = table;
//     })
// }
// function getComplain() {
//     let table = ""
//     fetch("http://localhost:8081/api/admin/complain",{
//         headers:{
//             // mode: 'no-cors',
//             // "Authorization":jwtTokenBearer,
//             "Content-Type":"application/json",
            
//         }
//     })
//     .then((response)=>response.json())
//     .then((data)=> {
//         console.log(data);
//         table += `<h2 style="display: inline-table;">Complain</h2>`

//         table += `
//         <tr style="width: 100%; display: flex; justify-content: space-between;" class="tablepoint">
//         <th style="width: 20%;" class="toptable ">User Name</th>
//         <th style="width: 20%;" class="toptable ">Title</th>
//         <th style="width: 20%;" class="toptable ">Description</th>
//         <th style="width: 20%;" class="toptable ">Status</th>
//         <th style="width: 20%;" class="toptable ">Date</th>
//         <th style="width: 20%;" class="toptable ">Area</th>
//         <th style="width: 20%;" class="toptable ">picture</th>
//         </tr>`
//         for (let i = 0; i < data.length; i++) {
//             table += `

//         <tr class="tablepoint " style="width: 100%; display: flex; justify-content: space-between;" >
//             <td style="width: 20%;" class="datatable">${data[i].user.firstname+" "+data[i].user.lastname}</td>
//             <td style="width: 20%;" class="datatable">${data[i].title}</td>
//             <td style="width: 20%;" class="datatable">${data[i].description}</td>
//             <td style="width: 20%;" class="datatable">${data[i].status}</td>
//             <td style="width: 20%;" class="datatable">${data[i].date}</td>
//             <td style="width: 20%;" class="datatable">${data[i].area.name}</td>
//             <td style="width: 20%;" class="datatable">${data[i].picture}</td>
//         </tr>`
//         }
//         document.getElementById("complaintable").innerHTML = table;
//     })
// }
// function getDocuments() {
//     let table = ""
//     fetch("http://localhost:8081/api/admin/document",{
//         headers:{
//             // mode: 'no-cors',
//             // "Authorization":jwtTokenBearer,
//             "Content-Type":"application/json",
            
//         }
//     })
//     .then((response)=>response.json())
//     .then((data)=> {
//         console.log(data);
//         table += `<h2 style="display: inline-table;">Document</h2>`

//         table += `<tr style="width: 100%; display: flex; justify-content: space-evenly;" class="tablepoint">
//         <th style="width: 100%;" class="toptable ">Area</th>
//         <th style="width: 100%;" class="toptable ">URL</th>
//         </tr>`
//         for (let i = 0; i < data.length; i++) {
//             table += `
//         <tr class="tablepoint " style="width: 100%; display: flex; justify-content: space-evenly;" >
//             <td style="width: 100%;" class="datatable">${data[i].area.name}</td>
//             <td style="width: 100%;" class="datatable">${data[i].url}</td>
//         </tr>`
//         }
//         document.getElementById("documenttable").innerHTML = table;
//     })
// }

// function getComplain() {
//     fetch("http://localhost:8081/api/complainbystatus",{
//         headers:{
//             "Content-Type":"application/json",
//         }
//     })
//     .then((response)=>response.json())
//     .then((data)=> {
        
//     })
// }

// getComplain()




getComplain()

let complainStatus = []
let numberOfStatus = []

function getComplain() {
    let totalcomplain = 0
    let inprogress = 0
    let resolved = 0
    let inreview = 0
    let rejected = 0
    fetch("http://localhost:8081/api/complainbystatus",{
        headers:{
            "Content-Type":"application/json",   
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
        for (const property in data) {
            complainStatus.push(data[property].status)
            numberOfStatus.push(data[property].numberOfComplains)
          }

        for (let i = 0; i < complainStatus.length; i++) {

            totalcomplain += numberOfStatus[i];

            if (complainStatus == "IN_REVIEW") {
                inreview +=  numberOfStatus[i]; 
            }
            else if(data[i].status == "IN_PROGRESS"){
                inprogress +=  numberOfStatus[i];
            }
            else if(data[i].status == "COMPLETED"){
                resolved +=  numberOfStatus[i];
            }
            else if(data[i].status == "REJECTED"){
                rejected +=  numberOfStatus[i];
            }
        }  
        document.getElementById("totalcomplain").innerText = totalcomplain;
        document.getElementById("inprogress").innerText = inprogress;
        document.getElementById("resolved").innerText = resolved;
        document.getElementById("inreview").innerText = inreview;
    })
}