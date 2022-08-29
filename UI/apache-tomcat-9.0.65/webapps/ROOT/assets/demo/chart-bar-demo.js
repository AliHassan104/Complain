// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Bar Chart Example


let month = ["January", "February", "March", "April", "May", "June","July","August","September","October","November","December"]
// let maxComplain = 10;
let max = 10;
let complainNumber = [0,0,0,0,0,0,0,0,0,0,0,0]

// setTimeout(() => {
  getComplain()
// }, 100);

function getComplain() {
    fetch("http://localhost:8081/api/complianbymonth",{
        headers:{
            "Content-Type":"application/json",
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
        for (const property in data) {
          // complainNumber.push(data[property].numberofComplains)
          complainNumber.splice(data[property].compalinMonth-1 , 1 , data[property].numberofComplains)
        }
        console.log(complainNumber);
        max = 0
        for (let i = 0; i < complainNumber.length-1; i++) {
          if (complainNumber[i] < complainNumber[i+1]) {
            max = complainNumber[i+1]
            console.log(max);
          }
        }
    })
}


function barchart() {
  
}

var ctx = document.getElementById("myBarChart");

var myLineChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: month,
    datasets: [{
      label: "Revenue",
      backgroundColor: "rgba(2,117,216,1)",
      borderColor: "rgba(2,117,216,1)",
      data: complainNumber,
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'month'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: month.length
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          // max: maxComplain,
          max: max,
          maxTicksLimit: 5
        },
        gridLines: {
          display: true
        }
      }],
    },
    legend: {
      display: false
    }
  }
});
