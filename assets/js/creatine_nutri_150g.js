if (localStorage.getItem("token") != null) {
  const userLogado = JSON.parse(localStorage.getItem("userLogado"));

  const logado = document.querySelector("#logado");
  logado.innerHTML = `Olá, ${userLogado.nome}`;
}

else {
  const icon = document.getElementById('icon')
  icon.style.display = 'none'
}

function sair() {
  localStorage.removeItem("token");
  localStorage.removeItem("userLogado");
  window.location.href = "/index.html";
}