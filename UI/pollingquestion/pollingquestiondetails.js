var queryString = window.location.search

function getPollingQuestionDetails() {
    var parameter = new URLSearchParams(queryString)
    var pollingQuestionId = parameter.get("p_id")
    var renderQuestion = ""
    var renderOption = ""

    fetch(`${baseUrl}/api/pollinganswer/getpollingoptionper/${pollingQuestionId}`, {
        headers: {
            "Content-type": "application/json"
        }
    })
        .then((response) => response.json())
        .then((data) => {
            renderQuestion += `<b>${data.pollingQuestion}</b> `

            document.getElementById("pollingQuestion").innerHTML = renderQuestion

            for (let i = 0; i < data.getPollingQuestionResult.length; i++) {
                renderOption += `
                <a  class="list-group-item list-group-item-action ">
                    <div class="d-flex w-100 justify-content-between">
                        <span>${i+1}. &nbsp ${Object.keys(data.getPollingQuestionResult[i])}</span>
                    </div>
                <br>
                    <div class="progress" style="margin-left:2% ; width: 90%;">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: ${Object.values(data.getPollingQuestionResult[i])}%">${Object.values(data.getPollingQuestionResult[i])}</div>
                    </div>
              </a>`

            }

            document.getElementById("options").innerHTML = renderOption

        })
}

getPollingQuestionDetails()