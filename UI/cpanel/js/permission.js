
var permissions = [];

function addPermission() {

    let permissionData ={ 
        url:document.getElementById("myInput").value
    }
    permissions.push(document.getElementById("myInput").value);
    sendData(`/permission`,permissionData)
        .then((data) => {
            debugger;
            let data1 = '';
            // console.log(data)
                for(let i=0 ; i<permissions.length ; i++){
                    data1+=`
                <tr> 
                    <td>${permissions[i]}</td> 
                </tr>
                    `
                }
                document.getElementById("UrlTable").innerHTML=data1
            })
  }
