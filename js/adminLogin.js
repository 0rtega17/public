var firebaseConfig = {
    apiKey: "AIzaSyAYLfR72YvVWK7NKuYv0i8cZLeOyky_2UI",
    authDomain: "e-hatid-ac4b8.firebaseapp.com",
    databaseURL: "https://e-hatid-ac4b8-default-rtdb.firebaseio.com",
    projectId: "e-hatid-ac4b8",
    storageBucket: "e-hatid-ac4b8.appspot.com",
    messagingSenderId: "151893715495",
    appId: "1:151893715495:web:c66ce45a224b36f0113c02",
    measurementId: "G-K4WTYXS330"
};

firebase.initializeApp(firebaseConfig);


tryBtn.addEventListener('click', (e) => {

firebase.database().ref('adminPassword/').once('value', 
function(snapshot) {
   
 var pass = snapshot.val().password;

 var username=document.getElementById("username").value;
  var password=document.getElementById("password1").value;
  
  if(username=="admin" && password==pass){
    swal({
      title: "Login Successful!.",
      text: "Welcome to the Admin Pane!",
      icon: "success",
      timer: 2000,
      showConfirmButton: false
      //button: "Try again",
    }).then(function() {
      window.location = "dashboard.html";
  });
        //return false;
}
  else if(username=="")
  {
    swal({
      title: "Enter a username",
      text: "Please enter the right credentials!",
      icon: "error",
      timer: 2000,
      showConfirmButton: false
      //button: "Try again",
    })
  }
  else if(password=="")
  {
    swal({
      title: "Enter a password",
      text: "Please enter the right credentials!",
      icon: "error",
      timer: 2000,
      showConfirmButton: false
      //button: "Try again",
    })
  }

  else
  {
        swal({
          title: "Login Failed.",
          text: "Please check your username and password.",
          icon: "error",
          timer: 2000,
          showConfirmButton: false
          //button: "Try again",
        }).then(function() {
          window.location = "index.html";
      });
  }

    

});
});

