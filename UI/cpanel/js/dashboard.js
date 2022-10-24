
var canDelete=false;
var canEdit=false;

var arrayOfPermissions=[]
var accordingToParentUrls=[]

function logOut() {
    let token = localStorage.getItem("jwtToken")
    localStorage.clear();
    location.href = `${loginUrl}/loginpage.html`
}

function showUserData() {
   
    getUserData().then(
        (data) => {
            document.getElementById("username").innerText = data.firstname
            console.log(data)
        })
}

showUserData()

var permissions = []
var allPermissionRoles=[]
function getPermissionRoleData(){
    debugger;
    getData("/permission/permissionByRole").then(allPermissionRole=>{
        debugger
        allPermissionRoles=allPermissionRole
        checkPermissions();
        console.log(allPermissionRoles);
      
        for(let apr of allPermissionRole){
            if(permissions.some(p=>p.parent == apr.parent)){
               let foundIndex = permissions.findIndex(p=>p.parent == apr.parent)
               if(foundIndex != -1){
                permissions[foundIndex].childern.push({url:apr.permission.url , label:apr.label});
               }
            }else{
                let obj = {
                    parent:apr.parent,
                    childern:[{url:apr.permission.url,label:apr.label}]
                }
                permissions.push(obj);
            }
        }

        console.log(permissions)
        showNavbar()

    })
}

getPermissionRoleData();


function showNavbar(){
            
       let nav=	`<li class="sidebar-header">
						Pages
					</li>` 

       for(let i=0 ; i<permissions.length ; i++){


        if(permissions[i].parent === "Dashboard"){
            debugger
            nav+=    
            ` <li class="sidebar-item">
                             <a  class="sidebar-link collapsed" href="/${permissions[i].childern[0].url}">
                                 <i class="align-middle" data-feather="target"></i> <span  class="align-middle">${permissions[i].parent}</span>
                             </a>
             </li> `
                             
        }

else{
       nav+=    
       ` <li class="sidebar-item">
						<a data-bs-target="#${permissions[i].parent}" data-bs-toggle="collapse" class="sidebar-link collapsed">
							<i class="align-middle" data-feather="target"></i> <span class="align-middle">${permissions[i].parent}</span>
						</a>
                        <ul id="${permissions[i].parent}" class="sidebar-dropdown list-unstyled collapse " data-bs-parent="#sidebar">
                        `
                      
                        for(let j=0 ; j<permissions[i].childern.length ; j++){
                           
                           nav+=` <li class="sidebar-item">
                           <a class="sidebar-link" href="/${permissions[i].childern[j].url}">${permissions[i].childern[j].label}</a>
                           </li>
                            `
                        }
					nav+=`	</ul>
					</li> ` 
              
       }
    }
       document.getElementById('navBarByRole').innerHTML=nav
}


function checkPermissions(label){
    debugger;
    for(let i=0 ; i < allPermissionRoles.length ; i++){
        if(allPermissionRoles[i].label == label){
            if(allPermissionRoles[i].canDelete){
                canDelete=true
            }
            if(allPermissionRoles[i].canEdit){
                canEdit=true
            }
        }
    }
    console.log(canDelete)
    console.log(canEdit);
}