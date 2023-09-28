import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { useEffect, useState } from "react";
import axiosApi from "../api/axiosApi";
import enIN from "date-fns/locale/en-IN";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../css/CalendarView.css"

const CalendarView = () => {
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
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
                        "https://api.calendly.com/users/b3d6e5eb-38b0-44ea-8973-19ae581042e6",
                },
            });

            const responseCollection = response.data.collection;
            const mappedEvents = responseCollection.map((event) => ({
                start: new Date(event.start_time),
                end: new Date(event.end_time),
                title: event.name,
            }));

            setEvents(mappedEvents);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSelectDate = (newDate) => {
        setSelectedDate(new Date(newDate))
    }

    return (
        <>
            {events.length && (
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
                        />
                    </div>
                    <div className="monthly-calendar">
                        <Calendar
                            localizer={localizer}
                            defaultView="month"
                            views={['month']}
                            onNavigate={handleSelectDate}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default CalendarView;
