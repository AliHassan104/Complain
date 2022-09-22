
function getAchievement() {
    let table = ""
    fetch(`${baseUrl}/api/admin/achievement`,{
        headers:{
            "Content-Type":"application/json",
        }
    })
    .then((response)=>response.json()).catch((error)=>{})
    .then((data)=> {

        console.log("Data ",data)
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
            <td style="width: 15%;" class="datatable mouseHand" onclick="showAchievementDetails(${data[i].id})">${data[i].title}</td>
            <td style="width: 20%;" class="datatable mouseHand" onclick="showAchievementDetails(${data[i].id})">${data[i].description}</td>
            <td style="width: 15%;" class="datatable mouseHand" onclick="showAchievementDetails(${data[i].id})">${data[i].date}</td>
            <td style="width: 20%;" class="datatable mouseHand" onclick="showAchievementDetails(${data[i].id})"><img src="${data[i].pictureUrl}" alt="abc" style="width: 80%; height : 100px"> 
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

        if(data.length === 0){
            noAchievementFound = ""
                noAchievementFound += `<span style=" margin: auto;text-align: center;width: 50%;height: 5vh; text-align: center; justify-content: center;font-size: large" 
                class="alert alert-danger" role="alert" >No Achievement Found</span> `
                document.getElementById("noRecordFound").innerHTML = noAchievementFound
        }
    
    })
}
getAchievement();


function showAchievementDetails(id){
    location.href = `${loginUrl}/achievement/achievementdetails.html?a_id=${id}`
}

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






