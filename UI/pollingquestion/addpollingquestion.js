let arr = [0];

let queryString = window.location.search;
if (queryString != "") {
    const urlParams = new URLSearchParams(queryString)
    var urlId = urlParams.get("id")

    fetch(`${baseUrl}/api/pollingquestion/` + urlId, {
    })
        .then(response => response.json()).catch(() => { })
        .then(data => {


            document.getElementById("pollingquestionbtn").innerText = "Update"
            document.getElementById('addpollingquestion').value = data.question;


            for (let i = 0; i < data.pollingOptions.length - 1; i++) {
                arr.push(i + 1)
            }

            setTimeout(() => {
                option()
            }, 200);


            setTimeout(() => {
                for (let i = 0; i < arr.length; i++) {
                    console.log(data.pollingOptions[i].option);
                    document.getElementById("pollingoption" + i).value = data.pollingOptions[i].option;
                }
            }, 200);

        })

}

function option() {

    table = ""
    for (let i = 0; i < arr.length; i++) {
        if (arr.length == 1) {
            table += `
    <tr>
    <td>
    <input style="margin-top: 10px;" type="text" class="form-control" id="pollingoption${i}" aria-describedby="emailHelp" placeholder="Enter Option">
    </td>
    <td> 
    <i onclick="addOption(${i})"  
    style="padding-right: 15px; margin-right: 15px;padding-left: 15px; margin-left: 15px;"  class="fa fa-plus"></i>
    </td>
    </tr>`
        } else {
            console.log(i);
            table += `
    <tr>
    <td>
    <input style="margin-top: 10px;" type="text" class="form-control" id="pollingoption${i}" aria-describedby="emailHelp" placeholder="Enter Option">
    </td>
    <td> 
    <i onclick="addOption(${i})"  
    style="padding-right: 15px; margin-right: 15px;padding-left: 15px; margin-left: 15px;"  class="fa fa-plus"></i>
    <i onclick="subtractOption(${i})"  style="padding-right: 15px; margin-right: 15px;" 
    class="fa fa-minus"></i>
    </td>
    </tr>    `
        }
    }
    document.getElementById("dynamicoption").innerHTML = table;
}

option();

function addOption(id) {

    let pollingOption = []
    for (let i = 0; i < arr.length; i++) {
        let option = document.getElementById("pollingoption" + i).value;
        pollingOption.push(option);
    }
    arr.push(id)

    option()

    for (let i = 0; i < pollingOption.length; i++) {
        document.getElementById("pollingoption" + i).value = pollingOption[i];
    }

}


function subtractOption(id) {

    arr.splice(id, 1)
    let pollingOption = []

    for (let i = 0; i < arr.length; i++) {
        console.log(i);
        if (i != id) {
            let option = document.getElementById("pollingoption" + i).value;
            pollingOption.push(option);
        }
    }
    option()
    for (let i = 0; i < pollingOption.length; i++) {

        document.getElementById("pollingoption" + i).value = pollingOption[i];

    }
}

function formSubmit() {
    let pollingQuestion = document.getElementById("addpollingquestion").value;
    let pollingOption = []
    let messageRender = ""

    let Selectarea = document.getElementById("dropdownarea");
    let area = Selectarea.value;
    

    for (let i = 0; i < arr.length; i++) {
        let option = document.getElementById("pollingoption" + i).value;
        options = { option }
        pollingOption.push(options);
    }

    newPollingQuestion = {
        question: pollingQuestion,
        pollingOptions: pollingOption,
        area:{
            id:area
        }
    }

    if (queryString == "") {

        fetch(`${baseUrl}/api/pollingquestion`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPollingQuestion)
        })
            .then(response => response.json())
            .then(data => {
            
                messageRender += `
                    <div  style=" margin: auto;text-align: center;width: 50%;height: 5vh; text-align: center; 
                    justify-content: center;font-size: large" class="alert alert-success" role="alert">
                    <b> Polling Question Added Successfully </b>
                    </div>`

                document.getElementById("addpollingquestion").value = "";
                document.getElementById("formSubmitted").innerHTML = messageRender

                setTimeout(() => {
                    document.getElementById("formSubmitted").innerHTML = ""
                }, 2000)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    } else {
        fetch(`${baseUrl}/api/pollingquestion/` + urlId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPollingQuestion)
        })
            .then(response => response.json())
            .then(data => {

                messageRender += `
                    <div  style=" margin: auto;text-align: center;width: 50%;height: 5vh; text-align: center; 
                    justify-content: center;font-size: large" class="alert alert-success" role="alert">
                    <b>  Polling Question Updated Successfully </b>
                    </div>`

                document.getElementById("addpollingquestion").value = "";
                document.getElementById("formSubmitted").innerHTML = messageRender

                setTimeout(() => {
                    document.getElementById("formSubmitted").innerHTML = ""
                }, 2000)


            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}

function getArea(){
    let renderData = ""
    fetch(`${baseUrl}/api/admin/area`,{
        headers:{
            "Content-type":"application/json",
        }
    }).then((response)=>response.json())
    .then((data)=>{
        if(data.length !== 0){
            for (let i = 0; i < data.length; i++) {
                renderData += `<option value="${data[i].id}">${data[i].name}</option>`
            }
        }
        else{
            renderData += `<option value="" selected disabled>Sorry No Area Available</option>`
        }
        document.getElementById("dropdownarea").innerHTML = renderData;
    })
}

getArea()


