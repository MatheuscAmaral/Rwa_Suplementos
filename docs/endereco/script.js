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


function enviarInfo() {
  let ru = document.getElementById('rua').value;
  let num = document.getElementById('number').value;
  let bairr = document.getElementById('bairro').value;
  let cid = document.getElementById('cidade').value;
  let es = document.getElementById('estado').value;
  let ce = document.getElementById('cep').value;

  // Crie um elemento <span> para agrupar os dados
  let enderecoSpan = document.createElement("span");

  // Defina a classe CSS para o elemento <span>
  enderecoSpan.classList.add("endereco");

  // Defina o conteúdo do elemento <span> com os dados preenchidos
  enderecoSpan.textContent = ` Endereço: ${ru} ${num}, ${bairr}, ${cid} - ${es}, ${ce}`;

  // Acessar a div "alterarSenha" e adicionar o elemento <span>
  let alterarSenhaDiv = document.getElementById("alterarSenha");
  alterarSenhaDiv.innerHTML = ""; // Limpar qualquer conteúdo anterior

  alterarSenhaDiv.appendChild(enderecoSpan);

  let submitButton = document.getElementById("submit")
  submitButton.addEventListener("click", addHidden())
}
