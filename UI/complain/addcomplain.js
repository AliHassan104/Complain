getComplain()
getArea()
getUser()


let queryString = window.location.search;
if (queryString != "") {

    const urlParams = new URLSearchParams(queryString)
    var urlId = urlParams.get("id")
    fetch(`${baseUrl}/api/complain/` + urlId, {
    })
        .then(response => response.json()).catch(() => { })
        .then(data => {

            document.getElementById("complainbtn").innerText = "Update"
            document.getElementById('description').value = data.description;

            getselectedDropDownElement('droparea', data.area.id)
            getselectedDropDownElement('dropcomplaintype', data.complainType.id)

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
    fetch(`${baseUrl}/api/complaintype`, {
        headers: {
            "Content-Type": "application/json",

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

var getBlockFromAreaId = 0;

function getArea() {
    let table = ""
    fetch(`${baseUrl}/api/area`, {
        headers: {
            "Content-Type": "application/json",

        }
    })
        .then((response) => response.json())
        .then((data) => {
            getBlockFromAreaId = data[0].id;
                                                        //  Show blocks of first area in drop down
            getBlock(getBlockFromAreaId)

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
    fetch(`${baseUrl}/api/user`, {
        headers: {
            "Content-Type": "application/json",
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

                                                    //  to get area on change of drop down value
document.getElementById('droparea').addEventListener('change', function () {
    getBlock(this.value);
});


function formSubmit() {

    let description = document.getElementById("description").value;
    var table = ""

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
    var selectBlock = document.getElementById("dropdownblock");
    var block_id = selectBlock.value;

     console.log("Block_id",block_id)

    newComplain = {
        description: description
        , date: d, time: t,
        complainType: {
            id: complaintype
        },
        area: {
            id: area
        },
        user: {
            id: user
        },
        block: {
            id:block_id
        }
    };

     console.log(newComplain)

    if (image.value != "" && description != "") {

        newComplain = JSON.stringify(newComplain)

        var formData = new FormData();

        for (const file of image.files) {
            formData.append("pictureUrl", file)
        }
        formData.append('data', newComplain);

        if (queryString == "") {
            fetch(`${baseUrl}/api/complain`, {
                method: "POST",
                body: formData

            }).then((response) => response.json())
                .then((data) => {

                
                    table += `
        <div  style="
        margin: auto;
        text-align: center;
        width: 50%;
        height: 5vh; text-align: center; 
        justify-content: center;
        font-size: large" 
        class="alert alert-success" role="alert">
        <b> Your Complain Is Added  Successfully </b>
        </div>`


                    document.getElementById("description").value = "";
                    document.getElementById("inpFile").value = "";
                    document.getElementById("formSubmitted").innerHTML = table

                    setTimeout(() => {
                        document.getElementById("formSubmitted").innerHTML = ""
                    }, 2000)

                })
                .catch((error) => console.log(error))
        } else {
            fetch(`${baseUrl}/api/complain/`+urlId, {
                method: "PUT",
                body: formData

            }).then((response) => response.json()).catch(() => { })
                .then((data) => {

                   
                    table += `
    <div  style=" 
    margin: auto;
    text-align: center;
    width: 50%;
    height: 5vh; text-align: center; 
    justify-content: center;
    font-size: large" 
    class="alert alert-success" role="alert">
    <b> Your Complain Is Updated Successfully </b>
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
    else {
        table += `
        <div  style=" 
        margin: auto;
        text-align: center;
        width: 60%;
        height: 5vh; text-align: center; 
        justify-content: center;
        font-size: large" 
        class="alert alert-danger" role="alert">
        <b> Invalid Data Complain Image Or Description Cannot be Empty <b>
        </div>`

        document.getElementById("formSubmitted").innerHTML = table

        setTimeout(() => {
            document.getElementById("formSubmitted").innerHTML = ""
        }, 3000)
    }
}

function getBlock(id){
    let renderBlock = ''
    getData(`blockByArea/${id}`)
    .then((data)=>{
        if(data != null){
         for (let i = 0; i < data.length; i++) {
            renderBlock += `<option value=${data[i].id}>${data[i].block_name}</option>`
         }
        }
        else{
            renderBlock += `<option value="">"Sorry No Block Available"</option>`
        }

         document.getElementById("dropdownblock").innerHTML = renderBlock
    })
}