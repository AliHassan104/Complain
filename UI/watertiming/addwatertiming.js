let queryString;
setTimeout(() => {

    queryString = window.location.search;
 
    if (queryString != "") {
        const urlParams = new URLSearchParams(queryString)
        var urlId = urlParams.get("id")

        fetch(`${baseUrl}/api/watertiming/` + urlId, {
        })
            .then(response => response.json()).catch(() => { })
            .then(data => {

                document.getElementById("date").value = data.date;
                document.getElementById("time").value = data.time;
                document.getElementById("formButton").innerText = "Update";
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}, 200);


function formSubmit() {

    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var selectforBlock = document.getElementById('dropdownblock');
    var block = selectforBlock.options[selectforBlock.selectedIndex].value;
    let date = document.getElementById("date").value;

    var getDate = new Date(date);
    var dayName = days[getDate.getDay()];
   

    let time = document.getElementById("time").value;

    newArea = {
        block: {
            id: block
        }
        , day:dayName, date: date, time: time
    };


    if (queryString == "") {
        fetch(`${baseUrl}/api/watertiming`, {
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
    &nbsp  Water Timing Added In Area Successfully
    </div>`

                document.getElementById("date").value = "";
                document.getElementById("time").value = "";

                document.getElementById("formSubmitted").innerHTML = table

                setTimeout(()=>{
                    document.getElementById("formSubmitted").innerHTML = ""
                },2000)
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    } else {
        fetch(`${baseUrl}/api/watertiming/` + urlId, {
            method: 'PUT',
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
    &nbsp  Water Timing Updated Successfully
    </div>`

                document.getElementById("date").value = "";
                document.getElementById("time").value = "";

                document.getElementById("formSubmitted").innerHTML = table

                setTimeout(() => {
                    document.getElementById("formSubmitted").innerHTML = ""
                })
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}

var getareaId;

function getArea() {
    let table = ""
    fetch(`${baseUrl}/api/area`, {
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((response) => response.json())
        .then((data) => {

            getareaId = data[0].id

            for (let i = 0; i < data.length; i++) {
                table += `
            <option value="${data[i].id}">${data[i].name}</option>
        `
            }
            document.getElementById("dropdownarea").innerHTML = table;
        })
}
//                                                                                  get value from the area drop down when the value change
document.getElementById('dropdownarea').addEventListener('change', function () {
    getBlock(this.value);
});

function getBlock(areaId) {

    let table = ""
    fetch("http://localhost:8081/api/blockByArea/" + areaId, {
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((response) => response.json())
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                table += `
            <option value="${data[i].id}">${data[i].block_name}</option>
        `
            }
            document.getElementById("dropdownblock").innerHTML = table;
        })

}

getArea();
setTimeout(() => {
    getBlock(getareaId)
}, 400)
