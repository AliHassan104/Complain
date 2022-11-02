
let queryString = window.location.search;
var complainStatus;
var paginationDiv = document.getElementById('paginationDiv')



if (queryString != "") {
    let parameters = new URLSearchParams(queryString);
    complainStatus = parameters.get("status")
    filterComplainByStatus()
}
else {
    getComplain(0)
}



document.getElementById('filterByStatus').addEventListener('change', function () {
    complainStatus = this.value
    filterComplainByStatus()
});
// filterByStatus

function filterComplainByStatus() {

    search = {
        "key": "status",
        "operation": ":",
        "value": complainStatus
    }

    if (complainStatus !== "All") {

        sendData(`/complain/searchByStatus`, search)
            .then((data) => {
                renderComplainData(data)
                paginationDiv.style.display = 'none'
            })
    }
    else {
        getComplain(0)
        paginationDiv.style.display = 'flex'
    }
}

//                                                                                          filter Complain By Area

document.getElementById('dropdownArea').addEventListener('change', function () {
    filterComplainByArea(this.value);
});

function filterComplainByArea(area_id) {

    if (area_id !== "All") {
        getData(`/getcomplainbyarea/${area_id}`)
            .then((data) => {
                renderComplainData(data.content)
                paginationDiv.style.display = 'none'
            })
    }
    else {
        getComplain(0)
        paginationDiv.style.display = 'flex'
    }
}

//                                                                                          filter Complain By Complain Type
document.getElementById('complainType').addEventListener('change', function () {
    filterCompainByComplainType(this.value)
});

function filterCompainByComplainType(complainType_id) {

    if (complainType_id !== "All") {
        getData(`/getcomplainbycomplaintype/${complainType_id}`)
            .then((data) => {
                renderComplainData(data.content)
                paginationDiv.style.display = 'none'
            })
    }
    else {
        getComplain(0)
        paginationDiv.style.display = 'flex'
    }
}



function renderComplainData(data) {

    let table = ""

    table += `
    <tr  class="tablepoint">
    <th  class="toptable ">User Name</th>
    <th  class="toptable ">Complain Type</th>
    <th class="toptable ">Description</th>
    <th  class="toptable ">Status</th>
    <th  class="toptable ">Date</th>
    <th  class="toptable ">Area</th>
    <th class="toptable ">Action</th>
    </tr>`

    for (let i = 0; i < data.length; i++) {


        if (data[i].description.length > 5) {
            data[i].description = data[i].description.slice(0, 5) + `<a>...more</a>`
        }

        table += `

        <tr class="tablepoint "  >
            
            <td  class="datatable mouseHand" onclick=showComplainDetails(${data[i].id}) >${data[i].user.firstname + " " + data[i].user.lastname}</td>
            <td  class="datatable mouseHand" onclick=showComplainDetails(${data[i].id})>${data[i].complainType.name}</td>
            <td  class="datatable mouseHand" onclick=showComplainDetails(${data[i].id})>${data[i].description}</td>
            <td class="datatable mouseHand" onclick=showComplainDetails(${data[i].id})>${data[i].status}</td>
            <td  class="datatable mouseHand" onclick=showComplainDetails(${data[i].id})>${data[i].date}</td>
            <td  class="datatable mouseHand" onclick=showComplainDetails(${data[i].id})>${data[i].area.name}</td>
           
            <td class="datatable"> 
            <a  href="/addcomplain.html?id=${data[i].id}">
            <i style="margin-right: 5px;"  onclick="updateComplain(${data[i].id})"  
            class="fa fa-pencil"></i>
            
            </a>
            <i class="fa fa-check-circle" aria-hidden="true"  style="margin-right: 10px;"></i>
            <i style="margin-right: 5px;" onclick="deleteComplain(${data[i].id})"  class="fa fa-close"></i>
        
            <i onclick="assignComplainToUser(${data[i].id})"  
             class="fa fa-file"></i>
             <i data-bs-target="#rejectModal" onclick="rejStatus(${data[i].id})"  data-bs-toggle="modal" class="fa fa-ban" style="margin-right: 5px;color:red"></i>
            </td>

        </tr>`
    }






    document.getElementById("datatables-reponsive").innerHTML = table;

    if (data.length === 0) {
        noComplainFound = ""
        noComplainFound += `<span style=" margin: auto;text-align: center;width: 50%;height: 5vh; text-align: center; justify-content: center;font-size: large" 
                class="alert alert-danger" role="alert" >No Complain Found</span> `
        document.getElementById("noRecordFound").innerHTML = noComplainFound
    }
    else {
        document.getElementById("noRecordFound").innerHTML = ""
    }

}

function assignComplainToUser(complain_id) {
    location.href = `${loginUrl}/assigncomplain.html?c_id=${complain_id}`
}

