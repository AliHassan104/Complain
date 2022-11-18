let arr = [0];

let queryString = window.location.search;

if (queryString != "") {
    const urlParams = new URLSearchParams(queryString)
    var urlId = urlParams.get("id")

    getData(`/pollingquestion/${urlId}`)
        .then(data => {
            document.getElementById("pollingquestionbtn").innerText = "Update"
            document.getElementById('addpollingquestion').value = data.question;
            document.getElementById('end_time').value = data.end_time;
            document.getElementById('end_date').value = data.end_date;
            document.getElementById("updatePollingQuestionbtn").innerText = "Update Polling Question"
            

            for (let i = 0; i < data.pollingOptions.length - 1; i++) {
                arr.push(i + 1)
            }
            
                option()
        
                for (let i = 0; i < arr.length; i++) {
                    document.getElementById("pollingoption" + i).value = data.pollingOptions[i].option;
                }
    
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
debugger
    arr.splice(id, 1)
    let pollingOption = []

    for (let i = 0; i <= arr.length; i++) {

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
    let end_date = document.getElementById("end_date").value
    let end_time = document.getElementById("end_time").value

    for (let i = 0; i < arr.length; i++) {
        let option = document.getElementById("pollingoption" + i).value;
        options = { option }
        pollingOption.push(options);
    }

    newPollingQuestion = {
        question: pollingQuestion,
        pollingOptions: pollingOption,
        end_date: end_date,
        end_time: end_time,
        area: {
            id: area
        }
    }
    if (pollingQuestion==="" || area=="" || end_date=="" || end_time=="") {
      let invalidContent = "";
      invalidContent += `<div  style=" margin: auto;text-align: center;width: 60%;height: 5vh; text-align: center; 
                justify-content: center;font-size: large" class="alert alert-danger" role="alert">
                <b> Please Fill All Fields </b> &nbsp  
                </div>`;
  
      document.getElementById("formSubmitted").innerHTML = invalidContent;
     
      setTimeout(() => {
        document.getElementById("formSubmitted").innerHTML = "";
      }, 3000);
     
    }
   else if (queryString == "") {

        sendData(`/pollingquestion`, newPollingQuestion)
            .then(data => {
                

                messageRender += `
                    <div  style=" margin: auto;text-align: center;width: 50%;height: 5vh; text-align: center; 
                    justify-content: center;font-size: large" class="alert alert-success" role="alert">
                    <b> Polling Question Added Successfully </b>
                    </div>`

                document.getElementById("end_date").value = ""
                document.getElementById("end_time").value = ""
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

        updateData(`/pollingquestion/${urlId}`, newPollingQuestion)
            .then(data => {

             
                
                messageRender += `
                    <div  style=" margin: auto;text-align: center;width: 50%;height: 5vh; text-align: center; 
                    justify-content: center;font-size: large" class="alert alert-success" role="alert">
                    <b>  Polling Question Updated Successfully </b>
                    </div>`

                document.getElementById("end_date").value = ""
                document.getElementById("end_time").value = ""
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



function getArea() {
    let renderData = ""

    getData("/area")
        .then((data) => {
            if (data.length !== 0) {
                for (let i = 0; i < data.length; i++) {
                    renderData += `<option value="${data[i].id}">${data[i].name}</option>`
                }
            }
            else {
                renderData += `<option value="" selected disabled>Sorry No Area Available</option>`
            }
            document.getElementById("dropdownarea").innerHTML = renderData;
        })
}

getArea()


