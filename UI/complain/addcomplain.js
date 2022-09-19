getComplain()
getArea()
getUser()

let queryString = window.location.search;
if (queryString != "") {
 
    const urlParams = new URLSearchParams(queryString)
    var urlId = urlParams.get("id")
    fetch(`${baseUrl}/api/complain/`+urlId , {
})
.then(response => response.json()).catch(()=>{})
.then(data => {
      

            document.getElementById("complainbtn").innerText = "Update"
            document.getElementById('description').value = data.description;

            getselectedDropDownElement('droparea',data.area.id)
            getselectedDropDownElement('dropcomplaintype',data.complainType.id)
        
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

//                                                                  used to get the selected drop down value
function getselectedDropDownElement(id, valueToSelect) {    
    let element = document.getElementById(id);
    element.value = valueToSelect;
}


function getComplain() {
    let table = ""
    fetch(`${baseUrl}/api/complaintype`,{
        headers:{
            "Content-Type":"application/json",
            
        }
    })
        .then((response) => response.json())
        .then((data) => {
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
        .then((response) => response.json())
        .then((data) => {
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
        .then((response) => response.json())
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                table += `
            <option value="${data[i].id}">${data[i].firstname + " " + data[i].lastname}</option>
        `
            }
            document.getElementById("dropuser").innerHTML = table;
        })
}



function formSubmit() {


    let description = document.getElementById("description").value;

    const date = new Date();
 
    let d = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
 
    const t = new Date().toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
    });

    var select = document.getElementById('dropcomplaintype');
    var complaintype = select.options[select.selectedIndex].value;
    var select = document.getElementById('droparea');
    var area = select.options[select.selectedIndex].value;
    var select = document.getElementById('dropuser');
    var user = select.options[select.selectedIndex].value;
    let image = document.getElementById("inpFile");

    newComplain = {description : description
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

    newComplain  = JSON.stringify(newComplain)

    var formData = new FormData();

    for (const file of image.files) {
        formData.append("pictureUrl", file)
    }
    formData.append('data',newComplain);
   
    if (queryString == "") {
        fetch(`${baseUrl}/api/complain`,{
        method:"POST",
        body: formData

    }).then((response)=>response.json())
    .then((data)=>{
       
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


    document.getElementById("description").value = "";
    document.getElementById("inpFile").value = "";
    document.getElementById("formSubmitted").innerHTML = table

    setTimeout(() => {
        document.getElementById("formSubmitted").innerHTML = ""
    }, 2000)
    
    })   
    .catch((error)=>console.log(error))
}else{
    fetch(`${baseUrl}/api/complain/`+urlId,{
        method:"PUT",
        body: formData

    }).then((response)=>response.json()).catch(()=>{})
    .then((data)=>{
        
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

    document.getElementById("description").value = "";
    document.getElementById("inpFile").value = "";
    document.getElementById("formSubmitted").innerHTML = table

                setTimeout(() => {
                    document.getElementById("formSubmitted").innerHTML = ""
                }, 2000)
            })
            .catch((error) => console.log(error))
    }

}