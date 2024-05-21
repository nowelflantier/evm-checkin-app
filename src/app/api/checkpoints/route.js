// app/api/checkpoints/route.js

export async function POST(request) {
    const { token, eventId } = await request.json();
    const response = await fetch(`https://app.eventmaker.io/api/v1/events/${eventId}/accesspoints.json?auth_token=${token}&per_page=10`);
    const data = await response.json();
    console.log("Checkpoints Data: ", data); // Ajoute ceci pour voir la structure des données

    return new Response(JSON.stringify({ checkpoints: data }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  