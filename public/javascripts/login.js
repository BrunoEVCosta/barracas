function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  let clientId={client_id:googleUser.getAuthResponse().id_token}
  
  verifyGoogleUser(clientId)
  
}

  function signOut() {
    //this might require loading auth2 module.
    //gapi.load('auth2') then test this.
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }



  function verifyGoogleUser(clientId){
    $.ajax({
      url:"/login/verify/google-token",
      method:"POST",
      data:clientId,
      success:function(data,textStatus,jqXHR){
        let alert=document.createElement("div")
        alert.classList="alert alert-danger"
        alert.getAttribute("role","alert")
        alert.textContent=data
        $('body').prepend(alert)
        if(data=="Logged in! Reload page!"){
          document.location.reload()
        }


      },
      error:function(jqXHR,textStatus,error){
        console.log(error)
      }
    })
  }



