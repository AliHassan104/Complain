
let queryString = window.location.search;
var complainStatus;

if (queryString != "") {
    let parameters = new URLSearchParams(queryString);
    complainStatus= parameters.get("status")
    filterComplainByStatus()
}
else {
    getComplain(0,10)
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
        getComplain(0,10)
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
            <i onclick="updateComplain(${data[i].id})"  
            class="fa fa-pencil"></i>
            </a>

            <i onclick="deleteComplain(${data[i].id})"  class="fa fa-close"></i>
        
            <i onclick="assignComplainToUser(${data[i].id})"  
             class="fa fa-file"></i>
            </td>
        </tr>`
    }

    // <i onclick="updatedStatusModal(${data[i].id})" data-bs-toggle="modal" data-bs-target="#statusmodal"  
    // class="fa fa-file"></i>
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

function assignComplainToUser(complain_id){
    location.href = `${loginUrl}/complain/assigncomplain.html?c_id=${complain_id}`
}

function showComplainDetails(id) {
    location.href = `${loginUrl}/complain/complaindetails.html?c_id=${id}`
}
                                                                        //  get Complain With Pagination
var previousPage = 0;
function getComplain(number,size,next) {
    
    if(next){
        number = previousPage + 1
    }
    else if(next == false && previousPage > 0){
         number = previousPage-1
    }

    getData(`/admin/complain?pageNumber=${number}&pageSize=${size}`)
        .then((data) => {
            previousPage = number
            renderComplainData(data.content)
            renderPagination(data.totalPages) 
        })
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
    
    getUserData().then((data)=>{
        complainLog = {
            assignedFrom:{id:data.id},
            assignedTo:{id:28}
        }
        sendData(`/complainlog/${complain_id}`,complainLog)
    })

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

function  renderPagination(pages) {
        let renderPagination = ""

        renderPagination += `
        <li class="page-item" onclick="getComplain(${1},${10},${false})"><a class="page-link" href="#">Previous</a></li>`

        document.getElementById("pagination").innerHTML = renderPagination

        for (let i = 0; i < pages; i++) {
            renderPagination += `
            <li class="page-item" onclick="getComplain(${i},${10})"><a class="page-link" href="#">${i + 1}</a></li>
            `
        }
        document.getElementById("pagination").innerHTML = renderPagination

        renderPagination += `<li class="page-item"><a class="page-link" >--</a></li>
        <li class="page-item" onclick="getComplain(${pages- 1},${10})"><a class="page-link" href="#">${pages}</a></li>
        <li class="page-item"onclick="getComplain(${pages},${10},${true})"><a class="page-link" href="#">Next</a></li>`

        document.getElementById("pagination").innerHTML = renderPagination
    
}
// renderPagination()