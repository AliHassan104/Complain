var uid;
var mainAreaId;
var mainAddressId;
var allArea = []

function getUser() {
    let table = ""
    fetch("http://localhost:8081/api/admin/user",{
        headers:{
            // mode: 'no-cors',
            // "Authorization":jwtTokenBearer,
            "Content-Type":"application/json",
            
        }
    })
    .then((response)=>response.json())
    .then((data)=> {

        table += `<tr style="width: 100%; display: flex; justify-content: space-between;" class="tablepoint">
        <th style="width: 15%;" class="toptable ">Name</th>
        <th style="width: 15%;" class="toptable ">PhoneNumber</th>
        <th style="width: 20%;" class="toptable ">Email</th>
        <th style="width: 20%;" class="toptable ">Property</th>
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
            <td style="width: 20%;" class="datatable">${data[i].property}</td>
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
getUser()

getArea()

function getArea() {
    let table = ""
    fetch("http://localhost:8081/api/area",{
        headers:{
            "Content-Type":"application/json",
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
        allArea = data;
        table += `<select onchange="filterByArea()" id="dropdownareafilter"  class="form-control form-control-sm">`
        table +=  `<option value="ALL" selected>Select Area</option>`
        for (let i = 0; i < data.length; i++) {
            table += `
            <option value="${data[i].id}">${data[i].name}</option>
        `
        }
        table +=   `</select>`
        document.getElementById("dropdownarea1").innerHTML = table;
    })
}

function filterByArea(){
    var select = document.getElementById('dropdownareafilter');
    var area = select.options[select.selectedIndex].value;

    console.log(area);
    table = ""
    if (area == "ALL") {
        getUser()
    }
    else{
        fetch("http://localhost:8081/api/user/"+area,{
        headers:{
            // mode: 'no-cors',
            // "Authorization":jwtTokenBearer,
            "Content-Type":"application/json",
            
        }
    })
    .then((response)=>response.json()).catch(()=>{})
    .then((data)=> {

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
    })}
}

function deleteArea(id){
    
    fetch('http://localhost:8081/api/user/'+id, {
            method: 'DELETE'
    }).then(()=>{
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
    })

    setTimeout(() => {
        getUser()
    }, 200);
}

function exportDataToExcel(){
    fetch("http://localhost:8081/api/user/export",{
        headers:{
            "Content-Type":"application/octet-stream",
             
        },
        method:'GET'

    }).then((response)=>response.blob())
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

