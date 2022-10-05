function renderEvent(data) {
    let table = ""

    table += `<tr style="width: 100%; display: flex; justify-content: space-evenly;" class="tablepoint">
        <th style="width: 20%;" class="toptable ">Title</th>
        <th style="width: 20%;" class="toptable ">Description</th>
        <th style="width: 20%;" class="toptable ">Area</th>
        <th style="width: 15%;" class="toptable ">Date</th>
        <th style="width: 10%;" class="toptable ">Time</th>
        <th style="width: 20%;" class="toptable ">Picture</th>
        <th style="width: 20%; " class="toptable ">Action</th>
        </tr>`

    for (let i = 0; i < data.length; i++) {

        if (data[i].description.length >= 8) {
            data[i].description = data[i].description.substring(0, 8) + `<a style="color:blue">...more</a>`
        }

        table += `

        <tr class="tablepoint " style="width: 100%; display: flex; justify-content: space-evenly;" >
            <td style="width: 20%;" class="datatable">${data[i].title}</td>
            <td style="width: 20%;" class="datatable">${data[i].description}</td>
            <td style="width: 20%;" class="datatable">${data[i].area.name}</td>
            <td style="width: 15%;" class="datatable">${data[i].startDate}</td>
            <td style="width: 10%;" class="datatable">${data[i].startTime}</td>
            <td style="width: 20%;" class="datatable"><img src="${data[i].image}" alt="abc" style="width: 80%; height : 100px"> 
            </td>
            <td style="width: 20%;" class="datatable"> 

            <a  href="/events/addevents.html?id=${data[i].id}">
            <i onclick="modalValue(${data[i].id})" data-bs-toggle="modal" data-bs-target="#exampleModal"  
            style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
            </a>
            
            <i onclick="deleteEvent(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
    </td>
        </tr>`
    }
    document.getElementById("datatables-reponsive").innerHTML = table;

    if (data.length === 0) {
        noRecordFound = ""
        noRecordFound += `
                <div  style=" 
                margin: auto;
                text-align: center;
                width: 50%;
                height: 5vh; text-align: center; 
                justify-content: center;
                font-size: large" 
                class="alert alert-danger" role="alert">
                No Event Found !
                </div>`

        document.getElementById("noRecordFound").innerHTML = noRecordFound
    }
    else {
        document.getElementById("noRecordFound").innerHTML = ""
    }

}

var previousPageNumber = 0;
function getEvent(pageNumber, pageSize, next) {

    if (next) {
        pageNumber += 1
    }
    if (next === false) {
        previousPageNumber -= 1
        pageNumber = previousPageNumber
    }

    if (pageNumber >= 0) {
        getData(`/admin/event?pageNumber=${pageNumber}&pageSize=${pageSize}`)
            .then((data) => {
                previousPageNumber = pageNumber
                renderEvent(data);
            })
    }
}

getEvent(0, 2)


function deleteEvent(id) {

    deleteData(`/event/${id}`)
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
            class="alert alert-success" role="alert">
            <b> Event Deleted Successfully <b>
            </div>`

            document.getElementById("formSubmitted").innerHTML = table

            setTimeout(() => {
                document.getElementById("formSubmitted").innerHTML = ""
            }, 2000)
        })

    setTimeout(() => {
        getEvent()
    }, 100);

}

let uid;


function renderPagination() {
    renderPagination = ""

    renderPagination += `
    <li class="page-item" onclick="getEvent(${1},${2},${false})"><a class="page-link" href="#">Previous</a></li>
    <li class="page-item" onclick="getEvent(${0},${2})"><a class="page-link" href="#">1</a></li>
    <li class="page-item" onclick="getEvent(${1},${2})"><a class="page-link" href="#">2</a></li>
    <li class="page-item" onclick="getEvent(${2},${2})"><a class="page-link" href="#">3</a></li>
    <li class="page-item"onclick="getEvent(${3},${2})"><a class="page-link" href="#">4</a></li>
    <li class="page-item"onclick="getEvent(${4},${2})"><a class="page-link" href="#">5</a></li>
    <li class="page-item"onclick="getEvent(${4},${2},${true})"><a class="page-link" href="#">Next</a></li>
    `
    document.getElementById("pagination").innerHTML = renderPagination

}
renderPagination()



