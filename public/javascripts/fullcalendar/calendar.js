document.addEventListener('DOMContentLoaded', function() {
  let espaco=$("#calendar").attr("espaco")
  let now=new Date()
  let anoCorrente=now.getFullYear()
  $.get(`/relatorios/reservas/${anoCorrente}/00/${espaco}`,function(data){
  	let reservas=[]
  	var rows=data.dados.rows
  	rows.forEach(function(row){
  		reservas.push({
  			title: row.nome,
  			start: new Date(row.inicioLong).toLocaleDateString("ko-KR",{ year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/. /g,"-").replace(".",""),
  			end: new Date(row.fimLong).toLocaleDateString("ko-KR",{ year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/. /g,"-").replace(".","")
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