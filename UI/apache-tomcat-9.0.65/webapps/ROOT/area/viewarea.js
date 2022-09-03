let uid ;

function getArea() {
    let table = ""
    fetch("http://localhost:8081/api/area",{
        headers:{
            "Content-Type":"application/json",
        }
    })
    .then((response)=>response.json())
    .then((data)=> {

        table += `<tr style="width: 100%; display: flex; justify-content: space-evenly;" class="tablepoint">
        <th style="width: 40%;" class="toptable ">Name</th>
        <th style="width: 30%;" class="toptable ">Block</th>
        <th style="width: 30%;" class="toptable ">Action</th>
        </tr>`

        for (let i = 0; i < data.length; i++) {
            table += `

        <tr class="tablepoint " style="width: 100%; display: flex; justify-content: space-evenly;" >
            <td style="width: 40%;" class="datatable">${data[i].name}</td>
            <td style="width: 30%;" class="datatable">${data[i].postalCode}</td>
            <td style="width: 30%;" class="datatable"> 

            <a  href="/area/addarea.html?id=${data[i].id}"> 
            <i  data-bs-toggle="modal" data-bs-target="#exampleModal"  
            style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
            </a>
            
           <i onclick="deleteArea(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
    </td>
        </tr>`
        }
        document.getElementById("datatables-reponsive").innerHTML = table;
    })
}
getArea()

function updateArea(){

    let name = document.getElementById("name").value;
    let block = document.getElementById("block").value;
    let postalcode = document.getElementById("postalcode").value;

    newArea = {name : name , block : block , postalCode : postalcode}; 
    console.log(newArea);

    fetch('http://localhost:8081/api/area/'+uid, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newArea),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

            setTimeout(() => {
                getArea()
            }, 500);
}

function deleteArea(id){
    console.log(id);

    fetch('http://localhost:8081/api/area/'+id, {
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
            Area  Deleted Successfully
            </div>`

        document.getElementById("formSubmitted").innerHTML = table
    })

    setTimeout(() => {
        getArea()
    }, 300);
}

// function modalValue(id){
//     uid = id
//     fetch("http://localhost:8081/api/area/"+id,{
//         headers:{
//             "Content-Type":"application/json",
//         }
//     })
//     .then((response)=>response.json())
//     .then((data)=> {
//     document.getElementById("name").value = data.name;
//     // document.getElementById("block").value = data.block;
//     document.getElementById("postalcode").value = data.postalCode;

//     })
// }
