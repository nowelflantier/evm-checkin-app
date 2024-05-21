// app/api/events/[eventId]/checkin/route.js

import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
  const { eventId } = params;
  const { participantId } = await request.json();
  const token = request.headers.get('authorization').split(' ')[1];

  const response = await fetch(`https://api.eventmaker.io/v1/events/${eventId}/checkin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ uid: participantId }),
  });

  if (response.ok) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
