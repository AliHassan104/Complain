
var assignPermissions = [];
var role="";
var canEdit = false;
var canDelete = false;
var assign = false;
var parent =""

function roles(){
    // debugger;
    getData(`/roles`)
    .then((data =>{
        let roles = ``;
          for(let i = 0; i< data.length; i++){
            roles+=`
            <option  value="${data[i].id}">${data[i].name}</option>   
            `
          }
          document.getElementById("Roles").innerHTML = roles;
    }))
}
roles();
// showPermissionUrls();


 function showPermissionUrls(){
  // debugger
  let roleId = document.getElementById("Roles").value;

    getData(`/permission/role/`+roleId)
    .then((permissions =>{
        // debugger;
       let per = '';
       
       for(let i=0; i< permissions.length; i++){
           per+=`
           <tr id="${permissions[i].id}">
           <th scope="row">${i+1}</th>
           <td id="p-${permissions[i].id}">${permissions[i].permission.url}</td>
           <td>
           <select class="form-select"  id="sel-${permissions[i].permission.id}" >
           <option value="">Select Your Option</option>
           <option value="Dashboard">Dashboard</option>
           <option value="ComplainType">Complain Type</option>
           <option value="Area">Area</option>
           <option value="User">User</option>
           <option value="Water">Water Timing</option>
           <option value="Document">Document</option>
           <option value="Complain">Complain</option>
           <option value="Achievement">Achievement</option>
           <option value="Polling Question">Polling Question</option>
           <option value="Event">Event</option>
         
         </select>
         </td>
         <td>   
         <select class="form-select"  id="label-${permissions[i].permission.id}" >
         <option value="">Select Your Option</option>
         <option value="Add Complain Type">Add Complain Type</option>
         <option value="View Complain Type">View Complain Type</option>
         <option value="View Area">View Area</option>
         <option value="Add Area">Add Area</option>
         <option value="Add Block">Add Block</option>
         <option value="View Block">View Block</option>
         <option value="Add User">Add User</option>
         <option value="View User">View User</option>
         <option value="Pending Users">Pending Users</option>
         <option value="Permission">Permission</option>
         <option value="Assign Permission">Assign Permission</option>
         <option value="Add Water Timing">Add Water Timing</option>
         <option value="View Water Timing">View Water Timing</option>
         <option value="Add Document">Add Document</option>
         <option value="View Document">View Document</option>
         <option value="Add Complain">Add Complain</option>
         <option value="View Complain">View Complain</option>
         <option value="Add Achievement">Add Achievement</option>
         <option value="View Achievement">View Achievement</option>
         <option value="Add Polling Question">Add Polling Question</option>
         <option value="View Polling Question">View Polling Question</option>
         <option value="Add Event">Add Event</option>
         <option value="View Event">View Event</option>
         <option value="Dashboard">Dashboard</option>
       </select>
       </td>
           `
          
            if(permissions[i].assign!=null && permissions[i].assign==true){
                obj={
                    roles:{
                      "id": document.getElementById("Roles").value
                    },
                    "permission":{
                      "id": permissions[i].permission.id
                    },
                  
                    "canEdit":permissions[i].canEdit,
                    "canDelete":permissions[i].canDelete,
                    "parent":permissions[i].parent,
                    "label":permissions[i].label,
                    "assign":permissions[i].assign
                  }
                  assignPermissions.push(obj);
                if(permissions[i].canEdit == true){
                    per+=  `
                    <td><input class="form-check-input" type="checkbox"  checked
                    onclick="Edit(${permissions[i].permission.id})" id="ce-${permissions[i].permission.id}"></td>

                  `
                }
                else{
                    per+=  `
                    <td><input class="form-check-input" type="checkbox"
                    onclick="Edit(${permissions[i].permission.id})" id="ce-${permissions[i].permission.id}"></td>
                  `
                }
                if(permissions[i].canDelete == true){
                    per+=  `
                    <td><input class="form-check-input" type="checkbox" checked
                    onclick="Delete(${permissions[i].permission.id})" id="cd-${permissions[i].permission.id}"></td>
                  `
                }
                else{
                    per+=  `
                    <td><input class="form-check-input" type="checkbox"
                    onclick="Delete(${permissions[i].permission.id})" id="cd-${permissions[i].permission.id}"></td>
                  `
                }
                per+=`<td><input class="form-check-input" type="checkbox" checked id="as-${permissions[i].permission.id}" onclick="assignUrl(${permissions[i].permission.id})"></td>
                </tr>
                    `

            }
            else{
                per+=  `
                <td><input class="form-check-input" type="checkbox" 
                onclick="Edit(${permissions[i].permission.id})" id="ce-${permissions[i].permission.id}"></td>
                <td><input class="form-check-input" type="checkbox"
                onclick="Delete(${permissions[i].permission.id})" id="cd-${permissions[i].permission.id}"></td>
                <td><input class="form-check-input" type="checkbox" id="as-${permissions[i].permission.id}" onclick="assignUrl(${permissions[i].permission.id})"></td>
                </tr>
                  `
            }

       }

       document.getElementById("UrlTable").innerHTML = per;
     
    }))
    // console.log(assignPermissions);
 }

 function Edit(id){
    // debugger;
  let check = false;
  var check1 = document.getElementById('as-'+id);
  if (check1.checked == true){  
    for(let i = 0; i< assignPermissions.length; i++){
      if(assignPermissions[i].permission.id == id){
        let change = document.getElementById('ce-'+id);
        if(change.checked == true){
          check = true;
          assignPermissions[i].canEdit=check;
        }
        else{
          assignPermissions[i].canEdit=check;
        }
      }
    }
  }  
  // console.log(assignPermissions); 
 }

 function Delete(id){
     // debugger;
     let check = false;
     var check1 = document.getElementById('as-'+id);
     if (check1.checked == true){  
       for(let i = 0; i< assignPermissions.length; i++){
         if(assignPermissions[i].permission.id == id){
           let change = document.getElementById('cd-'+id);
           if(change.checked == true){
             check = true;
             assignPermissions[i].canDelete=check;
           }
           else{
             assignPermissions[i].canDelete=check;
           }
         }
       }
     }  
    //  console.log(assignPermissions); 
   }
 





 function assignUrl(id){
    // debugger;
     
        var check1 = document.getElementById('ce-'+id);
        var check2 = document.getElementById('cd-'+id);
        var check3 = document.getElementById('as-'+id);
      
       var selectElement=document.getElementById('sel-'+id).value;
       var selectLabel=document.getElementById('label-'+id).value
        // var output=selectElement.value
        // console.log(selectElement);
        // var parentSelect = document.getElementById('parentName');
        // var parentName = parentSelect.value;
        // console.log(area);

        if (check3.checked == true){  
            assign = true;
            if (check1.checked == true){  
              canEdit = true;
            }   
           if (check2.checked == true){  
              canDelete = true;
            }
            obj={
              roles:{
                "id": document.getElementById("Roles").value
              },
              "permission":{
                "id": id
              },
              "parent":selectElement,
              "label":selectLabel,
              "canEdit":canEdit,
              "canDelete":canDelete,
              "assign": assign
            }
            assignPermissions.push(obj);
         }
         else{
          for(let i = 0; i< assignPermissions.length; i++){
            if(assignPermissions[i].permission.id == id){
              assignPermissions.splice(i,1);
              break;
            }
          }
         }

        console.log(assignPermissions);
    }


 function publish(){
  console.log(assignPermissions);
   
    debugger;
  for(let i=0; i< assignPermissions.length; i++){
    sendData(`/permission/role`,assignPermissions[i])
   .then((data=>{
    console.log(data);
  }))
  }
  window.location.reload();
 }








