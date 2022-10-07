let queryString;

queryString = window.location.search;
if (queryString != "") {
    const urlParams = new URLSearchParams(queryString)
    var urlId = urlParams.get("id")

    getData(`/user/${urlId}`)
        .then(data => {
           
            document.getElementById("firstname").value = data.firstname;
            document.getElementById("lastname").value = data.lastname;
            document.getElementById("cnic").value = data.cnic;
            document.getElementById("phonenumber").value = data.phoneNumber;
            document.getElementById("email").value = data.email;
            document.getElementById("password").value = data.password;
            document.getElementById("family").value = data.numberOfFamilyMembers;
            addressId = data.address.id

            document.getElementById("formButton").innerText = "Update";

                getData(`/address/`+data.address.id)
                .then(address => {
                
                    document.getElementById("housenumber").value = address.houseNumber;
                    document.getElementById("floornumber").value = address.floorNumber;
                    document.getElementById("street").value = address.street;
                })
        })
}


let addressId;
let areaId;
var blockId;


function formSubmit() {
    var select = document.getElementById('dropdownarea');
    var value = select.options[select.selectedIndex].value;
    areaId = value

    var selectBlock = document.getElementById("dropdownblock");
    blockId = selectBlock.options[selectBlock.selectedIndex].value;

    addAddress()
   
}


function addUser() {

    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let cnic = document.getElementById("cnic").value;
    let phonenumber = document.getElementById("phonenumber").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let family = document.getElementById("family").value;

    let property = document.getElementById("dropdownproperty");
    let propertyValue = property.value;
    
    let usertype = document.getElementById("usertype").value


    newUser = {
        firstname: firstname, lastname: lastname, cnic: cnic, phoneNumber: phonenumber
        , email: email, password: password, numberOfFamilyMembers: family,
        area: {
            id: areaId
        },
        address: {
            id: addressId
        },
        block: {
            id: blockId
        },
        property: propertyValue,
        userType: usertype
    };


    if (queryString == "") {

   
            sendData(`/user`,newUser)
            .then(data => {

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
                    <b> ${newUser.firstname + " " + newUser.lastname} </b> &nbsp   Added In User Successfully
                    </div>`

                document.getElementById("formSubmitted").innerHTML = table

                setTimeout(()=>{
                    document.getElementById("formSubmitted").innerHTML = ""
                },2000)

            })
            .catch((error)=>{
                console.log(error)
    })  

    } else {
    
            updateData(`/user/${urlId}`,newUser)
            .then(data => {

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
                    <b> ${newUser.firstname + " " + newUser.lastname} </b> &nbsp   Updated In User Successfully
                    </div>`

                document.getElementById("formSubmitted").innerHTML = table
                
                setTimeout(()=>{
                    document.getElementById("formSubmitted").innerHTML = ""
                },2000)
            })

    }
    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("cnic").value = "";
    document.getElementById("phonenumber").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("family").value = "";
}

function addAddress() {

    let housenumber = document.getElementById("housenumber").value;
    let floornumber = document.getElementById("floornumber").value;
    let street = document.getElementById("street").value;

    newAddress = { city: "karachi", houseNumber: housenumber, floorNumber: floornumber, street: street };

    if (queryString == "") {
   
            sendData(`/address`,newAddress)
            .then(data => {

                addressId = data.id
                addUser()

                document.getElementById("housenumber").value = "";
                document.getElementById("floornumber").value = "";
                document.getElementById("street").value = "";
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    } else {
       
            updateData(`/address/${addressId}`,newAddress)
            .then(data => {

                addressId = data.id
                addUser()

                document.getElementById("housenumber").value = "";
                document.getElementById("floornumber").value = "";
                document.getElementById("street").value = "";
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }

}
var areaIdToGetBlock;


function getArea() {
    let table = ""
   
        getData(`/area`)
        .then((data) => {

            areaIdToGetBlock = data[0].id;

            for (let i = 0; i < data.length; i++) {
                table += `
            <option value="${data[i].id}">${data[i].name}</option>
        `
            }
            document.getElementById("dropdownarea").innerHTML = table;
            getBlock(areaIdToGetBlock)
        })
}
getArea();

document.getElementById('dropdownarea').addEventListener('change', function () {
    getBlock(this.value);
});

function getBlock(areaId) {
    let renderData = ""
    
    getData(`/blockByArea/${areaId}`)
        .then((data) => {
    
            if (data.length !== 0) {
                for (let i = 0; i < data.length; i++) {
                    renderData += `
                <option value="${data[i].id}">${data[i].block_name}</option>
            `
                }
            }
            else {
                renderData += `
                <option value="" disabled selected>Sorry No Block Available</option>
            `
            }
            document.getElementById("dropdownblock").innerHTML = renderData;
        })

}



