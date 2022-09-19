function getAchievement() {
    let table = ""
    fetch(`${baseUrl}/api/admin/achievement`,{
        headers:{
            "Content-Type":"application/json",
        }
    })
    .catch((error)=>{})
    .then((response)=>
            response.json())
    .then((data)=> {
        if(data != null ){
        table += `<tr style="width: 100%; display: flex; justify-content: space-evenly;" class="tablepoint">
        <th style="width: 15%;" class="toptable ">Title</th>
        <th style="width: 20%;" class="toptable ">Description</th>
        <th style="width: 15%;" class="toptable ">Date</th>
        <th style="width: 20%;" class="toptable ">Picture</th>
        <th style="width: 20%; " class="toptable ">Action</th>
        </tr>`
       
        for (let i = 0; i < data.length; i++) {
            table += `

        <tr class="tablepoint " style="width: 100%; display: flex; justify-content: space-evenly;" >
            <td style="width: 15%;" class="datatable">${data[i].title}</td>
            <td style="width: 20%;" class="datatable">${data[i].description}</td>
            <td style="width: 15%;" class="datatable">${data[i].date}</td>
            <td style="width: 20%;" class="datatable"><img src="${data[i].pictureUrl}" alt="abc" style="width: 80%; height : 100px"> 
            </td>
            <td style="width: 20%;" class="datatable"> 

            <a  href="/achievement/addachievement.html?id=${data[i].id}">
            <i onclick="modalValue(${data[i].id})" data-bs-toggle="modal" data-bs-target="#exampleModal"  
            style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
            </a>
            
            <i onclick="deleteAchievement(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
    </td>
        </tr>`
        }
        document.getElementById("datatables-reponsive").innerHTML = table;
    }
    })
}
getAchievement();


// function updateAchievement(){

//     let title = document.getElementById("achievementtitle").value;
//     let description = document.getElementById("description").value;
//     let date = document.getElementById("date").value;
//     let image = document.getElementById("inpFile");

//     newAchievement = {title : title, description : description , date : date}; 

//     newAchievement = JSON.stringify(newAchievement)

//     var formData = new FormData();

//     for (const file of image.files) {
//         formData.append("pictureUrl",file)
//     }
//     formData.append('data',newAchievement);

//     fetch(`${baseUrl}/api/achievement/`+uid,{
//         method:"PUT",
//         body: formData
    
//     }).then((response)=>response.json())
//     .then((data)=> console.log(data))
//     .catch((error)=>console.log(error))

// }

function deleteAchievement(id){
    fetch(`${baseUrl}/api/achievement/`+id, {
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
            Achievement Deleted Successfully
            </div>`

        document.getElementById("formSubmitted").innerHTML = table

        setTimeout(()=>{
            document.getElementById("formSubmitted").innerHTML = ""
        },2000)

    })
 
    setTimeout(() => {
        getAchievement()
    }, 100);

}






