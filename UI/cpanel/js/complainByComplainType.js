let TypeOfComplain = [];
let NumberOfComplains = [];
let maxNumberOfComplain = 0

function getComplain() {
        getData(`/complainbycomplaintype`).then((data)=> {

        for (const property in data) {
            TypeOfComplain.push(data[property].complainType)
            NumberOfComplains.push(data[property].numberOfComplains)
        }

        for (let i = 0; i < NumberOfComplains.length; i++) {
            if (NumberOfComplains[i] > maxNumberOfComplain ) {
                maxNumberOfComplain = NumberOfComplains[i]
            }
        }
        barchart2()
        
      })
}

getComplain()

    

function barchart2(){
    new Chart(document.getElementById("chartjs-dashboard-bar2"), {
        type: "bar",
        data: {
            labels: TypeOfComplain,
            datasets: [{
                label: "This year",
                backgroundColor: window.theme.primary,
                borderColor: window.theme.primary,
                hoverBackgroundColor: window.theme.primary,
                hoverBorderColor: window.theme.primary,
                data: NumberOfComplains,
                barPercentage: .5,
                categoryPercentage: .25
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
                        // ticks: {
                        min: 0,
                            // max: maxComplain,
                        max: maxNumberOfComplain+1,
                        // maxTicksLimit: 5,
                        //   },
                        stepSize: 20
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