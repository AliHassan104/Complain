
let queryString = window.location.search;
if (queryString != "") {
    filterComplainByStatus()
}
else {
    getComplain()
}

                                                        // filterByStatus

function filterComplainByStatus() {

    let status;

    if (queryString != "") {
        let parameters = new URLSearchParams(queryString);
        status = parameters.get("status")
    }
    else {
        status = document.getElementById("filterByStatus").value;
    }

    search = {
        "key": "status",
        "operation": ":",
        "value": status
    }

    if (status !== "All") {
        fetch(`${baseUrl}/api/complain/searchByStatus`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(search)

        }).then((response) => response.json()).catch(() => { })
            .then((data) => {
                renderComplainData(data)
            })
    }
    else{
        getComplain()
    }
}

function renderComplainData(data) {
   
    let table = ""
    table += `
        <tr style="width: 100%; display: flex; justify-content: space-between;" class="tablepoint">

        <th style="width: 10%;" class="toptable ">User Name</th>
        <th style="width: 10%;" class="toptable ">Complain Type</th>
        <th style="width: 15%;" class="toptable ">Description</th>
        <th style="width: 10%;" class="toptable ">Status</th>
        <th style="width: 10%;" class="toptable ">Date</th>
        <th style="width: 10%;" class="toptable ">Area</th>
        <th style="width: 20%;" class="toptable ">picture</th>
        <th style="width: 15%;" class="toptable ">Action</th>
        </tr>`

    for (let i = 0; i < data.length; i++) {
        table += `

        <tr class="tablepoint " style="width: 100%; display: flex; justify-content: space-between;" >
            
            <td style="width: 10%;" class="datatable mouseHand" onclick=showComplainDetails(${data[i].id}) >${data[i].user.firstname + " " + data[i].user.lastname}</td>
            <td style="width: 10%;" class="datatable mouseHand" onclick=showComplainDetails(${data[i].id})>${data[i].complainType.name}</td>
            <td style="width: 15%;" class="datatable mouseHand" onclick=showComplainDetails(${data[i].id})>${data[i].description}</td>
            <td style="width: 10%;" class="datatable mouseHand" onclick=showComplainDetails(${data[i].id})>${data[i].status}</td>
            <td style="width: 10%;" class="datatable mouseHand" onclick=showComplainDetails(${data[i].id})>${data[i].date}</td>
            <td style="width: 10%;" class="datatable mouseHand" onclick=showComplainDetails(${data[i].id})>${data[i].area.name}</td>
            <td style="width: 20%;" class="datatable mouseHand" onclick=showComplainDetails(${data[i].id})><img src="${data[i].picture}" alt="abc" style="width: 80%; height : 100px"> 
           
            <td style="width: 15%;" class="datatable"> 
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


function getComplain() {

    fetch(`${baseUrl}/api/admin/complain`, {
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((response) => response.json()).catch(() => { })
        .then((data) => {
            renderComplainData(data)
        })

}

let uid;
function updatedStatusModal(id) {
    uid = id
}

function updateStatus() {
    let updatedstatus = document.getElementById("updatedstatus").value;

    let updatedataus = {
        status: updatedstatus
    }

    fetch(`${baseUrl}/api/admin/complain/` + uid, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedataus),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            setTimeout(() => {
                getComplain()
            }, 100);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


function deleteComplain(id) {

    fetch(`${baseUrl}/api/complain/` + id, {
        method: 'DELETE'
    })
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
            Complain Deleted Successfully
            </div>`

            document.getElementById("formSubmitted").innerHTML = table

            setTimeout(() => {
                document.getElementById("formSubmitted").innerHTML = ""
            }, 2000)
        })

    setTimeout(() => {
        getComplain()
    }, 100);

}

getArea()

