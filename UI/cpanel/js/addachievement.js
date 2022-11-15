let queryString = window.location.search;
if (queryString != "") {
    
    const urlParams = new URLSearchParams(queryString)
    var urlId = urlParams.get("id")

        getData(`/achievement/`+urlId)
        .then(data => {
            document.getElementById("achieveventbtn").innerText = "Update"
            document.getElementById('achievementtitle').value = data.title;
            document.getElementById('description').value = data.description;
            document.getElementById('date').value = data.date;
            document.getElementById("updateAchvHd").innerText = "Update Achievement"
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function formSubmit() {

    let title = document.getElementById("achievementtitle").value;
    let description = document.getElementById("description").value;
    let date = document.getElementById("date").value;
    let image = document.getElementById("inpFile");

    if (title != "" && description != "" && date != "" && image.value != "") {

        newAchievement = { title: title, description: description, date: date };
        newAchievement = JSON.stringify(newAchievement)

        var formData = new FormData();
        for (const file of image.files) {
            formData.append("pictureUrl", file)
        }
        formData.append('data', newAchievement);


        if (queryString == "") {
                sendDataWithFormData(`/achievement`,formData)
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
                        Achievement Is Added  Successfully
                        </div>`

                    document.getElementById("formSubmitted").innerHTML = table

                    setTimeout(() => {
                        document.getElementById("formSubmitted").innerHTML = ""
                    }, 2000)

                    document.getElementById("achievementtitle").value = "";
                    document.getElementById("description").value = "";
                    document.getElementById("date").value = "";
                    document.getElementById("inpFile").value = null;

                })
                .catch((error) => console.log(error))

        } else {

                updateDataWithFormData(`/achievement/`+urlId,formData)
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
                    Achievement Is Updated  Successfully
                    </div>`
                    document.getElementById("formSubmitted").innerHTML = table

                    setTimeout(() => {
                        document.getElementById("formSubmitted").innerHTML = ""
                        window.location.replace(`${loginUrl}/viewachievement.html`);
                    }, 2000)

                    document.getElementById("achievementtitle").value = "";
                    document.getElementById("description").value = "";
                    document.getElementById("date").value = "";
                    document.getElementById("inpFile").value.files = "";
                })
                .catch((error) => console.log(error))
        }
    }
    else {
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
        Invalid Data
        </div>`
        document.getElementById("formSubmitted").innerHTML = table

        setTimeout(() => {
            document.getElementById("formSubmitted").innerHTML = ""
        }, 2000)
    }
}