let queryString;
setTimeout(() => {
    
    queryString = window.location.search;
    console.log(queryString);
    
    if (queryString != "") {
    queryString = queryString.slice(4,queryString.length)
    console.log(queryString);
    fetch("http://localhost:8081/api/complaintype/"+queryString , {
})
.then(response => response.json()).catch(()=>{})
.then(data => {
        console.log(data);
        document.getElementById("addcomplaintype").value = data.name;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

}, 200);


function formSubmit(){
    let complaintype = document.getElementById("addcomplaintype").value;
    
    newComplainType = {name : complaintype}; 
    console.log(newComplainType);
if (queryString == "") {
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
        document.getElementById("formSubmitted").innerHTML = table
        document.getElementById("addcomplaintype").value = "";
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}else{

    fetch('http://localhost:8081/api/complaintype/'+queryString, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newComplainType)
        })
            .then(response => response.json()).catch(()=>{})
            .then(data => {
                // console.log('Success:', data);
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
        <b> ${complaintype} </b>  &nbsp Complain Type  Updated Successfully
        </div>` //<b> ${complaintype} </b>
        // console.log('Success:', data);
        document.getElementById("formSubmitted").innerHTML = table

            })
            .catch((error) => {
                console.error('Error:', error);
            });
}



}


