let uid;
getPollingOption()

function getPollingOption() {
    let table = ""
    fetch("http://localhost:8081/api/admin/pollingoption",{
        headers:{
            // mode: 'no-cors',
            // "Authorization":jwtTokenBearer,
            "Content-Type":"application/json",
            
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
        // console.log(data);

        table += `
        <tr style="width: 100%; display: flex; justify-content: space-between;" class="tablepoint">
        <th style="width: 10%;" class="toptable ">S.NO</th>
        <th style="width: 40%;" class="toptable ">Question</th>
        <th style="width: 40%;" class="toptable ">Option</th>
        <th style="width: 10%;" class="toptable ">Action</th>
        </tr>`
        for (let i = 0; i < data.length; i++) {
            if(data[i].pollingQuestion != null){
                table += `
                <tr class="tablepoint " style="width: 100%; display: flex; justify-content: space-between;" >
                <td style="width: 10%;" class="datatable">${i+1}</td>
                <td style="width: 40%;" class="datatable">${data[i].pollingQuestion.question}</td>
                <td style="width: 40%;" class="datatable">${data[i].option}

                </td><td style="width: 10%;" class="datatable"> 
                <i onclick="modalValue(${data[i].id})" data-bs-toggle="modal" data-bs-target="#exampleModal"  
                style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
                <i onclick="deleteAchievement(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
                </td>
                </tr>`
            }
            document.getElementById("pollingoptiontable").innerHTML = table;
        }
    })
}

function updateOption(){

    var select = document.getElementById('dropdownarea');
    var question = select.options[select.selectedIndex].value;
    console.log(question);
    let pollingOption = document.getElementById("pollingoption").value;

    newPollingQuestion = 
    {option : pollingOption , 
        pollingQuestion : {
        id : question
    }}; 

    fetch('http://localhost:8081/api/pollingoption/'+uid, {
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
                getPollingOption()
            }, 100);
}

function deleteAchievement(id){
    
    fetch('http://localhost:8081/api/pollingoption/'+id, {
            method: 'DELETE'
    })

    setTimeout(() => {
        getPollingOption()
    }, 100);

}

function modalValue(id){
    uid = id
    console.log(id)
    fetch("http://localhost:8081/api/pollingoption/"+id,{
        headers:{
            "Content-Type":"application/json",
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
        console.log(data);
    document.getElementById("pollingoption").value = data.option;
    })
    
getQuestion();
}

function getQuestion() {
    let table = ""
    fetch("http://localhost:8081/api/pollingquestion",{
        headers:{
            "Content-Type":"application/json",
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
        console.log(data);
        for (let i = 0; i < data.length; i++) {

            table += `
            <option value="${data[i].id}">${data[i].question}</option>
        `
        }
        document.getElementById("dropdownarea").innerHTML = table;
    })
}