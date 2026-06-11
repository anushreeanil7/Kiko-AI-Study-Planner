document.addEventListener('DOMContentLoaded', function () {

  const calendarEl = document.getElementById('calendar');

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',

    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },

    editable: true,
    selectable: true,

    dateClick: function(info) {
      const title = prompt("Enter task for this date:");
      if (title) {
        calendar.addEvent({
          title: title,
          start: info.dateStr
        });
      }
    }
  });

  calendar.render();
});