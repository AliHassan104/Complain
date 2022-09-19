let queryString;

queryString = window.location.search;

if (queryString != "") {
    const urlParams = new URLSearchParams(queryString)
    var urlId = urlParams.get("id")

    fetch(`${baseUrl}/api/complaintype/` + urlId, {
    })
        .then(response => response.json()).catch(() => { })
        .then(data => {

            document.getElementById("addcomplaintype").value = data.name;
            document.getElementById("complaintypebtn").innerText = "Update";
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}



function formSubmit() {

    let complaintype = document.getElementById("addcomplaintype").value;
    //                                                                          table variable is used to render data to template
    var table = ""

    if (complaintype != "") {
        newComplainType = { name: complaintype };

        if (queryString == "") {

            fetch(`${baseUrl}/api/complaintype`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newComplainType)
            })
                .then(response => response.json())
                .then(data => {

                    table += `
        <div  style=" 
        margin: auto;
        text-align: center;
        width: 50%;
        height: 5vh; text-align: center; 
        justify-content: center;
        font-size: large" 
        class="alert alert-success" role="alert">
        <b> ${complaintype} </b>  &nbsp Complain Type  Added Successfully
        </div>`
                    document.getElementById("formSubmitted").innerHTML = table
                    document.getElementById("addcomplaintype").value = "";

                    setTimeout(() => {
                        document.getElementById("formSubmitted").innerHTML = ""
                    }, 2000)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

        } else {
            console.log(urlId);
            fetch(`${baseUrl}/api/complaintype/` + urlId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newComplainType)
            })
                .then(response => response.json()).catch(() => { })
                .then(data => {


                    table += `
        <div  style=" 
        margin: auto;
        text-align: center;
        width: 50%;
        height: 5vh; text-align: center; 
        justify-content: center;
        font-size: large" 
        class="alert alert-success" role="alert">
        <b> ${complaintype} </b>  &nbsp Complain Type  Updated Successfully
        </div>`
                    document.getElementById("formSubmitted").innerHTML = table
                    document.getElementById("addcomplaintype").value = "";

                    setTimeout(() => {
                        document.getElementById("formSubmitted").innerHTML = ""
                    }, 2000)

                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }

    else {
        table += `
    <div  style=" 
    margin: auto;
    text-align: center;
    width: 50%;
    height: 5vh; text-align: center; 
    justify-content: center;
    font-size: large" 
    class="alert alert-danger" role="alert">
    <b> Complain Type </b> &nbsp Cannot be Empty
    </div>`
        document.getElementById("formSubmitted").innerHTML = table

        setTimeout(() => {
            document.getElementById("formSubmitted").innerHTML = ""
        }, 2000)
    }
    
}


