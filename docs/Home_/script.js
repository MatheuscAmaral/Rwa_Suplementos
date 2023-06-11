if (localStorage.getItem("token") == null) {
  alert("Você precisa estar logado para acessar essa página");
  window.location.href = "/docs/Login/index.html";
}

const userLogado = JSON.parse(localStorage.getItem("userLogado"));

const logado = document.querySelector("#logado");
logado.innerHTML = `${userLogado.nome}`;

function sair() {
  localStorage.removeItem("token");
  localStorage.removeItem("userLogado");
  window.location.href = "/docs/Tela_Principal/Index.html";
}