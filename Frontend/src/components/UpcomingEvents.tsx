import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "./UpcomingEvents.css";

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  poster?: string;
}

const UpcomingEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const eventsList = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            date: data.date,
            location: data.location,
            description: data.description,
            poster: data.poster,
          };
        });

        // Filter out past events
        const currentDate = new Date();
        const upcomingEvents = eventsList.filter(event => new Date(event.date) >= currentDate);
        setEvents(upcomingEvents);
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="upcoming-events-container">
      <h2>Upcoming Events</h2>
      <div className="events-list">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="event-card">
              <h3>{event.title}</h3>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p>{event.description}</p>
              {event.poster && <img src={event.poster} alt={`${event.title} poster`} className="event-poster" />}
            </div>
          ))
        ) : (
          <p>No upcoming events found.</p>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;