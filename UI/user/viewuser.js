var uid;
var mainAreaId;
var mainAddressId;
var allArea = []

function getUser() {
    let table = ""

    getData(`/admin/user`)
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

        <tr class="tablepoint"" >
            <td class="datatable mouseHand" onclick="userDetails(${data[i].id})">${data[i].firstname + " " + data[i].lastname}</td>
            <td class="datatable mouseHand" onclick="userDetails(${data[i].id})">${data[i].phoneNumber}</td>
            <td class="datatable mouseHand" onclick="userDetails(${data[i].id})">${data[i].email}</td>
            <td class="datatable mouseHand" onclick="userDetails(${data[i].id})">${data[i].property}</td>
            <td class="datatable mouseHand" onclick="userDetails(${data[i].id})">${data[i].cnic}</td>
            <td class="datatable mouseHand" onclick="userDetails(${data[i].id})">${data[i].area.name}</td>

            <td  class="datatable"> 
            <a href="/user/adduser.html?id=${data[i].id}">
            <i data-bs-toggle="modal" data-bs-target="#exampleModal"  
             class="fa fa-pencil"></i>
            </a>

            <i onclick="deleteUser(${data[i].id})" class="fa fa-close"></i>
    </td>
        </tr>`
            }
            document.getElementById("datatables-reponsive").innerHTML = table;
        })
}
// style="padding-right: 15px; margin-right: 5px;" 
getUser()

getArea()

function userDetails(id){
    location.href = `${loginUrl}/user/userdetails.html?u_id=${id}`
}

function getArea() {
    let table = ""

        getArea(`/area`)
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
