let month = ["January", "February", "March", "April", "May", "June","July","August","September","October","November","December"]
let max = 0;
let complainNumber = [0,0,0,0,0,0,0,0,0,0,0,0]


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

getComplain()


function barchart1(){
    new Chart(document.getElementById("chartjs-dashboard-bar1"), {
        type: "bar",
        data: {
            labels: month,
            datasets: [{
                label: "This year",
                backgroundColor: window.theme.primary,
                borderColor: window.theme.primary,
                hoverBackgroundColor: window.theme.primary,
                hoverBorderColor: window.theme.primary,
                data: complainNumber,
                barPercentage: .75,
                categoryPercentage: .5
            }]
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    gridLines: {
                        display: false
                    },
                    stacked: false,
                    ticks: {
                        stepSize: 20,
                        min: 0,
                        max: max+1,
                    }
                }],
                xAxes: [{
                    stacked: false,
                    gridLines: {
                        color: "transparent"
                    }
                }]
            }
        }
    });
}
