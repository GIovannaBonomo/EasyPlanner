import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Container } from 'react-bootstrap'
import itLocale from '@fullcalendar/core/locales/it'
import { useEffect, useState } from 'react'
import NewAppointment from '../components/NewAppointment'
import { getAppointment, putAppointment } from '../../data/appointments'
import EditAppointment from '../components/EditAppointment'

function Home() {

  const [showModal, setShowModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState({ start: null, end: null });
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appointment, setAppointment] = useState([]);
  const [selectAppointments, setSelectAppointments] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);


  async function fetchAppointments() {
    try {
      const data = await getAppointment();
      const mapEvents = data.map((appointment) => ({
        id: appointment._id,
        title: appointment.service?.name || 'Appuntamento',
        start: appointment.start,
        end: appointment.end,
        client: appointment.client,
        service: appointment.service,
        notes: appointment.notes,
        extendedProps: appointment,
      }));
      setEvents(mapEvents);
      setLoading(false);
    } catch (error) {
      console.error('Errore nel recupero appuntamenti', error);
    }
  }
  useEffect(() => {
    fetchAppointments();
  }, []);

 const handleEventClick = (clickInfo) => {
  const appointment = events.find(
    (event) => event.id === clickInfo.event.id
  );

  setSelectAppointments(appointment);
  setShowEditModal(true);
}



  return (
    <Container className="mb-5">
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
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
        eventClick={handleEventClick}
        locale={itLocale}
        weekends={false}
        editable={true}     // drag & drop eventi
        selectable={true}   // selezione range orario
        height="auto"
        loading={function (isLoading) { if (!isLoading) setLoading(false); }}

        select={(info) => {
          const start = info.start;
          const end = info.end;
          const date = start.toISOString().split('T')[0]; // estrai la data in formato YYYY-MM-DD
          const startTime = new Date(date + 'T' + start.toTimeString().slice(0, 5));  // combina data e ora di inizio
          const endTime = new Date(date + 'T' + end.toTimeString().slice(0, 5));      // combina data e ora di fine
          setSelectedTime({ date, startTime, endTime });  // salva il tempo selezionato
          setShowModal(true);              // apre il modal
        }}

      />
      <NewAppointment
        show={showModal}
        onClose={() => setShowModal(false)}
        preselectedTime={selectedTime}
        onCreated={fetchAppointments}
      />

      <EditAppointment
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        selectAppointment={selectAppointments}
        onUpdated={fetchAppointments}
      />

    </Container>
  )
}

export default Home;