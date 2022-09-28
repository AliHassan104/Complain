getWaterTiming()

let uid;

function getWaterTiming() {
    let table = ""
 
    getData(`/admin/watertiming`)
    .then((data)=> {
        table += `
        <tr style="width: 100%; display: flex; justify-content: space-between;" class="tablepoint">
        <th style="width: 20%;" class="toptable ">Area</th>
        <th style="width: 20%;" class="toptable ">Block</th>
        <th style="width: 20%;" class="toptable ">Day</th>
        <th style="width: 20%;" class="toptable ">Date</th>
        <th style="width: 20%;" class="toptable ">Start Time</th>
        <th style="width: 20%;" class="toptable ">End Time</th>
        <th style="width: 20%;" class="toptable ">Action</th>
        </tr>`
        if (data != null) {
            for (let i = 0; i < data.length; i++) {
            
            startTime = parseInt(data[i].start_time.slice(0,2));
            startTimeToHr = convertTimeTo12hrs(startTime,data[i].start_time.slice(3,5))

            endTime = parseInt(data[i].end_time.slice(0,2));
            endTimeToHr = convertTimeTo12hrs(endTime,data[i].end_time.slice(3,5))

            table += `
            <tr class="tablepoint " style="width: 100%; display: flex; justify-content: space-between;" >
            <td style="width: 20%;" class="datatable">${data[i].block.area.name}</td>
            <td style="width: 20%;" class="datatable">${data[i].block.block_name}</td>
            <td style="width: 20%;" class="datatable">${data[i].day}</td>
            <td style="width: 20%;" class="datatable">${data[i].date}</td>
            <td style="width: 20%;" class="datatable">${startTimeToHr}</td>
            <td style="width: 20%;" class="datatable">${endTimeToHr}</td>
            <td style="width: 20%;" class="datatable">
            
            <a  href="/watertiming/addwatertiming.html?id=${data[i].id}">
            <i  data-bs-toggle="modal" data-bs-target="#exampleModal"  
            style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
            </a>

            <i onclick="deleteWaterTiming(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
    </td>
        </tr>`
        }
    }
    document.getElementById("datatables-reponsive").innerHTML = table;
})
}

function convertTimeTo12hrs(hr,data){
   
    if (hr > 12) {
        hr = hr - 12
        hr = hr + ":" + data + " pm"
    } else {
        hr = hr + ":" + data + " am"
    }
    return hr;
}


  
        
function deleteWaterTiming(id){  
  
    deleteData(`/watertiming/${id}`)
    .then(()=>{
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
            Water Timing  Deleted Successfully
            </div>`

        document.getElementById("formSubmitted").innerHTML = table
    })

    setTimeout(() => {
        getWaterTiming()
    }, 100);
}


getArea()

function getArea() {
    let table = ""
    
    getData(`/area`)
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

