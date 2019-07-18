var calendar
document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  calendar = new FullCalendar.Calendar(calendarEl, {
  	plugins:['dayGrid'],
	events: '/calendar',
   failure: function() {
        alert('there was an error while fetching events!');
      }
  });
  calendar.render();


});