function renderUserData(){
    getUserData()
    .then((data)=>{
        document.getElementById("username").value = data.firstname
        document.getElementById("name").value = data.firstname+" "+data.lastname
    })
}
renderUserData()


function getArea(){
    let renderData = ""
    getData(`/area`)
    .then((data)=>{
        if (data.length !== 0) {
            for (let i = 0; i < data.length; i++) {
                renderData += `
            <option value="${data[i].id}">${data[i].name}</option>
        `
            }
        }
        else {
            renderData += `
            <option value="" disabled selected>Sorry No Area Available</option>
        `
        }
        document.getElementById("droparea").innerHTML = renderData
    })
}
getArea()

function createAnnouncement(){
    // adminName= document.getElementById("name").value;
    title= document.getElementById("title").value;
    content= document.getElementById("content").value;
    announcmentdate= document.getElementById("announcmentdate").value;
    announcmenttime= document.getElementById("announcmenttime").value;

    announcementmethod = document.querySelector('input[name="announcementmethod"]:checked').value;

    selectArea = document.getElementById("droparea");
    area_id = selectArea.value;

    announcement = {
        title:title,
        description:content,
        area:{
           id : area_id
        },
        date:announcmentdate,
        time:announcmenttime,
        announcementType:announcementmethod,
    }

    console.log(announcement);

    // if (queryString == "") {
        console.log(12);
        sendData(`/announcement`, announcement)

            .then(data => {
                console.log(data);
                let table = ""

                if (Object.prototype.toString.call(data) == "[object Object]") {
                    table += `
                        <div  style=" 
                        margin: auto;
                        text-align: center;
                        width: 50%;
                        height: 5vh; text-align: center; 
                        justify-content: center;
                        font-size: large" 
                        class="alert alert-success" role="alert">
                        <b> ${announcement.title} </b> &nbsp   Added In Announcement Successfully
                        </div>`

                    document.getElementById("formSubmitted").innerHTML = table

                    setTimeout(() => {
                        document.getElementById("formSubmitted").innerHTML = ""
                    }, 2000)
                }
                else {
                    console.log(data);
                    table += `
                     <div  style=" 
                     margin: auto;
                     text-align: center;
                     width: 50%;
                     height: 5vh; text-align: center; 
                     justify-content: center;
                     font-size: large" 
                     class="alert alert-danger" role="alert">
                     <b>${data[0].message}</b> 
                     </div>`

                    document.getElementById("formSubmitted").innerHTML = table

                    setTimeout(() => {
                        document.getElementById("formSubmitted").innerHTML = ""
                    }, 2000)
                }


            })
            .catch((error) => {
                console.log(error);
                console.log("Error occured " + error)
            })

    // } 
    // else {
    //     console.log(newUser)
    //     updateData(`/announcement/${urlId}`, newUser)
    //         .then(data => {
    //             let table = ""
    //             if (Object.prototype.toString.call(data) == "[object Object]") {
    //                 table += `
    //                 <div  style=" 
    //                 margin: auto;
    //                 text-align: center;
    //                 width: 50%;
    //                 height: 5vh; text-align: center; 
    //                 justify-content: center;
    //                 font-size: large" 
    //                 class="alert alert-success" role="alert">
    //                 <b> ${newUser.firstname + " " + newUser.lastname} </b> &nbsp   Updated In User Successfully
    //                 </div>`


    //                 document.getElementById("formSubmitted").innerHTML = table

    //                 setTimeout(() => {
    //                     document.getElementById("formSubmitted").innerHTML = ""
    //                 }, 2000)
    //             }
    //             else{
    //                 table += `
    //                      <div  style=" 
    //                      margin: auto;
    //                      text-align: center;
    //                      width: 50%;
    //                      height: 5vh; text-align: center; 
    //                      justify-content: center;
    //                      font-size: large" 
    //                      class="alert alert-danger" role="alert">
    //                      <b>${data[0].message}</b> 
    //                      </div>`
    
    
    //                 document.getElementById("formSubmitted").innerHTML = table
    
    //                 setTimeout(() => {
    //                     document.getElementById("formSubmitted").innerHTML = ""
    //                 }, 2000)
    //             }
    //         })

    // }
    
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    document.getElementById("announcmentdate").value = "";
    document.getElementById("announcmenttime").value = "";
     
}



