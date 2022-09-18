let queryString;
setTimeout(() => {
    
    queryString = window.location.search;
    // console.log(queryString);
    
    if (queryString != "") {
        const urlParams = new URLSearchParams(queryString)
        const urlId = urlParams.get("id")
    // queryString = queryString.slice(4,queryString.length)
    // console.log(queryString);
    fetch(`${baseUrl}/api/block/${urlId}`, {
    // fetch("http://localhost:8081/api/block/"+queryString , {
})
.then(response => response.json()).catch(()=>{})
.then(data => {
        console.log(data);
        
        // document.getElementById("date").value = data.date;
        document.getElementById("block").value = data.block_name;
        document.getElementById("formButton").innerText = "Update";
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
}, 200);


function formSubmit(){

    var select = document.getElementById('dropdownarea');
    var area = select.options[select.selectedIndex].value;

    // let date = document.getElementById("date").value;
    let block = document.getElementById("block").value;

    newArea = {area :{
        id : area
    } , block_name : block
    }; 
    console.log(newArea);

    if (queryString == "") {
        
        
        fetch(`${baseUrl}/api/block`, {
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
    
    document.getElementById("block").value = "";
    
    document.getElementById("formSubmitted").innerHTML = table
})
.catch((error) => {
    console.error('Error:', error);
});

}else{
    fetch(`${baseUrl}/api/block/${queryString}`, {
            method: 'PUT',
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
    &nbsp  Water Timing Updated Successfully
    </div>` //<b> ${complaintype} </b>
    
    document.getElementById("block").value = "";
    
    document.getElementById("formSubmitted").innerHTML = table
})
.catch((error) => {
    console.error('Error:', error);
});
}
}

function getArea() {
    let table = ""
    fetch(`${baseUrl}/api/area`,{
        headers:{
            "Content-Type":"application/json",
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
        // console.log(data);
        for (let i = 0; i < data.length; i++) {

            table += `
            <option value="${data[i].id}">${data[i].name}</option>
        `
        }
        document.getElementById("dropdownarea").innerHTML = table;
    })
}
getArea();

