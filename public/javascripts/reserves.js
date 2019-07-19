$(document).ready(function(){

	$("table.report.reserves tr").click(function(){
		$(this).find("td.editar").toggleClass("d-none")
	})
})