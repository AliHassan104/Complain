
getComplain()
let uid ;

function getComplain() {
    let table = ""
    fetch("http://localhost:8081/api/complaintype",{
        headers:{
            // mode: 'no-cors',
            // "Authorization":jwtTokenBearer,
            "Content-Type":"application/json",
            
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
        table += `<h2 style="display: inline-table;">Complain Type</h2>`

        table += `
        <tr style="width: 100%; display: flex; justify-content: space-between;" class="tablepoint">
        <th style="width: 20%;" class="toptable ">S.NO</th>
        <th style="width: 70%;" class="toptable ">Complain Type</th>
        <th style="width: 10%;" class="toptable ">Action</th>
        </tr>`
        for (let i = 0; i < data.length; i++) {
            table += `

        <tr class="tablepoint " style="width: 100%; display: flex; justify-content: space-between;" >
            <td style="width: 20%;" class="datatable">${i+1}</td>
            <td style="width: 70%;" class="datatable">${data[i].name}</td>
            <td style="width: 10%;" class="datatable"> 
            <i onclick="modalValue(${data[i].id})" data-bs-toggle="modal" data-bs-target="#exampleModal"  
            style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
            <i onclick="deleteComplainType(${data[i].id})" 
             href="addcomplaintype.html" style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
    </td>
        </tr>`
        }
        document.getElementById("complaintypetable").innerHTML = table;
    })
}

function modalValue(id){
    uid = id
    console.log(id)
    fetch("http://localhost:8081/api/complaintype/"+id,{
        headers:{
            "Content-Type":"application/json",
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
    document.getElementById("complaintype").value = data.name;
    return data.name;
    })
}

function updateComplainType(){
    console.log(uid);
    let complaintype = document.getElementById("complaintype").value;

    updatedComplainType = {name : complaintype}; 
    console.log(updatedComplainType);
    fetch('http://localhost:8081/api/complaintype/'+uid, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedComplainType)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

            setTimeout(() => {
                getComplain()
            }, 500);
}


function deleteComplainType(id){
    fetch('http://localhost:8081/api/complaintype/'+id, {
            method: 'DELETE'
    })
    setTimeout(() => {
        getComplain()
    }, 100);
}


