// File: netlify/functions/run-code.js

exports.handler = async function (event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Get the code from the user's request
  const { language_id, source_code } = JSON.parse(event.body);
  const apiKey = process.env.RAPIDAPI_KEY; // Get the key from a secure variable

  // The options for the Judge0 API
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
    },
    body: JSON.stringify({
      language_id: language_id,
      source_code: source_code // It's already base64 encoded from the frontend
    })
  };

  try {
    const response = await fetch('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*', options);
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch from API' })
    };
  }
};