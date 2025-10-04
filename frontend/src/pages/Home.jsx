import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Container } from 'react-bootstrap'
import itLocale from '@fullcalendar/core/locales/it' 

function Home() {

 const events = [
    { title: 'Meeting', start: '2025-10-06T09:00:00', end: '2025-10-06T10:30:00' },
    { title: 'Pranzo', start: '2025-10-07T12:00:00', end: '2025-10-07T13:00:00' }
  ];

    return (
          <Container className="mb-5">
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"  // settimana con fasce orarie
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridDay,timeGridWeek' // switch tra giorno e settimana
        }}
        slotMinTime="08:00:00"
        slotMaxTime="18:00:00"
        slotDuration="00:30:00"
        allDaySlot={false}  // nasconde slot "tutto il giorno"
        events={events}
        locale={itLocale}
        weekends={false}
        editable={true}     // drag & drop eventi
        selectable={true}   // selezione range orario
        select={(info) => {
          const title = prompt('Nome evento:');
          if (title) {
            info.view.calendar.addEvent({
              title,
              start: info.start,
              end: info.end,
              allDay: false
            });
          }
        }}
      />
    </Container>
    )
}

export default Home