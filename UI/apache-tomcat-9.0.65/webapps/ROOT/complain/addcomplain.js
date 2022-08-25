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
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            table += `
            <option value="${data[i].id}">${data[i].name}</option>
        `
        }
        document.getElementById("complaintype").innerHTML = table;
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
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            table += `
            <option value="${data[i].id}">${data[i].name}</option>
        `
        }
        document.getElementById("droparea").innerHTML = table;
    })
}
function getUser() {
    let table = ""
    fetch("http://localhost:8081/api/user",{
        headers:{
            "Content-Type":"application/json",
            
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            table += `
            <option value="${data[i].id}">${data[i].firstname +" " + data[i].lastname}</option>
        `
        }
        document.getElementById("dropuser").innerHTML = table;
    })
}

// function formSubmit(){
    
//     let title = document.getElementById("title").value;
//     let suggestion = document.getElementById("suggestion").value;
//     let description = document.getElementById("description").value;
//     let date = document.getElementById("date").value;
//     let time = document.getElementById("time").value;

    
//     var select = document.getElementById('complaintype');
//     var complaintype = select.options[select.selectedIndex].value;
//     var select = document.getElementById('droparea');
//     var area = select.options[select.selectedIndex].value;
//     var select = document.getElementById('dropuser');
//     var user = select.options[select.selectedIndex].value;

//     let image = document.getElementById("inpFile");

//     newComplain = {title : title,description : description , suggestionForImprovement : suggestion , date : date , time : time ,
//          complaintype : {
//             id : complaintype
//          } ,
//          area : {
//             id : area
//          } , 
//          user : {
//             id : user
//          }
//         }; 

//     newComplain = JSON.stringify(newComplain)

//     console.log(newComplain);

//     var formData = new FormData();

//     for (const file of image.files) {
//         formData.append("pictureUrl",file)
//     }
//     formData.append('data',newComplain);

//     console.log(formData);

//     fetch("http://localhost:8081/api/complain", {
//     method: 'POST',
//     body: formData
// })
//     .then(response => response.json())
//     .then(data => {
//         console.log('Success:', data);
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });
// }

function formSubmit(){

    let title = document.getElementById("title").value;
    let suggestion = document.getElementById("suggestion").value;
    let description = document.getElementById("description").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;

    
    var select = document.getElementById('complaintype');
    var complaintype = select.options[select.selectedIndex].value;
    var select = document.getElementById('droparea');
    var area = select.options[select.selectedIndex].value;
    var select = document.getElementById('dropuser');
    var user = select.options[select.selectedIndex].value;

    let image = document.getElementById("inpFile");

    newAchievement = {title : title,description : description , suggestionForImprovement : suggestion 
        , date : date , time : time ,
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
    .then((data)=> console.log(data))
    .catch((error)=>console.log(error))

}