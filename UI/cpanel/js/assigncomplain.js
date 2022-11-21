

var queryString = window.location.search
var parameters = new URLSearchParams(queryString);
var complain_id = parameters.get('c_id')

getComplainById()

function getComplainById(){
    getData(`/complain/${complain_id}`)
    .then((data)=>{
        document.getElementById("sub_heading").innerText = "List of "+data.area.name+" Workers "
        getAllWorkerByArea(data.area.id)
    })
}

function getAllWorkerByArea(area_id) {
    let table = ""
    
        getData(`/user/getallworkerbyarea/${area_id}`)
        .then((data) => {
            renderWorker(data)
        })
}

function renderWorker(data){
    let table = ""

    table += `<tr class="tablepoint">
                <th  class="toptable ">Name</th>
                <th  class="toptable ">PhoneNumber</th>
                <th  class="toptable ">Email</th>
                <th  class="toptable ">Property</th>
                <th  class="toptable ">Cnic</th>
                <th  class="toptable ">Area Name </th>
                <th  class="toptable ">Action </th>
                </tr>`
            for (let i = 0; i < data.length; i++) {
                table += `

            <tr class="tablepoint" >
                <td class="datatable">${data[i].firstname + " " + data[i].lastname}</td>
                <td class="datatable">${data[i].phoneNumber}</td>
                <td class="datatable">${data[i].email}</td>
                <td class="datatable">${data[i].property}</td>
                <td class="datatable">${data[i].cnic}</td>
                <td class="datatable">${data[i].area.name}</td>
                <td class="datatable"> 
                <i  onclick="assignComplainModal(${data[i].id})" data-bs-toggle="modal" data-bs-target="#statusmodal"  
             class="fa fa-file mouseHand"></i>

               </td>
        </tr>`
            }
            document.getElementById("show-Worker").innerHTML = table;

            if (data.length === 0) {
                noComplainFound = ""
                noComplainFound += `<span style=" margin: auto;text-align: center;width: 50%;height: 5vh; text-align: center; justify-content: center;font-size: large" 
                        class="alert alert-danger" role="alert" >No Worker Found</span> `
                document.getElementById("noRecordFound").innerHTML = noComplainFound
            }
            else{
                document.getElementById("noRecordFound").innerHTML = ""
            }
}


function assignComplainModal(worker_id){

     getData(`/user/${worker_id}`)
     .then((data)=>{
       
        document.getElementById("worker_id").value = data.id
        document.getElementById("worker_name").value = data.firstname+" "+data.lastname

        getData(`/complain/${complain_id}`)
        .then((data)=>{

            document.getElementById("complain_id").value = data.id
            document.getElementById("complain_type").value = data.complainType.name;

        })

     })

}

function updateStatus() {

    let complain_id = document.getElementById("complain_id").value
    let updatedstatus = document.getElementById("updatedstatus").value;

    
    let updatedstatusData = {
        status: updatedstatus
    }

    patchData(`/admin/complain/${complain_id}`,updatedstatusData)
        .then(data => {
            assignComplain(data.id)                                                      
            })
        .catch((error) => 
        {
            console.error('Error:', error);
        });
}



function assignComplain(complain_id){
    let description = document.getElementById("description").value ;
    let complainLog = {
        assignedFrom:{
            id:loginUserId
        },
        assignedTo: {
            id:document.getElementById("worker_id").value
        },
        description:description ,
        complain : {
            id : complain_id
        }

    }

    sendData(`/complainlog/${complain_id}`,complainLog)
    .then((data)=>{
        $('#assignStatusModal').modal('show');

        setTimeout(()=>{
            $('#assignStatusModal').modal('hide');
        },2000)
    })

}