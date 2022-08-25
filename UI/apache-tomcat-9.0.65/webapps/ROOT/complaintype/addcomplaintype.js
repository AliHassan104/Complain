function formSubmit(){
    let complaintype = document.getElementById("complaintype").value;
    
    newComplainType = {name : complaintype}; 
    console.log(newComplainType);

    fetch("http://localhost:8081/api/complaintype", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(newComplainType)
})
.then(response => response.json())
.then(data => {
        console.log('Success:', data);
        document.getElementById("complaintype").value = "";
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    
}
    


