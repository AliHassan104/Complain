let queryString;

queryString = window.location.search;

if (queryString != "") {
    const urlParams = new URLSearchParams(queryString)
    var urlId = urlParams.get("id")

    getData(`/block/${urlId}`)
        .then(data => {
           
            document.getElementById("blockbtn").innerText = "Update";
            document.getElementById("block").value = data.block_name;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}



function formSubmit() {

    var select = document.getElementById('dropdownarea');
    var area = select.options[select.selectedIndex].value;

    let block = document.getElementById("block").value;

    newArea = {
        area: {
            id: area
        }, block_name: block
    };

    if (area != "" && block != "") {
        if (queryString == "") {
            sendData(`/block`, newArea)
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
                        &nbsp <B> ${block} Added  Successfully <b>
                        </div>`

                    document.getElementById("block").value = "";
                    document.getElementById("formSubmitted").innerHTML = table

                    setTimeout(() => {
                        document.getElementById("formSubmitted").innerHTML = ""
                    }, 2000)

                })
                .catch((error) => {
                    console.error('Error:', error);
                });

        } else {

            updateData(`/block/${urlId}`, newArea)
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
                        &nbsp <b> Block Updated Successfully <b>
                        </div>`

                    document.getElementById("block").value = "";
                    document.getElementById("formSubmitted").innerHTML = table

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
        let invalidData = ""
        invalidData += `
                            <div  style=" 
                        margin: auto;
                        text-align: center;
                        width: 50%;
                        height: 5vh; text-align: center; 
                        justify-content: center;
                        font-size: large" 
                        class="alert alert-danger" role="alert">
                        <b> Cannot Add &nbsp Block Name Cannot Be Empty <b>
                        </div>`

        document.getElementById("formSubmitted").innerHTML = invalidData
        setTimeout(() => {
            document.getElementById("formSubmitted").innerHTML = ""
        }, 2000)
    }
}

function getArea() {
    let table = ""
    getData(`/area`)
        .then((data) => {

            for (let i = 0; i < data.length; i++) {

                table += `
            <option value="${data[i].id}">${data[i].name}</option>
        `
            }
            document.getElementById("dropdownarea").innerHTML = table;
        })
}
getArea();

