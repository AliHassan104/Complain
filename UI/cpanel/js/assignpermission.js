


var assignPermissions = [];
var role="";
var canEdit = false;
var canDelete = false;

function roles(){
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
  // let url = `permission/`+roleId
  // console.log(url);
  // console.log(roleId);
    getData(`/permission/`+roleId)
    .then((permissions =>{
       let per = '';
       
       for(let i=0; i< permissions.length; i++){
           per+=`
           <tr id="${permissions[i].id}">
           <th scope="row">${i+1}</th>
           <td id="p-${permissions[i].id}">${permissions[i].url}</td>
           <td><input class="form-check-input" type="checkbox" 
           onclick="Edit(${permissions[i].id})" id="ce-${permissions[i].id}"></td>
           <td><input class="form-check-input" type="checkbox"
           onclick="Delete(${permissions[i].id})" id="cd-${permissions[i].id}"></td>
           <td><input class="form-check-input" type="checkbox" id="as-${permissions[i].id}" onclick="assignUrl(${permissions[i].id})"></td>
         </tr>
                `
       }
       document.getElementById("UrlTable").innerHTML = per;
    }))
 }

 function Edit(id){
  let check = false;
  // debugger;
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
  console.log(assignPermissions);
 }

 function Delete(id){
  let check = false;
  // debugger;
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
  console.log(assignPermissions);
 }
 
 function assignUrl(id){
  // debugger

  // var permissionId = document.getElementById('p-'+id).id; 
  var check1 = document.getElementById('ce-'+id);
  var check2 = document.getElementById('cd-'+id);
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
    "canEdit":canEdit,
    "canDelete":canDelete
  }
  assignPermissions.push(obj);
  console.log(assignPermissions);
 }

 function publish(){
  
  for(let i=0; i< assignPermissions.length; i++){
    sendData(`/permission/role`,assignPermissions[i])
   .then((data=>{
    console.log(data);
  }))
  }
  window.location.reload();
 }
