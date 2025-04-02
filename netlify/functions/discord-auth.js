const fetch = require('node-fetch');

exports.handler = async (event) => {
    const { code } = JSON.parse(event.body);
    
    try {
        const params = new URLSearchParams();
        params.append('client_id', process.env.DISCORD_CLIENT_ID);
        params.append('client_secret', process.env.DISCORD_CLIENT_SECRET);
        params.append('grant_type', 'authorization_code');
        params.append('code', code);
        params.append('redirect_uri', process.env.DISCORD_REDIRECT_URI);
        params.append('scope', 'identify email');
        
        const response = await fetch('https://discord.com/api/oauth2/token', {
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
            body: JSON.stringify({ error: 'Falha na autenticação com Discord' })
        };
    }
};
