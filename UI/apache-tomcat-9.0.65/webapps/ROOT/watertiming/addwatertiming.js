
function formSubmit(){

    var select = document.getElementById('dropdownarea');
    var area = select.options[select.selectedIndex].value;

    let day = document.getElementById("day").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;

    newArea = {area :{
        id : area
    } , day : day , date : date , time : time
    }; 
    console.log(newArea);

    fetch("http://localhost:8081/api/watertiming", {
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
    &nbsp  Water Timing Added In Area Successfully
    </div>` //<b> ${complaintype} </b>

    document.getElementById("day").value = "";
    document.getElementById("date").value = "";
    document.getElementById("time").value = "";
    
    document.getElementById("formSubmitted").innerHTML = table
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    
 
}

function getArea() {
    let table = ""
    fetch("http://localhost:8081/api/area",{
        headers:{
            "Content-Type":"application/json",
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
        console.log(data);
        for (let i = 0; i < data.length; i++) {

            table += `
            <option value="${data[i].id}">${data[i].name}</option>
        `
        }
        document.getElementById("dropdownarea").innerHTML = table;
    })
}
getArea();