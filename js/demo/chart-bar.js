// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase, set, ref, push, child, onValue, get } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
//import "https://www.jsdelivr.com/package/npm/chartjs-plugin-datalabels";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYLfR72YvVWK7NKuYv0i8cZLeOyky_2UI",
  authDomain: "e-hatid-ac4b8.firebaseapp.com",
  databaseURL: "https://e-hatid-ac4b8-default-rtdb.firebaseio.com",
  projectId: "e-hatid-ac4b8",
  storageBucket: "e-hatid-ac4b8.appspot.com",
  messagingSenderId: "151893715495",
  appId: "1:151893715495:web:c66ce45a224b36f0113c02",
  measurementId: "G-K4WTYXS330"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

var times = []; // time array
let maxtimes = 0;
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
firebase.database().ref('All Ride Requests').once('value',
  function (AllRecords) {
    AllRecords.forEach(
      function (CurrentRecord) {
        let date = new Date(CurrentRecord.val().time);
        let date1 = new Date();
        if (date1.getMonth() == date.getMonth()) {
          times.push(date.getDate() +" "+ monthNames[date.getMonth()]);
          maxtimes++;
        }
      }
    );
    const map = times.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    // Set new default font family and font color to mimic Bootstrap's default styling
    //Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = '#858796';
    //Chart.register(ChartDataLabels);

    function number_format(number, decimals, dec_point, thousands_sep) {
      // *     example: number_format(1234.56, 2, ',', ' ');
      // *     return: '1 234,56'
      number = (number + '').replace(',', '').replace(' ', '');
      var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
          var k = Math.pow(10, prec);
          return '' + Math.round(n * k) / k;
        };
      // Fix for IE parseFloat(0.55).toFixed(0) = 0;
      s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
      if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
      }
      if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
      }
      return s.join(dec);
    }

    // Bar Chart Example
    var ctx = document.getElementById("myBarChart2");
    
    var myBarChart = new Chart(ctx, {
      
      type: 'bar',
      data: {
        labels: [...map.keys()],
        datasets: [{
          label: "Bookings ",
          backgroundColor: "#F3D849",
          hoverBackgroundColor: "#F1E49C",
          borderColor: "#F3D849",
          data: [...map.values()],
        }],
      },
     animation: {
        duration: 1,
        onComplete: function () {
            var chartInstance = this.chart,
                ctx = chartInstance.ctx;
            ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';

            this.data.datasets.forEach(function (dataset, i) {
                var meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach(function (bar, index) {
                    var data = dataset.data[index];
                    ctx.fillText(data, bar._model.x, bar._model.y - 5);
                });
            });
        }
    },
     plugins: [ChartDataLabels],
      options: {
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 10,
            right: 25,
            top: 25,
            bottom: 0
          }
        },
        scales: {
          xAxes: [{
            time: {
              unit: 'Daily',
              
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
              //maxTicksLimit: 6
              fontFamily: 'Montserrat',
            },
            scaleLabel: {
              display: true,
              labelString: 'Date',
              fontStyle: "bold",
              fontFamily: 'Montserrat',
              fontSize:15,

            },
            maxBarThickness: 25,
          }],
          yAxes: [{
            ticks: {
              min: 0,
             // max: maxtimes,
              max: 40,
              maxTicksLimit: 5,
              padding: 10,
              fontFamily: 'Montserrat',
              // Include a dollar sign in the ticks
              callback: function (value, index, values) {
                return number_format(value);
              },
            
            },
            gridLines: {
              color: "rgb(234, 236, 244)",
              zeroLineColor: "rgb(234, 236, 244)",
              drawBorder: false,
              borderDash: [2],
              zeroLineBorderDash: [2]
            },
            scaleLabel: {
              display: true,
              labelString: 'Bookings',
              fontStyle: "bold",
              fontFamily: 'Montserrat',
              fontSize:15,

            },
          }],
          
        },
        
        legend: {
          display: true
        },
        tooltips: {
          titleMarginBottom: 10,
          titleFontColor: '#6e707e',
          titleFontSize: 14,
          titleFontFamily: 'Montserrat',
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          bodyFontFamily: 'Montserrat',
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          caretPadding: 10,
          callbacks: {
            label: function (tooltipItem, chart) {
              var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
              return datasetLabel + number_format(tooltipItem.yLabel);
            }
          }
        },

        plugins: {
          datalabels: {
             // anchor: 'end',
            //  align: 'top',
            //  formatter: Math.round,
              font: {
                  weight: 'bold'
              }
          }
      }
        
      },
      
      

    });
   
  });
