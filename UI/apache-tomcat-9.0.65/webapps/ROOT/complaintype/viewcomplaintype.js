
getComplain()
let uid ;

function getComplain() {
    let table = ""
    // fetch("http://localhost:8081/api/complaintype",{
    fetch(`${baseUrl}/api/complaintype`,{
        headers:{
            // mode: 'no-cors',
            // "Authorization":jwtTokenBearer,
            "Content-Type":"application/json",
            
        }
    })
    .then((response)=>response.json()).catch(()=>{})
    .then((data)=> {

        table += `
        <tr style="width: 100%; display: flex; justify-content: space-between;" class="tablepoint">
        <th style="width: 10%;" class="toptable ">S. NO</th>
        <th style="width: 60%;" class="toptable ">Complain Type</th>
        <th style="width: 30%;" class="toptable ">Action</th>
        </tr>`
        for (let i = 0; i < data.length; i++) {
            if (data.length != null) {
                table += `
    
            <tr class="tablepoint " style="width: 100%; display: flex; justify-content: space-between;">
    
                <td style="width: 10%;" class="datatable">${i+1}</td>
                <td style="width: 60%;" class="datatable">${data[i].name}</td>
                <td style="width: 30%;" class="datatable"> 
                <a  href="/complaintype/addcomplaintype.html?id=${data[i].id}">
                <i onclick="modalValue(${data[i].id})" data-bs-toggle="modal" data-bs-target="#exampleModal"  
                style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
                </a>
                
                <i onclick="deleteComplainType(${data[i].id})" 
                 href="addcomplaintype.html" style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
                </td>
            </tr>`
            }else{
                table += `<h2>No Record Found</h2>`
            }
        }
        document.getElementById("datatables-reponsive").innerHTML = table;
    })
}

// function modalValue(id){
//     uid = id

//     console.log(id)

//     fetch("http://localhost:8081/api/complaintype/"+id,{
//         headers:{
//             "Content-Type":"application/json",
//         }
//     })

//     .then((response)=>response.json())
//     .then((data)=> {
//     document.getElementById("complaintype").value = data.name;
    
//     })
// }

// function updateComplainType(){
//     console.log(uid);
//     let complaintype = document.getElementById("complaintype").value;

//     updatedComplainType = {name : complaintype}; 
//     console.log(updatedComplainType);
//     fetch('http://localhost:8081/api/complaintype/'+uid, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(updatedComplainType)
//         })
//             .then(response => response.json())
//             .then(data => {
//                 console.log('Success:', data);
//             })
//             .catch((error) => {
//                 console.error('Error:', error);
//             });

//             setTimeout(() => {
//                 getComplain()
//             }, 500);
// }


function deleteComplainType(id){
    fetch('http://localhost:8081/api/complaintype/'+id, {
            method: 'DELETE' ,
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
            Complain Type  Deleted Successfully
            </div>`

        document.getElementById("formSubmitted").innerHTML = table
    })

    setTimeout(() => {
        getComplain()
        
    }, 300);
}