function getArea() {
    let table = ""
    fetch(`${baseUrl}/api/area`, {
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((response) => response.json())
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

function filterByArea() {
    var select = document.getElementById('dropdownareafilter');
    var area = select.options[select.selectedIndex].value;

    console.log(area);
    table = ""
    if (area == "ALL") {
        getUser()
    }
    else {
        fetch(`${baseUrl}/api/complain/` + area, {
            headers: {

                "Content-Type": "application/json",

            }
        })
            .then((response) => response.json()).catch(() => { })
            .then((data) => {
                console.log(data);
                if (data != undefined) {

                    table += `<tr style="width: 100%; display: flex; justify-content: space-between;" class="tablepoint">
            <th style="width: 15%;" class="toptable ">Name</th>
        <th style="width: 15%;" class="toptable ">PhoneNumber</th>
        <th style="width: 20%;" class="toptable ">Email</th>
        <th style="width: 20%;" class="toptable ">Cnic</th>
        <th style="width: 15%;" class="toptable ">Area Name </th>
        <th style="width: 15%;" class="toptable ">Action </th>
        </tr>`
                    for (let i = 0; i < data.length; i++) {
                        table += `

        <tr class="tablepoint" style="width: 100%; display: flex; justify-content: space-between;" >
            <td style="width: 15%;" class="datatable">${data[i].firstname + " " + data[i].lastname}</td>
            <td style="width: 15%;" class="datatable">${data[i].phoneNumber}</td>
            <td style="width: 20%;" class="datatable">${data[i].email}</td>
            <td style="width: 20%;" class="datatable">${data[i].cnic}</td>
            <td style="width: 15%;" class="datatable">${data[i].area.name}</td>
            <td style="width: 15%;" class="datatable"> 
            <a href="/user/adduser.html?id=${data[i].id}">
            <i data-bs-toggle="modal" data-bs-target="#exampleModal"  
            style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
            </a>
            <i onclick="deleteArea(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
    </td>
        </tr>`
                    }
                    document.getElementById("datatables-reponsive").innerHTML = table;
                }
            })
    }
}




function filterByStatus() {
    var select = document.getElementById('dropdownstatusfilter');
    var status = select.options[select.selectedIndex].value;

    console.log(status);
    table = ""
    if (status == "ALL") {
        getComplain()
    }
    else {
        fetch(`${baseUrl}/api/complain/` + status, {
            headers: {
                // mode: 'no-cors',
                // "Authorization":jwtTokenBearer,
                "Content-Type": "application/json",

            }
        })
            .then((response) => response.json()).catch(() => { })
            .then((data) => {

                table += `<tr style="width: 100%; display: flex; justify-content: space-between;" class="tablepoint">
        <th style="width: 15%;" class="toptable ">Name</th>
        <th style="width: 15%;" class="toptable ">PhoneNumber</th>
        <th style="width: 20%;" class="toptable ">Email</th>
        <th style="width: 20%;" class="toptable ">Cnic</th>
        <th style="width: 15%;" class="toptable ">Area Name </th>
        <th style="width: 15%;" class="toptable ">Action </th>
        </tr>`
                for (let i = 0; i < data.length; i++) {
                    table += `

        <tr class="tablepoint" style="width: 100%; display: flex; justify-content: space-between;" >
            <td style="width: 15%;" class="datatable">${data[i].firstname + " " + data[i].lastname}</td>
            <td style="width: 15%;" class="datatable">${data[i].phoneNumber}</td>
            <td style="width: 20%;" class="datatable">${data[i].email}</td>
            <td style="width: 20%;" class="datatable">${data[i].cnic}</td>
            <td style="width: 15%;" class="datatable">${data[i].area.name}</td>
            <td style="width: 15%;" class="datatable"> 
            <a href="/user/adduser.html?id=${data[i].id}">
            <i data-bs-toggle="modal" data-bs-target="#exampleModal"  
            style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
            </a>
            <i onclick="deleteArea(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
    </td>
        </tr>`
                }
                document.getElementById("datatables-reponsive").innerHTML = table;
            })
    }
}