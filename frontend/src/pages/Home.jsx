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
  const [selectAppointments, setSelectAppointments] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);


  async function fetchAppointments() {
    try {
      const data = await getAppointment();
      const mapEvents = data.map((appointment) => ({
        id: appointment._id,
        title: `${appointment.client?.name || 'Appuntamento'} - ${appointment.service?.name || ''}`,
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
  const handleSelect = (info) => {
    const dateStr = info.start.toISOString().split('T')[0];
    setSelectedTime({
      date: dateStr,
      startTime: info.start,
      endTime: info.end,
    });
    setShowModal(true);
  };

  return (
    <Container className="mb-5 background-color">
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
        eventDrop={async (info) => {
          try {
            const updatedAppointment = {
              ...info.event.extendedProps,
              start: info.event.start,
              end: info.event.end,
            };
            await putAppointment(info.event.id, updatedAppointment);
            fetchAppointments(); // ricarica gli eventi aggiornati
          } catch (error) {
            console.error("Errore aggiornando l'appuntamento", error);
            info.revert(); // riporta l'evento alla posizione originale se c'è errore
          }
        }}
        eventResize={async (info) => {
          try {
            const updatedAppointment = {
              ...info.event.extendedProps,
              start: info.event.start,
              end: info.event.end,
            };
            await putAppointment(info.event.id, updatedAppointment);
            fetchAppointments();
          } catch (error) {
            console.error("Errore aggiornando l'appuntamento", error);
            info.revert();
          }
        }}
        selectable={true}   // selezione range orario
        height="auto"
        loading={function (isLoading) { if (!isLoading) setLoading(false); }}
        select={handleSelect}
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