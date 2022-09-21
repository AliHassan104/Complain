tokenNotExist();

function getToken() {
    let token = localStorage.getItem("jwtToken")
    if(token != null){
        return `Bearer ${token}`
    }
    return null;
}


function getData(url) {
    return fetch(`${baseUrl}/api/${url}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": getToken()
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

function sendData(url, data) {

    return fetch(`${baseUrl}/api/${url}`, {
        method: "POST",
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

function deleteData(url) {
    fetch(`${baseUrl}/api/${url}`, {
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
    if(token == null){
    window.open(`${loginUrl}/loginPage/loginpage.html`,"_self")  
    }
}

