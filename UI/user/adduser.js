let queryString;
setTimeout(() => {
 queryString = window.location.search;
if (queryString != "") {
    const urlParams = new URLSearchParams(queryString)
    const urlId = urlParams.get("id")
    // queryString = queryString.slice(4,queryString.length)
    // console.log(queryString);
    fetch(`${baseUrl}/api/user/`+urlId , {
})
.then(response => response.json()).catch(()=>{})
.then(data => {
    console.log(data);

    document.getElementById("firstname").value = data.firstname;
    document.getElementById("lastname").value = data.lastname;
    document.getElementById("cnic").value = data.cnic;
    document.getElementById("phonenumber").value = data.phoneNumber;
    document.getElementById("email").value = data.email;
    document.getElementById("password").value = data.password;
    document.getElementById("family").value = data.numberOfFamilyMembers;
    addressId = data.address.id

    document.getElementById("formButton").innerText = "Update";

    fetch(`${baseUrl}/api/address/`+data.address.id ,{

    }).then(response => response.json()).catch(()=>{})
    .then(address => {
        console.log(address);
        document.getElementById("housenumber").value = address.houseNumber;
        document.getElementById("floornumber").value = address.floorNumber;
        document.getElementById("street").value = address.street;
    })  
    })
}
}, 200);

let addressId;
let areaId;


function formSubmit(){
    var select = document.getElementById('dropdownarea');
    var value = select.options[select.selectedIndex].value;
    areaId = value

    setTimeout(() => {
        addAddress()
    }, 1000);
}


function addUser(){

    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let cnic = document.getElementById("cnic").value;
    let phonenumber = document.getElementById("phonenumber").value;
    let email = document.getElementById("email").value;
    // let password = document.getElementById("password").value;
    let family = document.getElementById("family").value;
    let property = document.getElementById("dropdownproperty");
    let propertyValue = property.value;
     console.log("Property Value ",propertyValue)
    newUser = {firstname : firstname , lastname : lastname , cnic : cnic, phoneNumber : phonenumber
        , email : email , password : "password" , numberOfFamilyMembers : family ,
        area : {
            id : areaId
        },
        address : {
            id : addressId
        },
        property:propertyValue
    }; 
    
    console.log(newUser);
    if (queryString == "") {
        
        
        fetch(`${baseUrl}/api/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser)
})
.then(response => response.json()).catch(()=>{})
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
    <b> ${newUser.firstname +" "+ newUser.lastname} </b> &nbsp   Added In User Successfully
    </div>` //<b> ${complaintype} </b>
       
    document.getElementById("formSubmitted").innerHTML = table
    
})
// .catch((error) => {
//     console.error('Error:', error);
// });
}else{
    fetch(`${baseUrl}/api/user/`+queryString, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
    body: JSON.stringify(newUser)
})
.then(response => response.json()).catch(()=>{})
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
    <b> ${newUser.firstname +" "+ newUser.lastname} </b> &nbsp   Updated In User Successfully
    </div>` //<b> ${complaintype} </b>
       
    document.getElementById("formSubmitted").innerHTML = table
    
})
// .catch((error) => {
//     console.error('Error:', error);
// });
}
    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("cnic").value = "";
    document.getElementById("phonenumber").value = "";
    document.getElementById("email").value = "";
    // document.getElementById("password").value = "";
    document.getElementById("family").value = "";
}

function addAddress(){

    // let city = document.getElementById("city").value;
    let housenumber = document.getElementById("housenumber").value;
    let floornumber = document.getElementById("floornumber").value;
    let street = document.getElementById("street").value;

    newAddress = {city : "karachi" , houseNumber : housenumber , floorNumber : floornumber , street : street}; 

    console.log(newAddress);
    if (queryString == "") {       
        fetch(`${baseUrl}/api/address`, {
            method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    body: JSON.stringify(newAddress)
})
    .then(response => response.json()).catch(()=>{})
    .then(data => {
        console.log(data.id);
        addressId = data.id
        addUser()
        // document.getElementById("city").value = "";
        document.getElementById("housenumber").value = "";
        document.getElementById("floornumber").value = "";
        document.getElementById("street").value = "";
    })
    .catch((error) => {
        console.error('Error:', error);
    })
}else{
    fetch(`${baseUrl}/api/address/`+addressId, {
            method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    body: JSON.stringify(newAddress)
})
    .then(response => response.json())
    .then(data => {
        // console.log(data.id);
        addressId = data.id
        addUser()
        // document.getElementById("city").value = "";
        document.getElementById("housenumber").value = "";
        document.getElementById("floornumber").value = "";
        document.getElementById("street").value = "";
    })
    .catch((error) => {
        console.error('Error:', error);
    })
}

    
    
}

function getArea() {
    let table = ""
    fetch(`${baseUrl}/api/admin/area`,{
        headers:{
            "Content-Type":"application/json",
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
        for (let i = 0; i < data.length; i++) {
            table += `
            <option value="${data[i].id}">${data[i].name}</option>
        `
        }
        document.getElementById("dropdownarea").innerHTML = table;
    })
}
getArea();