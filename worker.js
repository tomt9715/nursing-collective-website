export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }

    // Only allow POST requests
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      // Get email from request body
      const { email } = await request.json();

      if (!email || !email.includes('@')) {
        return new Response(JSON.stringify({ error: 'Invalid email' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Subscribe to Mailchimp
      const serverPrefix = env.MAILCHIMP_API_KEY.split('-')[1]; // Extract server prefix (e.g., us18)
      const response = await fetch(`https://${serverPrefix}.api.mailchimp.com/3.0/lists/${env.MAILCHIMP_AUDIENCE_ID}/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(`anystring:${env.MAILCHIMP_API_KEY}`)}`
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed'
        })
      });

      const mcData = await response.json();

      if (!response.ok) {
        // Mailchimp returns 400 if email already subscribed - treat as success
        if (response.status === 400 && mcData.title === 'Member Exists') {
          console.log('Mailchimp: Email already subscribed');
          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            }
          });
        }
        console.error('Mailchimp error:', response.status, mcData);
        throw new Error(`Mailchimp API error: ${response.status}`);
      }

      // Log the successful response for debugging
      console.log('Mailchimp success response:', mcData);

      // Success!
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });

    } catch (error) {
      console.error('Worker error:', error.message);
      return new Response(JSON.stringify({ error: 'Subscription failed', details: error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
    }
  }
};
