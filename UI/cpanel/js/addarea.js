let queryString = window.location.search;
if (queryString != "") {
    
    const urlParams = new URLSearchParams(queryString)
    var urlId = urlParams.get("id")

    getData(`/area/${urlId}`)
        .then(data => {
            document.getElementById("name").value = data.name;
            document.getElementById("postalcode").value = data.postalCode
            document.getElementById("areabtn").innerText = "Update"
            document.getElementById("updateHd").innerText = "Update Area"
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


function formSubmit() {
    let name = document.getElementById("name").value;
    let postalcode = document.getElementById("postalcode").value;
    newArea = { name: name, postalCode: postalcode };

    if (name != "" && postalcode != "") {
        if (queryString == "") {
        
            sendData(`/area`, newArea)
                .then(data => {

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
                        <b> ${newArea.name} </b> &nbsp  Added In Area Successfully
                    </div>`

                    document.getElementById("name").value = "";
                    document.getElementById("postalcode").value = "";

                    document.getElementById("formSubmitted").innerHTML = table
                    setTimeout(() => {
                        document.getElementById("formSubmitted").innerHTML = ""
                    }, 2000)

                 

                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
        else {
    
                 updateData(`/area/${urlId}`,newArea)
                .then(data => {

                    let table = ""
                    table += `
                        <div  style=" margin: auto;text-align: center;width: 50%;height: 5vh; text-align: center; 
                        justify-content: center;font-size: large" class="alert alert-success" role="alert">
                        <b> ${newArea.name} </b> &nbsp  Updated In Area Successfully
                        </div>`

                    document.getElementById("name").value = "";
                    document.getElementById("postalcode").value = "";
                    document.getElementById("formSubmitted").innerHTML = table

                    setTimeout(() => {
                        document.getElementById("formSubmitted").innerHTML = ""
                        window.location.replace(`${loginUrl}/viewarea.html`);
                    }, 2000)
                      

                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }
    else {
        let invalidContent = ""
        invalidContent += `<div  style=" margin: auto;text-align: center;width: 60%;height: 5vh; text-align: center; 
        justify-content: center;font-size: large" class="alert alert-danger" role="alert">
        <b> Invalid Data ! Area Name Or Postal Code Cannot be Empty </b> &nbsp  
        </div>`

        document.getElementById("formSubmitted").innerHTML = invalidContent

        setTimeout(() => {
            document.getElementById("formSubmitted").innerHTML = ""
        }, 3000)

    }

}



var input = document.getElementById("enterkey");

input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("areabtn").click();
  }
});