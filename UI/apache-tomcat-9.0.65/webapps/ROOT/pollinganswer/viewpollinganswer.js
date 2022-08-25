getComplain()

function getComplain() {
    let table = ""
    fetch("http://localhost:8081/api/admin/pollinganswer",{
        headers:{
            // mode: 'no-cors',
            // "Authorization":jwtTokenBearer,
            "Content-Type":"application/json",
            
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
        console.log(data);
        table += `<h2 style="display: inline-table;">Polling Answer</h2>`

        table += `
        <tr style="width: 100%; display: flex; justify-content: space-between;" class="tablepoint">
        <th style="width: 10%;" class="toptable ">S.NO</th>
        <th style="width: 25%;" class="toptable ">User</th>
        <th style="width: 30%;" class="toptable ">Question</th>
        <th style="width: 25%;" class="toptable ">Answer</th>
        <th style="width: 10%;" class="toptable ">Action</th>
        </tr>`
        for (let i = 0; i < data.length; i++) {
            console.log(data[i].pollingQuestion);
            
            if (data[i].user != null || data[i].pollingQuestion != null || data[i].pollingOption != null ) {
                
                table += `
                <tr class="tablepoint " style="width: 100%; display: flex; justify-content: space-between;" >
                <td style="width: 10%;" class="datatable">${i+1}</td>
                <td style="width: 25%;" class="datatable">${data[i].user.firstname+" "+data[i].user.lastname}</td>
                <td style="width: 30%;" class="datatable">${data[i].pollingQuestion.question}</td>
                <td style="width: 25%;" class="datatable">${data[i].pollingOption.option}</td>
                <td style="width: 10%;" class="datatable"> 
                <i onclick="updatePollingAnswer(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
                <i onclick="deletePollingAnswer(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
                </td>
                </tr>`
            }
            }
            document.getElementById("pollinganswertable").innerHTML = table;
    })
}

function updatePollingAnswer(id){
    fetch('http://localhost:8081/api/pollinganswer/'+id, {
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

function deletePollingAnswer(id){
    
    fetch('http://localhost:8081/api/pollinganswer/'+id, {
            method: 'DELETE'
    })

    getAchievement()

}