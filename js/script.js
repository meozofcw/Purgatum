// Esconde o vídeo de introdução quando terminar ou ao clicar em "Pular"
document.querySelector('#intro-video video')?.addEventListener('ended', pularIntro);

function pularIntro() {
  document.getElementById('intro-video').style.display = 'none';
}