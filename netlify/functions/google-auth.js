const fetch = require('node-fetch');

exports.handler = async (event) => {
    const { code } = JSON.parse(event.body);
    
    try {
        const params = new URLSearchParams();
        params.append('code', code);
        params.append('client_id', process.env.GOOGLE_CLIENT_ID);
        params.append('client_secret', process.env.GOOGLE_CLIENT_SECRET);
        params.append('redirect_uri', process.env.GOOGLE_REDIRECT_URI);
        params.append('grant_type', 'authorization_code');
        
        const response = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });
        
        const data = await response.json();
        
        return {
            statusCode: 200,
            body: JSON.stringify({
                access_token: data.access_token,
                expires_in: data.expires_in
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Falha na autenticação com Google' })
        };
    }
};
