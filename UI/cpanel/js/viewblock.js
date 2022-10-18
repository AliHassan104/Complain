getBlock(0)
let uid;

function getBlock(pageNumber) {
   
    if (pageNumber >= 0) {
    getData(`/admin/block?pageNumber=${pageNumber}&pageSize=${10}`)
        .then((data) => {
            renderBlocks(data.content)
            renderPagination(data)
        })
    }
}

function renderBlocks(data) {
    let table =''

    table += `
    <tr class="tablepoint">
    <th class="toptable ">Area</th>
    <th class="toptable ">Block</th>
    <th class="toptable ">Action</th>
    </tr>`

    for (let i = 0; i < data.length; i++) {
        table += `

    <tr class="tablepoint " >
        <td class="datatable">${data[i].area.name}</td>
        <td class="datatable">${data[i].block_name}</td>
        <td class="datatable">
        
        <a  href="/addblock.html?id=${data[i].id}">
        <i
        style="margin-right: 15px;"  class="fa fa-pencil"></i>
       
        </a>
        <i class="fa fa-check-circle" aria-hidden="true"  style="margin-right: 10px;"></i>
        <i onclick="deleteBlock(${data[i].id})"  class="fa fa-close"></i>
</td>
    </tr>`
    }

    document.getElementById("datatables-reponsive").innerHTML = table;


    if (data.length === 0) {
        noBlockFound = ""
        noBlockFound += `<span style=" margin: auto;text-align: center;width: 50%;height: 5vh; text-align: center; justify-content: center;font-size: large" 
    class="alert alert-danger" role="alert" >No Block Found</span> `

        document.getElementById("noRecordFound").innerHTML = noBlockFound
    }
}


function deleteBlock(id) {
    var table = ""
    var responseStatus = ""

    deleteData(`/block/${id}`)
        .then((response) => {
            responseStatus = response.status;
        })
        .then(() => {
            if (responseStatus == 200) {
                table += `
            <div  style=" 
            margin: auto;
            text-align: center;
            width: 50%;
            height: 5vh; text-align: center; 
            justify-content: center;
            font-size: large" 
            class="alert alert-success" role="alert">
            <b> Block  Deleted Successfully <b>
            </div>`

                document.getElementById("formSubmitted").innerHTML = table
                setTimeout(() => {
                    document.getElementById("formSubmitted").innerHTML = ""
                }, 2000)

            }
            else {
                table += `
            <div  style=" 
            margin: auto;
            text-align: center;
            width: 50%;
            height: 5vh; text-align: center; 
            justify-content: center;
            font-size: large" 
            class="alert alert-danger" role="alert">
            <b> SomeThing Went Wrong Cannot Delete Block  <b>
            
            </div>`

                document.getElementById("formSubmitted").innerHTML = table
                setTimeout(() => {
                    document.getElementById("formSubmitted").innerHTML = ""
                }, 2000)
            }

            getBlock(0)

        })


}



function getArea() {
    let table = ""

    getData(`/area`)
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                table += `
            <option value="${data[i].id}">${data[i].name}</option>
        `
            }
            document.getElementById("dropdownarea").innerHTML = table;
        })
}

function renderPagination(data) {
    let pages = data.totalPages;
    let renderPagination = ""
    let renderPageOf = ""
    let pageNumber = data.number
    let nextPageNumber = pageNumber + 1

    if (nextPageNumber == pages) {
        nextPageNumber = -1
    }
    if (data.numberOfElements != 0) {
        pageNumber += 1
    }

    document.getElementById("showPageNumbers").innerHTML = `<a href="#" style="text-decoration:none;">Page ${pageNumber} Of ${pages}</a> `

    renderPagination += `
    <li class="page-item" onclick="showPreviousPage(${pageNumber - 2})"><a class="page-link" href="#">Previous</a></li>
    <li class="page-item" onclick="showFirstPage(${0})"><a class="page-link" href="#">First</a></li>
    <li class="page-item" onclick="showLastPage(${nextPageNumber})"><a class="page-link" href="#">Next</a></li>
    <li class="page-item"onclick="showNextPage(${pages - 1})"><a class="page-link" href="#">Last</a></li>`

    document.getElementById("pagination").innerHTML = renderPagination
}

function showPreviousPage(pageNumber) {
    getBlock(pageNumber)
}
function showFirstPage(pageNumber) {
    getBlock(pageNumber)
}
function showLastPage(pageNumber) {
    getBlock(pageNumber)
}
function showNextPage(pageNumber) {
    getBlock(pageNumber)
}
