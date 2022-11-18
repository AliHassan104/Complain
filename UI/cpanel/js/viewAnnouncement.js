let uid ;

function getAnnouncement() {
    // if (pageNumber >= 0) {
        getData(`/announcement`).
        then((data)=> {
            
            renderAnnouncement(data)
            // renderPagination(data) 
            
        })
    // }
}

getAnnouncement()

function renderAnnouncement(data){
    let table =''

    console.log(data);

    table += `<tr  class="tablepoint">
    <th  class="toptable ">Title</th>
    <th  class="toptable ">Method</th>
    <th  class="toptable ">Status</th>
    <th  class="toptable ">Date</th>
    <th  class="toptable ">Time</th>
    <th  class="toptable ">Description</th>
    <th  class="toptable ">Area</th>
    <th  class="toptable ">Action</th>
    </tr>`

    for (let i = 0; i < data.length; i++) {
        
        table += `

    <tr class="tablepoint">
        <td  class="datatable">${data[i].title}</td>
        <td  class="datatable">${data[i].announcementType}</td>
        <td  class="datatable">${data[i].announcementStatus}</td>
        <td  class="datatable">${data[i].date}</td>
        <td  class="datatable">${data[i].time}</td>
        <td  class="datatable">${data[i].description}</td>
        <td  class="datatable">${data[i].area.name}</td>

        <td  class="datatable"> 
        <a  href="/addAnnouncement.html?id=${data[i].id}">
        <i  data-bs-toggle="modal" data-bs-target="#exampleModal"  
        style="margin-right: 15px;"  class="fa fa-pencil"></i>
        </a>
        <i id="close12" onclick="deleteAnnouncement(${data[i].id})"   class="fa fa-close"></i>
        <i onclick="getAnnouncementData(${data[i].id})" class="fa fa-paper-plane"></i>
        </td>
        
    </tr>
    `
    }

    document.getElementById("datatables-reponsive").innerHTML = table;

      
     
    if(data.content.length === 0){
        noAreaFound = ""
        noAreaFound  += `<span style=" margin: auto;text-align: center;width: 50%;height: 5vh; text-align: center; justify-content: center;font-size: large" 
        class="alert alert-danger" role="alert" >No Area Found</span> `
        document.getElementById("noRecordFound").innerHTML =   noAreaFound 
   }
   else{
        document.getElementById("noRecordFound").innerHTML =  "" 
   }
    
}


function deleteAnnouncement(id){
    let table = ""

    deleteData(`/announcement/${id}`).then((response)=>{
        
        if(response.ok){
            table += `
            <div  style=" 
            margin: auto;
            text-align: center;
            width: 50%;
            height: 5vh; text-align: center; 
            justify-content: center;
            font-size: large" 
            class="alert alert-success" role="alert">
            Announcement Deleted Successfully
            </div>`

        }
        else{
        table += `
                    <div  style=" 
                    margin: auto;
                    text-align: center;
                    width: 50%;
                    height: 5vh; text-align: center; 
                    justify-content: center;
                    font-size: large" 
                    class="alert alert-danger" role="alert">
                    Some thing Wrong Cannot Delete
                    </div>`
        }

        
        document.getElementById("formSubmitted").innerHTML = table

        
        setTimeout(() => {
            document.getElementById("formSubmitted").innerHTML = ""
        }, 2000)
        
        getAnnouncement();
    })

}

function  renderPagination(data) {
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
    getArea(pageNumber)
}
function showFirstPage(pageNumber){
    getArea(pageNumber)
}
function showLastPage(pageNumber){
    getArea(pageNumber)
}
function showNextPage(pageNumber){
    getArea(pageNumber)
}

function getAnnouncementData(id) {


    getData(`/announcement/${id}`)
    .then((result) => {
        sendAnnouncment(result) ;
    }).catch((err) => {
        
    });
}

function sendAnnouncment(data) {
    
        announcementObject = {
            "id" : data.id ,
            "title" : data.title ,
            "description" : data.description ,
            "areaId" : data.area.id,
            "announcementType" : data.announcementType
        }

        sendData(`/immediateAnnouncement` , announcementObject)
        .then((result) => {
            getAnnouncement()
        }).catch((err) => {
            
        });

}
