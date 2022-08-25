function formSubmit(){

    let title = document.getElementById("achievementtitle").value;
    let description = document.getElementById("description").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;
    let image = document.getElementById("inpFile");

    newAchievement = {title : title, description : description , date : date , time : time}; 

    newAchievement = JSON.stringify(newAchievement)

    var formData = new FormData();

    for (const file of image.files) {
        formData.append("pictureUrl",file)
    }
    formData.append('data',newAchievement);

    fetch("http://localhost:8081/api/achievement",{
        method:"POST",
        body: formData
    
    }).then((response)=>response.json())
    .then((data)=> console.log(data))
    .catch((error)=>console.log(error))

    document.getElementById("achievementtitle").value = "";
    document.getElementById("description").value = "";
    document.getElementById("date").value = "";
    document.getElementById("time").value = "";
    document.getElementById("inpFile").value.files = "";

}