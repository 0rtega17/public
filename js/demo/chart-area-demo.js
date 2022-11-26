// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase, set, ref, push, child, onValue, get } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";

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
let times = []; // time array
firebase.database().ref('All Ride Requests').once('value',
  function (AllRecords) {
    AllRecords.forEach(
      function (CurrentRecord) {
        let date = new Date(CurrentRecord.val().time);
        // let date1 = new Date(); // if wanted to show daily hour basis
        // if (date1.getDate() == date.getDate()) {
        let hours = date.getHours() % 12;
        hours = hours ? hours : 12;
        const time1 = date.getHours() < 12 ? 'AM' : 'PM'; // Set AM/PM
        times.push(hours + ":00 " + time1);
        // }
      }
    );
    const showtime = [];
    for (let i = 7; i < 23; i++) {
      const time = i < 12 ? 'AM' : 'PM';
      showtime.push((i % 12) + ":00 " + time);
    }
    let map = times.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    let map2 = showtime.reduce((acc, e) => acc.set(e, (acc.get(e) || 0)), new Map());
    map2.forEach((v, k) => {
      if (map.get(k) == null) return;
      map2.set(k, map.get(k));
    });
    // Set new default font family and font color to mimic Bootstrap's default styling
    Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = '#858796';

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

    // Area Chart Example
    var ctx = document.getElementById("myAreaChart");
    var myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [...map2.keys()],
        datasets: [{
          label: "Bookings",
          lineTension: 0.3,
          backgroundColor: "rgba(78, 115, 223, 0.05)",
          borderColor: "#F3D849",
          pointRadius: 3,
          pointBackgroundColor: "#CAB12D",
          pointBorderColor: "#CAB12D",
          pointHoverRadius: 3,
          pointHoverBackgroundColor: "#F1E49C",
          pointHoverBorderColor: "#F1E49C",
          pointHitRadius: 10,
          pointBorderWidth: 2,
          data: [...map2.values()],
        }],
      },
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
              unit: 'date',
              
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
             // maxTicksLimit: 7,
              fontSize: 12,
              fontFamily: 'Montserrat'
            },
            scaleLabel: {
              display: true,
              labelString: 'Time',
              fontStyle: "bold",
              fontFamily: 'Montserrat',
              fontSize:15,

            },
            
          }],
          yAxes: [{
            ticks: {
              maxTicksLimit: 5,
              padding: 10,
              fontFamily: 'Montserrat',
              // Include a dollar sign in the ticks
              callback: function (value, index, values) {
                return number_format(value);
              }
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
          display: false
        },
        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          titleMarginBottom: 10,
          titleFontColor: '#6e707e',
          titleFontSize: 14,
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          titleFontFamily: 'Montserrat',
          bodyFontFamily: 'Montserrat',
          intersect: false,
          mode: 'index',
          caretPadding: 10,
          callbacks: {
            label: function (tooltipItem, chart) {
              var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
              return datasetLabel + ':' + number_format(tooltipItem.yLabel);
            }
          }
        }
      }
    });

  });

