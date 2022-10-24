var queryString = window.location.search

if(queryString != ""){
var parameters = new URLSearchParams(queryString);
var complain_id = parameters.get('c_id')
}

function renderComplainDetails(){

    let dataRender = "" 
    let userDataRender = ""
    let complainData = ''
    let renderComplainLogs = ""
   
    getData(`/complain/${complain_id}`)
    .then((data)=>{
    
            dataRender += `
                <img src="${data.picture}"   alt="Not found">
            
            `
            document.getElementById('showImage').innerHTML = dataRender
            console.log(data.user);
            document.getElementById('complainer_name').value = data.user.firstname+" "+data.user.lastname
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


            for (let i = 0; i < data.complainLog.length; i++) {

                if(data.complainLog[i].assignedFrom == null && data.complainLog[i].assignedTo == null){
                    adminfirstname  = "not Assigned"
                    workerfirstname = "not Assigned"
                }
                else{
                    adminfirstname  = data.complainLog[i].assignedFrom.firstname
                    workerfirstname = data.complainLog[i].assignedTo.firstname
                }

                renderComplainLogs += `
                <div class="card">
                <div class="card-header">
                    <li><b>${data.complainLog[i].status}</b></li>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-4">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon3"><b>Assigned From</b></span>
                                 </div>
                            <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" value="${adminfirstname}" disabled>
                              </div>
                        </div>

                        <div class="col-4">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon3"><b>Assigned To</b></span>
                                 </div>
                            <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" value="${workerfirstname}"  disabled>
                              </div>
                        </div>

                        <div class="col-4">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon3"><b>Date</b></span>
                                 </div>
                            <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" value="${data.complainLog[i].date}"  disabled>
                              </div>
                        </div>
                      </div>
                     
            
                                
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text"><b>Description</b></span>
                        </div>
                        <textarea class="form-control" aria-label="With textarea" placeholder="${data.complainLog[i].description}"  disabled ></textarea>
                      </div>
                    </div>
                </div>
                ` 
            }

            document.getElementById("complainLogs").innerHTML = renderComplainLogs

    })

}

renderComplainDetails()



// For multiple Images


  // for (let i = 0; i < array.length; i++) {
        //     dataRender += `
        //     <div class="carousel-item ">
        //         <img src="${array[i]}" class="d-block w-100"  alt="Not found">
        //     </div>
        //     `
        // }
        // document.getElementById('showImage').innerHTML = dataRender