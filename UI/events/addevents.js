let queryString = window.location.search;

if (queryString != "") {
    queryString = queryString.slice(4,queryString.length)
    fetch(`${baseUrl}/api/event/`+queryString , {
})
.then(response => response.json()).catch(()=>{})
.then(data => {
        document.getElementById("achieveventbtn").innerText = "Update"
        // document.getElementById('achievementtitle').value = data.title;
        document.getElementById('description').value = data.description;
        document.getElementById('start_date').value = data.startDate;
        document.getElementById('start_time').value = data.startTime;
      
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function formSubmit(){

    // let title = document.getElementById("achievementtitle").value;
    let description = document.getElementById("description").value;
    let date = document.getElementById("start_date").value;
    let time = document.getElementById("start_time").value;
    let image = document.getElementById("inpFile");

    newAchievement = {description : description , startDate : date , startTime : time}; 

    newAchievement = JSON.stringify(newAchievement)

    var formData = new FormData();

    for (const file of image.files) {
        formData.append("image",file)
    }
    formData.append('data',newAchievement);


    if (queryString == "") {
        
        fetch("http://localhost:8081/api/event",{
            method:"POST",
            body: formData
            
        }).then((response)=>response.json())
    .then((data)=> {
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
    Event Is Added  Successfully
    </div>`
    document.getElementById("formSubmitted").innerHTML = table
    
    // document.getElementById("achievementtitle").value = "";
    document.getElementById("description").value = "";
    document.getElementById("start_date").value = "";
    document.getElementById("start_time").value = "";
    document.getElementById("inpFile").value.files = "";
})
.catch((error)=>console.log(error))

    }
    else{
         console.log("Iam query String",queryString)
        fetch("http://localhost:8081/api/event/"+queryString,{
            method:"PUT",
            body: formData
            
        }).then((response)=>response.json())
    .then((data)=> {
    console.log(data);
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
    Event Is Updated  Successfully
    </div>`
    document.getElementById("formSubmitted").innerHTML = table
    
    // document.getElementById("achievementtitle").value = "";
    document.getElementById("description").value = "";
    document.getElementById("start_date").value = "";
    document.getElementById("start_time").value = "";
    document.getElementById("inpFile").value.files = "";
})
.catch((error)=>console.log(error))
}
}