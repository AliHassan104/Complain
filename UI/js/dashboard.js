
function logOut() {
    let token = localStorage.getItem("jwtToken")
    console.log(token);
    sendData(`/logout`,token)
    localStorage.clear();
    location.href = `${loginUrl}/loginPage/loginpage.html`
}

function showUserData() {
    getUserData().then(
        (data) => {
            document.getElementById("username").innerText = data.firstname
        })
}

showUserData()
