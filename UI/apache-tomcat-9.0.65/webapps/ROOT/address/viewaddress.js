
getComplain()

function getComplain() {
    let table = ""
    fetch("http://localhost:8081/api/admin/address",{
        headers:{
            // mode: 'no-cors',
            // "Authorization":jwtTokenBearer,
            "Content-Type":"application/json",
            
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
        console.log(data);
        table += `<h2 style="display: inline-table;">Address</h2>`

        table += `
        <tr style="width: 100%; display: flex; justify-content: space-between;" class="tablepoint">
        <th style="width: 25%;" class="toptable ">House Number</th>
        <th style="width: 25%;" class="toptable ">Street</th>
        <th style="width: 25%;" class="toptable ">Floor Number</th>
        <th style="width: 25%;" class="toptable ">City</th>
        <th style="width: 25%;" class="toptable ">Action</th>
        </tr>`
        for (let i = 0; i < data.length; i++) {
            console.log(data);
            table += `

        <tr class="tablepoint " style="width: 100%; display: flex; justify-content: space-between;" >
            <td style="width: 25%;" class="datatable">${data[i].houseNumber}</td>
            <td style="width: 25%;" class="datatable">${data[i].street}</td>
            <td style="width: 25%;" class="datatable">${data[i].floorNumber}</td>
            <td style="width: 25%;" class="datatable">${data[i].city}</td>
            <td style="width: 10%;" class="datatable"> 
            <i onclick="updateAddress(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
            <i onclick="deleteAddress(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
    </td>
        </tr>`
        }
        document.getElementById("addresstable").innerHTML = table;
    })
}

function updateAddress(id){
    fetch('http://localhost:8081/api/achievement/'+id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    getAchievement()
}

function deleteAddress(id){
    
    fetch('http://localhost:8081/api/achievement/'+id, {
            method: 'DELETE'
    })

    getAchievement()

}