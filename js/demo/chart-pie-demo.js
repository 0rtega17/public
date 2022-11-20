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

let passengersCount = 0;
let driversCount = 0;

// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';


firebase.database().ref('passengers').once('value',
  function (AllRecords) {
    AllRecords.forEach(
      function (CurrentRecord) {
        passengersCount++;
      }
    );

    firebase.database().ref('drivers').once('value',
      function (AllRecords) {
        AllRecords.forEach(
          function (CurrentRecord) {
            driversCount++;
          }
        );
        showPieData(passengersCount, driversCount);
      });
  });

function showPieData(passengersCount, driversCount) {
  var ctx = document.getElementById("myPieChart");
  var myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ["Passenger", "Drivers"],
      datasets: [{
        data: [passengersCount, driversCount],
        backgroundColor: ['#F3D849', '#CAB12D'],
        hoverBackgroundColor: ['#F8D108', '#C8A800'],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
        labels:"lets test out",
      }],
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
      },
      legend: {
        position: 'top',
      },
      cutoutPercentage: 50,
    },
  });
}


