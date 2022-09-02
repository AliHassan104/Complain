function formSubmit(){
    let complaintype = document.getElementById("addcomplaintype").value;
    
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
    <b> ${complaintype} </b>  &nbsp Complain Type  Added Successfully
    </div>` //<b> ${complaintype} </b>
        // console.log('Success:', data);
        document.getElementById("complaintype").value = "";
        document.getElementById("formSubmitted").innerHTML = table
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    
}
    


