var queryString = window.location.search

if(queryString != ""){
var parameters = new URLSearchParams(queryString);
var complain_id = parameters.get('c_id')
}

function renderImage(){

    let dataRender = "" 
    let userDataRender = ""
    let complainData = ''
   
    // fetch(`${baseUrl}/api/complain/${complain_id}`,{
    //     headers:{
    //         "Content-type":"application/json"
    //     }
    // })
    // .then((response)=>response.json())
    getData(`/complain/${complain_id}`)
    .then((data)=>{
      
            dataRender += `
            <div class="carousel-item active">
                <img src="${data.picture}" class="d-block w-100"  alt="Not found" ">
            </div>
            `
            document.getElementById('showImage').innerHTML = dataRender

            userDataRender += `
            <div class="list-group" >
            <a class="list-group-item list-group-item-action disabled">User Name : ${data.user.firstname+" "+data.user.lastname}</a>
            <a class="list-group-item list-group-item-action disabled">UserName : ${data.user.firstname}</a>
            <a class="list-group-item list-group-item-action disabled">UserName : ${data.user.firstname}</a>
            <a class="list-group-item list-group-item-action disabled">UserName : ${data.user.firstname}</a>
            <a class="list-group-item list-group-item-action disabled">UserName : ${data.user.firstname}</a>
            </div>`

            document.getElementById("userData").innerHTML = userDataRender

            complainData += `<div class="list-group" >
            <a class="list-group-item list-group-item-action disabled">Complain Name : ${data.complainType.name}</a>
            <a class="list-group-item list-group-item-action disabled">Complain Name : ${data.complainType.name}</a>
            <a class="list-group-item list-group-item-action disabled">Complain Name : ${data.complainType.name}</a>
            <a class="list-group-item list-group-item-action disabled">Complain Name : ${data.complainType.name}</a>
            <a class="list-group-item list-group-item-action disabled">Complain Name : ${data.complainType.name}</a>
            </div>`

            document.getElementById("complainData").innerHTML = complainData

    })

}

renderImage()



// For multiple Images


  // for (let i = 0; i < array.length; i++) {
        //     dataRender += `
        //     <div class="carousel-item ">
        //         <img src="${array[i]}" class="d-block w-100"  alt="Not found">
        //     </div>
        //     `
        // }
        // document.getElementById('showImage').innerHTML = dataRender