var queryString = window.location.search

if(queryString != ""){

var parameters = new URLSearchParams(queryString);
var achievement_id = parameters.get('a_id')

}

function showAchievementDetails(){
    imageRender = ''
    getData(`/achievement/${achievement_id}`)
    .then((data)=>{
        
        imageRender += `
                <img src="${data.pictureUrl}"  class="rounded mx-auto d-block "  alt="Not found" ">   
        `
        document.getElementById("showImage").innerHTML = imageRender

        document.getElementById("title").value = data.title
        document.getElementById("description").value = data.description
        document.getElementById("date").value = data.date



    })
}

showAchievementDetails()
