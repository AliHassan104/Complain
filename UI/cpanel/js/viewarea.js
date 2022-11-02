let uid ;


function getArea(pageNumber) {
    if (pageNumber >= 0) {
        getData(`/admin/area?pageNumber=${pageNumber}&pageSize=${10}`).
        then((data)=> {

            renderArea(data)
            renderPagination(data)


        })
    }
}
getArea(0)


function renderArea(data){
    let table =''

    table += `<tr  class="tablepoint">
    <th  class="toptable ">Name</th>
    <th  class="toptable ">Postal Code</th>
    <th  class="toptable ">Action</th>
    </tr>`

    for (let i = 0; i < data.content.length; i++) {
        table += `

    <tr class="tablepoint "  >
        <td  class="datatable">${data.content[i].name}</td>
        <td  class="datatable">${data.content[i].postalCode}</td>
        <td  class="datatable">

        <a  href="/addarea.html?id=${data.content[i].id}">
        <i  data-bs-toggle="modal" data-bs-target="#exampleModal"
        style="margin-right: 15px;"  class="fa fa-pencil"></i>

        </a>

       <i id="close12" onclick="deleteArea(${data.content[i].id})"   class="fa fa-close"></i>


</td>
    </tr>`
    }

  
    document.getElementById("datatables-reponsive").innerHTML = table;

      
     
    if(data.content.length === 0){
        noAreaFound = ""
        noAreaFound  += `<span style=" margin: auto;text-align: center;width: 50%;height: 5vh; text-align: center; justify-content: center;font-size: large"
        class="alert alert-danger" role="alert" >No Area Found</span> `
        document.getElementById("noRecordFound").innerHTML =   noAreaFound 
   }
   else{
        document.getElementById("noRecordFound").innerHTML =  "" 
   }
}






function deleteArea(id){
    let table = ""

    deleteData(`/area/${id}`).then((response)=>{

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
            Area  Deleted Successfully
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
                    Some thing Wrong Cannot Delete
                    </div>`
        }


        document.getElementById("formSubmitted").innerHTML = table


        setTimeout(() => {
            document.getElementById("formSubmitted").innerHTML = ""
        }, 2000)

        getArea(0);
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
    getArea(pageNumber)
}
function showFirstPage(pageNumber){
    getArea(pageNumber)
}
function showLastPage(pageNumber){
    getArea(pageNumber)
}
function showNextPage(pageNumber){
    getArea(pageNumber)
}


