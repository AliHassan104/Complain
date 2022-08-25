
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
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    
    document.getElementById("day").value = "";
    document.getElementById("date").value = "";
    document.getElementById("time").value = "";
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