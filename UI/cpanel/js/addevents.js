let queryString = window.location.search;

if (queryString != "") {
    const urlparams = new URLSearchParams(queryString);
    var eventId = urlparams.get("id")

        getData(`/event/${eventId}`)
        .then(data => {
            document.getElementById("achieveventbtn").innerText = "Update"
            document.getElementById('eventtitle').value = data.title;
            document.getElementById('description').value = data.description;
            document.getElementById('start_date').value = data.startDate;
            document.getElementById('start_time').value = data.startTime;
            document.getElementById("updateEvent").innerText = "Update Event"

        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function formSubmit() {

    let title = document.getElementById("eventtitle").value;
    let description = document.getElementById("description").value;
    let date = document.getElementById("start_date").value;
    let time = document.getElementById("start_time").value;
    let image = document.getElementById("inpFile");

    let selectArea = document.getElementById("dropdownarea");
    let areaid = selectArea.value;


    if (title != "" && description != "" && date != "" && time != "" && image.value != "") {

        newAchievement = { title: title, description: description, startDate: date, startTime: time, area: { id: areaid } };

        newAchievement = JSON.stringify(newAchievement)
        var formData = new FormData();

        for (const file of image.files) {
            formData.append("image", file)
        }
        formData.append('data', newAchievement);


        if (queryString == "") {
            
                sendDataWithFormData(`/event`,formData)
                .then((data) => {
                                                                        // send notification to user on event add
                   

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
                    <b> Event Is Added  Successfully <b>
                    </div>`
                    document.getElementById("formSubmitted").innerHTML = table


                    document.getElementById("eventtitle").value = "";
                    document.getElementById("description").value = "";
                    document.getElementById("start_date").value = "";
                    document.getElementById("start_time").value = "";
                    document.getElementById("inpFile").value.files = "";

                    setTimeout(()=>{
                        document.getElementById("formSubmitted").innerHTML = ""
                    },2000)
                })
                .catch((error) => console.log(error))

        }
        else {
          
            updateDataWithFormData(`/event/${eventId}`,formData)
                .then((data) => {
                  
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
                    <b> Event Is Updated  Successfully <b>
                    </div>`
                    document.getElementById("formSubmitted").innerHTML = table

                    setTimeout(()=>{
                        document.getElementById("formSubmitted").innerHTML = ""
                        window.location.replace(`${loginUrl}/viewevents.html`);
                    },2000)

                    document.getElementById("eventtitle").value = "";
                    document.getElementById("description").value = "";
                    document.getElementById("start_date").value = "";
                    document.getElementById("start_time").value = "";
                    document.getElementById("inpFile").value.files = "";
                })
                .catch((error) => console.log(error))
        }
    }
    else{
        let addDataOrUpdate;
        if(queryString == ""){
            addDataOrUpdate = "Add Event"
        }
        else{
            addDataOrUpdate = "Update Event"
        }

        let invalidData = ""
        invalidData += `
            <div  style=" 
            margin: auto;
            text-align: center;
            width: 50%;
            height: 5vh; text-align: center; 
            justify-content: center;
            font-size: large" 
            class="alert alert-success" role="alert">
            <b>Invalid Data ! Cannot ${addDataOrUpdate} <b>
            </div>`

            document.getElementById("formSubmitted").innerHTML = invalidData

            setTimeout(()=>{
                document.getElementById("formSubmitted").innerHTML = ""
            },2000)
    }
}




function getArea() {
    let dataRender = ""

        getData(`/area`)
        .then((data) => {

            if (data.length !== 0) {
                for (let i = 0; i < data.length; i++) {
                    dataRender += `<option value="${data[i].id}">${data[i].name}</option>`
                }
            }
            else {
                dataRender += `<option value="" selected disabled>Sorry No Area Available</option>`
            }
            document.getElementById("dropdownarea").innerHTML = dataRender

        })
}

getArea()