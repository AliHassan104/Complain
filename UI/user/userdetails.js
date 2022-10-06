

var queryString = window.location.search

if(queryString != ""){
var parameters = new URLSearchParams(queryString);
var user_id = parameters.get('u_id')
}

function renderUserData(){
    let userDataRender = ""
   
   
    getData(`/user/${user_id}`)
    .then((data)=>{
           
            document.getElementById('userName').value = data.firstname+" "+data.lastname
            document.getElementById('email').value = data.email
            document.getElementById('cnic').value =  data.cnic
            document.getElementById('number').value = data.phoneNumber
            document.getElementById('family').value = data.numberOfFamilyMembers
            document.getElementById('areaName').value = data.area.name
            document.getElementById('block').value = data.block.block_name
            document.getElementById('address').value = "House Number "+data.address.houseNumber+" Street "+data.address.street+" Floor Number "+data.address.floorNumber+" , "+data.address.city
            document.getElementById('property').value = data.property
            document.getElementById("user_type").value = data.userType

    
    })

}

renderUserData()