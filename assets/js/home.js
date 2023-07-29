const width = window.innerWidth;
const cabecalho = document.getElementById("cabecalho");
const searchbar = document.getElementById("searchbar");
const mobilee = document.getElementById('mobile');
const main = document.getElementById('main');
const proteinas = document.getElementById('proteinas');

if (width <= 500) {
  if (localStorage.getItem("token") == null) {
    cabecalho.innerHTML = `<header id="cabecalho">
    <a onclick="mobile()"><i class="fa-solid fa-bars-staggered fa-2xl" style="color: #000000;"></i></a>
  <a href="/home.html"><img class="cabecalho-logo" src=" /assets/images/Imagens/rwa logo.png" alt=""></a>
  <div class="deslogar">
          <a href="/assets/html/carrinho.html"><i class="fa-solid fa-cart-shopping fa-xl" style="color: #000000;"></i></a>
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
</header>
<div id="searchbar">
  <input class="search_input"  id="barraPesquisa" type="text" name="" placeholder="Qual suplemento você precisa?">
  <a href="#" class="search_icon"><i class="fas fa-search" pesquisarProdutos(termo)></i></a>
  </div>`;
    cabecalho.style.display = "flex";
    cabecalho.style.flexDirection = "column";
    cabecalho.style.gap = '0rem'
    cabecalho.style.padding = '20px'
    hidden.document.getElementById.add.hidden
    
}
else {
  cabecalho.innerHTML = `<header id="cabecalho">
    <a onclick="mobile()"><i class="fa-solid fa-bars-staggered fa-2xl" style="color: #000000;"></i></a>
  <a href="/home.html"><img class="cabecalho-logo" src=" /assets/images/Imagens/rwa logo.png" alt=""></a>
  <div class="deslogar">
          <a href="/assets/html/carrinho.html"><i class="fa-solid fa-cart-shopping fa-xl" style="color: #000000;"></i></a>
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
</header>
<div id="searchbar">
  <input class="search_input"  id="barraPesquisa" type="text" name="" placeholder="Qual suplemento você precisa?">
  <a href="#" class="search_icon"><i class="fas fa-search" pesquisarProdutos(termo)></i></a>
  </div>`;
    cabecalho.style.display = "flex";
    cabecalho.style.flexDirection = "column";
    cabecalho.style.gap = '0rem'
    cabecalho.style.padding = '20px'
}
} 
else {
  if (localStorage.getItem("token") != null) {
    const userLogado = JSON.parse(localStorage.getItem("userLogado"));

    const icon = document.getElementById("icon");
    icon.innerHTML = `
        <a href="/assets/html/meusPedidos.html"><i class="fa-solid fa-user fa-lg" style="color: #000000;"></i></a>
        <div class="name_user">
          Olá, ${userLogado.nome}
        </div>
        <div class="deslogar">
          <a  href="/assets/html/creatinaHD.html" id="botao" onclick="sair()"><i class="fa-solid fa-right-from-bracket fa-lg" style="color: #000000;" ></i></a>
        </div>
        <a href="/assets/html/carrinho.html"><i class="fa-solid fa-cart-shopping fa-lg" style="color: #000000;"></i></a>`;

    icon.style.display = "flex";
    icon.style.gap = "1rem";
  } else {
    const icon = document.getElementById("icon");

    icon.innerHTML = `
      <a href="/assets/html/login.html"><i class="fa-solid fa-user fa-lg" style="color: #000000;"></i></a>
      <a href="/assets/html/carrinho.html"><i class="fa-solid fa-cart-shopping fa-lg" style="color: #000000;"></i></a>`;

    icon.style.display = "flex";
    icon.style.gap = ".6rem";
  }

  function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("userLogado");
  }
}