function showComplainDetails(id) {
    location.href = `${loginUrl}/complaindetails.html?c_id=${id}`
}
//  get Complain With Pagination


function getComplain(number) {

    if (number >= 0) {
        getData(`/admin/complain?pageNumber=${number}&pageSize=${10}`)
            .then((data) => {
                renderComplainData(data.content)
                renderPagination(data)

            })
    }
}


let uid;
function updatedStatusModal(id) {
    uid = id
}




// function updateComplainLog(complain_id) {
    
// let description = document.getElementById("description").value;

//     complainLog = {
//         assignedFrom: loginUserId,
//         description: description

//     }
//     console.log(complainLog);
//     sendData(`/complainlog/${complain_id}`, complainLog)
// }

function deleteComplain(id) {

    deleteData(`/complain/${id}`)
        .then((response) => {
            getComplain(0)

            let table = ""
            if (response.ok) {
                table += `
                <div  style=" 
                margin: auto;
                text-align: center;
                width: 50%;
                height: 5vh; text-align: center; 
                justify-content: center;
                font-size: large" 
                class="alert alert-success" role="alert">
                Complain Deleted Successfully
                </div>`
            }
            else {
                table += `
                <div  style=" 
                margin: auto;
                text-align: center;
                width: 50%;
                height: 5vh; text-align: center; 
                justify-content: center;
                font-size: large" 
                class="alert alert-danger" role="alert">
                Some thing went Wrong Complain Cannot Be deleted
                </div>`
            }

            document.getElementById("formSubmitted").innerHTML = table

            setTimeout(() => {
                document.getElementById("formSubmitted").innerHTML = ""
            }, 2000)
        })

}




function getArea() {
    let table = ""

    getData(`/area`)
        .then((data) => {

            table += `
            <option selected disabled>Filter by Area</option>
            `

            for (let i = 0; i < data.length; i++) {
                table += `
            <option value="${data[i].id}">${data[i].name}</option>
            `
            }

            table += `
            <option value="All">All</option>
            `
            document.getElementById("dropdownArea").innerHTML = table;
        })
}
getArea();




function getComplainType() {
    let table = ""

    getData(`/complaintype`)
        .then((data) => {

            table += `
            <option selected disabled>Filter by Complain Type</option>
            `
            for (let i = 0; i < data.length; i++) {
                table += `
        <option value="${data[i].id}">${data[i].name}</option>
    `
            }
            table += `
        <option value="All">All</option>
        `
            document.getElementById("complainType").innerHTML = table;
        })
}

getComplainType()


function renderPagination(data,) {
    let pages = data.totalPages;
    let renderPagination = ""
    let renderPageOf = ""
    let pageNumber = data.number
    let nextPageNumber = pageNumber + 1

    if (nextPageNumber == pages) {
        nextPageNumber = -1
    }
    if (data.numberOfElements != 0) {
        pageNumber += 1
    }

    document.getElementById("showPageNumbers").innerHTML = `<a href="#" style="text-decoration:none;">Page ${pageNumber} Of ${pages}</a> `

    renderPagination += `
    <li class="page-item" onclick="showPreviousPage(${pageNumber - 2})"><a class="page-link" href="#">Previous</a></li>
    <li class="page-item" onclick="showFirstPage(${0})"><a class="page-link" href="#">First</a></li>
    <li class="page-item" onclick="showLastPage(${nextPageNumber})"><a class="page-link" href="#">Next</a></li>
    <li class="page-item"onclick="showNextPage(${pages - 1})"><a class="page-link" href="#">Last</a></li>`

    document.getElementById("pagination").innerHTML = renderPagination
}

function showPreviousPage(pageNumber) {
    getComplain(pageNumber)
}
function showFirstPage(pageNumber) {
    getComplain(pageNumber)
}
function showLastPage(pageNumber) {
    getComplain(pageNumber)
}
function showNextPage(pageNumber) {
    getComplain(pageNumber)
}

// var gettingRejId = document.getElementById('gettingRejId') ;
let rejId ;

// getting rejection Id

function rejStatus(id) {
        rejId = id;

}

function updateComplainStatus() {

    let updatedstatus = document.getElementById("updatedstatus").value;
    let updatedstatus1 = {
        status: updatedstatus
    }
    patchData(`/admin/complain/${rejId}`, updatedstatus1)
        .then(data => {
            rejectStatus()
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
function rejectStatus(){
    debugger;
    let selectingRejec = document.getElementById("selectingRejec").value;
    let description = document.getElementById("description").value;

    var todayDate = new Date().toISOString().substring(0,10);
    let complainlogPost = {
        status: selectingRejec,
        description:description,
        date:todayDate
    }
    let updatedstatus = document.getElementById("updatedstatus").value ;
    sendData(`/complainlog/${rejId}`,complainlogPost)
        .then(data => {
              getComplain(0)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        // renderComplainData(data);
    }

