let queryString = window.location.search;
if (queryString != "") {
    queryString = queryString.slice(4,queryString.length)
    console.log(queryString);
    fetch(`${baseUrl}/api/achievement/`+queryString , {
})
.then(response => response.json()).catch(()=>{})
.then(data => {
        console.log(data);
        document.getElementById("achieveventbtn").innerText = "Update"

        document.getElementById('achievementtitle').value = data.title;
        document.getElementById('description').value = data.description;
        document.getElementById('date').value = data.date;
        // document.getElementById('time').value = data.time;
      
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function formSubmit(){

    let title = document.getElementById("achievementtitle").value;
    let description = document.getElementById("description").value;
    let date = document.getElementById("date").value;
    // let time = document.getElementById("time").value;
    let image = document.getElementById("inpFile");

    newAchievement = {title : title, description : description , date : date}; 

    newAchievement = JSON.stringify(newAchievement)

    var formData = new FormData();

    for (const file of image.files) {
        formData.append("pictureUrl",file)
    }
    formData.append('data',newAchievement);


    if (queryString == "") {
        
        fetch("http://localhost:8081/api/achievement",{
            method:"POST",
            body: formData
            
        }).then((response)=>response.json())
    .then((data)=> {
    // console.log(data);
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
    Achievement Is Added  Successfully
    </div>`
    document.getElementById("formSubmitted").innerHTML = table
    
    document.getElementById("achievementtitle").value = "";
    document.getElementById("description").value = "";
    document.getElementById("date").value = "";
    // document.getElementById("time").value = "";
    document.getElementById("inpFile").value.files = "";
})
.catch((error)=>console.log(error))

    }else{
        
        fetch("http://localhost:8081/api/achievement/"+queryString,{
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
    Achievement Is Updated  Successfully
    </div>`
    document.getElementById("formSubmitted").innerHTML = table
    
    document.getElementById("achievementtitle").value = "";
    document.getElementById("description").value = "";
    document.getElementById("date").value = "";
    document.getElementById("time").value = "";
    document.getElementById("inpFile").value.files = "";
})
.catch((error)=>console.log(error))
}
}