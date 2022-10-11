getWaterTiming(0)

let uid;

function getWaterTiming(pageNumber) {

    if (pageNumber >= 0) {
    getData(`/admin/watertiming?pageNumber=${pageNumber}&pageSize=${10}`)
        .then((data) => {
            // console.log(data);
            renderWaterTiming(data.content)
            renderPagination(data) 
        })
    }
}

function renderWaterTiming(data) {
     
    let table = ""

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

            startTime = parseInt(data[i].start_time.slice(0, 2));
            startTimeToHr = convertTimeTo12hrs(startTime, data[i].start_time.slice(3, 5))

            endTime = parseInt(data[i].end_time.slice(0, 2));
            endTimeToHr = convertTimeTo12hrs(endTime, data[i].end_time.slice(3, 5))

            table += `
                <tr class="tablepoint " style="width: 100%; display: flex; justify-content: space-between;" >
                <td style="width: 20%;" class="datatable">${data[i].block.area.name}</td>
                <td style="width: 20%;" class="datatable">${data[i].block.block_name}</td>
                <td style="width: 20%;" class="datatable">${data[i].day}</td>
                <td style="width: 20%;" class="datatable">${data[i].date}</td>
                <td style="width: 20%;" class="datatable">${startTimeToHr}</td>
                <td style="width: 20%;" class="datatable">${endTimeToHr}</td>
                <td style="width: 20%;" class="datatable">
                
        <a  href="/addwatertiming.html?id=${data[i].id}">
        <i  data-bs-toggle="modal" data-bs-target="#exampleModal"  
        style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
        </a>

        <i onclick="deleteWaterTiming(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
</td>
    </tr>`
        }
    }
    document.getElementById("datatables-reponsive").innerHTML = table;
}

function convertTimeTo12hrs(hr, data) {

    if (hr > 12) {
        hr = hr - 12
        hr = hr + ":" + data + " pm"
    } else {
        hr = hr + ":" + data + " am"
    }
    return hr;
}


function deleteWaterTiming(id) {

    deleteData(`/watertiming/${id}`)
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
            Water Timing  Deleted Successfully
            </div>`

            document.getElementById("formSubmitted").innerHTML = table
            setTimeout(() => {
                document.getElementById("formSubmitted").innerHTML = ""
            }, 2000)
            getWaterTiming(0)
        })
}


// getArea()

// function getArea() {
//     let table = ""

//     getData(`/area`)
//         .then((data) => {
//             allArea = data;
//             table += `<select onchange="filterByArea()" id="dropdownareafilter"  class="form-control form-control-sm">`
//             table += `<option value="ALL" selected>Select Area</option>`
//             for (let i = 0; i < data.length; i++) {
//                 table += `
//             <option value="${data[i].id}">${data[i].name}</option>
//         `
//             }
//             table += `</select>`
//             document.getElementById("dropdownarea1").innerHTML = table;
//         })
// }

function  renderPagination(data) {
    let pages = data.totalPages;
    let renderPagination = ""
    let renderPageOf = ""
    let pageNumber = data.number
    let nextPageNumber = pageNumber+1

    if(nextPageNumber == pages){
       nextPageNumber = -1
    }
    if(data.numberOfElements != 0){
        pageNumber += 1
    }
   
    document.getElementById("showPageNumbers").innerHTML = `<a href="#" style="text-decoration:none;">Page ${pageNumber} Of ${pages}</a> `

    renderPagination += `
    <li class="page-item" onclick="showPreviousPage(${pageNumber-2})"><a class="page-link" href="#">Previous</a></li>
    <li class="page-item" onclick="showFirstPage(${0})"><a class="page-link" href="#">First</a></li>
    <li class="page-item" onclick="showLastPage(${nextPageNumber})"><a class="page-link" href="#">Next</a></li>
    <li class="page-item"onclick="showNextPage(${pages-1})"><a class="page-link" href="#">Last</a></li>`

    document.getElementById("pagination").innerHTML = renderPagination
}

function showPreviousPage(pageNumber){
    getWaterTiming(pageNumber)
}
function showFirstPage(pageNumber){
    getWaterTiming(pageNumber)
}
function showLastPage(pageNumber){
    getWaterTiming(pageNumber)
}
function showNextPage(pageNumber){
    getWaterTiming(pageNumber)
}

