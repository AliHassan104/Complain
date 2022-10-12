var uid;
var mainAreaId;
var mainAddressId;
var allArea = []

function getUser() {
    let table = ""

        getData(`/user/userbystatus/in_review`)
        .then((data) => {

            table += `<tr  class="tablepoint">
        <th class="toptable ">Name</th>
        <th class="toptable ">PhoneNumber</th>
        <th class="toptable ">Email</th>
        <th class="toptable ">Property</th>
        <th class="toptable ">Cnic</th>
        <th class="toptable ">Area Name </th>
        <th class="toptable ">Action </th>
        </tr>`
            for (let i = 0; i < data.length; i++) {
                table += `

        <tr class="tablepoint"  >
            <td class="datatable">${data[i].firstname + " " + data[i].lastname}</td>
            <td class="datatable">${data[i].phoneNumber}</td>
            <td class="datatable">${data[i].email}</td>
            <td class="datatable">${data[i].property}</td>
            <td class="datatable">${data[i].cnic}</td>
            <td class="datatable">${data[i].area.name}</td>

            <td  class="datatable"> 
            <a href="/adduser.html?id=${data[i].id}">
            <i data-bs-toggle="modal" data-bs-target="#exampleModal"  
            style=" margin-right: 4px;"  class="fa fa-pencil"></i>
            </a>

            <i onclick="updatedStatusModal(${data[i].id})" data-bs-toggle="modal" data-bs-target="#statusmodal"  
            style="margin-right: 4px; "  class="fa fa-file"></i>

            <i onclick="deleteUser(${data[i].id})"  class="fa fa-close"></i>
    </td>
        </tr>`
            }
            document.getElementById("showUserData").innerHTML = table;

            if (data.length === 0) {
                noRecordFound = ""
                noRecordFound += `<span style=" margin: auto;text-align: center;width: 50%;height: 5vh; text-align: center; justify-content: center;font-size: large" 
                        class="alert alert-danger" role="alert" >No User Found</span> `
                document.getElementById("noRecordFound").innerHTML = noRecordFound
            }
            else{
                document.getElementById("noRecordFound").innerHTML = ""
            }
        })
}
getUser()

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


function deleteUser(id) {


    deleteData(`/user/${id}`)
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
            class="alert alert-danger" role="alert">
            User Deleted Successfully
            </div>`

        document.getElementById("formSubmitted").innerHTML = table

        setTimeout(()=>{
            document.getElementById("formSubmitted").innerHTML = ""
        },2000)

        getUser()
    })


       
   
}

function exportDataToExcel() {
    fetch(`${baseUrl}/api/user/export`, {
        headers: {
            "Content-Type": "application/octet-stream",

        },
        method: 'GET'

    }).then((response) => response.blob())
        .then(blob => URL.createObjectURL(blob))

        .then(uril => {
            var link = document.createElement("a");
            link.href = uril;
            link.download = "UserData" + ".xlsx";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        });

}

let getUserIdFromStatusModal;
function updatedStatusModal(id) {
    getUserIdFromStatusModal = id
}

function updateUserStatus() {
    let updatedstatus = document.getElementById("updatedstatus").value;
    
    let updatedstatusObj = {
        status: updatedstatus
    }

        patchData(`/admin/userstatus/${getUserIdFromStatusModal}`,updatedstatusObj)
        .then(data => {
                getUser()
        })
        .catch((error) => {
            console.error('Error:', error);
        });
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
