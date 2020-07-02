$(document).ready(function(){

	$("table.report.reserves tr").click(function(){
	    let that = $(this)
	    let editing=that.prop("editing")
	    if(! editing) 
	    	that.find("td.funcoes").toggleClass("d-none")
	})
	$("table.report.reserves button.editar").click(function(){
		let that = $(this)
		let row= that.closest("tr")
		if(that.text()=="modificar"){
			data={}
			row.find(".date").each(function(){
				data[$(this).attr("name")]=$(this).val()
			})
			data.id=row.find("data")
			$.post({
				url:"/alterar/reserva/datas",
				data:dates,
				dataType:'json',
				success:function(data){
					console.log(data)
				}
				})
		}else{
			row.prop("editing",true)
			row.find(".date").attr('readonly',false)
			that.text("modificar")
			that.removeClass("btn-primary")
			that.addClass("btn-success")
		}
	})



})