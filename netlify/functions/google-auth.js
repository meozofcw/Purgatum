const fetch = require('node-fetch');

exports.handler = async (event) => {
  const { code } = JSON.parse(event.body);
  
  const params = new URLSearchParams();
  params.append('code', code);
  params.append('client_id', process.env.GOOGLE_CLIENT_ID);
  params.append('client_secret', process.env.GOOGLE_CLIENT_SECRET);
  params.append('redirect_uri', 
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8888/auth/google/callback'
      : 'https://seusite.netlify.app/auth/google/callback'
  );
  params.append('grant_type', 'authorization_code');

  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify(await response.json())
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Falha na autenticação' })
    };
  }
};
