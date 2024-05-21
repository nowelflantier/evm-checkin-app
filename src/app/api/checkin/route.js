export async function POST(request) {
    const { token, checkpointId, uid, eventId } = await request.json();
    const response = await fetch(`https://app.eventmaker.io/api/v1/events/${eventId}/access_controls.json?auth_token=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_control: {
          guest_uid: uid,
          accesspoint_id: checkpointId,
        },
      }),
    });
  
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      const accessStatus = result.access_status;
  
      if (accessStatus === 0) {
        return new Response(JSON.stringify({ message: 'Checkin successful', status: 0 }), {
          headers: { 'Content-Type': 'application/json' },
        });
      } else if (accessStatus === 2) {
        return new Response(JSON.stringify({ message: 'Access denied', status: 2 }), {
          headers: { 'Content-Type': 'application/json' },
        });
      } else if (accessStatus === 3) {
        return new Response(JSON.stringify({ message: 'Too many access', status: 3 }), {
          headers: { 'Content-Type': 'application/json' },
        });
      } 
       else {
        return new Response(JSON.stringify({ message: 'Unexpected response', status: accessStatus }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } else {
      return new Response(JSON.stringify({ message: 'Checkin failed', status: response.status }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
  