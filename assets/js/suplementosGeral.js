const width = window.innerWidth;
const cabecalho = document.getElementById("cabecalho");
const searchbar = document.getElementById("searchbar");
const mobilee = document.getElementById('mobile');
const main = document.getElementById('main');
const botao1 = document.getElementById('button1')
const botao2 = document.getElementById('button2')
const botao3 = document.getElementById('button3')
const botao4 = document.getElementById('button4')
const pages1 = document.getElementById('firstP')
const pages2 = document.getElementById('secondP')



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
       <a href="/assets/html/top10.html"> Top 10</a>
      </div>
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
  main.style.display = 'none'
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
         <a href="/assets/html/top10.html"> Top 10</a>
        </div>
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
    main.style.display = 'none'
  }
}


function goBack() {
  window.history.back();
  main.style.display = 'block'
}


function backLeft() {
  pages1.style.display = 'flex';
  pages1.style.flexDirection = 'column'
  pages2.style.display = 'none'
  botao2.style.backgroundColor = 'blue'
  botao1.style.backgroundColor = ' rgba(128, 128, 128, 0.357)'

  if (pages2.style.display = 'none') {
    botao3.style.backgroundColor = 'transparent'
    botao4.style.backgroundColor = 'transparent'
  }
}

function pageOne() {
  pages1.style.display = 'flex';
  pages1.style.flexDirection = 'column'
  pages2.style.display = 'none'
  botao2.style.backgroundColor = 'blue'
  botao1.style.backgroundColor = ' rgba(128, 128, 128, 0.357)'

  if (pages2.style.display = 'none') {
    botao3.style.backgroundColor = 'transparent'
    botao4.style.backgroundColor = 'transparent'
  }
}

function pageTwo() {
  pages2.style.display = 'flex';
  pages2.style.flexDirection = 'column'
  pages1.style.display = 'none'
  botao3.style.backgroundColor = 'blue'
  botao4.style.backgroundColor = ' rgba(128, 128, 128, 0.357)'

  if (pages1.style.display = 'none') {
    botao2.style.backgroundColor = 'transparent'
    botao1.style.backgroundColor = 'transparent'
  }
}

function backRight() {
  pages2.style.display = 'flex';
  pages2.style.flexDirection = 'column'
  pages1.style.display = 'none'
  botao3.style.backgroundColor = 'blue'
  botao4.style.backgroundColor = ' rgba(128, 128, 128, 0.357)'

  if (pages1.style.display = 'none') {
    botao2.style.backgroundColor = 'transparent'
    botao1.style.backgroundColor = 'transparent'
  }
}

