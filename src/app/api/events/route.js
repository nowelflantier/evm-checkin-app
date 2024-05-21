// app/api/events/route.js

export async function POST(request) {
  const { token } = await request.json();
  const response = await fetch(`https://app.eventmaker.io/api/v1/events.json?per_page=10&checkin_app=true&auth_token=${token}&search=sandbox`);
  const data = await response.json();
  return new Response(JSON.stringify({ events: data }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
