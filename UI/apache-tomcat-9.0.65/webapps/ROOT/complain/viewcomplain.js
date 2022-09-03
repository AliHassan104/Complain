
setTimeout(() => {
    getComplain()
}, 1000);

function getComplain() {
    let table = ""
    fetch("http://localhost:8081/api/admin/complain",{
        headers:{
            // mode: 'no-cors',
            // "Authorization":jwtTokenBearer,
            "Content-Type":"application/json",
            
        }
    })
    .then((response)=>response.json())
    .then((data)=> {

        table += `
        <tr style="width: 100%; display: flex; justify-content: space-between;" class="tablepoint">

        <th style="width: 10%;" class="toptable ">User Name</th>
        <th style="width: 10%;" class="toptable ">Complain Type</th>
        <th style="width: 10%;" class="toptable ">Title</th>
        <th style="width: 10%;" class="toptable ">Description</th>
        <th style="width: 10%;" class="toptable ">Status</th>
        <th style="width: 10%;" class="toptable ">Date</th>
        <th style="width: 10%;" class="toptable ">Area</th>
        <th style="width: 20%;" class="toptable ">picture</th>
        <th style="width: 10%;" class="toptable ">Action</th>
        </tr>`
        for (let i = 0; i < data.length; i++) {
            table += `

        <tr class="tablepoint " style="width: 100%; display: flex; justify-content: space-between;" >
            <td style="width: 10%;" class="datatable">${data[i].user.firstname+" "+data[i].user.lastname}</td>
            <td style="width: 10%;" class="datatable">${data[i].complainType.name}</td>
            <td style="width: 10%;" class="datatable">${data[i].title}</td>
            <td style="width: 10%;" class="datatable">${data[i].description}</td>
            <td style="width: 10%;" class="datatable">${data[i].status}</td>
            <td style="width: 10%;" class="datatable">${data[i].date}</td>
            <td style="width: 10%;" class="datatable">${data[i].area.name}</td>
            <td style="width: 20%;" class="datatable"><img src="${data[i].picture}" alt="abc" style="width: 80%; height : 100px"> 
            <td style="width: 15%;" class="datatable"> 
            <i onclick="updateComplain(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;"  
            class="fa fa-pencil"></i>
            <i onclick="updatedStatusModal(${data[i].id})"  data-bs-toggle="modal" data-bs-target="#statusmodal"  
            style="padding-right: 15px; margin-right: 15px;"  class="fa fa-file"></i>
            <i onclick="deleteComplain(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
    </td>
        </tr>`
        //onclick="updatedStatusModal(${data[i].id})"
        }
        document.getElementById("datatables-reponsive").innerHTML = table;
    })
}

let uid;
function updatedStatusModal(id){
    uid = id
}

