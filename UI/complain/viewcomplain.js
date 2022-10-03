
let queryString = window.location.search;
var complainStatus;

if (queryString != "") {
    let parameters = new URLSearchParams(queryString);
    complainStatus= parameters.get("status")
    filterComplainByStatus()
}
else {
    getComplain(0,2)
}

document.getElementById('filterByStatus').addEventListener('change', function() {
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
      
        sendData(`/complain/searchByStatus`,search)
            .then((data) => {
                renderComplainData(data)
            })
    }
    else{
        getComplain(0,2)
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

        if(data[i].description.length > 5){
            data[i].description = data[i].description.slice(0,5)+`<a>...more</a>`
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
            <a  href="/complain/addcomplain.html?id=${data[i].id}">
            <i onclick="updateComplain(${data[i].id})"  style="padding-right: 5px; margin-right: 5px;"  
            class="fa fa-pencil"></i>
            </a>

            <i onclick="updatedStatusModal(${data[i].id})" data-bs-toggle="modal" data-bs-target="#statusmodal"  
            style="padding-right: 5px; margin-right: 5px;"  class="fa fa-file"></i>

            <i onclick="deleteComplain(${data[i].id})"  style="padding-right: 5px; margin-right: 5px;" class="fa fa-close"></i>

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
    else{
        document.getElementById("noRecordFound").innerHTML = ""
    }

}

function showComplainDetails(id) {
    location.href = `${loginUrl}/complain/complaindetails.html?c_id=${id}`
}
                                                                        //  get Complain With Pagination
var previousPageNumber = 0;
function getComplain(pageNumber, pageSize, next) {
    
    if (next) {
        totalPaginationBoxes = pageNumber;
        if (previousPageNumber + 1 < pageNumber) {
            previousPageNumber += 1
            pageNumber = previousPageNumber
        }
    }
                                                               //  If Previous is clicked decrement pageNumber
    if (next === false) {
        pageNumber = previousPageNumber;
        if (pageNumber != 0) {
            previousPageNumber -= 1
            pageNumber = previousPageNumber
        }
    }

    if (pageNumber >= 0) {
        getData(`/admin/complain?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .then((data) => {
            previousPageNumber = pageNumber
            renderComplainData(data)
        })
    }
}


let uid;
function updatedStatusModal(id) {
    uid = id
}

function updateStatus() {
    let updatedstatus = document.getElementById("updatedstatus").value;
    let updatedstatus1 = {
        status: updatedstatus
    }

    patchData(`/admin/complain/${uid}`,updatedstatus1)
        .then(data => {
                getComplain()
                updateComplainLog(data.id)
                giveNotificationToUserOnComplainStatus(data.id)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
//                                                                            give notification to user on change of complain Status
function giveNotificationToUserOnComplainStatus(complain_id){
    sendData(`/send-notification-touser/${complain_id}`)
}

function updateComplainLog(complain_id){
    var todayDate = new Date().toISOString().substring(0,10);

    complainLog = {
        date:todayDate,
        assignedFrom:loginUserName,
        assignedTo:"ahmed"
    }

    sendData(`/complainlog/${complain_id}`,complainLog)
}

function deleteComplain(id) {

        deleteData(`/complain/${id}`)
        .then(() => {
            getComplain(0,2)
            renderPagination()

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
            Complain Deleted Successfully
            </div>`

            document.getElementById("formSubmitted").innerHTML = table

            setTimeout(() => {
                document.getElementById("formSubmitted").innerHTML = ""
            }, 2000)
        })

}

getArea()

function getArea() {
    let table = ""
 
        getData(`/area`)
        .then((data) => {
            allArea = data;
            table += `<select onchange="filterByArea()" id="dropdownareafilter"  class="form-control form-control-sm">`
            table += `<option value="ALL" selected>Select Area</option>`
            for (let i = 0; i < data.length; i++) {
                table += `
            <option value="${data[i].id}">${data[i].name}</option>
        `
            }
            table += `</select>`
            document.getElementById("dropdownarea1").innerHTML = table;
        })
}

function renderPagination() {
    let renderPagination = ""
    let paginationBoxes = 0;


    getData(`/countallcomplains`).then((data) => {
        console.log(data);
        paginationBoxes = Math.ceil(data / 2)
        onlyFivePaginationBoxes = 0;

        if(paginationBoxes > 5){
            onlyFivePaginationBoxes = 5
        }
        else{
            onlyFivePaginationBoxes = paginationBoxes;
        }

        renderPagination += `
        <li class="page-item" onclick="getComplain(${1},${2},${false})"><a class="page-link" href="#">Previous</a></li>`
        for (let i = 0; i < onlyFivePaginationBoxes; i++) {
            renderPagination += `
            <li class="page-item" onclick="getComplain(${i},${2})"><a class="page-link" href="#">${i + 1}</a></li>
            `
        }

        renderPagination += `<li class="page-item"><a class="page-link" >--</a></li>
        <li class="page-item" onclick="getComplain(${paginationBoxes - 1},${2})"><a class="page-link" href="#">${paginationBoxes}</a></li>
        <li class="page-item"onclick="getComplain(${paginationBoxes},${2},${true})"><a class="page-link" href="#">Next</a></li>`


        document.getElementById("pagination").innerHTML = renderPagination
    })
}
renderPagination()