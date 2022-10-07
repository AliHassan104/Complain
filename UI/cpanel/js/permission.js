// async function getData1(url){
//     debugger;
//     var data;
//     var token = JSON.parse(localStorage.getItem("jwtToken"));
//   try {
//     const response = await fetch(url, {
//       method: "GET",
//       headers: {
//         "Authorization": "Bearer " + token,
//         "Content-type": "application/json",
//       },
//     });
//     const value = await response.json();
//     // data = value;
//     return value;
//   } catch (json) {
//     return json;
//   }
//   }
  
//   async function getDataWithBody(url, body){
//     debugger;
    
//     var data;
//     var token = JSON.parse(localStorage.getItem("jwtToken"));
//   try {
//     const response = await fetch(url, {
      
//       method: "POST",
//               body: JSON.stringify(body),
//       headers: {
//         "Authorization": "Bearer " + token,
//         "Content-type": "application/json",
//       },
//     });
//     const value = await response.json();
//     data = value;
//     return data;
//   } catch (json) {
//     return json;
//   }
//   }















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



