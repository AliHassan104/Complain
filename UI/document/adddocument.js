let queryString;
setTimeout(() => {
    queryString = window.location.search;
    console.log(queryString);
    
    if (queryString != "") {
    queryString = queryString.slice(4,queryString.length)
    console.log(queryString);
    // fetch(`http://${}/api/document/${queryString}` , {
    fetch(`${baseUrl}/api/document/${queryString}` , {
})
.then(response => response.json()).catch(()=>{})
.then(data => {
        console.log(data);
        document.getElementById("url").value = data.url;
        document.getElementById("title").value = data.title;
        document.getElementById("dropdownarea").value = data.area.name;
        document.getElementById("documentbtn").innerText = "Update";
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}}, 200);

function formSubmit(){

    let url = document.getElementById("url").value;
    let title = document.getElementById("title").value;
    var select = document.getElementById('dropdownarea');
    var area = select.options[select.selectedIndex].value;


    newDocument = {url : url,
        area : {
            id : area
        }
    }; 
    console.log(newDocument);

    if (queryString == "") {
        fetch(`${baseUrl}/api/document`, {
            method: 'POST',
            headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(newDocument)
})
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        let table = ""
        table += `
    <div class="alert alert-success" role="alert">
    <b> ${title} </b>  &nbsp Added In Documents Successfully
    </div>`
        document.getElementById("formSubmitted").innerHTML = table
    })
    .catch((error) => {
        console.error('Error:', error);
    });

} else {
    fetch(`${baseUrl}/api/document/${queryString}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDocument),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            let table = ""
        table += `
    <div class="alert alert-success" role="alert">
    <b> ${title} </b>  &nbsp Updated In Documents Successfully
    </div>`
        document.getElementById("formSubmitted").innerHTML = table
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
    
    
    document.getElementById("url").value = "";
}

function getArea() {
    let table = ""
    // fetch(`${baseUrl}/api/area`,{
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
            <option value="${data[i].id}">${data[i].name}</option>`
        }
        
        document.getElementById("dropdownarea").innerHTML = table;
        
    })
}

getArea();