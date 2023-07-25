const width = window.innerWidth
const cabecalho = document.getElementById('cabecalho')

if (width <= 500) {
  if (localStorage.getItem("token") != null) {
    cabecalho.innerHTML = `<header id="cabecalho">
    <a href="/assets/html/meusPedidos.html"><i class="fa-solid fa-user fa-lg" style="color: #000000;"></i></a>
  <a href="/home.html"><img class="cabecalho-logo" src=" /assets/images/Imagens/rwa logo.png" alt=""></a>
  <div class="deslogar">
          <a  href="/home.html" id="botao" onclick="sair()"><i class="fa-solid fa-right-from-bracket fa-lg" style="color: #000000;" ></i></a>
  </div>
  <nav class="cabecalho-central">
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <div class="container h-100">
          <div class="d-flex justify-content-center h-100">
          </div>
        </div>
      </div>
    </nav>
</nav>
</header>`
    cabecalho.style.display = 'flex';
    cabecalho.style.gap = '.5rem';
    
   

    const userLogado = JSON.parse(localStorage.getItem("userLogado"));

  
  
    

    
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
  

}

