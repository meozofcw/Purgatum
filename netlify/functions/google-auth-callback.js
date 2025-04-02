exports.handler = async (event) => {
    const { code } = event.queryStringParameters;
    
    if (!code) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Código de autorização não fornecido" })
        };
    }

    try {
        // 1. Trocar código por token
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: 'https://purgatumrpg.netlify.app/.netlify/functions/google-auth-callback',
                grant_type: 'authorization_code'
            })
        });

        const tokenData = await tokenResponse.json();
        
        if (!tokenResponse.ok) {
            console.error('Erro no token:', tokenData);
            throw new Error(tokenData.error_description || 'Falha ao obter token');
        }

        // 2. Obter informações do usuário
        const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: { 'Authorization': `Bearer ${tokenData.access_token}` }
        });
        
        const userData = await userResponse.json();

        // 3. Redirecionar para página de sucesso
        return {
            statusCode: 302,
            headers: {
                'Location': `https://purgatumrpg.netlify.app/?user=${encodeURIComponent(JSON.stringify(userData))}`
            }
        };
        
    } catch (error) {
        console.error("Erro completo:", error);
        return {
            statusCode: 302,
            headers: {
                'Location': 'https://purgatumrpg.netlify.app/login-error?message=' + 
                           encodeURIComponent(error.message)
            }
        };
    }
};
