getWaterTiming()
let uid;
function getWaterTiming() {
    let table = ""
    fetch("http://localhost:8081/api/watertiming",{
        headers:{
            // mode: 'no-cors',
            // "Authorization":jwtTokenBearer,
            "Content-Type":"application/json",
            
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
        table += `<h2 style="display: inline-table;">Water Time</h2>`

        table += `
        <tr style="width: 100%; display: flex; justify-content: space-between;" class="tablepoint">
        <th style="width: 20%;" class="toptable ">Area</th>
        <th style="width: 20%;" class="toptable ">Day</th>
        <th style="width: 20%;" class="toptable ">Date</th>
        <th style="width: 20%;" class="toptable ">Time</th>
        <th style="width: 20%;" class="toptable ">Action</th>
        </tr>`
        for (let i = 0; i < data.length; i++) {
            table += `

        <tr class="tablepoint " style="width: 100%; display: flex; justify-content: space-between;" >
            <td style="width: 20%;" class="datatable">${data[i].area.name}</td>
            <td style="width: 20%;" class="datatable">${data[i].day}</td>
            <td style="width: 20%;" class="datatable">${data[i].date}</td>
            <td style="width: 20%;" class="datatable">${data[i].time}</td>
            <td style="width: 20%;" class="datatable"> 
            <i onclick="modalValue(${data[i].id})" data-bs-toggle="modal" data-bs-target="#exampleModal"  
            style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
            <i onclick="deleteWaterTiming(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
    </td>
        </tr>`
        }
        document.getElementById("watertimingtable").innerHTML = table;
    })
}

function updateWaterTiming(){

    var select = document.getElementById('dropdownarea');
    var area = select.options[select.selectedIndex].value;

    console.log(area);

    let day = document.getElementById("day").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;

    newArea = {area :{
        id : area
    } , day : day , date : date , time : time
    }; 

    console.log(newArea);

    fetch('http://localhost:8081/api/watertiming/'+uid, {
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
                getWaterTiming()
            }, 1000);
}

function deleteWaterTiming(id){  
    fetch('http://localhost:8081/api/watertiming/'+id, {
            method: 'DELETE'
    }).finally(()=>{
        getWaterTiming()
    })
    // setTimeout(() => {
    // }, 100);
}

function modalValue(id){
    uid = id
    getArea()
    fetch("http://localhost:8081/api/watertiming/"+id,{
        headers:{
            "Content-Type":"application/json",
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
    console.log(data.area.name);
     
    document.getElementById("day").value = data.day;
    document.getElementById("date").value = data.date;
    document.getElementById("time").value = data.time;

    })
}


function getArea() {
    let table = ""
    fetch("http://localhost:8081/api/area",{
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

function getAreafilter() {
    let table = ""
    fetch("http://localhost:8081/api/area",{
        headers:{
            "Content-Type":"application/json",
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
        console.log(data);
        table += `
        <option value="ALL">ALL</option>`
        for (let i = 0; i < data.length; i++) {
            table += `
            <option value="${data[i].name}">${data[i].name}</option>
        `
        }
        document.getElementById("dropdownareafilter").innerHTML = table;
    })
}

getAreafilter()

function filterWaterTimingByArea() {
    
    table = ""
    
    var select = document.getElementById('dropdownareafilter');
    var area = select.options[select.selectedIndex].value;

    fetch("http://localhost:8081/api/admin/watertiming",{
        headers:{
            "Content-Type":"application/json",
            
        }
    })
    .then((response)=>response.json())
    .then((data)=> {

    
    table += `<h2 style="display: inline-table;">Water Time</h2>`

    table += `
        <tr style="width: 100%; display: flex; justify-content: space-between;" class="tablepoint">
        <th style="width: 20%;" class="toptable ">Area</th>
        <th style="width: 20%;" class="toptable ">Day</th>
        <th style="width: 20%;" class="toptable ">Date</th>
        <th style="width: 20%;" class="toptable ">Time</th>
        <th style="width: 20%;" class="toptable ">Action</th>
        </tr>`
        for (let i = 0; i < data.length; i++) {
            
            if (area == "ALL") {
                getWaterTiming()
            }
            
            if (data[i].area.name == area ) {
                console.log(data[i].area.name +" "+area);
                table += `
                <tr class="tablepoint " style="width: 100%; display: flex; justify-content: space-between;" >
                <td style="width: 20%;" class="datatable">${data[i].area.name}</td>
                <td style="width: 20%;" class="datatable">${data[i].day}</td>
                <td style="width: 20%;" class="datatable">${data[i].date}</td>
                <td style="width: 20%;" class="datatable">${data[i].time}</td>
                <td style="width: 20%;" class="datatable"> 
                <i onclick="modalValue(${data[i].id})" data-bs-toggle="modal" data-bs-target="#exampleModal"  
                style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
                <i onclick="deleteWaterTiming(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
                </td>
                </tr>`
            }
        }
        document.getElementById("watertimingtable").innerHTML = table;
        console.log(table);
    })
}
