var queryString = window.location.search

function getPollingQuestionDetails() {
    
    var parameter = new URLSearchParams(queryString)
    var pollingQuestionId = parameter.get("p_id")
    var renderQuestion = ""
    var renderOption = ""

        getData(`/pollinganswer/getpollingoptionresult/${pollingQuestionId}`)
        .then((data) => {
            getData(`/user/countuserbystatus/Published`)
            .then((countUser)=>{
               
                renderQuestion += `<b>${data.pollingQuestion}</b> `

                document.getElementById("pollingQuestion").innerHTML = renderQuestion
    
                for (let i = 0; i < data.getPollingQuestionResult.length; i++) {
                    
                    var pollingAnswerInPercentage = Math.round((Object.values(data.getPollingQuestionResult[i])*100)/countUser)
                    
                    renderOption += `
                    <a  class="list-group-item list-group-item-action ">
                        <div class="d-flex w-100 justify-content-between">
                            <span>${i+1}. &nbsp ${Object.keys(data.getPollingQuestionResult[i])}</span>${Object.values(data.getPollingQuestionResult[i])}
                        </div>
                    <br>
                        <div class="progress" style="margin-left:2% ; width: 90%;">
                            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: ${pollingAnswerInPercentage}%">${pollingAnswerInPercentage}%</div>
                        </div>
                  </a>`
    
                }
    
                document.getElementById("options").innerHTML = renderOption

            })
        
        })
}

getPollingQuestionDetails()

