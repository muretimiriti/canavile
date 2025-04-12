import React, { useEffect, useState } from "react";
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../firebase";
import "./Events.css";

interface Event {
  id?: string;
  title: string;
  date: string;
  location: string;
  description: string;
  poster?: string;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [formData, setFormData] = useState<Event>({
    title: "",
    date: "",
    location: "",
    description: "",
  });
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  // Fetch events in real-time
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "events"), (snapshot) => {
      setEvents(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Event[]);
    });
    return () => unsubscribe();
  }, []);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle poster file input change
  const handlePosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPosterFile(e.target.files[0]);
    }
  };

  // Upload poster to Firebase Storage and get the download URL
  const uploadPoster = async (file: File) => {
    const storage = getStorage();
    const storageRef = ref(storage, `posters/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  // Add new event
  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.location || !formData.description) {
      alert("All fields are required.");
      return;
    }
    try {
      let posterUrl = "";
      if (posterFile) {
        posterUrl = await uploadPoster(posterFile);
      }
      await addDoc(collection(db, "events"), { ...formData, poster: posterUrl });
      setFormData({ title: "", date: "", location: "", description: "" });
      setPosterFile(null);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  // Edit event (load data into form)
  const handleEditEvent = (event: Event) => {
    setFormData(event);
    setEditingEventId(event.id || null);
  };

  // Update event
  const handleUpdateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEventId) return;

    try {
      let posterUrl = formData.poster || "";
      if (posterFile) {
        posterUrl = await uploadPoster(posterFile);
      }
      const eventRef = doc(db, "events", editingEventId);
      await updateDoc(eventRef, { ...formData, poster: posterUrl });
      setEditingEventId(null);
      setFormData({ title: "", date: "", location: "", description: "" });
      setPosterFile(null);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  // Delete event
  const handleDeleteEvent = async (eventId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "events", eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="events-container">
      <h2>Manage Events</h2>

      <form onSubmit={editingEventId ? handleUpdateEvent : handleAddEvent} className="event-form">
        <input type="text" name="title" placeholder="Event Title" value={formData.title} onChange={handleChange} required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
        <textarea name="description" placeholder="Event Description" value={formData.description} onChange={handleChange} required />
        <input type="file" name="poster" accept="image/*" onChange={handlePosterChange} />
        <button type="submit">{editingEventId ? "Update Event" : "Add Event"}</button>
        {editingEventId && <button type="button" onClick={() => setEditingEventId(null)}>Cancel</button>}
      </form>

      <div className="events-list">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <h3>{event.title}</h3>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p>{event.description}</p>
            {event.poster && <img src={event.poster} alt={`${event.title} poster`} className="event-poster" />}
            <div className="event-actions">
              <button onClick={() => handleEditEvent(event)}>Edit</button>
              <button onClick={() => handleDeleteEvent(event.id!)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;