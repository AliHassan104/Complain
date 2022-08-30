let complainType = []
let numberOfComplain = []
// setTimeout(() => {
  // getComplain()

  function getComplain() {

    fetch("http://localhost:8081/api/complainbycomplaintype",{
        headers:{
            "Content-Type":"application/json",
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
      // console.log(data);
        for (const property in data) {
          complainType.push(data[property].complainType)
          // complainType.splice(data[property].complainType-1 , 1 , data[property].numberofComplains)
          numberOfComplain.push(data[property].numberOfComplains)
          // numberOfComplain.splice(data[property].numberOfComplains-1 , 1 , data[property].numberofComplains)
        }
    })
}
// }, 1000);

// setTimeout(() => {
  
function piegraph() {
  
  console.log("pie graph");
  Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
  Chart.defaults.global.defaultFontColor = '#292b2c';
  // Pie Chart Example
  
  var ctx = document.getElementById("myPieChart");
  var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      // labels: ["Blue", "Red", "Yellow", "Green"],
      labels: complainType,
      datasets: [{
        // data: [12.21, 15.58, 11.25, 8.32],
        data: numberOfComplain,
        // backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745'],
        backgroundColor: ['#DFFF00', '#FFBF00', '#FF7F50', '#DE3163', '#9FE2BF', '#6495ED',"#40E0D0"],
      }],
    },
  });
}

getComplain()

setTimeout(() => {
  piegraph()
}, 500);



