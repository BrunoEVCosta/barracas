function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  let clientAuth={client_id:profile.getId()}
  //init(clientAuth)
  var googleAPI=gapi
}

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
function init(clientAuth) {
  gapi.load('auth2', function() {
    /* Ready. Make a call to gapi.auth2.init or some other API */
    gapi.auth2.init(clientAuth).then(onInit, onError)
    function onInit(g){
      console.log(g)
    }
    function onError(err){
      console.log(err)
//      document.location.reload() //or to "/"
    }


  });
}
$('document').ready(()=>{




})