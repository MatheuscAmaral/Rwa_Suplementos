if (localStorage.getItem("token") != null) {
  const userLogado = JSON.parse(localStorage.getItem("userLogado"));


  const icon = document.getElementById('icon');
  icon.innerHTML = `
      <a href="/assets/html/meusPedidos.html"><i class="fa-solid fa-user fa-lg" style="color: #000000;"></i></a>
      <div class="name_user">
        Olá, ${userLogado.nome}
      </div>
      <div class="deslogar">
        <a  href="/assets/html/100wheyAction.html" id="botao" onclick="sair()"><i class="fa-solid fa-right-from-bracket fa-lg" style="color: #000000;" ></i></a>
      </div>
      <a href="/assets/html/carrinho.html"><i class="fa-solid fa-cart-shopping fa-lg" style="color: #000000;"></i></a>`;

  icon.style.display = 'flex';
  icon.style.gap = '1rem';
  
} 

else {
  const icon = document.getElementById('icon');

  icon.innerHTML = `
    <a href="/assets/html/login.html"><i class="fa-solid fa-user fa-lg" style="color: #000000;"></i></a>
    <a href="/assets/html/carrinho.html"><i class="fa-solid fa-cart-shopping fa-lg" style="color: #000000;"></i></a>`;

  icon.style.display = 'flex';
  icon.style.gap = '.6rem';
}

function sair() {
  localStorage.removeItem("token");
  localStorage.removeItem("userLogado");
}