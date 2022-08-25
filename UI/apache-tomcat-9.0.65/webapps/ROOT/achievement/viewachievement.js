function getAchievement() {
    let table = ""
    fetch("http://localhost:8081/api/admin/achievement",{
        headers:{
            // mode: 'no-cors',
            // "Authorization":jwtTokenBearer,
            "Content-Type":"application/json",
            
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
        console.log(data);
        table += `<h2 style="display: inline-table;text-align: center;">Achievement</h2>`

        table += `<tr style="width: 100%; display: flex; justify-content: space-evenly;" class="tablepoint">
        <th style="width: 15%;" class="toptable ">Title</th>
        <th style="width: 20%;" class="toptable ">Description</th>
        <th style="width: 15%;" class="toptable ">Date</th>
        <th style="width: 15%;" class="toptable ">Time</th>
        <th style="width: 20%;" class="toptable ">Picture</th>
        <th style="width: 10%; " class="toptable ">Action</th>
        </tr>`

        for (let i = 0; i < data.length; i++) {
            table += `

        <tr class="tablepoint " style="width: 100%; display: flex; justify-content: space-evenly;" >
            <td style="width: 15%;" class="datatable">${data[i].title}</td>
            <td style="width: 20%;" class="datatable">${data[i].description}</td>
            <td style="width: 15%;" class="datatable">${data[i].date}</td>
            <td style="width: 15%;" class="datatable">${data[i].time}</td>
            <td style="width: 20%;" class="datatable"><img src="${data[i].pictureUrl}" alt="abc" style="width: 80%; height : 100px"> 
            </td>
            <td style="width: 10%;" class="datatable"> 
            <i onclick="modalValue(${data[i].id})" data-bs-toggle="modal" data-bs-target="#exampleModal"  
            style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
            <i onclick="deleteAchievement(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
    </td>
        </tr>`
        }
        document.getElementById("achivementtable").innerHTML = table;
    })
}
getAchievement();


// function updateAchivement(id){
//     console.log(uid);
//     let complaintype = document.getElementById("complaintype").value;

//     updatedComplainType = {name : complaintype}; 
//     console.log(updatedComplainType);
//     fetch('http://localhost:8081/api/achievement/'+uid, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(updatedComplainType)
//         })
//             .then(response => response.json())
//             .then(data => {
//                 console.log('Success:', data);
//             })
//             .catch((error) => {
//                 console.error('Error:', error);
//             });

//             setTimeout(() => {
//                 getComplain()
//             }, 500);
// }

function updateAchievement(){

    let title = document.getElementById("achievementtitle").value;
    let description = document.getElementById("description").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;
    let image = document.getElementById("inpFile");

    newAchievement = {title : title, description : description , date : date , time : time}; 


    console.log(newAchievement);

    newAchievement = JSON.stringify(newAchievement)

    var formData = new FormData();

    for (const file of image.files) {
        formData.append("pictureUrl",file)
    }
    formData.append('data',newAchievement);

    fetch("http://localhost:8081/api/achievement/"+uid,{
        method:"PUT",
        body: formData
    
    }).then((response)=>response.json())
    .then((data)=> console.log(data))
    .catch((error)=>console.log(error))


}

function deleteAchievement(id){
    fetch('http://localhost:8081/api/achievement/'+id, {
            method: 'DELETE'
    })

    setTimeout(() => {
        getAchievement()
    }, 100);

}

let uid;
function modalValue(id){
    uid = id
    console.log(id)
    fetch("http://localhost:8081/api/achievement/"+id,{
        headers:{
            "Content-Type":"application/json",
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
        console.log(data.title);
        console.log(data.description);
        console.log(data.date);
        console.log(data.time);
        console.log(data.pictureUrl);
    document.getElementById("achievementtitle").value = data.title;
    document.getElementById("description").value = data.description;
    document.getElementById("date").value = data.date;
    document.getElementById("time").value = data.time;
    // document.getElementById("inpFile") = data.pictureUrl;
    // return data.name;
    })
}