//   array of per = [{
      //id:1,
      //parent:"Area",
      //url:"viewArea.html",
      //canEdit : true,
      //carDelete:true
//},
//{
  //id:2,
  //parent:"Area",
  //url:"addArea.html",
  //canEdit : true,
  //carDelete:true
//}   
//]




// list = [
//{ 
    // parent:"area",
    // childerns : [
       // "addArea.html".
       // "viewAera.html"
       // "addblock.html"
    //]
//}

//]

// nav
// for i  10


// <li class="sidebar-item">
// <a data-bs-target="#complaintype" data-bs-toggle="collapse" class="sidebar-link collapsed">
//   <i class="align-middle" data-feather="clipboard"></i> <span class="align-middle">array[i].name</span>
// </a>
// <ul id="complaintype" class="sidebar-dropdown list-unstyled collapse "
//   data-bs-parent="#sidebar">

//   <li class="sidebar-item"><a class="sidebar-link"
//       href="/addcomplaintype.html">Add Complain Type</a></li>

//   <li class="sidebar-item"><a class="sidebar-link"
//       href="/viewcomplaintype.html">View Complain Type</a></li>
// </ul>
// </li>







const arr = [{id: 'a'}, {id: 'b'}, {id: 'c'}];

const index = arr.findIndex(object => {
  return object.id === 'b';
});

console.log(index); // 👉️ 1



