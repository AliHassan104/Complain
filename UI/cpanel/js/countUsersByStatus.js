countPendingUsers()
countTotalUsers()

function countPendingUsers(){
    getData("/user/countuserbystatus/in_review")
    .then((data)=>{
        if(data != null){
        document.getElementById("pendingUsers").innerText = data
        }
    } )
}


function countTotalUsers(){
    getData("/user/countuserbystatus/Published")
    .then((data)=>{
        if(data != null){
            document.getElementById("totalUsers").innerText = data
        }
    } )
}