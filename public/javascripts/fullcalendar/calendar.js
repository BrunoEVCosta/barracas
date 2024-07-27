document.addEventListener('DOMContentLoaded', function() {
  let espaco=$("#calendar").attr("espaco")
  let now=new Date()
  let anoCorrente=now.getFullYear()
  $.get(`/relatorios/reservas/${anoCorrente}/00/${espaco}`,function(data){
  	let reservas=[]
  	var rows=data.dados.rows
  	rows.forEach(function(row){
		var daysToAdd = 1;
		// Milliseconds in a day
		var millisecondsInDay = 1000 * 60 * 60 * 24;
		// Add milliseconds for the desired days
		var newDateInMilliseconds = new Date(row.fimLong).getTime() + (daysToAdd * millisecondsInDay);
		// Create a new Date object with the modified milliseconds
		var newEnd = new Date(newDateInMilliseconds);
  		reservas.push({
  			title: row.nome,
  			start: new Date(row.inicioLong).toLocaleDateString("ko-KR",{ year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/. /g,"-").replace(".",""),
  			end: newEnd.toLocaleDateString("ko-KR",{ year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/. /g,"-").replace(".","")
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