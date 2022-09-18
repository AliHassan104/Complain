getComplain()
getArea()
getUser()

let queryString = window.location.search;
if (queryString != "") {
    // queryString = queryString.slice(4,queryString.length)
    // console.log(queryString);
    const urlParams = new URLSearchParams(queryString)
        const urlId = urlParams.get("id")
    fetch(`${baseUrl}/api/complain/`+urlId , {
})
.then(response => response.json()).catch(()=>{})
.then(data => {
        console.log(data);

        // document.getElementById("name").value = data.name;
        // document.getElementById("postalcode").value = data.postalCode
        document.getElementById("complainbtn").innerText = "Update"

        // document.getElementById('dropcomplaintype'). = data.complainType.name;
        document.getElementById('description').value = data.description;
        // select.options[select.selectedIndex].value;

        // document.getElementById('droparea').value = data.area.name;
        // select.options[select.selectedIndex].value;

        // document.getElementById('dropuser').value = data.user.firstNmae;
        // select.options[select.selectedIndex].value;

        // document.getElementById("inpFile");
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


function getComplain() {
    let table = ""
    // fetch(`${baseUrl}/api/complaintype`,{
    fetch(`${baseUrl}/api/complaintype`,{
        headers:{
            "Content-Type":"application/json",
            
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
        for (let i = 0; i < data.length; i++) {
            table += `
            <option value="${data[i].id}">${data[i].name}</option>
        `
        }
        document.getElementById("dropcomplaintype").innerHTML = table;
    })
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
        document.getElementById("droparea").innerHTML = table;
    })
}
let username;
function getUser() {
    let table = ""
    fetch(`${baseUrl}/api/user`,{
        headers:{
            "Content-Type":"application/json",
            
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
        // console.log(data);
        for (let i = 0; i < data.length; i++) {
            table += `
            <option value="${data[i].id}">${data[i].firstname +" " + data[i].lastname}</option>
        `
        }
        document.getElementById("dropuser").innerHTML = table;
    })
}



function formSubmit(){

    // let title = "abc";
    // let suggestion = "abc";
    let description = document.getElementById("description").value;

    const date = new Date();
    // [2022, 8, 30]
    // let d =  date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    // let d = "["+date.getFullYear()+","+(date.getMonth()+1)+","+date.getDate()+"]";
    let d = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
    // let d =  date.getFullYear()+date.getDate()+"/"+(date.getMonth()+1)+"/";

    // [15, 30]
    const t = new Date().toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false});
    
    var select = document.getElementById('dropcomplaintype');
    var complaintype = select.options[select.selectedIndex].value;
    var select = document.getElementById('droparea');
    var area = select.options[select.selectedIndex].value;
    var select = document.getElementById('dropuser');
    var user = select.options[select.selectedIndex].value;

    let image = document.getElementById("inpFile");

    newAchievement = {description : description  
        , date : d , time : t ,
        complainType : {
           id : complaintype
        } ,
        area : {
           id : area
        } , 
        user : {
           id : user
        }
       }; 

    newAchievement = JSON.stringify(newAchievement)

    var formData = new FormData();

    for (const file of image.files) {
        formData.append("pictureUrl",file)
    }
    formData.append('data',newAchievement);
    console.log(queryString);
    if (queryString == "") {
        fetch(`${baseUrl}/api/complain`,{
        method:"POST",
        body: formData
    
    }).then((response)=>response.json())
    .then((data)=>{
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
    Your Complain Is Added  Successfully
    </div>`
    document.getElementById("formSubmitted").innerHTML = table
    })   
    .catch((error)=>console.log(error))
}else{
    fetch(`${baseUrl}/api/complain`+queryString,{
        method:"PUT",
        body: formData
    
    }).then((response)=>response.json()).catch(()=>{})
    .then((data)=>{
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
    Your Complain Is Updated Successfully
    </div>`
    document.getElementById("formSubmitted").innerHTML = table
    })   
    // .catch((error)=>console.log(error))
}
    
}