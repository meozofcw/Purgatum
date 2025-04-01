// netlify/functions/auth.js
exports.handler = async (event) => {
    const { code, provider } = event.queryStringParameters;
    
    if (provider === 'google') {
        const response = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: 'https://purgatumrpg.netlify.app/auth/callback',
                grant_type: 'authorization_code'
            })
        });
        return { statusCode: 200, body: JSON.stringify(await response.json()) };
    }
    
    // Adicione aqui o tratamento para Discord...
};