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

// var previousPageNumber = 0;
function getEvent(pageNumber, pageSize, next) {
                                                                //  If Next is clicked increment pageNumber
    // if (next) {
    //     totalPaginationBoxes = pageNumber;
    //     if (previousPageNumber + 1 < pageNumber) {
    //         previousPageNumber += 1
    //         pageNumber = previousPageNumber
    //     }
    // }
    //                                                            //  If Previous is clicked decrement pageNumber
    // if (next === false) {
    //     pageNumber = previousPageNumber;
    //     if (pageNumber != 0) {
    //         previousPageNumber -= 1
    //         pageNumber = previousPageNumber
    //     }
    // }

    if (pageNumber >= 0) {
        getData(`/admin/event?pageNumber=${pageNumber}&pageSize=${pageSize}`)
            .then((data) => {
                previousPageNumber = pageNumber
                renderEvent(data.content);
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

            getEvent(0, 2)
            renderPagination()
        })

   
        

}

let uid;


function renderPagination() {
    let renderPagination = ""
    let paginationBoxes = 0;


    getData(`/countallevents`).then((data) => {
        paginationBoxes = Math.ceil(data / 2)
        onlyFivePaginationBoxes = 0;

        if (paginationBoxes > 5) {
            onlyFivePaginationBoxes = 5
        }
        else {
            onlyFivePaginationBoxes = paginationBoxes;
        }

        renderPagination += `
        <li class="page-item" onclick="getEvent(${1},${2},${false})"><a class="page-link" href="#">Previous</a></li>`
        for (let i = 0; i < onlyFivePaginationBoxes; i++) {
            renderPagination += `
            <li class="page-item" onclick="getEvent(${i},${2})"><a class="page-link" href="#">${i + 1}</a></li>
            `
        }

        renderPagination += `<li class="page-item"><a class="page-link" >--</a></li>
        <li class="page-item" onclick="getEvent(${paginationBoxes - 1},${2})"><a class="page-link" href="#">${paginationBoxes}</a></li>
        <li class="page-item"onclick="getEvent(${paginationBoxes},${2},${true})"><a class="page-link" href="#">Next</a></li>`


        document.getElementById("pagination").innerHTML = renderPagination
    })
}
renderPagination()



