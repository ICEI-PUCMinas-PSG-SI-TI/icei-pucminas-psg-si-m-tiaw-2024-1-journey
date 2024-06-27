var colaboradores = [];
var viagem_id = window.location.search.substring(4);

$(document).ready(function (){
  buscaUsuarios();
  buscaColaboradores();
})



function buscaUsuarios() {
  fetch (apiUrl +"/usuarios")
  .then((response) => {return response.json()})
  .then((data) => {
      console.log($("#usuarios")[0])
      data.forEach(usuario => {
        $("#usuarios")[0].innerHTML += `<option value="${usuario.id}">${usuario.nome}</option>`;
      });
  })
}

function adicionaColaborador(){
  let selectColaborador = $("#usuarios")[0].value;
console.log(colaboradores)
  if(colaboradores.findIndex(item => item.usuario_id == selectColaborador) != -1){
    alert("Já está adicionado!");
    return;
  }

  fetch (apiUrl +"/colaboradores",{
    method:'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "usuario_id":selectColaborador,
        "viagem_id":viagem_id
    })
  })
  .then(()=>{
    buscaColaboradores();
  })
}

function buscaColaboradores() {
  fetch (apiUrl +"/colaboradores?viagem_id=" + viagem_id)
  .then((response) => {return response.json()})
  .then((data) => {
      console.log("data", data);
      colaboradores = data;
      console.log("naopossuicolaborador", naopossuicolaborador);
      if(data.length > 0){
        naopossuicolaborador.style = "display: none;";
      }
      data.forEach(colaborador => {
        carregaUsuario(colaborador.usuario_id);
      });
  })
}

function carregaUsuario(usuarioId) {
  fetch (apiUrl +"/usuarios?id=" + usuarioId)
  .then((response) => {return response.json()})
  .then((data) => {
      // console.log($("#usuarios")[0])
      data.forEach(usuario => {
        $("#listacolaboradores")[0].innerHTML += `
        <div class="col-sm-12 col-md-4" >
          <div class="card" style="width: 18rem;">
            <img src="${usuario.foto}" class="card-img-top p-4" alt="...">
            <div class="card-body">
              <h5 class="card-title mb-3">${usuario.nome}</h5>
            </div>
          </div>
        </div>
        `;
        // <div id="${usuario.id}">${usuario.nome}</div>
      });
  })
}