function addPermission() {

    permissionData ={ 
        url:document.getElementById("myInput").value
    }
    sendData(`/permission`,permissionData)
        .then((data) => {
            console.log(data)
            getData(`/permission`)
            .then((allPermission) =>{
                var data =`
                <tr>
                <th>
                    Permissions
                </th>
            </tr>`
                console.log(allPermission)
                for(let i=0 ; i<allPermission.length ; i++){
                    data+=`
                <tr>
                    <td>${allPermission[i].url}</td> 
                </tr>
                    `
                }
                document.getElementById("myTable").innerHTML=data
            })
        })
  }