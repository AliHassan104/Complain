var uid;
var mainAreaId;
var mainAddressId;
var allArea = []


function getUser(pageNumber){
    if (pageNumber >= 0) {
        getData(`/admin/user?pageNumber=${pageNumber}&pageSize=${10}`)
        .then((data)=>{
            renderUser(data.content)
            renderPagination(data) 
        })
    }

}
function renderUser(data) {
    let table = ""


            table += `<tr  class="tablepoint">
        <th class="toptable ">Name</th>
        <th class="toptable ">PhoneNumber</th>
        <th class="toptable ">Email</th>
        <th class="toptable ">Property</th>
        <th class="toptable ">Cnic</th>
        <th class="toptable ">Area Name </th>
        <th class="toptable ">Action </th>
        </tr>`
            for (let i = 0; i < data.length; i++) {
                table += `

        <tr class="tablepoint">
            <td class="datatable mouseHand" onclick="userDetails(${data[i].id})">${data[i]?.firstname + " " + data[i]?.lastname}</td>
            <td class="datatable mouseHand" onclick="userDetails(${data[i].id})">${data[i]?.phoneNumber}</td>
            <td class="datatable mouseHand" onclick="userDetails(${data[i].id})">${data[i]?.email}</td>
            <td class="datatable mouseHand" onclick="userDetails(${data[i].id})">${data[i]?.property}</td>
            <td class="datatable mouseHand" onclick="userDetails(${data[i].id})">${data[i]?.cnic}</td>
            <td class="datatable mouseHand" onclick="userDetails(${data[i].id})">${data[i].area?.name}</td>

            <td  class="datatable"> 
            <a href="/adduser.html?id=${data[i].id}">
            <i data-bs-toggle="modal" style="padding-right: 15px; margin-right: 5px;"  data-bs-target="#exampleModal"  
             class="fa fa-pencil"></i>
             
            </a>
            
            <i onclick="deleteUser(${data[i].id})" class="fa fa-close"></i>
    </td>
        </tr>`
            }
            document.getElementById("datatables-reponsive").innerHTML = table;

            if (data.length === 0) {
                noRecordFound = ""
                noRecordFound += `<span style=" margin: auto;text-align: center;width: 50%;height: 5vh; text-align: center; justify-content: center;font-size: large" 
                        class="alert alert-danger" role="alert" >No User Found</span> `
                document.getElementById("noRecordFound").innerHTML = noRecordFound
            }
            else{
                document.getElementById("noRecordFound").innerHTML = ""
            }
}
getUser(0)


function userDetails(id){
    location.href = `${loginUrl}/userdetails.html?u_id=${id}`
}


function deleteUser(id) {

    deleteData(`/user/${id}`)
    .then((response) => {
        let table = ""

        if(response.ok){
        table += `
            <div  style=" 
            margin: auto;
            text-align: center;
            width: 50%;
            height: 5vh; text-align: center; 
            justify-content: center;
            font-size: large" 
            class="alert alert-danger" role="alert">
            User Deleted Successfully
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
            Some thing Went Wrong Cannot Delete
            </div>`
        }

        document.getElementById("formSubmitted").innerHTML = table

        setTimeout(()=>{
            document.getElementById("formSubmitted").innerHTML = ""
        },2000)
        getUser(0)
    })

}


function exportDataToExcel() {
    fetch("http://localhost:8081/api/user/export", {
        headers: {
            "Content-Type": "application/octet-stream",

        },
        method: 'GET'

    }).then((response) => response.blob())
        .then(blob => URL.createObjectURL(blob))

        .then(uril => {
            var link = document.createElement("a");
            link.href = uril;
            link.download = "UserData" + ".xlsx";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        });

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
    getUser(pageNumber)
}
function showFirstPage(pageNumber){
    getUser(pageNumber)
}
function showLastPage(pageNumber){
    getUser(pageNumber)
}
function showNextPage(pageNumber){
    getUser(pageNumber)
}

