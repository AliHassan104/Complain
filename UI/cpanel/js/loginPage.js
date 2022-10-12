
function loginData() {
    debugger
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
            .then((response) => {
                wrongEmailAndPass = '';
                    if(!response.ok){
                        wrongEmailAndPass +=
                        `
                        <div  style=" 
                        margin: auto;
                        text-align: center;
                        width: 100%;
                        height: 6vh; text-align: center; 
                        justify-content: center;
                        font-size: large" 
                        class="alert alert-danger" role="alert">
                        Wrong Credentials
                        </div>`

                        document.getElementById("notAllowed").innerHTML = wrongEmailAndPass
                        
                        setTimeout(()=>{
                            document.getElementById("notAllowed").innerHTML = ""
                        },2000)
                    }

                response.json()
            
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
        })

    }
    else {
        
        var wrongEmailAndPass=''
        wrongEmailAndPass +=
                        `
                        <div  style=" 
                        margin: auto;
                        text-align: center;
                        width: 100%;
                        height: 6vh; text-align: center; 
                        justify-content: center;
                        font-size: large" 
                        class="alert alert-danger" role="alert">
                         Email Or Password is Empty 
                        </div>`

                        document.getElementById("notAllowed").innerHTML = wrongEmailAndPass
                        
                        setTimeout(()=>{
                            document.getElementById("notAllowed").innerHTML = ""
                        },2000)
        }
}



