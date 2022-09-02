function formSubmit(){
    let name = document.getElementById("name").value;
    // let block = document.getElementById("block").value;
    let postalcode = document.getElementById("postalcode").value;

    // newArea = {name : name , block : block , postalCode : postalcode}; 
    newArea = {name : name , postalCode : postalcode}; 
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
        let table = ""
        table += `
    <div  style=" 
    margin: auto;
    text-align: center;
    width: 50%;
    height: 5vh; text-align: center; 
    justify-content: center;
    font-size: large" 
    class="alert alert-success" role="alert">
    <b> ${newArea.name} </b> &nbsp  Added In Area Successfully
    </div>` //<b> ${complaintype} </b>
    
    document.getElementById("formSubmitted").innerHTML = table
    document.getElementById("name").value = "";
    document.getElementById("postalcode").value = "";

    })
    .catch((error) => {
        console.error('Error:', error);
    });
    
    
}



