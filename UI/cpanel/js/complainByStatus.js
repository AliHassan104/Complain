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


    getData(`/complainbystatus`)
    .then((data)=> {

     
        for (const property in data) {
            complainStatus.push(data[property].status)
            numberOfStatus.push(data[property].numberOfComplains)
          }


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
        if(totalcomplain == 0){
            document.getElementById("rejectperc").innerText = 0+"%"
        }
        else{
        document.getElementById("rejectperc").innerText = 100+"%"
        }
        

        document.getElementById("inprogress").innerText = inprogress;
        if(inprogress != 0){
            document.getElementById("inprogressperc").innerText = parseInt((inprogress / totalcomplain)*100)+"%";
        }
        else{
            document.getElementById("inprogressperc").innerText = 0+"%";
        }

        document.getElementById("resolved").innerText = resolved;
        if(resolved != 0){
            document.getElementById("resolvedperc").innerText = parseInt((resolved / totalcomplain)*100) + "%";
        }
        else{
            document.getElementById("resolvedperc").innerText = 0+"%";
        }
        
        
        document.getElementById("inreview").innerText = inreview;
        if(inreview != 0){
            document.getElementById("inreviewperc").innerText = parseInt((inreview / totalcomplain)*100) + "%";
        }
        else{
            document.getElementById("inreviewperc").innerText = 0+"%"
        }
       
        
    })
}


