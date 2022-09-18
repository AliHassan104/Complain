getBlock()
let uid;
function getBlock() {
    let table = ""
    fetch(`${baseUrl}/api/block`,{
        headers:{
            "Content-Type":"application/json",
        }
    })
    .then((response)=>response.json()).catch(()=>{})
    .then((data)=> {
        console.log(data);
        table += `
        <tr style="width: 100%; display: flex; justify-content: space-between;" class="tablepoint">
        <th style="width: 33%;" class="toptable ">Area</th>
        <th style="width: 33%;" class="toptable ">Block</th>
        <th style="width: 34%;" class="toptable ">Action</th>
        </tr>`
        if (data != null) {
        for (let i = 0; i < data.length; i++) {
            table += `

        <tr class="tablepoint " style="width: 100%; display: flex; justify-content: space-between;" >
            <td style="width: 33%;" class="datatable">${data[i].area.name}</td>
            <td style="width: 33%;" class="datatable">${data[i].block_name}</td>
            <td style="width: 34%;" class="datatable">
            
            <a  href="/area/addblock.html?id=${data[i].id}">
            <i
            style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
            </a>

            <i onclick="deleteBlock(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
    </td>
        </tr>`
        }
    }
    document.getElementById("datatables-reponsive").innerHTML = table;
})
// table += ``

}

function updateblock(){

    var select = document.getElementById('dropdownarea');
    var area = select.options[select.selectedIndex].value;

    let block = document.getElementById("block").value;

    newArea = {area :{
        id : area
    } , block : block
    }; 
    
    console.log(newArea);
    
    fetch(`${baseUrl}/api/watertiming/`+uid, {
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
                getBlock()
            }, 1000);
        }
    
        
function deleteBlock(id){  
    fetch(`${baseUrl}/api/watertiming/`+id, {
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
            Block  Deleted Successfully
            </div>`

        document.getElementById("formSubmitted").innerHTML = table
    })

    setTimeout(() => {
        getBlock()
    }, 100);
}

function modalValue(id){
    uid = id
    getArea()
    fetch(`${baseUrl}/api/watertiming/`+id,{
        headers:{
            "Content-Type":"application/json",
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
    console.log(data.area.name);
     
    document.getElementById("block").value = data.block;

    })
}


function getArea() {
    let table = ""
    fetch(`${baseUrl}/api/area`,{
        headers:{
            "Content-Type":"application/json",
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
        console.log(data);
        for (let i = 0; i < data.length; i++) {


            table += `
            <option value="${data[i].id}">${data[i].name}</option>
        `
        }
        document.getElementById("dropdownarea").innerHTML = table;
    })
}

// function getAreafilter() {
//     let table = ""
//     fetch("http://localhost:8081/api/area",{
//         headers:{
//             "Content-Type":"application/json",
//         }
//     })
//     .then((response)=>response.json())
//     .then((data)=> {
//         console.log(data);
//         table += `
//         <option value="ALL">ALL</option>`
//         for (let i = 0; i < data.length; i++) {
//             table += `
//             <option value="${data[i].name}">${data[i].name}</option>
//         `
//         }
//         document.getElementById("dropdownareafilter").innerHTML = table;
//     })
// }

// getAreafilter()

// function filterWaterTimingByArea() {
    
//     table = ""
    
//     var select = document.getElementById('dropdownareafilter');
//     var area = select.options[select.selectedIndex].value;

//     fetch("http://localhost:8081/api/admin/watertiming",{
//         headers:{
//             "Content-Type":"application/json",
            
//         }
//     })
//     .then((response)=>response.json())
//     .then((data)=> {

    
//     table += `<h2 style="display: inline-table;">Water Time</h2>`

//     table += `
//         <tr style="width: 100%; display: flex; justify-content: space-between;" class="tablepoint">
//         <th style="width: 20%;" class="toptable ">Area</th>
//         <th style="width: 20%;" class="toptable ">Day</th>
//         <th style="width: 20%;" class="toptable ">Date</th>
//         <th style="width: 20%;" class="toptable ">Time</th>
//         <th style="width: 20%;" class="toptable ">Action</th>
//         </tr>`
//         for (let i = 0; i < data.length; i++) {
            
//             if (area == "ALL") {
//                 getBlock()
//             }
            
//             if (data[i].area.name == area ) {
//                 console.log(data[i].area.name +" "+area);
//                 table += `
//                 <tr class="tablepoint " style="width: 100%; display: flex; justify-content: space-between;" >
//                 <td style="width: 20%;" class="datatable">${data[i].area.name}</td>
//                 <td style="width: 20%;" class="datatable">${data[i].day}</td>
//                 <td style="width: 20%;" class="datatable">${data[i].date}</td>
//                 <td style="width: 20%;" class="datatable">${data[i].time}</td>
//                 <td style="width: 20%;" class="datatable"> 
//                 <i onclick="modalValue(${data[i].id})" data-bs-toggle="modal" data-bs-target="#exampleModal"  
//                 style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
//                 <i onclick="deleteWaterTiming(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
//                 </td>
//                 </tr>`
//             }
//         }
//         document.getElementById("watertimingtable").innerHTML = table;
//         console.log(table);
//     })
// }
