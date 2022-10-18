function renderEvent(data) {
    let table = ""

    table += `<tr  class="tablepoint">
        <th  class="toptable ">Title</th>
        <th  class="toptable ">Description</th>
        <th  class="toptable ">Area</th>
        <th  class="toptable ">Date</th>
        <th  class="toptable ">Time</th>
        <th  class="toptable ">Picture</th>
        <th  class="toptable ">Action</th>
        </tr>`

    for (let i = 0; i < data.length; i++) {

        if (data[i].description.length >= 8) {
            data[i].description = data[i].description.substring(0, 8) + `<a style="color:blue">...more</a>`
        }

        table += `

        <tr class="tablepoint ">
            <td class="datatable mouseHand" onclick="viewEventDetails(${data[i].id})" >${data[i].title}</td>
            <td class="datatable mouseHand" onclick="viewEventDetails(${data[i].id})">${data[i].description}</td>
            <td class="datatable mouseHand" onclick="viewEventDetails(${data[i].id})">${data[i].area.name}</td>
            <td class="datatable mouseHand" onclick="viewEventDetails(${data[i].id})">${data[i].startDate}</td>
            <td class="datatable mouseHand" onclick="viewEventDetails(${data[i].id})">${data[i].startTime}</td>
            <td class="datatable mouseHand" onclick="viewEventDetails(${data[i].id})"><img src="${data[i].image}" alt="abc" style="width: 80%; height : 100px"> 
            </td>
            <td class="datatable"> 

            <a  href="/addevents.html?id=${data[i].id}">
            <i onclick="modalValue(${data[i].id})" data-bs-toggle="modal" data-bs-target="#exampleModal"  
            style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
            
            </a>
            <i class="fa fa-check-circle" aria-hidden="true"  style="margin-right: 10px;"></i>
            <i onclick="deleteEvent(${data[i].id})"  class="fa fa-close"></i>
    </td>
        </tr>`
    }
    document.getElementById("datatables-reponsive").innerHTML = table;

    if (data.length === 0) {
        noRecordFound = ""
        noRecordFound += `
                <div  style=" 
                margin: auto;
                text-align: center;
                width: 50%;
                height: 5vh; text-align: center; 
                justify-content: center;
                font-size: large" 
                class="alert alert-danger" role="alert">
                No Event Found !
                </div>`

        document.getElementById("noRecordFound").innerHTML = noRecordFound
    }
    else {
        document.getElementById("noRecordFound").innerHTML = ""
    }
}

function viewEventDetails(event_id){
    
    location.href = `${loginUrl}/eventdetails.html?e_id=${event_id}`
}

// var previousPageNumber = 0;
function getEvent(pageNumber) {
   
    if (pageNumber >= 0) {
        getData(`/admin/event?pageNumber=${pageNumber}&pageSize=${2}`)
            .then((data) => {
                renderEvent(data.content);
                renderPagination(data)
            })
    }
}

getEvent(0)


function deleteEvent(id) {

    deleteData(`/event/${id}`)
        .then(() => {
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
            <b> Event Deleted Successfully <b>
            </div>`

            document.getElementById("formSubmitted").innerHTML = table

            setTimeout(() => {
                document.getElementById("formSubmitted").innerHTML = ""
            }, 2000)

            getEvent(0)
            renderPagination()
        })

   
        

}

let uid;

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
    getEvent(pageNumber)
}
function showFirstPage(pageNumber){
    getEvent(pageNumber)
}
function showLastPage(pageNumber){
    getEvent(pageNumber)
}
function showNextPage(pageNumber){
    getEvent(pageNumber)
}
