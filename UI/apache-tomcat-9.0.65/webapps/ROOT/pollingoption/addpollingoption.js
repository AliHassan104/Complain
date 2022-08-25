function formSubmit(){

    
    var select = document.getElementById('dropdownarea');
    var question = select.options[select.selectedIndex].value;
    console.log(question);
    let pollingOption = document.getElementById("pollingoption").value;
    newPollingQuestion = 
    {option : pollingOption , 
        pollingQuestion : {
        id : question
    }}; 
    console.log(newPollingQuestion);

    fetch("http://localhost:8081/api/pollingoption", {
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
getQuestion();
