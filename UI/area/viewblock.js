getBlock()
let uid;

function getBlock() {
    let table = ""
    getData(`/block`)
    .then((data)=> {
        table += `
        <tr style="width: 100%; display: flex; justify-content: space-between;" class="tablepoint">
        <th style="width: 33%;" class="toptable ">Area</th>
        <th style="width: 33%;" class="toptable ">Block</th>
        <th style="width: 34%;" class="toptable ">Action</th>
        </tr>`
    
        for (let i = 0; i < data.length; i++) {
            table += `

        <tr class="tablepoint " style="width: 100%; display: flex; justify-content: space-between;" >
            <td style="width: 33%;" class="datatable">${data[i].area.name}</td>
            <td style="width: 33%;" class="datatable">${data[i].block_name}</td>
            <td style="width: 34%;" class="datatable">
            
            <a  href="/area/addblock.html?id=${data[i].id}">
            <i
            style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
            </a>

            <i onclick="deleteBlock(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
    </td>
        </tr>`
        }
    
    document.getElementById("datatables-reponsive").innerHTML = table;

    if(data.length === 0){
        noBlockFound = ""
        noBlockFound+= `<span style=" margin: auto;text-align: center;width: 50%;height: 5vh; text-align: center; justify-content: center;font-size: large" 
        class="alert alert-danger" role="alert" >No Block Found</span> `

        document.getElementById("noRecordFound").innerHTML = noBlockFound
   }

})

}


        
function deleteBlock(id){  
    var table = ""
    var responseStatus = ""

    deleteData(`/block/${id}`)
    .then((response)=>{
        responseStatus = response.status;
    })
    .then(()=>{
      if(responseStatus == 200){
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
            <b> SomeThing Went Wrong Cannot Delete Block  <b>
            
            </div>`

        document.getElementById("formSubmitted").innerHTML = table
        setTimeout(() => {
            document.getElementById("formSubmitted").innerHTML = ""
        }, 2000) 
    }

    })

    setTimeout(() => {
        getBlock()
    }, 100);
}




function getArea() {
    let table = ""

    getData(`/area`)
    .then((data)=> {
        for (let i = 0; i < data.length; i++) {
            table += `
            <option value="${data[i].id}">${data[i].name}</option>
        `
        }
        document.getElementById("dropdownarea").innerHTML = table;
    })
}
