let queryString;

    queryString = window.location.search;

    if (queryString != "") {
        const urlParams = new URLSearchParams(queryString)
        var urlId = urlParams.get("id")

        getData(`/watertiming/${urlId}`)
            .then(data => {
                document.getElementById("formButton").innerText = "Update";
                document.getElementById("date").value = data.date;
                document.getElementById("start_time").value = data.start_time;
                document.getElementById("end_time").value = data.end_time;
                
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


function formSubmit() {

    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var selectforBlock = document.getElementById('dropdownblock');
    var selectforArea = document.getElementById('dropdownarea');
    var block = selectforBlock.options[selectforBlock.selectedIndex].value;
    var area = selectforArea.options[selectforArea.selectedIndex].value;
    let date = document.getElementById("date").value;

    var getDate = new Date(date);
    var dayName = days[getDate.getDay()];


    let start_time = document.getElementById("start_time").value;
    let end_time = document.getElementById("end_time").value;

    newArea = {
        block: {
            id: block
        },
        area: {
            id: area
        }
        , day: dayName
        , date: date
        , start_time: start_time
        ,end_time:end_time
    };
    console.log(newArea);
debugger
// area===""|| block===""

    if (date==="" || start_time==="" || end_time==="" || block==="" ) {
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
       
        sendData(`/watertiming`,newArea)
            .then(data => {
   //  Send notification on water timing add to users
                
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
                document.getElementById("start_time").value = "";
                document.getElementById("end_time").value = "";

                document.getElementById("formSubmitted").innerHTML = table

                setTimeout(() => {
                    document.getElementById("formSubmitted").innerHTML = ""
                }, 2000)
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    } else {
       
            updateData(`/watertiming/${urlId}`,newArea)
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
                    &nbsp  Water Timing Updated Successfully
                    </div>`

                document.getElementById("date").value = "";
                document.getElementById("start_time").value = "";
                document.getElementById("end_time").value = "";

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

    getData("/area")
        .then((data) => {

            getareaId = data[0].id

            for (let i = 0; i < data.length; i++) {
                table += `
            <option value="${data[i].id}">${data[i].name}</option>
        `
            }
            document.getElementById("dropdownarea").innerHTML = table;
            getBlock(getareaId)
        })
}
//                                                                                  get value from the area drop down when the value change
document.getElementById('dropdownarea').addEventListener('change', function () {
    getBlock(this.value);
});

function getBlock(areaId) {

    let table = ""
 
        getData(`/blockByArea/${areaId}`)
        .then((data) => {
            if (data.length !== 0) {
                for (let i = 0; i < data.length; i++) {
                    table += `
                    <option value="${data[i].id}">${data[i].block_name}</option>
                    `
                }
                document.getElementById("dropdownblock").innerHTML = table;
            }
            else {
                table += `
                    <option value="" disabled selected>Sorry No block Available</option>
                    `
                    document.getElementById("dropdownblock").innerHTML = table;
            }

        })

}

getArea();
    

