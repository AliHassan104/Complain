let arr = [0];

let queryString = window.location.search;
if (queryString != "") {
    queryString = queryString.slice(4,queryString.length)
    // console.log(queryString);
    fetch(`${baseUrl}/api/pollingquestion/`+queryString , {
})
.then(response => response.json()).catch(()=>{})
.then(data => {
        console.log(data);

        document.getElementById("pollingquestionbtn").innerText = "Update"

        document.getElementById('addpollingquestion').value = data.question;


        for (let i = 0; i < data.pollingOptions.length-1; i++) {
            arr.push(i+1)
        }       

        setTimeout(() => {
            option()
        }, 200);


        setTimeout(() => {
            for (let i = 0; i < arr.length; i++) {
                console.log(data.pollingOptions[i].option);
                document.getElementById("pollingoption"+i).value = data.pollingOptions[i].option;
            }
        }, 200);
            
    })

}

function option(){ 

table = ""
for (let i = 0; i < arr.length; i++) {
    if (arr.length == 1) {
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
    console.log(i);
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
}

option();

function addOption(id){

    let pollingOption = []

    for (let i = 0; i < arr.length; i++) {
        let option = document.getElementById("pollingoption"+i).value;
        pollingOption.push(option);
    }

    arr.push(id) 

    option()

    for (let i = 0; i < pollingOption.length; i++) {
        document.getElementById("pollingoption"+i).value = pollingOption[i];
    }
    
}


function subtractOption(id){
    
    console.log(id);

    arr.splice(id,1)

    let pollingOption = []
    
    for (let i = 0; i < arr.length; i++) {
        console.log(i);
        if (i != id) {
            let option = document.getElementById("pollingoption"+i).value;
            pollingOption.push(option);
        }
    }
    
    option()

    for (let i = 0; i < pollingOption.length; i++) {
        // console.log( pollingOption[i]);
        document.getElementById("pollingoption"+i).value = pollingOption[i];

    }
}

function formSubmit(){
    let pollingQuestion = document.getElementById("addpollingquestion").value;
    let pollingOption = []

    for (let i = 0; i < arr.length; i++) {
        let option = document.getElementById("pollingoption"+i).value;
        options = {option}
        pollingOption.push(options);
    }

    newPollingQuestion = {question : pollingQuestion ,
        pollingOptions : pollingOption}

    console.log(newPollingQuestion);

    if (queryString == "" ) {
        
        fetch("http://localhost:8081/api/pollingquestion", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPollingQuestion)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }else{
        fetch("http://localhost:8081/api/pollingquestion/"+queryString, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPollingQuestion)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}
    


