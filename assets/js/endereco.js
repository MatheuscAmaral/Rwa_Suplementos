const userLogado = JSON.parse(localStorage.getItem("userLogado"));

const logado = document.querySelector("#logado");
logado.innerHTML = `Olá, <strong>${userLogado.nome}</strong>! Acompanhe seus pedidos e seus dados cadastrais aqui.`;

function backHome() {
    window.location.href = '/home.html'
}

function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("userLogado");
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
    if (localStorage.getItem("token") == null) {
      alert("Você precisa estar logado para acessar essa página");
      window.location.href = "/assets/html/login.html";
    }
   
    else {
      window.location.href = '/home.html'
    }
}

document.addEventListener("keypress", function(e) {
  if (e.key === 'Enter') {
    var btn = document.querySelector("#submit")

    btn.click()
  }
})


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
  enderecoSpan.textContent = ` Endereço: ${ru} ${num}, Bairro ${bairr}, ${cid} - ${es}, CEP: ${ce}`;

  // Acessar a div "alterarSenha" e adicionar o elemento <span>
  let alterarSenhaDiv = document.getElementById("alterarSenha");
  alterarSenhaDiv.innerHTML = ""; // Limpar qualquer conteúdo anterior

  alterarSenhaDiv.appendChild(enderecoSpan);

  let submitButton = document.getElementById("submit")
  submitButton.addEventListener("click", addHidden())
}
