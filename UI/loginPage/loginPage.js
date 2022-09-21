

function loginData(){
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value

    let loginCredentials = {
        email:email,
        password:password
    }

    location.href = `${loginUrl}/index.html` 
}