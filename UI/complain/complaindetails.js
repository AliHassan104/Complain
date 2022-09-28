var queryString = window.location.search

if(queryString != ""){
var parameters = new URLSearchParams(queryString);
var complain_id = parameters.get('c_id')
}

function renderImage(){

    let dataRender = "" 
    let userDataRender = ""
    let complainData = ''
   
    getData(`/complain/${complain_id}`)
    .then((data)=>{
            console.log(data);
            
            dataRender += `
        
                <img src="${data.picture}"  class="rounded mx-auto d-block "  alt="Not found" ">
            
            `
            document.getElementById('showImage').innerHTML = dataRender

            document.getElementById('username').value = data.user.firstname+" "+data.user.lastname
            document.getElementById('email').value = data.user.email
            document.getElementById('cnic').value =  data.user.cnic
            document.getElementById('number').value = data.user.phoneNumber
            document.getElementById('family').value = data.user.numberOfFamilyMembers
            document.getElementById('areaName').value = data.user.area.name
            document.getElementById('block').value = data.user.block.block_name
            document.getElementById('address').value = "House Number "+data.user.address.houseNumber+" Street "+data.user.address.street+" Floor Number "+data.user.address.floorNumber+" , "+data.user.address.city
            document.getElementById('property').value = data.user.property

            document.getElementById('complain_name').value = data.complainType.name
            document.getElementById('description').value = data.description
            document.getElementById('complain_area').value = data.area.name
            document.getElementById('complain_block').value = data.block.block_name
            document.getElementById('complain_status').value = data.status
            document.getElementById('complain_date').value = data.date
            document.getElementById('complain_time').value = data.time


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