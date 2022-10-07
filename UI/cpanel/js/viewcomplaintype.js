
getComplainType()

function getComplainType() {
    
    getData(`/admin/complaintype`)
    .then((data)=> {
        renderComplainType(data.content)
    })
}

function renderComplainType(data){
    let table = ""

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
            <a  href="/cpanel/addcomplaintype.html?id=${data[i].id}">
            <i onclick="modalValue(${data[i].id})" data-bs-toggle="modal" data-bs-target="#exampleModal"  
            style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
            </a>
            
            <i onclick="deleteComplainType(${data[i].id})" 
             href="/cpanel/addcomplaintype.html" style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
            </td>
        </tr>`
        }else{
            table += `<h2>No Record Found</h2>`
        }
    }
    document.getElementById("datatables-reponsive").innerHTML = table;
}

function deleteComplainType(id){
    let table = ""

    deleteData(`/complaintype/${id}`).then((response)=>{
        
        if(response.ok){
            table += `
            <div  style=" 
            margin: auto;
            text-align: center;
            width: 50%;
            height: 5vh; text-align: center; 
            justify-content: center;
            font-size: large" 
            class="alert alert-success" role="alert">
             Complain Type Deleted Successfully
            </div>`
        }
        else{
            table += `
        <div  style=" 
        margin: auto;
        text-align: center;
        width: 50%;
        height: 5vh; text-align: center; 
        justify-content: center;
        font-size: large" 
        class="alert alert-danger" role="alert">
         Some Thing Went Wrong Cannot Delete
        </div>`
        }

        document.getElementById("formSubmitted").innerHTML = table

        setTimeout(() => {
            document.getElementById("formSubmitted").innerHTML = ""
        }, 2000)
        
        getComplainType()
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



