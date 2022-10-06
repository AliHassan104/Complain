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
    adminName= document.getElementById("name").value;
    title= document.getElementById("title").value;
    content= document.getElementById("content").value;

    selectArea = document.getElementById("droparea");
    area_id = selectArea.value;

    announcement = {
        username:adminName,
        title:title,
        content:content,
        area:area_id
    }

    console.log(announcement);

        
}



