var userDetails = "";
tokenNotExist();


function getToken() {
    let token = localStorage.getItem("jwtToken")
    if(token != null){
        return "Bearer "+token
    }
    return null;
}

function decodeJwtToken(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};


function getData(url) {
    return fetch(`${baseUrl}/api/${url}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            // "Authorization": getToken()
        }
    })
        .then((response) => {
            return response.json().then((data) => {
                return data;
            }).catch((err) => {
                console.log(err);
            })
        });
}

function sendData(url,data) {

    return fetch(`${baseUrl}/api/${url}`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            // "Authorization": getToken()
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

function deleteData(url) {
    return fetch(`${baseUrl}/api/${url}`, {
        method: 'DELETE',
        headers: {
            "Authorization": getToken()
        }
    })
        .then((data) => {
           
        })
        .catch((error) => {
            console.log(error);
        })
}

function tokenNotExist() {
    let token = getToken()
    if(token != null){
        userDetails = decodeJwtToken(token.substring(7))
    }
    if(token == null || userDetails.ROLES != "[ROLE_ADMIN]"){

        window.open(`${loginUrl}/loginPage/loginpage.html`,"_self")
        // document.getElementById("notAllowed").innerText = 'Only Admin Allowed'
    }  
}

function getUserData(){
    let email = userDetails.sub 
    return getData(`userbyemail/${email}`)
    .then((data)=>{
        return data
    } 
)
}

