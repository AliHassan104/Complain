let complainStatus = []
let numberOfStatus = []
getComplain()

function getComplain() {
    let totalcomplain = 0
    let inprogress = 0
    let resolved = 0
    let inreview = 0
    let rejected = 0

    complainStatus = []
    numberOfStatus = []

    fetch("http://localhost:8081/api/complainbystatus",{
        headers:{
            "Content-Type":"application/json",   
        }
    })
    .then((response)=>response.json())
    .then((data)=> {

        // console.log(123);

        for (const property in data) {
            complainStatus.push(data[property].status)
            numberOfStatus.push(data[property].numberOfComplains)
          }

        //   console.log(complainStatus);
        //   console.log(numberOfStatus);

        
        for (let i = 0; i < data.length; i++) {

            totalcomplain += numberOfStatus[i];

            if (complainStatus[i] == "IN_REVIEW") {
                inreview +=  numberOfStatus[i]; 
            }
            else if(complainStatus[i] == "IN_PROGRESS"){
                inprogress +=  numberOfStatus[i];
            }
            else if(complainStatus[i] == "COMPLETED"){
                resolved +=  numberOfStatus[i];
            }
            else if(complainStatus[i] == "REJECTED"){
                rejected +=  numberOfStatus[i];
            }
        }  



        document.getElementById("totalcomplain").innerText = totalcomplain;
        document.getElementById("rejectperc").innerText = parseInt(((totalcomplain - inprogress - resolved - inreview)/totalcomplain)*100)+"%";
        document.getElementById("inprogress").innerText = inprogress;
        document.getElementById("inprogressperc").innerText = parseInt((inprogress / totalcomplain)*100) + "%";
        document.getElementById("resolved").innerText = resolved;
        document.getElementById("resolvedperc").innerText = parseInt((resolved / totalcomplain)*100) + "%";
        document.getElementById("inreview").innerText = inreview;
        document.getElementById("inreviewperc").innerText = parseInt((inreview / totalcomplain)*100) + "%";
    })
}