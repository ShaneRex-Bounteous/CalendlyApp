import { Button, Dialog } from "@mui/material";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import enIN from "date-fns/locale/en-IN";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axiosApi from "../api/axiosApi";
import "../css/CalendarView.css";

const CalendarView = () => {
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState(null)
    const locales = {
        "en-IN": enIN,
    };

    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axiosApi.get("/scheduled_events", {
                params: {
                    user:
                        `${process.env.REACT_APP_api_base_url}/users/${process.env.REACT_APP_uuid}`,
                },
            });

            const responseCollection = response.data.collection;
            const mappedEvents = []
            responseCollection.forEach(event => {
                const { start_time, end_time, name, event_guests } = event;

                const guests = event_guests.map((guest) => guest.email)

                mappedEvents.push({
                    start: new Date(start_time),
                    end: new Date(end_time),
                    title: name,
                    guests
                })
            });

            setEvents(mappedEvents);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSelectDate = (newDate) => {
        setSelectedDate(new Date(newDate))
    }

    const abbrDay = (date) => {
        return format(date, "EE", { locale: locales["en-IN"] })
    }

    return (
        <>
            <div className="add-event">
                <Button variant="contained">
                    New Event
                </Button>
            </div>
            {events.length > 0 && (
                <div className="container">
                    <div className="day-calendar">
                        <Calendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            defaultView="day"
                            views={['day']}
                            date={selectedDate}
                            titleAccessor={"title"}
                            scrollToTime={new Date()}
                            toolbar={true}
                            onSelectEvent={(event) => setSelectedEvent(event)}
                        />
                    </div>
                    <div className="monthly-calendar">
                        <Calendar
                            localizer={localizer}
                            defaultView="month"
                            views={['month']}
                            onNavigate={handleSelectDate}
                            dayPropGetter={(date) => ({
                                className: "custom-day-header",
                                children: abbrDay(date)
                            })}
                        />
                    </div>
                </div>
            )}
            {selectedEvent &&
                <Dialog
                    open={selectedEvent !== null}
                    onClose={() => setSelectedEvent(null)}
                >
                    <div className="event-details">
                        <h3 className="event-title">{selectedEvent?.title}</h3>
                        <p className="event-timing">{format(selectedEvent?.start, "dd/MM/yyyy HH:mm")} - {format(selectedEvent?.end, "dd/MM/yyyy HH:mm")}</p>
                        <p><strong>Meeting with: </strong></p>
                        <ul className="event-guests">
                            {selectedEvent?.guests.map((guest) => {
                                return (
                                    <li>{guest}</li>
                                )
                            })}
                        </ul>
                    </div>
                </Dialog>
            }

        </>
    );
};

export default CalendarView;
