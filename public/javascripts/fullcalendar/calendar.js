document.addEventListener('DOMContentLoaded', function() {
  $.get("/relatorios/reservas/2019/08/35",function(data){
  	let reservas=[]
  	var rows=data.dados.rows
  	rows.forEach(function(row){
  		reservas.push({
  			title: row.nome,
  			start: new Date(row.inicio).toLocaleDateString("ko-KR",{ year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/. /g,"-").replace(".",""),
  			end: new Date(row.fim).toLocaleDateString("ko-KR",{ year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/. /g,"-").replace(".","")
  		})
  	})
  	console.log(reservas)
	var calendarEl =  document.getElementById('calendar');
	calendar = new FullCalendar.Calendar(calendarEl, {
	  plugins:['dayGrid'],
	  events: reservas,
		color: "black"
	});
	calendar.render();
  })	


});