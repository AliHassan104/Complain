
var assignPermissions = [];
var role="";
var canEdit = false;
var canDelete = false;
var assign = false;

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
//   debugger
  let roleId = document.getElementById("Roles").value;
  // let url = `permission/`+roleId
  // console.log(url);
  // console.log(roleId);
    getData(`/permission/role/`+roleId)
    .then((permissions =>{
        debugger;
       let per = '';
       
       for(let i=0; i< permissions.length; i++){
           per+=`
           <tr id="${permissions[i].id}">
           <th scope="row">${i+1}</th>
           <td id="p-${permissions[i].id}">${permissions[i].permission.url}</td>
           `
            if(permissions[i].canEdit!=null && permissions[i].canDelete!=null){
                obj={
                    roles:{
                      "id": document.getElementById("Roles").value
                    },
                    "permission":{
                      "id": permissions[i].permission.id
                    },
                    "canEdit":permissions[i].canEdit,
                    "canDelete":permissions[i].canDelete,
                    "assign":true
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
    console.log(assignPermissions);
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
    debugger;
 
    var check3 = document.getElementById('as-'+id);
    // if(check3.checked == false){
        
    //     assign = false;
    //     // assignPermissions.splice(id-1,1)
    //     // console.log(assignPermissions);

    // }
    
        var check1 = document.getElementById('ce-'+id);
        var check2 = document.getElementById('cd-'+id);
        if (check1.checked == true){  
          canEdit = true;
        }   
       if (check2.checked == true){  
          canDelete = true;
        }
        if (check3.checked == true){  
            assign = true;
          }
        obj={
          roles:{
            "id": document.getElementById("Roles").value
          },
          "permission":{
            "id": id
          },
          "canEdit":canEdit,
          "canDelete":canDelete,
          "assign": assign
        }
        assignPermissions.push(obj);
        console.log(assignPermissions);
    }


 function publish(){
    debugger;
  
  for(let i=0; i< assignPermissions.length; i++){
    sendData(`/permission/role`,assignPermissions[i])
   .then((data=>{
    console.log(data);
  }))
  }
  window.location.reload();
 }