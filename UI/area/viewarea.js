let uid ;




function getArea() {

    let table = ""
 
    let url = "admin/area";
    //                                                  getData Method to get Data
    getData(url).then((data)=> {
        
        table += `<tr style="width: 100%; display: flex; justify-content: space-evenly;" class="tablepoint">
        <th style="width: 40%;" class="toptable ">Name</th>
        <th style="width: 30%;" class="toptable ">Postal Code</th>
        <th style="width: 30%;" class="toptable ">Action</th>
        </tr>`

        for (let i = 0; i < data.length; i++) {
            table += `

        <tr class="tablepoint " style="width: 100%; display: flex; justify-content: space-evenly;" >
            <td style="width: 40%;" class="datatable">${data[i].name}</td>
            <td style="width: 30%;" class="datatable">${data[i].postalCode}</td>
            <td style="width: 30%;" class="datatable"> 

            <a  href="/area/addarea.html?id=${data[i].id}"> 
            <i  data-bs-toggle="modal" data-bs-target="#exampleModal"  
            style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
            </a>
            
           <i onclick="deleteArea(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
    </td>
        </tr>`
        }
        document.getElementById("datatables-reponsive").innerHTML = table;

            
        if(data.length === 0){
            noAreaFound = ""
            noAreaFound  += `<span style=" margin: auto;text-align: center;width: 50%;height: 5vh; text-align: center; justify-content: center;font-size: large" 
            class="alert alert-danger" role="alert" >No Area Found</span> `
            document.getElementById("noRecordFound").innerHTML =   noAreaFound 
       }
    })
}
getArea()


function deleteArea(id){
    
    let url = `area/${id}`
    deleteData(url).then(()=>{
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
            Area  Deleted Successfully
            </div>`

        document.getElementById("formSubmitted").innerHTML = table

        
        setTimeout(() => {
            document.getElementById("formSubmitted").innerHTML = ""
        }, 2000)
        
    })

    setTimeout(() => {
        getArea()
    }, 300);
}

