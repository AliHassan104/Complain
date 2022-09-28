
let queryString = window.location.search;
var complainStatus;

if (queryString != "") {
    let parameters = new URLSearchParams(queryString);
    complainStatus= parameters.get("status")
    filterComplainByStatus()
}
else {
    getComplain()
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
        getComplain()
    }
}
{/* <th style="width: 20%;" class="toptable ">picture</th> */}
{/* <td style="width: 20%;" class="datatable mouseHand" onclick=showComplainDetails(${data[i].id})><img src="${data[i].picture}" alt="abc" style="width: 80%; height : 100px">  */}

{/* <tr  class="tablepoint">

<th  class="toptable ">User Name</th>
<th  class="toptable ">Complain Type</th>
<th class="toptable ">Description</th>
<th  class="toptable ">Status</th>
<th  class="toptable ">Date</th>
<th  class="toptable ">Area</th>
<th class="toptable ">Action</th>
</tr> */}

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


function getComplain() {

        getData(`/admin/complain`)
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

    let updatedstatus1 = {
        status: updatedstatus
    }

    patchData(`/admin/complain/${uid}`,updatedstatus1)
        .then(data => {
           
                getComplain()
           
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


function deleteComplain(id) {


        deleteData(`/complain/${id}`)
        .then(() => {
            getComplain()
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

    // setTimeout(() => {
       
    // }, 100);

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

