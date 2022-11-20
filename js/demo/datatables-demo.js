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

  var dataSet = [];
  firebase.database().ref('All Ride Requests').once('value',
  function(AllRecords)
  {
      AllRecords.forEach(
          function(CurrentRecord){
              var passengersName = CurrentRecord.val().name;
              var driversName = CurrentRecord.val().driverName;
              var time = CurrentRecord.val().time;
              var fareAmount = CurrentRecord.val().fareAmount;
              var status = CurrentRecord.val().status;
              
              var pID = CurrentRecord.key;
             AddItemsToTable(passengersName, driversName, time, fareAmount, status, pID);

             dataSet.push(AddItemsToTable);
     
    $(document).ready(function() {
      $('#dataTable').DataTable({
        data: dataSet,
        columns: [
            { title: passengersName },
            { title: driversName },
            { title: time },
            { title: fareAmount },
            { title: status },
            { title: pID },
        ],
    });
    });

}
);
});

