let queryString = window.location.search;
if (queryString != "") {
    queryString = queryString.slice(4,queryString.length)
    console.log(queryString);
    fetch(`${baseUrl}/api/area/`+queryString , {
})
.then(response => response.json()).catch(()=>{})
.then(data => {
        document.getElementById("name").value = data.name;
        document.getElementById("postalcode").value = data.postalCode
        document.getElementById("areabtn").innerText = "Update"
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


function formSubmit(){
    let name = document.getElementById("name").value;
    let postalcode = document.getElementById("postalcode").value;
    newArea = {name : name , postalCode : postalcode}; 


    if (queryString == "") {
    fetch(`${baseUrl}/api/area`, {
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
    <div class="alert alert-success" role="alert">
    <b> ${newArea.name} </b> &nbsp  Added In Area Successfully
    </div>`
    
    document.getElementById("formSubmitted").innerHTML = table
    document.getElementById("name").value = "";
    document.getElementById("postalcode").value = "";

    })
    .catch((error) => {
        console.error('Error:', error);
    });
}else{
    fetch(`${baseUrl}/api/area/`+queryString, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newArea),
        })
            .then(response => response.json()).catch(()=>{})
            .then(data => {
                // console.log('Success:', data);
                let table = ""
             table += `
            <div  style=" margin: auto;text-align: center;width: 50%;height: 5vh; text-align: center; 
            justify-content: center;font-size: large" class="alert alert-success" role="alert">
            <b> ${newArea.name} </b> &nbsp  Updated In Area Successfully
            </div>` //<b> ${complaintype} </b>
    
                document.getElementById("formSubmitted").innerHTML = table
                document.getElementById("name").value = "";
                document.getElementById("postalcode").value = "";
            })
            .catch((error) => {
                console.error('Error:', error);
            });
}
    
}



