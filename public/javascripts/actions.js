$(document).ready(function(){

	$('.aluguar .btn').click(function(){
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

	$('.alugar input#otherValue').change(function(){
		var price = $(this).val()
		$(this).next().next().attr('price',price);
	})

	$('.reservar .btn').click(function(){
		var now=nowDate();
		$('.modal#reserveTent .date#startDate').val(now)
		$('.modal#reserveTent .date#endDate').val(now)
		console.log(now)
		$('.modal#reserveTent').modal('show');
			
	})

	function nowDate(){
	  let d=new Date();
	  let yyyy=d.getFullYear()
	  let mm=pad(d.getMonth()+1,2)
	  let dd=pad(d.getDate(),2)  
	  return yyyy+"-"+mm+"-"+dd
	}

	function pad(num, size) {
	    var s = num+"";
	    while (s.length < size) s = "0" + s;
	    return s;
	}
})