let uid;

function getDocuments() {
    let table = ""
    fetch("http://localhost:8081/api/admin/document",{
        headers:{
            // mode: 'no-cors',
            // "Authorization":jwtTokenBearer,
            "Content-Type":"application/json",
            
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
        table += `<h2 style="display: inline-table;">Document</h2>`

        table += `<tr style="width: 100%; display: flex; justify-content: space-evenly;" class="tablepoint">
        <th style="width: 40%;" class="toptable ">Area</th>
        <th style="width: 40%;" class="toptable ">URL</th>
        <th style="width: 20%;" class="toptable ">Action</th>
        </tr>`
        for (let i = 0; i < data.length; i++) {
            table += `
        <tr class="tablepoint " style="width: 100%; display: flex; justify-content: space-evenly;" >
            <td style="width: 40%;" class="datatable">${data[i].area.name}</td>
            
        <td style="width: 40%;" class="datatable"><a target="_blank" href="${data[i].url}">${data[i].url}</a></td>
            <td style="width: 20%;" class="datatable"> 
            <i onclick="modalValue(${data[i].id})" data-bs-toggle="modal" data-bs-target="#exampleModal"  
            style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
            <i onclick="deleteDocument(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
    </td>
        </tr>`
        }
        document.getElementById("documenttable").innerHTML = table;
    })
}
getDocuments()

function updateDocument(){

    let url = document.getElementById("url").value;

    var select = document.getElementById('dropdownarea');
    var area = select.options[select.selectedIndex].value;


    newDocument = {url : url,
        area : {
            id : area
        }
    }; 
    console.log(newDocument);

    fetch('http://localhost:8081/api/document/'+uid, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newDocument),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

            setTimeout(() => {
                getDocuments()
            }, 100);

}

function deleteDocument(id){
    
    fetch('http://localhost:8081/api/document/'+id, {
            method: 'DELETE'
    })

    setTimeout(() => {
        getDocuments()
    }, 100);
}

function modalValue(id){
    getArea()
    uid = id
    fetch("http://localhost:8081/api/document/"+id,{
        headers:{
            "Content-Type":"application/json",
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
    document.getElementById("url").value = data.url;
    })
}

function getFilterArea() {
    let table = ""
    fetch("http://localhost:8081/api/area",{
        headers:{
            "Content-Type":"application/json",
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
        
        table += `<option value="ALL">ALL</option>`
        for (let i = 0; i < data.length; i++) {
            table += `
            <option value="${data[i].name}">${data[i].name}</option>
        `
        }
        document.getElementById("dropdownareafilter").innerHTML = table;
    })
}
function getArea() {
    let table = ""
    fetch("http://localhost:8081/api/area",{
        headers:{
            "Content-Type":"application/json",
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
        
        table += `<option value="ALL">ALL</option>`
        for (let i = 0; i < data.length; i++) {
            table += `
            <option value="${data[i].id}">${data[i].name}</option>
        `
        }
        document.getElementById("dropdownarea").innerHTML = table;
    })
}
getFilterArea()

getArea()


function filterByArea(){
    table = ""
    
    var select = document.getElementById('dropdownareafilter');
    var area = select.options[select.selectedIndex].value;

    fetch("http://localhost:8081/api/document",{
        headers:{
            "Content-Type":"application/json",
            
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
        
        table += `<h2 style="display: inline-table;">Document</h2>`

        table += `<tr style="width: 100%; display: flex; justify-content: space-evenly;" class="tablepoint">
        <th style="width: 40%;" class="toptable ">Area</th>
        <th style="width: 40%;" class="toptable ">URL</th>
        <th style="width: 20%;" class="toptable ">Action</th>
        </tr>`
        for (let i = 0; i < data.length; i++) {
            
            if (area == "ALL") {
                getDocuments()
            }
            
            if (data[i].area.name == area ) {
                console.log(data[i].area.name +" "+area);
            table += `
        <tr class="tablepoint " style="width: 100%; display: flex; justify-content: space-evenly;" >
            <td style="width: 40%;" class="datatable">${data[i].area.name}</td>
            
        <td style="width: 40%;" class="datatable"><a target="_blank" href="${data[i].url}">${data[i].url}</a></td>
            <td style="width: 20%;" class="datatable"> 
            <i onclick="modalValue(${data[i].id})" data-bs-toggle="modal" data-bs-target="#exampleModal"  
            style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
            <i onclick="deleteDocument(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
    </td>
        </tr>`
        
        }
    }
        document.getElementById("documenttable").innerHTML = table;
        // console.log(table);
    })
}

