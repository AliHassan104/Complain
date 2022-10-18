var queryString = window.location.search
var PollingOptions = []
var PollingAnswer=[]


function getComplain() {
        getData(`/complainbymonth`)
        .then((data)=> {

        for (const property in data) {
          complainNumber.splice(data[property].compalinMonth-1 , 1 , data[property].numberofComplains)
        }
        max = 0
        for (let i = 0; i < complainNumber.length-1; i++) {
          if (complainNumber[i] < complainNumber[i+1]) {
            max = complainNumber[i+1]
          }
        }
        barchart1()
      })
}

function getPollingQuestionDetails() {
    
    var parameter = new URLSearchParams(queryString)
    var pollingQuestionId = parameter.get("p_id")
    var renderQuestion = ""
    var renderOption = ""
    var mapkeys = []
    var mapValues = []

        getData(`/pollinganswer/getpollingoptionresult/${pollingQuestionId}`)
        .then((data) => {


                renderQuestion += `<b>${data.pollingQuestion}</b> `

                document.getElementById("pollingQuestion").innerHTML = renderQuestion
    
                for (let i = 0; i < data.getPollingQuestionResult.length; i++) {
                    
                    mapkeys.push(Object.keys(data.getPollingQuestionResult[i]))
                    mapValues.push(Object.values(data.getPollingQuestionResult[i]))

                    var pollingAnswerInPercentage = Math.round((Object.values(data.getPollingQuestionResult[i])*100)/countUser)

    
                }
    
                document.getElementById("options").innerHTML = renderOption


                var barColors = [
                    "#b91d47",
                    "#00aba9",
                    "#2b5797",
                    "#e8c3b9",
                    "#1e7145",
                    "#FF9C33",
                    "#33FFA8",
                    "#33D7FF",
                    "#3364FF",
                    "#8633FF"
                  ];

                  new Chart("myChart", {
                    type: "pie",
                    data: {
                      labels: mapkeys,
                      datasets: [{
                        backgroundColor: barColors,
                        data: mapValues
                      }]
                    },
                    options: {
                      title: {
                        display: true,
                        text: "Polling Answer Result"
                      }
                    }
                  });

            })
        
        })
}


    // console.log(PollingOptions)
getPollingQuestionDetails()

// var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
// var yValues = [55, 49, 44, 24, 15];


