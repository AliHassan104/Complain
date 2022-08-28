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
        table += `
        <tr style="width: 100%; display: flex; justify-content: space-between;" class="tablepoint">
        <th style="width: 10%;" class="toptable ">Q .NO</th>
        <th style="width: 80%;" class="toptable ">Question</th>
        <th style="width: 10%;" class="toptable ">Action</th>
        </tr>`
        for (let i = 0; i < data.length; i++) {
            // console.log(data);
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

        count = 1
        table +=  `<tr>
            <td><span style="padding-left: 5.5%; margin-left: 5.5%;"  ></span><b>Options :</b> </td>
        </tr>`

        data[i].pollingOptions.forEach((item) => {
            table+=
            ` <tr >
                 <td> <span style="padding-left: 6%; margin-left: 6%;"  >${count}</span> - ${item.option} </td>
             </tr>`;

             count += 1;
        })

        }

        document.getElementById("pollingquestiontable").innerHTML = table;
    })
}

function updatePollingQuetion(){

    let pollingQuestion = document.getElementById("pollingquestion").value;
    let pollingOption = []

    console.log(arr);

    for (let i = 0; i < arr.length; i++) {
        let option = document.getElementById("pollingoption"+i).value;
        options = {option}
        pollingOption.push(options);
    }

    newPollingQuestion = {question : pollingQuestion ,
        pollingOptions : pollingOption}

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
            }, 1000);

}

function deletePollingQuestion(id){
    
    fetch('http://localhost:8081/api/pollingquestion/'+id, {
            method: 'DELETE'
    })

    setTimeout(() => {
        getPollingQuestion()
    }, 200);

}

let arr = [] ;

function modalValue(id){
    uid = id
    arr = []
    table = ""
    fetch("http://localhost:8081/api/pollingquestion/"+id,{
        headers:{
            "Content-Type":"application/json",
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
        for (let i = 0; i < data.pollingOptions.length; i++) {
            arr.push(data.pollingOptions[i].option);
        }

        for (let i = 0; i < count1; i++) {
            arr.push("");
        }

    
    table = ""
    for (let i = 0; i < arr.length; i++) {
        if (data.pollingOptions.length == 1) {
            table += `
        <tr>
        <td>
        <input style="margin-top: 10px;" type="text" class="form-control" id="pollingoption${i}" aria-describedby="emailHelp" placeholder="Enter Option">
        </td>
        <td> 
        <i onclick="addOption(${i})"  
        style="padding-right: 15px; margin-right: 15px;padding-left: 15px; margin-left: 15px;"  class="fa fa-plus"></i>
        </td>
        </tr>`
    }else{
        table += `
        <tr>
        <td>
        <input style="margin-top: 10px;" type="text" class="form-control" id="pollingoption${i}" aria-describedby="emailHelp" placeholder="Enter Option">
        </td>
        <td> 
        <i onclick="addOption(${i})"  
        style="padding-right: 15px; margin-right: 15px;padding-left: 15px; margin-left: 15px;"  class="fa fa-plus"></i>
        <i onclick="subtractOption(${i})"  style="padding-right: 15px; margin-right: 15px;" 
        class="fa fa-minus"></i>
        </td>
        </tr>    `
    }
}

document.getElementById("dynamicoption").innerHTML = table;
document.getElementById("pollingquestion").value = data.question;

// debugger;
for (let i = 0; i < arr.length; i++) {
        document.getElementById("pollingoption"+i).value = arr[i];
}

// arr = []

})}

let count1 = 0

function addOption(id){
    // console.log(id);
    count1 ++;

    // let pollingOption = []

    // for (let i = 0; i < arr.length; i++) {
    //     let option = document.getElementById("pollingoption"+i).value;
    //     pollingOption.push(option);
    // }

    // for (let i = 0; i < count1; i++) {
        // arr.push("") 
        
    // }

    modalValue(uid)

    // for (let i = 0; i < pollingOption.length; i++) {
    //     document.getElementById("pollingoption"+id).value = pollingOption[id];
    // }
    
}

let sid = null;

function subtractOption(id){

    count1 -- ;

    sid = id

    // arr.splice(id,1)

    // let pollingOption = []
    
    // for (let i = 0; i < arr.length; i++) {
    //     console.log(i);
    //     if (i != id) {
    //         let option = document.getElementById("pollingoption"+i).value;
    //         pollingOption.push(option);
    //     }
    // }
    
    modalValue(uid)
    // option()

    // for (let i = 0; i < pollingOption.length; i++) {
    //     // console.log( pollingOption[i]);
    //     document.getElementById("pollingoption"+i).value = pollingOption[i];

    // }
}