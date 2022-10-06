var userDetails = "";
var loginUserName = "";
var loginUserId;
tokenNotExist();
getUserData();


function getToken() {
    let token = localStorage.getItem("jwtToken")
    if (token != null) {
        return "Bearer " + token
    }
    return null;
}

function decodeJwtToken(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};


function getData(url) {
    return fetch(`${baseUrl}/api${url}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": getToken()
        }
    })
        .then((response) => {
            if(response.status == 403){
                window.open(`${loginUrl}/loginPage/loginpage.html`, "_self") 
            }
            return response.json()
            .then((data) => {
                return data;
            })
            .catch((err) => {
                console.log(err);
            })
        });
}

function sendData(url, data) {
    return fetch(`${baseUrl}/api${url}`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": getToken()
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            if(!response.ok){
                return response.text().then(text => { throw new Error(text) })
            }
            return response.json()
        .then((data) => {
                return data;
            })
        .catch((err) => {
                console.log("Caught it "+err);
            })
        });
}

function sendDataWithFormData(url, data) {
    return fetch(`${baseUrl}/api${url}`, {
        method: "POST",
        headers: {
            "Authorization": getToken()
        },
        body: data
    })
        .then((response) => {
            return response.json().then((data) => {
                return data;
            }).catch((err) => {
                console.log(err);
            })
        });
}


function deleteData(url) {
    return fetch(`${baseUrl}/api${url}`, {
        method: 'DELETE',
        headers: {
            "Authorization": getToken()
        }
    })
        .catch((error) => {
            console.log(error);
        })
}

function updateData(url, data) {

    return fetch(`${baseUrl}/api${url}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            "Authorization": getToken()
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            return response.json().then((data) => {
                return data;
            }).catch((err) => {
                console.log(err);
            })
        });
}

function updateDataWithFormData(url, data) {

    return fetch(`${baseUrl}/api${url}`, {
        method: "PUT",
        headers: {
            "Authorization": getToken()
        },
        body: data
    })
        .then((response) => {
            return response.json().then((data) => {
                return data;
            }).catch((err) => {
                console.log(err);
            })
        });
}

function patchData(url, data) {

    return fetch(`${baseUrl}/api${url}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
            "Authorization": getToken()
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            return response.json().then((data) => {
                return data;
            }).catch((err) => {
                console.log(err);
            })
        });
}

function tokenNotExist() {
    let token = getToken()
    let getRoles = []

    if (token != null) {
      
        userDetails = decodeJwtToken(token.substring(7))
        var roles = userDetails.ROLES.replace(/[\])}[{(]/g, '');
        // Converting roles (string) into array 
        var arrayOfRoles = roles.split(",");                                    

        for (let i = 0; i < arrayOfRoles.length; i++) {
        // Removing white spaces from array of role using trim()  
            getRoles[i] = arrayOfRoles[i].trim()
        }

        if (getRoles.includes("ROLE_WORKER") || getRoles.includes("ROLE_ADMIN")) {
             if(getRoles.includes("ROLE_WORKER")){
                window.open(`${loginUrl}/loginPage/loginpage.html`, "_self") 
             }
        }
        else {
             window.open(`${loginUrl}/loginPage/loginpage.html`, "_self") 
        }
    }
    else {
        window.open(`${loginUrl}/loginPage/loginpage.html`, "_self")
    }
}



function getUserData() {
    return getData(`/get-logged-in-user`)
        .then((data) => {
            loginUserName = data.firstname+" "+data.lastname
            loginUserId =data.id;
            return data
        })
}

