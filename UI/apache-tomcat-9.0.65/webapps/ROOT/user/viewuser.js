function getUser() {
    let table = ""
    fetch("http://localhost:8081/api/admin/user",{
        headers:{
            // mode: 'no-cors',
            // "Authorization":jwtTokenBearer,
            "Content-Type":"application/json",
            
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
        table += `<h2 style="display: inline-table; text-align: center;">User</h2>`

        table += `<tr style="width: 100%; display: flex; justify-content: space-between;" class="tablepoint">
        <th style="width: 15%;" class="toptable ">Name</th>
        <th style="width: 15%;" class="toptable ">PhoneNumber</th>
        <th style="width: 20%;" class="toptable ">Email</th>
        <th style="width: 20%;" class="toptable ">Cnic</th>
        <th style="width: 15%;" class="toptable ">Area Name </th>
        <th style="width: 15%;" class="toptable ">Action </th>
        </tr>`
        for (let i = 0; i < data.length; i++) {
            table += `

        <tr class="tablepoint" style="width: 100%; display: flex; justify-content: space-between;" >
            <td style="width: 15%;" class="datatable">${data[i].firstname + " " + data[i].lastname}</td>
            <td style="width: 15%;" class="datatable">${data[i].phoneNumber}</td>
            <td style="width: 20%;" class="datatable">${data[i].email}</td>
            <td style="width: 20%;" class="datatable">${data[i].cnic}</td>
            <td style="width: 15%;" class="datatable">${data[i].area.name}</td>
            <td style="width: 15%;" class="datatable"> 
            <i onclick="modalValue(${data[i].id})" data-bs-toggle="modal" data-bs-target="#exampleModal"  
            style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
            <i onclick="deleteArea(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
    </td>
        </tr>`
        }
        document.getElementById("usertable").innerHTML = table;
    })
}
getUser()
getArea()

function getArea() {
    let table = ""
    fetch("http://localhost:8081/api/area",{
        headers:{
            "Content-Type":"application/json",
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
        console.log(data);
        
        table +=  `<option value="ALL" selected>ALL</option>`
        for (let i = 0; i < data.length; i++) {
            table += `
            <option value="${data[i].name}">${data[i].name}</option>
        `
        }
        document.getElementById("dropdownarea1").innerHTML = table;
    })
}

function filterComplainByArea(){
    var select = document.getElementById('dropdownarea1');
    var area = select.options[select.selectedIndex].value;

    let table = ""
    fetch("http://localhost:8081/api/admin/user",{
        headers:{
            "Content-Type":"application/json",
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
        
        table += `<tr style="width: 100%; display: flex; justify-content: space-between;" class="tablepoint">
        <th style="width: 15%;" class="toptable ">Name</th>
        <th style="width: 15%;" class="toptable ">PhoneNumber</th>
        <th style="width: 20%;" class="toptable ">Email</th>
        <th style="width: 20%;" class="toptable ">Cnic</th>
        <th style="width: 15%;" class="toptable ">Area Name </th>
        <th style="width: 15%;" class="toptable ">Action </th>
        </tr>`
        for (let i = 0; i < data.length; i++) {

            if (area == "ALL") {
                getUser()
            }

            if (data[i].area.name == area && area != "ALL") {
            table += `
            
        <tr class="tablepoint" style="width: 100%; display: flex; justify-content: space-between;" >
            <td style="width: 15%;" class="datatable">${data[i].firstname + " " + data[i].lastname}</td>
            <td style="width: 15%;" class="datatable">${data[i].phoneNumber}</td>
            <td style="width: 20%;" class="datatable">${data[i].email}</td>
            <td style="width: 20%;" class="datatable">${data[i].cnic}</td>
            <td style="width: 15%;" class="datatable">${data[i].area.name}</td>
            <td style="width: 15%;" class="datatable"> 
            <i onclick="modalValue(${data[i].id})" data-bs-toggle="modal" data-bs-target="#exampleModal"  
            style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
            <i onclick="deleteAchievement(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
    </td>
        </tr>`
    }
        document.getElementById("usertable").innerHTML = table;
    }
    })
}

function searchByNameAndNumber(){

    var filtername = document.getElementById("searchname").value;
    var filterNumber = document.getElementById("searchnumber").value;

    filterNumber = filterNumber.toString();

    var len1 = filtername.length;
    var len2 = filterNumber.length;

    let table = ""
    fetch("http://localhost:8081/api/admin/user",{
        headers:{
            "Content-Type":"application/json",
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
 
        table += `<tr style="width: 100%; display: flex; justify-content: space-between;" class="tablepoint">
        <th style="width: 15%;" class="toptable ">Name</th>
        <th style="width: 15%;" class="toptable ">PhoneNumber</th>
        <th style="width: 20%;" class="toptable ">Email</th>
        <th style="width: 20%;" class="toptable ">Cnic</th>
        <th style="width: 15%;" class="toptable ">Area Name </th>
        <th style="width: 15%;" class="toptable ">Action </th>
        </tr>`
        for (let i = 0; i < data.length; i++) {

            if (data[i].firstname.slice(0,len1) == filtername && JSON.stringify(data[i].phoneNumber).slice(0,len2) == filterNumber) {
        
                table += `
                
                <tr class="tablepoint" style="width: 100%; display: flex; justify-content: space-between;" >
                <td style="width: 15%;" class="datatable">${data[i].firstname + " " + data[i].lastname}</td>
                <td style="width: 15%;" class="datatable">${data[i].phoneNumber}</td>
                <td style="width: 20%;" class="datatable">${data[i].email}</td>
                <td style="width: 20%;" class="datatable">${data[i].cnic}</td>
                <td style="width: 15%;" class="datatable">${data[i].area.name}</td>
                <td style="width: 15%;" class="datatable"> 
                <i onclick="modalValue(${data[i].id})" data-bs-toggle="modal" data-bs-target="#exampleModal"  
            style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
            <i onclick="deleteAchievement(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
                </td>
                </tr>`
            }
    }
        document.getElementById("usertable").innerHTML = table;
    })
}

function deleteArea(id){
    
    fetch('http://localhost:8081/api/user/'+id, {
            method: 'DELETE'
    })

    setTimeout(() => {
        getUser()
    }, 200);
}

function modalValue(id){
    uid = id
    console.log(id)
    fetch("http://localhost:8081/api/user/"+id,{
        headers:{
            "Content-Type":"application/json",
        }
    })
    .then((response)=>response.json())
    .then((data)=> {

    document.getElementById("firstname").value = data.firstname;
    document.getElementById("lastname").value = data.lastname;
    document.getElementById("cnic").value = data.cnic;
    document.getElementById("phonenumber").value = data.phoneNumber;
    document.getElementById("email").value = data.email;
    document.getElementById("password").value = data.password;
    document.getElementById("family").value = data.numberOfFamilyMembers;

    document.getElementById("city").value = data.address.city;
    document.getElementById("housenumber").value = data.address.houseNumber;
    document.getElementById("floornumber").value = data.address.floorNumber;
    document.getElementById("street").value = data.address.street;

    getArea2()
})
}

function getArea2() {
    let table = ""
    fetch("http://localhost:8081/api/area",{
        headers:{
            "Content-Type":"application/json",
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
        console.log(data);
        
        table +=  `<option value="ALL" selected>ALL</option>`
        for (let i = 0; i < data.length; i++) {
            table += `
            <option value="${data[i].name}">${data[i].name}</option>
        `
        }
        document.getElementById("dropdownarea2").innerHTML = table;
    })
}

let addressId;
let areaId;

function updateUser(){

    var select = document.getElementById('dropdownarea2');
    var value = select.options[select.selectedIndex].value;
    areaId = value

    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let cnic = document.getElementById("cnic").value;
    let phonenumber = document.getElementById("phonenumber").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let family = document.getElementById("family").value;

    let city = document.getElementById("city").value;
    let housenumber = document.getElementById("housenumber").value;
    let floornumber = document.getElementById("floornumber").value;
    let street = document.getElementById("street").value;


    setTimeout(() => {

        newAddress = {city : city , houseNumber : housenumber , floorNumber : floornumber , street : street}; 
        fetch("http://localhost:8081/api/address", {
            method: 'PUT',
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
        
    }, 1000);

    setTimeout(() => {
        newUser = {firstname : firstname , lastname : lastname , cnic : cnic, phoneNumber : phonenumber
            , email : email , password : password , numberOfFamilyMembers : family ,
            area : {
                id : areaId
            },
            address : {
                id : addressId
            }
        }; 
    
        fetch("http://localhost:8081/api/user", {
            method: 'PUT',
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
    }, 1000);


 

}
