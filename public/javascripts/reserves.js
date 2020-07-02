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
			data.id=row.find("td#reservaId").text()
			data.nome=row.find("td#nome").text()
			data.valor=row.find("td#valor").text()
			$.ajax({
				type:"POST",
				url:"/alterar/reserva/datas",
				data:data,
				dataType:'json',
		        success: function(data,textStatus,jqXHR){
					row.prop("editing",false)
					row.find(".date").attr('readonly',true)
					that.text("editar")
					that.removeClass("btn-success")
					that.addClass("btn-primary")		        	
		        },
		        error: function(err){
		          let erro=$(".alert.erro:nth(0)").clone()
		          erro.removeClass("d-none")
		          $("table").append(erro)
		          console.log("err")
		          console.log(err)
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