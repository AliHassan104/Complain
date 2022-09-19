let queryString;
setTimeout(() => {

    queryString = window.location.search;

    if (queryString != "") {
        const urlParams = new URLSearchParams(queryString)
        var urlId = urlParams.get("id")

        fetch(`${baseUrl}/api/block/${urlId}`, {

        })
            .then(response => response.json()).catch(() => { })
            .then(data => {
                console.log(data);
                document.getElementById("blockbtn").innerText = "Update";
                document.getElementById("block").value = data.block_name;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}, 200);


function formSubmit() {

    var select = document.getElementById('dropdownarea');
    var area = select.options[select.selectedIndex].value;

    let block = document.getElementById("block").value;

    newArea = {
        area: {
            id: area
        }, block_name: block
    };

    if (queryString == "") {


        fetch(`${baseUrl}/api/block`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newArea)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
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
    &nbsp  ${block} Added  Successfully
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
        fetch(`${baseUrl}/api/block/${urlId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newArea)
        })
            .then(response => response.json())
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
    &nbsp  Block Updated Successfully
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

function getArea() {
    let table = ""
    fetch(`${baseUrl}/api/area`, {
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
            document.getElementById("dropdownarea").innerHTML = table;
        })
}
getArea();

