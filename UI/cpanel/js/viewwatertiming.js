getWaterTiming(0)

let uid;

function getWaterTiming(pageNumber) {

    if (pageNumber >= 0) {
    getData(`/admin/watertiming?pageNumber=${pageNumber}&pageSize=${10}`)
        .then((data) => {
            renderWaterTiming(data.content)
            renderPagination(data) 
        })
    }
}

function renderWaterTiming(data) {
     
    let table = ""

    table += `
    <tr  class="tablepoint">
    <th  class="toptable ">Area</th>
    <th  class="toptable ">Block</th>
    <th  class="toptable ">Day</th>
    <th  class="toptable ">Date</th>
    <th  class="toptable ">Start Time</th>
    <th  class="toptable ">End Time</th>
    <th  class="toptable ">Action</th>
    </tr>`

    
        for (let i = 0; i < data.length; i++) {

            startTime = parseInt(data[i].start_time.slice(0, 2));
            startTimeToHr = convertTimeTo12hrs(startTime, data[i].start_time.slice(3, 5))

            endTime = parseInt(data[i].end_time.slice(0, 2));
            endTimeToHr = convertTimeTo12hrs(endTime, data[i].end_time.slice(3, 5))

            table += `
                <tr class="tablepoint " >
                <td  class="datatable">${data[i].block.area.name}</td>
                <td  class="datatable">${data[i].block.block_name}</td>
                <td  class="datatable">${data[i].day}</td>
                <td  class="datatable">${data[i].date}</td>
                <td  class="datatable">${startTimeToHr}</td>
                <td  class="datatable">${endTimeToHr}</td>
                <td  class="datatable">
                
        <a  href="/addwatertiming.html?id=${data[i].id}">
        <i  data-bs-toggle="modal" data-bs-target="#exampleModal"  
        style="margin-right: 10px;"  class="fa fa-pencil"></i>
      
        </a>
       
        <i onclick="deleteWaterTiming(${data[i].id})"  style=" margin-right: 15px;" class="fa fa-close"></i>
</td>
    </tr>`
    }

    if (data.length === 0) {
        notimings = ""
        notimings += `<span style=" margin: auto;text-align: center;width: 50%;height: 5vh; text-align: center; justify-content: center;font-size: large" 
                class="alert alert-danger" role="alert" >No Water timings Found</span> `
        document.getElementById("noRecordFound").innerHTML = notimings
    }
    else{
        document.getElementById("noRecordFound").innerHTML = ""
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

