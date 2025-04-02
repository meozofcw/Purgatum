// google-auth.js
exports.handler = async (event) => {
  // No Netlify Functions, não precisamos do require('node-fetch')
  // pois o ambiente já tem fetch disponível globalmente
  
  const { code } = JSON.parse(event.body);
  
  const params = new URLSearchParams();
  params.append('code', code);
  params.append('client_id', process.env.GOOGLE_CLIENT_ID);
  params.append('client_secret', process.env.GOOGLE_CLIENT_SECRET);
  params.append('redirect_uri', process.env.GOOGLE_REDIRECT_URI);
  params.append('grant_type', 'authorization_code');

  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error_description || 'Falha na autenticação com Google');
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message })
    };
  }
};
