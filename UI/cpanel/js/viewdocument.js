let uid;

function getDocuments() {
    let table = ""

    getData(`/admin/document`)
        .then((data) => {
            renderDocuments(data.content)
            //  Pagination render method
        })
}
getDocuments()


function renderDocuments(data){
    let table = ''

    table += `<tr  class="tablepoint">
        <th class="toptable ">Title</th>
        <th class="toptable ">Area</th>
        <th class="toptable ">URL</th>
        <th class="toptable ">Action</th>
        </tr>`
            for (let i = 0; i < data.length; i++) {

                table += `
        <tr class="tablepoint " >
            <td class="datatable">${data[i].title}</td>
            <td  class="datatable">${data[i].area.name}</td>
            
        <td  class="datatable"><a target="_blank" href="${data[i].url}">${data[i].url}</a></td>
            <td style="width: 20%;" class="datatable"> 
            
            <a  href="/adddocument.html?id=${data[i].id}">
            <i onclick="modalValue(${data[i].id})" data-bs-toggle="modal" data-bs-target="#exampleModal"  
            style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
            
            </a>
            <i class="fa fa-check-circle" aria-hidden="true" style="margin-right: 10px;"></i>
            <i onclick="deleteDocument(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
        </td>
        </tr>`
            }
            document.getElementById("datatables-reponsive").innerHTML = table;

            if (data.length === 0) {
                notimings = ""
                notimings += `<span style=" margin: auto;text-align: center;width: 50%;height: 5vh; text-align: center; justify-content: center;font-size: large" 
                        class="alert alert-danger" role="alert" >No Documents Found</span> `
                document.getElementById("noRecordFound").innerHTML = notimings
            }
            else{
                document.getElementById("noRecordFound").innerHTML = ""
            }
        
}



function deleteDocument(id) {

  
    deleteData(`/document/${id}`)
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
            Document Deleted Successfully
            </div>`

        document.getElementById("formSubmitted").innerHTML = table

        setTimeout(()=>{
            document.getElementById("formSubmitted").innerHTML = ""
        },2000)

        getDocuments()
    })

   
        
  
}

getArea()

function getArea() {
    let table = ""

        getData("/area")
        .then((data) => {
            allArea = data;
            table += `<select onchange="filterByArea()" id="dropdownareafilter"  class="form-control form-control-sm">`
            table += `<option value="ALL" selected>Select Area</option>`
            for (let i = 0; i < data.length; i++) {
                table += `
            <option value="${data[i].id}">${data[i].name}</option>
        `
            }
            table += `</select>`
            document.getElementById("dropdownarea1").innerHTML = table;
        })
}

function  renderPagination(data,) {
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
    getAchievement(pageNumber)
}
function showFirstPage(pageNumber){
    getAchievement(pageNumber)
}
function showLastPage(pageNumber){
    getAchievement(pageNumber)
}
function showNextPage(pageNumber){
    getAchievement(pageNumber)
}

