    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
    import { getDatabase, set, ref ,push, child, onValue, get} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
    import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
  
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
    const auth = getAuth(app);
      
    submit.addEventListener('click',(e) => {
      var firstName = document.getElementById('first_name').value;  
      var lastName = document.getElementById('last_name').value;  
      var email = document.getElementById('email').value; 
      var username = document.getElementById('username').value;  
      var password = document.getElementById('password').value;
      var birthdate = document.getElementById('date').value;
      var mobileNumber = document.getElementById('mobileNumber').value;    
  
          createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
  
          set(ref(database, 'passengers/' + user.uid),{
              first_name: firstName,
              last_name: lastName,
              email: email,
              username: username,
              password: password,
              birthdate: birthdate,
              phoneNum: mobileNumber,
              lifePoints: 3,
              
          })
  
          alert('user created!');
          document.getElementById("formReg").reset();
          $("#Registration").modal('hide');
          // ...
          })
          .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
  
          alert(errorMessage);
          // ..
          });
    });
 
 
 /*
    submitData.addEventListener('click',(e) => {
     var firstName = document.getElementById('first_name').value;  
     var lastName = document.getElementById('last_name').value;  
     var email = document.getElementById('email').value; 
     var username = document.getElementById('username').value;  
     var username = document.getElementById('plateNumber').value;  
     var password = document.getElementById('password').value;    
 
         createUserWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
         // Signed in 
         const user = userCredential.user;
 
         set(ref(database, 'drivers/' + user.uid),{
             first_name: firstName,
             last_name: lastName,
             email: email,
             username: username,
             password: password,
             plateNum: plateNumber,
         })
 
         alert('user created!');
         window.location.href="ManageDriver.html";
         // ...
         })
         .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
 
         alert(errorMessage);
         // ..
         });
   });
  */