var uid;
var mainAreaId;
var mainAddressId;
var allArea = []

function getUser() {
    let table = ""

        getData(`/user/userbystatus/in_review`)
        .then((data) => {

            table += `<tr style="width: 100%; display: flex; justify-content: space-between;" class="tablepoint">
        <th style="width: 15%;" class="toptable ">Name</th>
        <th style="width: 15%;" class="toptable ">PhoneNumber</th>
        <th style="width: 23%;" class="toptable ">Email</th>
        <th style="width: 10%;" class="toptable ">Property</th>
        <th style="width: 20%;" class="toptable ">Cnic</th>
        <th style="width: 15%;" class="toptable ">Area Name </th>
        <th style="width: 15%;" class="toptable ">Action </th>
        </tr>`
            for (let i = 0; i < data.length; i++) {
                table += `

        <tr class="tablepoint" style="width: 100%; display: flex; justify-content: space-between;" >
            <td style="width: 15%;" class="datatable">${data[i].firstname + " " + data[i].lastname}</td>
            <td style="width: 15%;" class="datatable">${data[i].phoneNumber}</td>
            <td style="width: 23%;" class="datatable">${data[i].email}</td>
            <td style="width: 10%;" class="datatable">${data[i].property}</td>
            <td style="width: 20%;" class="datatable">${data[i].cnic}</td>
            <td style="width: 15%;" class="datatable">${data[i].area.name}</td>

            <td style="width: 15%;" class="datatable"> 
            <a href="/user/adduser.html?id=${data[i].id}">
            <i data-bs-toggle="modal" data-bs-target="#exampleModal"  
            style="padding-right: 5px; margin-right: 7px;"  class="fa fa-pencil"></i>
            </a>

            <i onclick="updatedStatusModal(${data[i].id})" data-bs-toggle="modal" data-bs-target="#statusmodal"  
            style="padding-right: 15px;margin-right: 5px; "  class="fa fa-file"></i>

            <i onclick="deleteUser(${data[i].id})"  style="padding-right: 2px; margin-right: 2px;" class="fa fa-close"></i>
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
    fetch("http://localhost:8081/api/user/export", {
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