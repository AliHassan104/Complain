let addressId;
let areaId;

function formSubmit(){
    
    var select = document.getElementById('dropdownarea');
    var value = select.options[select.selectedIndex].value;
    areaId = value

    setTimeout(() => {
        addAddress()
    }, 100);

    
    var select = document.getElementById('dropdownarea');
    var value = select.options[select.selectedIndex].value = data[0].id;

}

function addUser(){

    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let cnic = document.getElementById("cnic").value;
    let phonenumber = document.getElementById("phonenumber").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let family = document.getElementById("family").value;

    newUser = {firstname : firstname , lastname : lastname , cnic : cnic, phoneNumber : phonenumber
        , email : email , password : password , numberOfFamilyMembers : family ,
        area : {
            id : areaId
        },
        address : {
            id : addressId
        }
    }; 
    debugger;
    console.log(newUser);

    fetch("http://localhost:8081/api/user", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser)
})
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    
    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("cnic").value = "";
    document.getElementById("phonenumber").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("family").value = "";
}

function addAddress(){
    let city = document.getElementById("city").value;
    let housenumber = document.getElementById("housenumber").value;
    let floornumber = document.getElementById("floornumber").value;
    let street = document.getElementById("street").value;

    newAddress = {city : city , houseNumber : housenumber , floorNumber : floornumber , street : street}; 

    fetch("http://localhost:8081/api/address", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(newAddress)
})
    .then(response => response.json())
    .then(data => {
        console.log(data.id);
        addressId = data.id
        addUser()
    })
    .catch((error) => {
        console.error('Error:', error);
    })

    document.getElementById("city").value = "";
    document.getElementById("housenumber").value = "";
    document.getElementById("floornumber").value = "";
    document.getElementById("street").value = "";
    
}

function getArea() {
    let table = ""
    fetch("http://localhost:8081/api/admin/area",{
        headers:{
            "Content-Type":"application/json",
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
        console.log(data);
        debugger
        for (let i = 0; i < data.length; i++) {
            console.log(data);
            table += `
            <option value="${data[i].id}">${data[i].name}</option>
        `
        }
        document.getElementById("dropdownarea").innerHTML = table;
    })
}
getArea();