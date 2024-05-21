'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();
      console.log(data);
      setEvents(data.events);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  const handleSelectEvent = (eventId) => {
    localStorage.setItem('selected_event', eventId);
    router.push('/checkpoints');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Select an Event</h1>
      <ul>
        {events.map((event) => (
          <li key={event._id} onClick={() => handleSelectEvent(event._id)}>
            {event.title} - {event._id}
          </li>
        ))}
      </ul>
    </div>
  );
}
