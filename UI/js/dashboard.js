function logOut() {
    localStorage.clear();
    location.href = `${loginUrl}/loginPage/loginpage.html`
}

function showUserData() {
    getUserData().then(
        (data) => {
            document.getElementById("username").innerText = data.firstname
            console.log(data);
        }
    )
}

showUserData()
