
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

        <a  href="/addachievement.html?id=${data[i].id}">
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

function getAchievement(number) {
   
    if (number >= 0) {
    getData(`/admin/achievement?pageNumber=${number}&pageSize=${2}`)
    .then((data)=> {
        renderAchievement(data.content)
        renderPagination(data) 
    })
}
}
getAchievement(0);


function showAchievementDetails(id){
    location.href = `${loginUrl}/achievementdetails.html?a_id=${id}`
}

function deleteAchievement(id){
   
    deleteData(`/achievement/`+id)
    .then(()=>{
        getAchievement(0)
        let table = ""
        table += `
            <div  style=" 
            margin: auto;
            text-align: center;
            width: 50%;
            height: 5vh; text-align: center; 
            justify-content: center;
            font-size: large" 
            class="alert alert-success" role="alert">
            Achievement Deleted Successfully
            </div>`

        document.getElementById("formSubmitted").innerHTML = table

        setTimeout(()=>{
            document.getElementById("formSubmitted").innerHTML = ""
        },2000)

    })
}


function  renderPagination(data,) {
    let pages = data.totalPages;
    let renderPagination = ""
    let renderPageOf = ""
    let pageNumber = data.number
    let nextPageNumber = pageNumber+1

    if(nextPageNumber == pages){
       nextPageNumber = -1
    }
    if(data.numberOfElements != 0){
        pageNumber += 1
    }
   
    document.getElementById("showPageNumbers").innerHTML = `<a href="#" style="text-decoration:none;">Page ${pageNumber} Of ${pages}</a> `

    renderPagination += `
    <li class="page-item" onclick="showPreviousPage(${pageNumber-2})"><a class="page-link" href="#">Previous</a></li>
    <li class="page-item" onclick="showFirstPage(${0})"><a class="page-link" href="#">First</a></li>
    <li class="page-item" onclick="showLastPage(${nextPageNumber})"><a class="page-link" href="#">Next</a></li>
    <li class="page-item"onclick="showNextPage(${pages-1})"><a class="page-link" href="#">Last</a></li>`

    document.getElementById("pagination").innerHTML = renderPagination
}

function showPreviousPage(pageNumber){
    getAchievement(pageNumber)
}
function showFirstPage(pageNumber){
    getAchievement(pageNumber)
}
function showLastPage(pageNumber){
    getAchievement(pageNumber)
}
function showNextPage(pageNumber){
    getAchievement(pageNumber)
}