function mobile() {
  if (localStorage.getItem("token") == null){
    mobilee.innerHTML = `
  <div id="superior">
    <div id="superiorTop">
      <div id="user"><strong>Olá, Visitante</strong></div>
      <a href=""> <i class="fa-solid fa-xmark fa-xl" style="color: #171616;"></i></a>
    </div>
    <div id="superiorMid">
      <div class="searchbar">
            <input class="search_input"  id="barraPesquisa" type="text" name="" placeholder="Qual suplemento você precisa?">
            <a href="#" class="search_icon"><i class="fas fa-search" pesquisarProdutos(termo)></i></a>
      </div>
      <div id="enter">
        <i class="fa-solid fa-right-to-bracket fa-xl" style="color: #000000;"></i>
        <a href="/assets/html/login.html">Entrar/Cadastrar</a>
      </div>
    </div>
    <div id="low">
      <div class="mobileCard">
        <a href="/assets/html/proteinas.html">Proteinas</a>
      </div>
      <div class="mobileCard">
        <a href="/assets/html/creatinas.html">Creatinas</a>
      </div>
      <div class="mobileCard">
        <a href="/assets/html/outros.html">Outros Suplementos</a>
      </div>
      <div class="mobileCard">
       <a href="/assets/html/sobreNos.html">Rwa Suplementos</a>
      </div>
      <div class="mobileCard">
       <a href="https://api.whatsapp.com/send/?phone=5531973324972&text&type=phone_number&app_absent=0"> Entre em contato conosco</a>
      </div>
    </div>
  </div>`
  main.innerHTML = ''
  }
  else {
    const userLogado = JSON.parse(localStorage.getItem("userLogado"));

    mobilee.innerHTML = `
    <div id="superior">
      <div id="superiorTop">
        <div id="user"><strong> Olá, ${userLogado.nome}</strong></div>
        <a href=""> <i class="fa-solid fa-xmark fa-xl" style="color: #171616;"></i></a>
      </div>
      <div id="superiorMid">
        <div class="searchbar">
              <input class="search_input"  id="barraPesquisa" type="text" name="" placeholder="Qual suplemento você precisa?">
              <a href="#" class="search_icon"><i class="fas fa-search" pesquisarProdutos(termo)></i></a>
        </div>
        <div id="enter">
        <a href="/assets/html/meusPedidos.html"><i class="fa-solid fa-bag-shopping fa-xl" style="color: #000000;"></i> Meus Pedidos</a>
        <a href="/assets/html/dadosPessoais.html"><i class="fa-solid fa-user fa-lg" style="color: #000000;"></i>Minha conta</a>
        </div>
      </div>
      <div id="low">
        <div class="mobileCard">
          <a href="/assets/html/proteinas.html">Proteinas</a>
        </div>
        <div class="mobileCard">
          <a href="/assets/html/creatinas.html">Creatinas</a>
        </div>
        <div class="mobileCard">
          <a href="/assets/html/outros.html">Outros Suplementos</a>
        </div>
        <div class="mobileCard">
         <a href="/assets/html/sobreNos.html">Rwa Suplementos</a>
        </div>
        <div class="mobileCard">
         <a href="https://api.whatsapp.com/send/?phone=5531973324972&text&type=phone_number&app_absent=0"> Entre em contato conosco</a>
        </div>
      </div>
    </div>`
    main.innerHTML = ''
  }

  function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("userLogado");
  }
}

function mobile() {
  if (localStorage.getItem("token") == null){
    mobilee.innerHTML = `
  <div id="superior">
    <div id="superiorTop">
      <div id="user"><strong>Olá, Visitante</strong></div>
      <a href=""> <i class="fa-solid fa-xmark fa-xl" style="color: #171616;"></i></a>
    </div>
    <div id="superiorMid">
      <div class="searchbar">
            <input class="search_input" type="text" name="" placeholder="Qual suplemento você precisa?">
            <a href="#" class="search_icon"><i class="fas fa-search"></i></a>
      </div>
      <div id="enter">
        <i class="fa-solid fa-right-to-bracket fa-xl" style="color: #000000;"></i>
        <a href="/assets/html/login.html">Entrar/Cadastrar</a>
      </div>
    </div>
    <div id="low">
      <div class="mobileCard">
        <a href="/assets/html/proteinas.html">Proteinas</a>
      </div>
      <div class="mobileCard">
        <a href="/assets/html/creatinas.html">Creatinas</a>
      </div>
      <div class="mobileCard">
        <a href="/assets/html/outros.html">Outros Suplementos</a>
      </div>
      <div class="mobileCard">
       <a href="/assets/html/sobreNos.html">Rwa Suplementos</a>
      </div>
      <div class="mobileCard">
       <a href="https://api.whatsapp.com/send/?phone=5531973324972&text&type=phone_number&app_absent=0"> Entre em contato conosco</a>
      </div>
    </div>
  </div>`
  main.innerHTML = ''
  }
  else {
    const userLogado = JSON.parse(localStorage.getItem("userLogado"));

    mobilee.innerHTML = `
    <div id="superior">
      <div id="superiorTop">
        <div id="user"><strong> Olá, ${userLogado.nome}</strong></div>
        <a href=""> <i class="fa-solid fa-xmark fa-xl" style="color: #171616;"></i></a>
      </div>
      <div id="superiorMid">
        <div class="searchbar">
              <input class="search_input" type="text" name="" placeholder="Qual suplemento você precisa?">
              <a href="#" class="search_icon"><i class="fas fa-search"></i></a>
        </div>
        <div id="enter">
        <a href="/assets/html/meusPedidos.html"><i class="fa-solid fa-bag-shopping fa-xl" style="color: #000000;"></i> Meus Pedidos</a>
        <a href="/assets/html/dadosPessoais.html"><i class="fa-solid fa-user fa-lg" style="color: #000000;"></i>Minha conta</a>
        </div>
      </div>
      <div id="low">
        <div class="mobileCard">
          <a href="/assets/html/proteinas.html">Proteinas</a>
        </div>
        <div class="mobileCard">
          <a href="/assets/html/creatinas.html">Creatinas</a>
        </div>
        <div class="mobileCard">
          <a href="/assets/html/outros.html">Outros Suplementos</a>
        </div>
        <div class="mobileCard">
         <a href="/assets/html/sobreNos.html">Rwa Suplementos</a>
        </div>
        <div class="mobileCard">
         <a href="https://api.whatsapp.com/send/?phone=5531973324972&text&type=phone_number&app_absent=0"> Entre em contato conosco</a>
        </div>
      </div>
    </div>`
    main.innerHTML = ''
  }
}

function goBack() {
  window.history.back();
  main.style.display = 'block'
}
