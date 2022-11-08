
function logOut() {
    
    let token = localStorage.getItem("jwtToken")
    localStorage.clear();
    location.href = `${loginUrl}/loginpage.html`
}

function showUserData() {
   
    getUserData().then(
        (data) => {
            document.getElementById("username").innerText = data.firstname
            // console.log(data)
        })
}

showUserData()
