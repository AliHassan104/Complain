// Set new default font family and font color to mimic Bootstrap's default styling


// month = []
// datas = []
// color = []
// count = 10
// for (const property in object) {
  //   month.push(object[property].complainType)
//   datas.push(object[property].numberOfComplain)
//   color.push(count+'7bff')
//   count+=10
//   // console.log(`${property}: ${object[property]}`);
// }

// console.log(datas);
// console.log(months);

Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';
// Pie Chart Example
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ["Blue", "Red", "Yellow", "Green"],
    // labels: ["Blue", "Red", "Yellow", "Green"],
    datasets: [{
      data: [12.21, 15.58, 11.25, 8.32],
      backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745'],
      // data: datas,
      // backgroundColor: color,
    }],
  },
});

// var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
// var yValues = [55, 49, 44, 24, 15];
// var barColors = [
//   "#b91d47",
//   "#00aba9",
//   "#2b5797",
//   "#e8c3b9",
//   "#1e7145"
// ];

// new Chart("myChart", {
//   type: "pie",
//   data: {
//     labels: xValues,
//     datasets: [{
//       backgroundColor: barColors,
//       data: yValues
//     }]
//   },
//   options: {
  //     title: {
//       display: true,
//       text: "World Wide Wine Production 2018"
//     }
//   }
// });


// let obj =  [{"key " : "value"},{"key1" : "value2"}]

// let arr1 = []
// let arr2 = []

// for (let i = 0; i < obj.length; i++) {
//   console.log(obj[i]);

// }
// let object = [
//     {
//     complainType : "Electricity",
//     numberOfComplain : 2
//   },
//   {
//     complainType : "Sewerage",
//     numberOfComplain : 2
//   },
//   {
//     complainType : "Water",
//     numberOfComplain : 2
//   },
//   {
//     complainType : "Internet",
//     numberOfComplain : 2
//   },
// ]