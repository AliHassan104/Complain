getArea();

let queryString;

queryString = window.location.search;

if (queryString != "") {
    const urlParams = new URLSearchParams(queryString)
    var urlId = urlParams.get("id")

    getData(`/document/${urlId}`)
        .then(data => {
            document.getElementById("url").value = data.url;
            document.getElementById("title").value = data.title;
            document.getElementById("documentbtn").innerText = "Update";
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function formSubmit() {

    let url = document.getElementById("url").value;
    let title = document.getElementById("title").value;
    var select = document.getElementById('dropdownarea');
    var area = select.options[select.selectedIndex].value;


    newDocument = {
        title: title, url: url,
        area: {
            id: area
        }
    };

    if (queryString == "") {
       
        sendData("/document", newDocument)
            .then(data => {

                let table = ""
                table +=  `
                <div  style=" 
                margin: auto;
                text-align: center;
                width: 50%;
                height: 5vh; text-align: center; 
                justify-content: center;
                font-size: large" 
                class="alert alert-success" role="alert">
                <b>${title}  Document Added Successfully </b>
                </div>`
                document.getElementById("formSubmitted").innerHTML = table
                document.getElementById("url").value = "";
                document.getElementById("title").value = "";
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }
    else {
        updateData(`/document/${urlId}`, newDocument)
            .then(data => {

                let table = ""
                table +=  `
                <div  style=" 
                margin: auto;
                text-align: center;
                width: 50%;
                height: 5vh; text-align: center; 
                justify-content: center;
                font-size: large" 
                class="alert alert-success" role="alert">
                <b>${title} Document Updated Successfully </b>
                </div>`
                document.getElementById("formSubmitted").innerHTML = table

                document.getElementById("url").value = "";
                document.getElementById("title").value = "";
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    
}

function getArea() {
    let table = ""

    getData(`/area`)
        .then((data) => {
            for (let i = 0; i < data.length; i++) {

                table += `
                        <option value="${data[i].id}">${data[i].name}</option>`
            }
            document.getElementById("dropdownarea").innerHTML = table;
        })
}


