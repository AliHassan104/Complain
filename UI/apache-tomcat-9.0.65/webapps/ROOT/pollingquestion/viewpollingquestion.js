let uid;
getPollingQuestion()

function getPollingQuestion() {
    let table = ""
    fetch("http://localhost:8081/api/pollingquestion",{
        headers:{
            // mode: 'no-cors',
            // "Authorization":jwtTokenBearer,
            "Content-Type":"application/json",
            
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
        console.log(data);
        

        table += `
        <tr style="width: 100%; display: flex; justify-content: space-between;" class="tablepoint">
        <th style="width: 10%;" class="toptable ">S.NO</th>
        <th style="width: 80%;" class="toptable ">Question</th>
        <th style="width: 10%;" class="toptable ">Action</th>
        </tr>`
        for (let i = 0; i < data.length; i++) {
            console.log(data);
            table += `
        <tr class="tablepoint " style="width: 100%; display: flex; justify-content: space-between;" >
        <td style="width: 10%;" class="datatable">${i+1}</td>
        <td style="width: 80%;" class="datatable">${data[i].question}</td>
        <td style="width: 10%;" class="datatable"> 
        <i onclick="modalValue(${data[i].id})" data-bs-toggle="modal" data-bs-target="#exampleModal"  
        style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
        <i onclick="deletePollingQuestion(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
    </td>
        </tr>`
        }
        document.getElementById("pollingquestiontable").innerHTML = table;
    })
}

function updatePollingQuetion(){

    let pollingQuestion = document.getElementById("pollingquestion").value;

    newPollingQuestion = {question : pollingQuestion}; 
    console.log(newPollingQuestion);

    fetch('http://localhost:8081/api/pollingquestion/'+uid, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPollingQuestion),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });


            setTimeout(() => {
                getPollingQuestion()
            }, 100);
}

function deletePollingQuestion(id){
    
    fetch('http://localhost:8081/api/pollingquestion/'+id, {
            method: 'DELETE'
    })

    setTimeout(() => {
        getPollingQuestion()
    }, 100);

}

function modalValue(id){
    uid = id
    console.log(id)
    fetch("http://localhost:8081/api/pollingquestion/"+id,{
        headers:{
            "Content-Type":"application/json",
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
    document.getElementById("pollingquestion").value = data.question;
    // return data.name;
    })
}
