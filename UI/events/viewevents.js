function getEvent() {
    let table = ""
    fetch("http://localhost:8081/api/admin/event",{
        headers:{
            "Content-Type":"application/json",
            
        }
    })
    .then((response)=>response.json())
    .then((data)=> {

        table += `<tr style="width: 100%; display: flex; justify-content: space-evenly;" class="tablepoint">
        <th style="width: 20%;" class="toptable ">Description</th>
        <th style="width: 15%;" class="toptable ">Date</th>
        <th style="width: 10%;" class="toptable ">Time</th>
        <th style="width: 20%;" class="toptable ">Picture</th>
        <th style="width: 20%; " class="toptable ">Action</th>
        </tr>`

        for (let i = 0; i < data.length; i++) {
            table += `

        <tr class="tablepoint " style="width: 100%; display: flex; justify-content: space-evenly;" >
            <td style="width: 20%;" class="datatable">${data[i].description}</td>
            <td style="width: 15%;" class="datatable">${data[i].startDate}</td>
            <td style="width: 10%;" class="datatable">${data[i].startTime}</td>
            <td style="width: 20%;" class="datatable"><img src="${data[i].image}" alt="abc" style="width: 80%; height : 100px"> 
            </td>
            <td style="width: 20%;" class="datatable"> 

            <a  href="/events/addevents.html?id=${data[i].id}">
            <i onclick="modalValue(${data[i].id})" data-bs-toggle="modal" data-bs-target="#exampleModal"  
            style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
            </a>
            
            <i onclick="deleteEvent(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
    </td>
        </tr>`
        }
        document.getElementById("datatables-reponsive").innerHTML = table;
    })
}
getEvent();


function updateEvent(){
     console.log("hello")
    // let title = document.getElementById("achievementtitle").value;
    let description = document.getElementById("description").value;
    let date = document.getElementById("start_date").value;
    let time = document.getElementById("start_time").value;
    let image = document.getElementById("inpFile");

    newAchievement = {description : description , date : date , time : time}; 

    newAchievement = JSON.stringify(newAchievement)

    var formData = new FormData();

    for (const file of image.files) {
        formData.append("image",file)
    }
    formData.append('data',newAchievement);

    fetch("http://localhost:8081/api/event/"+uid,{
        method:"PUT",
        body: formData
    
    }).then((response)=>response.json())
    .then((data)=> console.log(data))
    .catch((error)=>console.log(error))
}

function deleteEvent(id){
    fetch('http://localhost:8081/api/event/'+id, {
            method: 'DELETE'
    }).then(()=>{
        let table = ""

        table += `
            <div  style=" 
            margin: auto;
            text-align: center;
            width: 50%;
            height: 5vh; text-align: center; 
            justify-content: center;
            font-size: large" 
            class="alert alert-danger" role="alert">
            Event Deleted Successfully
            </div>`

        document.getElementById("formSubmitted").innerHTML = table
    })

    setTimeout(() => {
        getEvent()
    }, 100);

}

let uid;
// function modalValue(id){
//     uid = id
//     console.log(id)
//     fetch("http://localhost:8081/api/achievement/"+id,{
//         headers:{
//             "Content-Type":"application/json",
//         }
//     })
//     .then((response)=>response.json())
//     .then((data)=> {
//         console.log(data.title);
//         console.log(data.description);
//         console.log(data.date);
//         console.log(data.time);
//         console.log(data.pictureUrl);
//     document.getElementById("achievementtitle").value = data.title;
//     document.getElementById("description").value = data.description;
//     document.getElementById("date").value = data.date;
//     document.getElementById("time").value = data.time;
//     document.getElementById("inpFile") = data.pictureUrl;
//     // return data.name;
//     })
// }




