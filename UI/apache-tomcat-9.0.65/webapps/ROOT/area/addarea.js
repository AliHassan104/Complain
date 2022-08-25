console.log(123);

function formSubmit(){
    let name = document.getElementById("name").value;
    let block = document.getElementById("block").value;
    let postalcode = document.getElementById("postalcode").value;

    newArea = {name : name , block : block , postalCode : postalcode}; 
    console.log(newArea);

    fetch("http://localhost:8081/api/area", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(newArea)
})
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    
    document.getElementById("name").value = "";
    document.getElementById("block").value = "";
    document.getElementById("postalcode").value = "";
}



