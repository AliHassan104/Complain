var userDetails = "";
var loginUserName = "";
var loginUserId;

tokenNotExist();


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
   var paginationDiv=document.getElementById('preloader')

   paginationDiv.style.display='flex'

    return fetch(`${baseUrl}/api${url}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": getToken()
        }
    })
     .then((response) => {
            switch(response.status) {
                case 404:
                    window.open(exception404, "_self")
                    break;
                case 500:
                    window.open(exception500, "_self")
                    break;
                case 401:
                    localStorage.clear()
                    window.open(loginPage, "_self")
                    break;
            }
            paginationDiv.style.display='none'
            return response.json()
                .then((data) => {
                    return data;
                })
                .catch((err) => {
                    console.log(err)
                })
        })
        .catch((error) => { 
            window.open(exception503, "_self")
        })

}

function sendData(url, data) {
    debugger
    var paginationDiv=document.getElementById('preloader')

   paginationDiv.style.display='flex'
    return fetch(`${baseUrl}/api${url}`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": getToken()
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            switch (response.status) {
                case 404:
                    window.open(exception404, "_self")
                    break;
                case 500:
                    window.open(exception500, "_self")
                    break;
                case 401:
                    localStorage.clear()
                    window.open(loginPage, "_self")
                    break;

            }
             paginationDiv.style.display='none'
            return response.json()
                .then((data) => {
                    return data;
                })
                .catch((err) => {
                    console.log("Caught it " + err);
                })
        })
        .catch((error) => {
            window.open(exception503, "_self")
            console.log(error)
        });
}




function sendDataWithFormData(url, data) {
    var paginationDiv=document.getElementById('preloader')

   paginationDiv.style.display='flex'
    return fetch(`${baseUrl}/api${url}`, {
        method: "POST",
        headers: {
            "Authorization": getToken()
        },
        body: data
    })
        .then((response) => {
            switch (response.status) {
                case 404:
                    window.open(exception404, "_self")
                    break;
                case 500:
                    window.open(exception500, "_self")
                    break;
                case 401:
                    localStorage.clear()
                    window.open(loginPage, "_self")
                    break;
            }
         paginationDiv.style.display='none'
            return response.json()
                .then((data) => {
                    return data;
                }).catch((err) => {
                    console.log(err);
                })
        })
        .catch((error) => {
            window.open(exception503, "_self")
            console.log(error)
        });
}


function deleteData(url) {
    var paginationDiv=document.getElementById('preloader')

   paginationDiv.style.display='flex'
    return fetch(`${baseUrl}/api${url}`, {
        method: 'DELETE',
        headers: {
            "Authorization": getToken()
        }
    })
        .catch((error) => {
            console.log(error);
        });
}

function updateData(url, data) {
    var paginationDiv=document.getElementById('preloader')

    paginationDiv.style.display='flex'
    return fetch(`${baseUrl}/api${url}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            "Authorization": getToken()
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            switch (response.status) {
                case 404:
                    window.open(exception404, "_self")
                    break;
                case 500:
                    window.open(exception500, "_self")
                    break;
                case 401:
                    localStorage.clear()
                    window.open(loginPage, "_self")
                    break;
            }
         paginationDiv.style.display='none'
            return response.json()
                .then((data) => {
                    return data;
                }).catch((err) => {
                    console.log(err);
                })
        })
        .catch((error) => {
            window.open(exception503, "_self")
            console.log(error)
        });
}

function updateDataWithFormData(url, data) {
    var paginationDiv=document.getElementById('preloader')

    paginationDiv.style.display='flex'
    return fetch(`${baseUrl}/api${url}`, {
        method: "PUT",
        headers: {
            "Authorization": getToken()
        },
        body: data
    })
        .then((response) => {
            switch (response.status) {
                case 404:
                    window.open(exception404, "_self")
                    break;
                case 500:
                    window.open(exception500, "_self")
                    break;
                case 401:
                    localStorage.clear()
                    window.open(loginPage, "_self")
                    break;
            }
                     paginationDiv.style.display='none'
            return response.json()
            .then((data) => {
                return data;
            }).catch((err) => {
                console.log(err);
            })
        })
        .catch((error) => {
            window.open(exception503, "_self")
            console.log(error)
        });
}

function patchData(url, data) {
    var paginationDiv=document.getElementById('preloader')

    paginationDiv.style.display='flex'
    return fetch(`${baseUrl}/api${url}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
            "Authorization": getToken()
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            switch (response.status) {
                case 404:
                    window.open(exception404, "_self")
                    break;
                case 500:
                    window.open(exception500, "_self")
                    break;
                case 401:
                    localStorage.clear()
                    window.open(loginPage, "_self")
                    break;
            }
                     paginationDiv.style.display='none'
            return response.json().then((data) => {
                return data;
            }).catch((err) => {
                console.log(err);
            })
        })
        .catch((error) => {
            window.open(exception503, "_self")
            console.log(error)
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

        if(!getRoles.includes("ROLE_WORKER") && !getRoles.includes("ROLE_ADMIN")){
            window.open(loginPage, "_self")
        }
        else if(getRoles.includes("ROLE_WORKER")){
            window.open(loginPage, "_self")
        }

    }
    else {
        window.open(loginPage, "_self")
    }
}



function getUserData() {
    return getData(`/get-logged-in-user`)
        .then((data) => {
            loginUserName = data.firstname + " " + data.lastname
            loginUserId = data.id;
            return data
        })
        .catch((error) => {

        })
}

