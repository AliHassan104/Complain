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
            
            <a  href="/document/adddocument.html?id=${data[i].id}">
            <i onclick="modalValue(${data[i].id})" data-bs-toggle="modal" data-bs-target="#exampleModal"  
            style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
            </a>
            <i onclick="deleteDocument(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
        </td>
        </tr>`
            }
            document.getElementById("datatables-reponsive").innerHTML = table;
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
