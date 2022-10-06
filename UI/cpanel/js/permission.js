
    var array=[]

function newElement() {

    fetch("http://localhost:8081/api/permission", {
        headers: {
            "Content-Type": "application/octet-stream",

        },
        method: 'GET'

    }).then((response) => console.log(response))
        .then(data1 => array=data1)
        .then(error => {console.log(error)
        });
        var data =`
        <tr>
        <th>
            Permissions
        </th>
    </tr>`
    array.push(document.getElementById("myInput").value)
    for(let i=0 ; i<array.length ; i++){
        data+=`
    <tr>
        <td>${array[i]}</td>
       
      </tr>
        `
    }

    document.getElementById("myTable").innerHTML=data



  }



