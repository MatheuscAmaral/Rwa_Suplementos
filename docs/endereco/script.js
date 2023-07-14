const userLogado = JSON.parse(localStorage.getItem("userLogado"));

const logado = document.querySelector("#logado");
logado.innerHTML = `Olá, <strong>${userLogado.nome}</strong>! Acompanhe seus pedidos e seus dados cadastrais aqui.`;

function backHome() {
    window.location.href = '/docs/Home_/index.html'
}

function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("userLogado");
    window.location.href = "/Index.html";
}

function removeHidden() {
    const overlay = document.getElementById('overlay');
    const novoEndereco = document.getElementById('novo_endereco');
    
    overlay.style.display = 'block';
    novoEndereco.classList.remove('hidden');
  }
  
  function addHidden() {
    const overlay = document.getElementById('overlay');
    const novoEndereco = document.getElementById('novo_endereco');
  
    overlay.style.display = 'none';
    novoEndereco.classList.add('hidden');
  }
  
  function backHome() {
    window.location.href = '/docs/Home_/index.html'
}