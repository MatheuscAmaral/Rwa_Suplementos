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

function backHome() {
    window.location.href = '/docs/Home_/index.html'
}