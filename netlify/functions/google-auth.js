exports.handler = async (event) => {
    const { code } = event.queryStringParameters;
    
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
            throw new Error(data.error || 'Falha na autenticação');
        }

        // Obter informações do usuário
        const userInfo = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                'Authorization': `Bearer ${data.access_token}`
            }
        });

        const user = await userInfo.json();

        return {
            statusCode: 200,
            body: JSON.stringify({
                access_token: data.access_token,
                user: user
            })
        };
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: error.message })
        };
    }
};
