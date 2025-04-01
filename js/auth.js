// assets/js/auth.js

// Login com Google
document.getElementById('googleLogin').addEventListener('click', (e) => {
    e.preventDefault();
    const clientId = 'SEU_GOOGLE_CLIENT_ID.apps.googleusercontent.com';
    const redirectUri = encodeURIComponent('https://seusite.netlify.app/auth/callback');
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email profile`;
});

// Login com Discord
document.getElementById('discordLogin').addEventListener('click', (e) => {
    e.preventDefault();
    const clientId = 'SEU_DISCORD_CLIENT_ID';
    const redirectUri = encodeURIComponent('https://seusite.netlify.app/auth/callback');
    window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=identify email`;
});
