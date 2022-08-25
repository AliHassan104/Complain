function getUser() {
    let table = ""
    fetch("http://localhost:8081/api/user",{
        headers:{
            "Content-Type":"application/json",
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
        for (let i = 0; i < data.length; i++) {

            table += `
            <option value="${data[i].id}">${data[i].firstname}</option>
        `
        }
        document.getElementById("user").innerHTML = table;
    })
}
getUser();

function getQuestion() {
    let table = ""
    fetch("http://localhost:8081/api/pollingquestion",{
        headers:{
            "Content-Type":"application/json",
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
        for (let i = 0; i < data.length; i++) {
            if (data[i].question != null) {
                            table += `
                            <option value="${data[i].id}">${data[i].question}</option>
                        `
            }
        }
        document.getElementById("question").innerHTML = table;
    })
}

function changeOptions(){
    
    var select = document.getElementById('question');
    var question = select.options[select.selectedIndex].value;
    console.log(question);
    
    var select = document.getElementById('option');
    var option = select.options[select.selectedIndex].value;
    console.log(option);


}


getQuestion();
function getPollingOption() {
    let table = ""
    fetch("http://localhost:8081/api/pollingoption",{
        headers:{
            "Content-Type":"application/json",
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
        for (let i = 0; i < data.length; i++) {
            if (data[i].pollingQuestion != null) {  
                table += `
                <option value="${data[i].id}">${data[i].option}</option>
            `
            }
        }
        document.getElementById("option").innerHTML = table;
    })
}
getPollingOption();

function formSubmit(){
    var select = document.getElementById('user');
    var user = select.options[select.selectedIndex].value;

    var select = document.getElementById('question');
    var question = select.options[select.selectedIndex].value;

    var select = document.getElementById('option');
    var option = select.options[select.selectedIndex].value;

    newPollingAnswer = {
        user :{
        id : user
    },  pollingQuestion :{
        id : question
    },  pollingOption :{
        id : option
    }
}
    fetch("http://localhost:8081/api/pollinganswer", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPollingAnswer)
})
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}