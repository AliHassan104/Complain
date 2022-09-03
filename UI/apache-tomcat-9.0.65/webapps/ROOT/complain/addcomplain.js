getComplain()
getArea()
getUser()

function getComplain() {
    let table = ""
    fetch("http://localhost:8081/api/complaintype",{
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
        document.getElementById("dropcomplaintype").innerHTML = table;
    })
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
    fetch("http://localhost:8081/api/user",{
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

    let title = "abc";
    let suggestion = "abc";
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

    // time = t.slice(0,2)+":"+t.slice(3,5)

    // console.log(d +" "+time);
    


    // let date = document.getElementById("date").value;

    // let time = document.getElementById("time").value;

    
    var select = document.getElementById('dropcomplaintype');
    var complaintype = select.options[select.selectedIndex].value;
    var select = document.getElementById('droparea');
    var area = select.options[select.selectedIndex].value;
    var select = document.getElementById('dropuser');
    var user = select.options[select.selectedIndex].value;

    let image = document.getElementById("inpFile");

    newAchievement = {title : title,description : description , suggestionForImprovement : suggestion 
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

    fetch("http://localhost:8081/api/complain",{
        method:"POST",
        body: formData
    
    }).then((response)=>response.json())
    .then((data)=>{
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
    Your Complain Is Added  Successfully
    </div>`
    document.getElementById("formSubmitted").innerHTML = table
    })

    .catch((error)=>console.log(error))

}