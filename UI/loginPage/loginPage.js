

function loginData() {
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value

    if (email != "" && password != "") {

        let loginCredentials = {
            email: email,
            password: password
        }

        fetch(`${baseUrl}/api/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(loginCredentials)
        })
            .then((response) => 
                response.json()
            )
            .then((data) => {
                if (data.jwt != null) {
                    localStorage.setItem("jwtToken", data.jwt)
                    location.href = `${loginUrl}/index.html`
                    
                    document.getElementById('password').value = ""
                }
            })
            .catch((response) => {
                console.log("Only Admin Allow")
            });

    }
    else {
        console.log("Email And Password Cannot be Null");
    }
}