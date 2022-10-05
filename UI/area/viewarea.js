let uid ;




function getArea() {

    let table = ""
 
    //                                                  getData Method to get Data
    getData("/admin/area").then((data)=> {
        
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

            <a  href="/area/addarea.html?id=${data.content[i].id}"> 
            <i  data-bs-toggle="modal" data-bs-target="#exampleModal"  
            style="margin-right: 15px;"  class="fa fa-pencil"></i>
            </a>
            
           <i onclick="deleteArea(${data.content[i].id})"   class="fa fa-close"></i>
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
    })
}
getArea()


function deleteArea(id){

    deleteData(`/area/${id}`).then(()=>{
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
        
        getArea();
    })

}

