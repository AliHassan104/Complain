

function deletePollingQuestion(id) {

    deleteData(`/pollingquestion/${id}`)
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
            Polling Question Deleted Successfully
            </div>`

            document.getElementById("formSubmitted").innerHTML = table

            setTimeout(() => {
                document.getElementById("formSubmitted").innerHTML = ""
            }, 2000)
            getPollingQuestion(0)
        })



}

getPollingQuestion(0)

function getPollingQuestion(pageNumber) {
   
if(pageNumber >= 0 ){
    getData(`/admin/pollingquestion?pageNumber=${pageNumber}&pageSize=${10}`)
        .then((data) => {
            renderPollingQuestion(data.content)
            renderPagination(data)
        })
    }
}

function renderPollingQuestion(data) {
    let table = ''
    table += `
    <tr style="width: 100%; display: flex; justify-content: space-between;" class="tablepoint">
    <th style="width: 10%;" class="toptable ">Q .NO</th>
    <th style="width: 30%;" class="toptable ">Question</th>
    <th style="width: 15%;" class="toptable ">End Date</th>
    <th style="width: 15%;" class="toptable ">End Time</th>
    <th style="width: 20%;" class="toptable ">Area</th>
    <th style="width: 15%;" class="toptable ">Action</th>
    </tr>`
    for (let i = 0; i < data.length; i++) {
        if (data[i].question.length > 13) {
            data[i].question = data[i].question.slice(0, 15) + `<a>...more</a>`
        }
        table += `
    <tr class="tablepoint " style="width: 100%; display: flex; justify-content: space-between;" >
    <td style="width: 10%;" class="datatable">${i + 1}</td>
    <td style="width: 30%;" class="datatable mouseHand" onclick="showPollingQuestionDetails(${data[i].id})">${data[i].question}</td>
    <td style="width: 15%;" class="datatable mouseHand" onclick="showPollingQuestionDetails(${data[i].id})">${data[i].end_date}</td>
    <td style="width: 15%;" class="datatable mouseHand" onclick="showPollingQuestionDetails(${data[i].id})">${data[i].end_time}</td>
    <td style="width: 20%;" class="datatable mouseHand" onclick="showPollingQuestionDetails(${data[i].id})">${data[i].area.name}</td>
    <td style="width: 15%;" class="datatable"> 

    <a  href="/addpollingquestion.html?id=${data[i].id}">
    <i onclick="modal(${data[i].id})" data-bs-toggle="modal" data-bs-target="#exampleModal"  
    style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
   
    </a>
    <i class="fa fa-check-circle" aria-hidden="true"  style="margin-right: 10px;"></i>
    <i onclick="deletePollingQuestion(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
    
    </td>
</tr>`

    }

    document.getElementById("datatables-reponsive").innerHTML = table;

    if (data.length === 0) {
        notimings = ""
        notimings += `<span style=" margin: auto;text-align: center;width: 50%;height: 5vh; text-align: center; justify-content: center;font-size: large" 
                class="alert alert-danger" role="alert" >No Polling Question Found</span> `
        document.getElementById("noRecordFound").innerHTML = notimings
    }
    else{
        document.getElementById("noRecordFound").innerHTML = ""
    }
}

function showPollingQuestionDetails(id) {
    location.href = `${loginUrl}/pollingquestiondetails.html?p_id=${id}`
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
    getPollingQuestion(pageNumber)
}
function showFirstPage(pageNumber){
    getPollingQuestion(pageNumber)
}
function showLastPage(pageNumber){
    getPollingQuestion(pageNumber)
}
function showNextPage(pageNumber){
    getPollingQuestion(pageNumber)
}



