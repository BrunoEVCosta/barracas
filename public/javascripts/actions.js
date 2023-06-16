$(document).ready(function(){
	//moved
	function pad(num, size) {
	    var s = num+"";
	    while (s.length < size) s = "0" + s;
	    return s;
	}

	$('button.copyText').click(function(){
		copyToClipboard()
	})

	function copyToClipboard() {
	  /* Get the text field */
	  var copyText = $("input");
	  /* Select the text field */
	  copyText.select();
	  /* Copy the text inside the text field */
	  document.execCommand("copy");
	  /* Alert the copied text */
	  alert("Copied the text: " + copyText.val());
	}
})


