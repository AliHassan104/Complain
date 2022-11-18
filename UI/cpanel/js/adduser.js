let queryString;

queryString = window.location.search;

if (queryString != "") {
  const urlParams = new URLSearchParams(queryString);
  var urlId = urlParams.get("id");

  getData(`/user/${urlId}`).then((data) => {
    document.getElementById("firstname").value = data.firstname;
    document.getElementById("lastname").value = data.lastname;
    document.getElementById("cnic").value = data.cnic;
    document.getElementById("phonenumber").value = data.phoneNumber;
    document.getElementById("email").value = data.email;
    // document.getElementById("password").value = data.password;
    document.getElementById("family").value = data.numberOfFamilyMembers;
    addressId = data.address.id;
    document.getElementById("housenumber").value = data.address.houseNumber;
    document.getElementById("floornumber").value = data.address.floorNumber;

    document.getElementById("formButton").innerText = "Update";
    document.getElementById("updateUserHd").innerText = "Update User";
  });
}

let addressId;
let areaId;
var blockId;

function addUser() {
   
  var select = document.getElementById("dropdownarea");
  var value = select.options[select.selectedIndex].value;
  areaId = value;

  var selectBlock = document.getElementById("dropdownblock");
  blockId = selectBlock.options[selectBlock.selectedIndex].value;

  let firstname = document.getElementById("firstname").value;
  let lastname = document.getElementById("lastname").value;
  let cnic = document.getElementById("cnic").value;
  let phonenumber = document.getElementById("phonenumber").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let family = document.getElementById("family").value;

  let property = document.getElementById("dropdownproperty");
  let propertyValue = property.value;

  let usertype = document.getElementById("usertype").value;

  let housenumber = document.getElementById("housenumber").value;
  let floornumber = document.getElementById("floornumber").value;

  newUser = {
    firstname: firstname,
    lastname: lastname,
    cnic: cnic,
    phoneNumber: phonenumber,
    email: email,
    password: password,
    numberOfFamilyMembers: family,
    status: "PUBLISHED",
    area: {
      id: areaId,
    },
    address: {
      city: "Karachi",
      houseNumber: housenumber,
      floorNumber: floornumber,
    },
    block: {
      id: blockId,
    },
    property: propertyValue,
    userType: usertype,
  };
  debugger


  if (blockId==="" || firstname=="" || lastname=="" || cnic==" " || phonenumber=="" ||
  email=="" || password=="" || family=="" || propertyValue=="" || usertype=="" ||
  housenumber=="" || floornumber=="") {
    let invalidContent = "";
    invalidContent += `<div  style=" margin: auto;text-align: center;width: 60%;height: 5vh; text-align: center; 
              justify-content: center;font-size: large" class="alert alert-danger" role="alert">
              <b> Please Fill All Fields </b> &nbsp  
              </div>`;

    document.getElementById("formSubmitted").innerHTML = invalidContent;
   
    setTimeout(() => {
      document.getElementById("formSubmitted").innerHTML = "";
    }, 3000);
   
  }
    else if (queryString == "") {
    sendData(`/user`, newUser)
      .then((data) => {
        let table = "";
       if (Object.prototype.toString.call(data) == "[object Object]") {
          table += `
                        <div  style=" 
                        margin: auto;
                        text-align: center;
                        width: 50%;
                        height: 5vh; text-align: center; 
                        justify-content: center;
                        font-size: large" 
                        class="alert alert-success" role="alert">
                        <b> ${
                          newUser.firstname + " " + newUser.lastname
                        } </b> &nbsp   Added In User Successfully
                        </div>`;

          document.getElementById("formSubmitted").innerHTML = table;
        
          setTimeout(() => {
            document.getElementById("formSubmitted").innerHTML = "";
          }, 2000);
        } else {
          table += `
                     <div  style=" 
                     margin: auto;
                     text-align: center;
                     width: 50%;
                     height: 5vh; text-align: center; 
                     justify-content: center;
                     font-size: large" 
                     class="alert alert-danger" role="alert">
                     <b>${data[0].message}</b> 
                     </div>`;

          document.getElementById("formSubmitted").innerHTML = setTimeout(
            () => {
              document.getElementById("formSubmitted").innerHTML = "";
            },
            2000
          );
        }
      })
      .catch((error) => {
        console.log("Error occured " + error);
      });
  } else {
    // console.log(newUser);
    updateData(`/user/${urlId}`, newUser).then((data) => {
      let table = "";
      if (Object.prototype.toString.call(data) == "[object Object]") {
        table += `
                    <div  style=" 
                    margin: auto;
                    text-align: center;
                    width: 50%;
                    height: 5vh; text-align: center; 
                    justify-content: center;
                    font-size: large" 
                    class="alert alert-success" role="alert">
                    <b> ${
                      newUser.firstname + " " + newUser.lastname
                    } </b> &nbsp   Updated In User Successfully
                    </div>`;

        document.getElementById("formSubmitted").innerHTML = table;

        setTimeout(() => {
          document.getElementById("formSubmitted").innerHTML = "";
          window.location.replace(`${loginUrl}/viewuser.html`);
        }, 2000);
      } else {
        table += `
                         <div  style=" 
                         margin: auto;
                         text-align: center;
                         width: 50%;
                         height: 5vh; text-align: center; 
                         justify-content: center;
                         font-size: large" 
                         class="alert alert-danger" role="alert">
                         <b>${data[0].message}</b> 
                         </div>`;

        document.getElementById("formSubmitted").innerHTML = table;
       
        setTimeout(() => {
          document.getElementById("formSubmitted").innerHTML = "";
        }, 2000);
      }
    });
  }
  document.getElementById("firstname").value = "";
  document.getElementById("lastname").value = "";
  document.getElementById("cnic").value = "";
  document.getElementById("phonenumber").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("family").value = "";
  document.getElementById("housenumber").valu="";
  document.getElementById("floornumber").value = "";

}



var areaIdToGetBlock;

function getArea() {
  let table = "";

  getData(`/area`).then((data) => {
    areaIdToGetBlock = data[0].id;

    for (let i = 0; i < data.length; i++) {
      table += `
            <option value="${data[i].id}">${data[i].name}</option>
        `;
    }
    document.getElementById("dropdownarea").innerHTML = table;
    getBlock(areaIdToGetBlock);
  });
}
getArea();

document.getElementById("dropdownarea").addEventListener("change", function () {
  getBlock(this.value);
});

function getBlock(areaId) {
  let renderData = "";

  getData(`/blockByArea/${areaId}`).then((data) => {
    if (data.length !== 0) {
      for (let i = 0; i < data.length; i++) {
        renderData += `
                <option value="${data[i].id}">${data[i].block_name}</option>
            `;
      }
    } else {
      renderData += `
                <option value="" disabled selected>Sorry No Block Available</option>
            `;
    }
    document.getElementById("dropdownblock").innerHTML = renderData;
  });
}
