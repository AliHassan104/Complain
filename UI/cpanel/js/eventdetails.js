var queryString = window.location.search

if(queryString != ""){

var parameters = new URLSearchParams(queryString);
var event_id = parameters.get('e_id')

}

function showEventDetails(){
    imageRender = ''
    getData(`/event/${event_id}`)
    .then((data)=>{
        
        imageRender += `
                <img src="${data.image}"  class="rounded mx-auto d-block "  alt="Not found" ">   
        `
        document.getElementById("showImage").innerHTML = imageRender

        document.getElementById("title").value = data.title
        document.getElementById("description").value = data.description
        document.getElementById("start_date").value = data.startDate   
        document.getElementById("start_time").value = data.startTime
        document.getElementById("area_name").value = data.area.name



    })
}

showEventDetails()
