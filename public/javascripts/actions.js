$(document).ready(function(){

	//Deprecated
	$('.alugar .btn').click(function(){
		var tent=$(this).closest('.collapse').prev('button.tent')
		var tentId=tent.attr('id');
		var price=$(this).attr('price')
		var collapse=$(this).closest('.collapse')
		var dialog=confirm("Quer alugar a barraca "+tent.html()+" por "+price+"€?")
		if (dialog== true){
			$.get("/alugar/barraca/"+tentId+"?price="+encodeURI(price), function(data){
					collapse.removeClass('show')
					tent.attr('rented','true')
				}
			)
		}else{
			collapse.removeClass('show')
		}
	})

	//deprecated
	$('.alugar input#otherValue').change(function(){
		var price = $(this).val()
		$(this).next().next().attr('price',price);
	})

	//deprecated
	$('.reservar .btn').click(function(){

		var now=nowDate();
		var tent=$(this).closest('.collapse').prev('button.tent')
		var tentId=tent.attr('id');
		var collapse=$(this).closest('.collapse')
		$('.modal#reserveTent .date#startDate').val(now)
		$('.modal#reserveTent .date#endDate').val(now)
		console.log(tentId)
		$('.modal#reserveTent input.id').val(tentId)
		$('.modal#reserveTent').modal('show');
		
		$('.modal#reserveTent button.reservar').click(function(){
			var name=$('.modal#reserveTent input#name').val()
			var startDate=$('.modal#reserveTent .date#startDate').val()
			var endDate=$('.modal#reserveTent .date#endDate').val()
			var price=$('.modal#reserveTent input#price').val()
			$.get("/reservar/barraca/"+tentId+"?name="+name+"&startDate="+startDate+"&endDate="+endDate+"&price="+encodeURI(price), function(data){
					$('.modal#reserveTent').modal('hide');
					collapse.removeClass('show')
					tent.attr('reserved','true')
				}
			)
		})		


	})

	//deprecated
	$('.modal .predefined-values .btn').click(function(){
		var price=$(this).attr('price');
		$(this).closest('.form-group').prev().prev().find('input#price').val(price)
	})

	//moved
	function nowDate(){
	  let d=new Date();
	  let yyyy=d.getFullYear()
	  let mm=pad(d.getMonth()+1,2)
	  let dd=pad(d.getDate(),2)  
	  return yyyy+"-"+mm+"-"+dd
	}

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