function updateStatus(){
    console.log(uid);
    let updatedstatus = document.getElementById("updatedstatus").value;

    console.log(updatedstatus);

    let updatedataus =  {
        status: updatedstatus
    }

    fetch('http://localhost:8081/api/admin/complain/'+uid, {
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

function updateComplain(id){
    fetch('http://localhost:8081/api/complain/'+id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    
}

function deleteComplain(id){
    
    fetch('http://localhost:8081/api/complain/'+id, {
            method: 'DELETE'
    }).catch(()=>{
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
            Complain Type  Deleted Successfully
            </div>`

        document.getElementById("formSubmitted").innerHTML = table
    })

    setTimeout(() => {
        getComplain()
    }, 100);

}

function filterComplainByStatus(){
    var select = document.getElementById('complainStatus');
    var status = select.options[select.selectedIndex].value;

    var select = document.getElementById('dropdownarea');
    var area = select.options[select.selectedIndex].value;

    var select = document.getElementById('dropdowncomplaintype');
    var complaintype = select.options[select.selectedIndex].value;

    console.log(area+" "+status+" "+complaintype);


    let table = ""
    fetch("http://localhost:8081/api/admin/complain",{
        headers:{
            "Content-Type":"application/json",
            
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
        // console.log(data);
        // table += `<h2 style="display: inline-table;">${status}</h2>`

        table += `
        <tr style="width: 100%; display: flex; justify-content: space-between;" class="tablepoint">
        <th style="width: 10%;" class="toptable ">User Name</th>
        <th style="width: 10%;" class="toptable ">Complain Type</th>
        <th style="width: 10%;" class="toptable ">Title</th>
        <th style="width: 10%;" class="toptable ">Description</th>
        <th style="width: 10%;" class="toptable ">Status</th>
        <th style="width: 10%;" class="toptable ">Date</th>
        <th style="width: 10%;" class="toptable ">Area</th>
        <th style="width: 20%;" class="toptable ">Picture</th>
        <th style="width: 10%;" class="toptable ">Action</th>
        </tr>`
        for (let i = 0; i < data.length; i++) {

            if (status == "ALL" && area == "ALL" && complaintype == "ALL") {
                getComplain();
                console.log("all");
                break;
            }

            if (data[i].status == status && status != "ALL" && area == "ALL" && complaintype == "ALL") {
                console.log(status);
                table += `
                <tr class="tablepoint " style="width: 100%; display: flex; justify-content: space-between;" >
                <td style="width: 10%;" class="datatable">${data[i].user.firstname+" "+data[i].user.lastname}</td>
                <td style="width: 10%;" class="datatable">${data[i].complainType.name}</td>
                <td style="width: 10%;" class="datatable">${data[i].title}</td>
                <td style="width: 10%;" class="datatable">${data[i].description}</td>
                <td style="width: 10%;" class="datatable">${data[i].status}</td>
                <td style="width: 10%;" class="datatable">${data[i].date}</td>
                <td style="width: 10%;" class="datatable">${data[i].area.name}</td>
                <td style="width: 20%;" class="datatable"><img src="${data[i].picture}" alt="abc" style="width: 80%; height : 100px"> 
            <td style="width: 10%;" class="datatable"> 
                <i onclick="updateComplain(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
                <i onclick="deleteComplain(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
                </td>
                </tr>`
            }
            
            if (data[i].complainType.name == complaintype && status == "ALL" && area == "ALL" && complaintype != "ALL") {
               console.log(1);
               
                table += `
                <tr class="tablepoint " style="width: 100%; display: flex; justify-content: space-between;" >
                <td style="width: 10%;" class="datatable">${data[i].user.firstname+" "+data[i].user.lastname}</td>
                <td style="width: 10%;" class="datatable">${data[i].complainType.name}</td>
                <td style="width: 10%;" class="datatable">${data[i].title}</td>
                <td style="width: 10%;" class="datatable">${data[i].description}</td>
                <td style="width: 10%;" class="datatable">${data[i].status}</td>
                <td style="width: 10%;" class="datatable">${data[i].date}</td>
                <td style="width: 10%;" class="datatable">${data[i].area.name}</td>
                <td style="width: 20%;" class="datatable"><img src="${data[i].picture}" alt="abc" style="width: 80%; height : 100px"> 
            <td style="width: 10%;" class="datatable"> 
                <i onclick="updateComplain(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
                <i onclick="deleteComplain(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
                </td>
                </tr>`

                console.log(2)

            }

            if (data[i].area.name == area && status == "ALL" && area != "ALL" && complaintype == "ALL") {
                console.log(area);
                table += `
                <tr class="tablepoint " style="width: 100%; display: flex; justify-content: space-between;" >
                <td style="width: 10%;" class="datatable">${data[i].user.firstname+" "+data[i].user.lastname}</td>
                <td style="width: 10%;" class="datatable">${data[i].complainType.name}</td>
                <td style="width: 10%;" class="datatable">${data[i].title}</td>
                <td style="width: 10%;" class="datatable">${data[i].description}</td>
                <td style="width: 10%;" class="datatable">${data[i].status}</td>
                <td style="width: 10%;" class="datatable">${data[i].date}</td>
                <td style="width: 10%;" class="datatable">${data[i].area.name}</td>
                <td style="width: 20%;" class="datatable"><img src="${data[i].picture}" alt="abc" style="width: 80%; height : 100px"> 
                <td style="width: 10%;" class="datatable"> 
                <i onclick="updateComplain(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
                <i onclick="deleteComplain(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
                </td>
                </tr>`
            }







            if (data[i].area.name == area && data[i].complainType.name == complaintype && status == "ALL" && area != "ALL" && complaintype != "ALL") {
                console.log(area + complaintype);
                table += `
                <tr class="tablepoint " style="width: 100%; display: flex; justify-content: space-between;" >
                <td style="width: 10%;" class="datatable">${data[i].user.firstname+" "+data[i].user.lastname}</td>
                <td style="width: 10%;" class="datatable">${data[i].complainType.name}</td>
                <td style="width: 10%;" class="datatable">${data[i].title}</td>
                <td style="width: 10%;" class="datatable">${data[i].description}</td>
                <td style="width: 10%;" class="datatable">${data[i].status}</td>
                <td style="width: 10%;" class="datatable">${data[i].date}</td>
                <td style="width: 10%;" class="datatable">${data[i].area.name}</td>
                <td style="width: 20%;" class="datatable"><img src="${data[i].picture}" alt="abc" style="width: 80%; height : 100px"> 
                <td style="width: 10%;" class="datatable"> 
                <i onclick="updateComplain(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
                <i onclick="deleteComplain(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
                </td>
                </tr>`
            }
            
            if (data[i].area.name == area && data[i].status == status && status != "ALL" && area != "ALL" && complaintype == "ALL") {
                console.log(area+status);
                table += `
                <tr class="tablepoint " style="width: 100%; display: flex; justify-content: space-between;" >
                <td style="width: 10%;" class="datatable">${data[i].user.firstname+" "+data[i].user.lastname}</td>
                <td style="width: 10%;" class="datatable">${data[i].complainType.name}</td>
                <td style="width: 10%;" class="datatable">${data[i].title}</td>
                <td style="width: 10%;" class="datatable">${data[i].description}</td>
                <td style="width: 10%;" class="datatable">${data[i].status}</td>
                <td style="width: 10%;" class="datatable">${data[i].date}</td>
                <td style="width: 10%;" class="datatable">${data[i].area.name}</td>
                <td style="width: 20%;" class="datatable">${data[i].picture}</td>
                <td style="width: 20%;" class="datatable"><img src="${data[i].picture}" alt="abc" style="width: 80%; height : 100px"> 
                <i onclick="updateComplain(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
                <i onclick="deleteComplain(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
                </td>
                </tr>`
            }

            if (data[i].complainType.name == complaintype && data[i].status != status && status == "ALL" && area != "ALL" && complaintype == "ALL") {
                console.log(complaintype + status);
                table += `
                <tr class="tablepoint " style="width: 100%; display: flex; justify-content: space-between;" >
                <td style="width: 10%;" class="datatable">${data[i].user.firstname+" "+data[i].user.lastname}</td>
                <td style="width: 10%;" class="datatable">${data[i].complainType.name}</td>
                <td style="width: 10%;" class="datatable">${data[i].title}</td>
                <td style="width: 10%;" class="datatable">${data[i].description}</td>
                <td style="width: 10%;" class="datatable">${data[i].status}</td>
                <td style="width: 10%;" class="datatable">${data[i].date}</td>
                <td style="width: 10%;" class="datatable">${data[i].area.name}</td>
                <td style="width: 20%;" class="datatable"><img src="${data[i].picture}" alt="abc" style="width: 80%; height : 100px"> 
                <td style="width: 10%;" class="datatable"> 
                <i onclick="updateComplain(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
                <i onclick="deleteComplain(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
                </td>
                </tr>`
            }

            if (data[i].complainType.name == complaintype && data[i].status == status  && data[i].area.name == area ) {
                console.log(complaintype + status + area);
                table += `
                <tr class="tablepoint " style="width: 100%; display: flex; justify-content: space-between;" >
                <td style="width: 10%;" class="datatable">${data[i].user.firstname+" "+data[i].user.lastname}</td>
                <td style="width: 10%;" class="datatable">${data[i].complainType.name}</td>
                <td style="width: 10%;" class="datatable">${data[i].title}</td>
                <td style="width: 10%;" class="datatable">${data[i].description}</td>
                <td style="width: 10%;" class="datatable">${data[i].status}</td>
                <td style="width: 10%;" class="datatable">${data[i].date}</td>
                <td style="width: 10%;" class="datatable">${data[i].area.name}</td>
                <td style="width: 20%;" class="datatable"><img src="${data[i].picture}" alt="abc" style="width: 80%; height : 100px"> 
                <td style="width: 10%;" class="datatable"> 
                <i onclick="updateComplain(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
                <i onclick="deleteComplain(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
                </td>
                </tr>`
            }

        }
        document.getElementById("datatables-reponsive").innerHTML = table;
    })
}
// getArea()
// getComplainType()

// function getArea() {
//     let table = ""
//     fetch("http://localhost:8081/api/area",{
//         headers:{
//             "Content-Type":"application/json",
//         }
//     })
//     .then((response)=>response.json())
//     .then((data)=> {
        
//         table +=  `<option value="ALL" selected>ALL</option>`
//         for (let i = 0; i < data.length; i++) {
//             table += `
//             <option value="${data[i].name}">${data[i].name}</option>
//         `
//         }
//         document.getElementById("dropdownarea").innerHTML = table;
//     })
// }
// function getComplainType() {
//     let table = ""
//     fetch("http://localhost:8081/api/complaintype",{
//         headers:{
//             "Content-Type":"application/json",
//         }
//     })
//     .then((response)=>response.json())
//     .then((data)=> {
//         table +=  `<option value="ALL" selected>ALL</option>`
//         for (let i = 0; i < data.length; i++) {
//             table += `
//             <option value="${data[i].name}">${data[i].name}</option>
//         `
//         }
//         document.getElementById("dropdowncomplaintype").innerHTML = table;
//     })
// }
