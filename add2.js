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
    const db = getDatabase(app);
    const auth = getAuth(app);

      const firstName = document.getElementById('first_name').value;  
      const lastName = document.getElementById('last_name').value;  
      const email = document.getElementById('email').value; 
      const username = document.getElementById('username').value;  
      const password = document.getElementById('password').value;
      const birthdate = document.getElementById('date').value;
      const mobileNumber = document.getElementById('mobileNumber').value; 
   
      function RegisterUser()
      {
        const dbRef =ref(db);

        get(child(dbRef, "passengers/" + username.value)).then((snapshot)=>{
            if(snapshot.exists())
            {
                alert("Username Already Exists!")
            }
            else
            {
                set(ref(db, "passengers/"+ username.value),
                {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    username: username,
                    password: password,
                    birthdate: birthdate,
                    phoneNum: mobileNumber,
                    lifePoints: 3,
                })
                .then(()=>{
                    alert("Successfully Added!");
                })
                .catch((error)=>{
                    alert("Error!"+ error);
                })
            }
        })
      }
    
   submit.addEventListener('click', RegisterUser);