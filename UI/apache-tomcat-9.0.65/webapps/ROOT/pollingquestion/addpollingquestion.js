function formSubmit(){
    let pollingQuestion = document.getElementById("pollingquestion").value;

    newPollingQuestion = {question : pollingQuestion}; 
    console.log(newPollingQuestion);

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
}
    


