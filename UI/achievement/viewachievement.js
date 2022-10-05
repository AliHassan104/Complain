
function renderAchievement(data){
    table = ""

    table += `<tr  class="tablepoint">
    <th  class="toptable ">Title</th>
    <th  class="toptable ">Description</th>
    <th  class="toptable ">Date</th>
    <th  class="toptable ">Picture</th>
    <th  class="toptable ">Action</th>
    </tr>`
   
    for (let i = 0; i < data.length; i++) {

        if (data[i].description.length >= 8) {
            data[i].description = data[i].description.substring(0, 8) + `<a style="color:blue">...more</a>`
        }
        if(data[i].title.length >= 8){
            data[i].title = data[i].title.substring(0, 15) + `<a style="color:blue">...more</a>`
        }


        table += `

    <tr class="tablepoint "  >
        <td class="datatable mouseHand" onclick="showAchievementDetails(${data[i].id})">${data[i].title}</td>
        <td class="datatable mouseHand" onclick="showAchievementDetails(${data[i].id})">${data[i].description}</td>
        <td class="datatable mouseHand" onclick="showAchievementDetails(${data[i].id})">${data[i].date}</td>
        <td class="datatable mouseHand" onclick="showAchievementDetails(${data[i].id})"><img src="${data[i].pictureUrl}" alt="abc" style="width: 80%; height : 100px"> 
        </td>
        <td class="datatable"> 

        <a  href="/achievement/addachievement.html?id=${data[i].id}">
        <i onclick="modalValue(${data[i].id})" data-bs-toggle="modal" data-bs-target="#exampleModal"  
        style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
        </a>
        
        <i onclick="deleteAchievement(${data[i].id})"  class="fa fa-close"></i>
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
}

function getAchievement() {
    let table = ""
    getData(`/admin/achievement`)
    .then((data)=> {
        renderAchievement(data.content)
    })
}
getAchievement();


function showAchievementDetails(id){
    location.href = `${loginUrl}/achievement/achievementdetails.html?a_id=${id}`
}

function deleteAchievement(id){
   
    deleteData(`/achievement/`+id)
    .then(()=>{
        getAchievement()
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
}






