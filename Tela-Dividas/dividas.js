// var urlDividas= 'http://localhost:3000/dividas';
// var urlReceber= 'http://localhost:3000/receber';
const urlDividas = apiUrl+'/dividas';
const urlReceber = apiUrl+'/receber';

var dividas = [];
var receber = [];

//Atribuindo os elementos do Json aos vetores
fetch(urlDividas)
.then(response => response.json())
.then(dados => {
  dividas = [];
  dados.forEach(dado => {
    dividas.push(dado);
  });
  CarregaDividas();
})
.catch(error => {
  console.error('Erro ao carregar json', error);
});

fetch (urlReceber)
.then(response => response.json())
.then(dados2 => {
  receber = [];
  dados2.forEach(dado2 => {
    receber.push(dado2);
  });
  CarregaValoresRec();
})
.catch(error => {
  console.error('Erro ao carregar json', error);
});

//Imprimir dívidas na tela
function CarregaDividas(){
  const numberFormat = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
  let text=document.getElementById('listadiv')
  let mostrarsomadiv= document.getElementById('somadiv')
  mostrarsomadiv.classList.add('exibesomadiv')
  text.innerHTML = "";
  mostrarsomadiv.innerHTML = "";
  let somadiv=0;
  for(let i =0; i < dividas.length;i++){
    if(!dividas[i].pago){
      somadiv += dividas[i].valor;
    }

    let listadiv = document.createElement('div')

    let checkdiv = document.createElement('input')
    checkdiv.setAttribute('type', 'checkbox');
    checkdiv.classList.add('checkdiv')
    checkdiv.addEventListener('change', () =>{
      if (checkdiv.checked){
        // DividaPaga(dividas[i].id); // É para ser o index e não o id
        DividaPaga(i, dividas[i], true);
        elementodivida.classList.toggle('dividapaga')
        // somadiv=somadiv-dividas[i].valor; Descobrir por que não está atualizando
      }
      if(!checkdiv.checked){
        DividaPaga(i, dividas[i], false);
        elementodivida.classList.toggle('dividapaga')
      }
    })

    let novoitemdiv = document.createElement('div');
    novoitemdiv.classList.add('novadivida')

    let elementodivida = document.createElement('div');
    elementodivida.classList.add('impressaopagar')
    elementodivida.innerHTML= `<h5>${numberFormat.format(dividas[i].valor) + " - " + dividas[i].recebedor + " (" + dividas[i].por + ")"} </h5>`
    if(dividas[i].pago){
      elementodivida.classList.toggle('dividapaga');
      checkdiv.checked = true;
    }
    const lixeira = document.createElement('span');
    lixeira.classList.add("fa-solid"); //Adicionando ícone da lixeira
    lixeira.classList.add("fa-trash");
    lixeira.addEventListener('click', () => ApagarDivida(dividas[i].id));

    listadiv.appendChild(checkdiv);
    novoitemdiv.appendChild(checkdiv);
    novoitemdiv.appendChild(listadiv);
    novoitemdiv.appendChild(elementodivida);
    novoitemdiv.appendChild(lixeira);
    listadiv.appendChild(elementodivida);
    text.appendChild(novoitemdiv);
  }
  mostrarsomadiv.innerHTML=`<h3>${numberFormat.format(somadiv)}</h3>`
}


//Apagar dívida
function ApagarDivida(id){
  fetch('http://localhost:3000/dividas/' + id, {method:"DELETE"})
  alert("Dívida apagada")
}

//Atualizar dívida para paga
function DividaPaga(index, divida, pagoOuNao){

  dividas[index].pago=true

  fetch('http://localhost:3000/dividas/' + divida.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    // body: {
    //   pago:true
    // }
    body: JSON.stringify({
      "valor":Number(divida.valor),
      "recebedor": divida.recebedor,
      "por": divida.por,
      "pago": pagoOuNao
    })
  })
  .then(response => {
    if (response.ok) {
      console.log(`Divida atualizada com sucesso!`);
      CarregaDividas();
    } else {
      console.error(`Erro ao atualizar dívida`);
    }
  })
  .catch(error => {
    console.error('Erro ao atualizar json', error);
  });

  //OBS: O comando PUT está sempre dando erro
}

//Imprimir os valores a receber na tela
function CarregaValoresRec(){
  const numberFormat = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
  let text2=document.getElementById('listaval')
  let mostrarsomareceber=document.getElementById('somareceber')

  mostrarsomareceber.classList.add('exibesomarec')
  text2.innerHTML = ""
  mostrarsomareceber.innerHTML = "";
  let somaval = 0;
  for(let i = 0; i < receber.length; i++){
    if(!receber[i].pago){
      somaval+=receber[i].valor;
    }

    let lista = document.createElement('div');

    const check = document.createElement('input')
    check.setAttribute('type', 'checkbox');
    check.classList.add('checkrec')
    check.addEventListener('change', () =>
      {
      if (check.checked){
        // ValorRecebido(receber[i].id); // Mesma coisa do de cima
        ValorRecebido(i, receber[i], true);
        elementoareceber.classList.toggle('valorrecebido')
        somaval=somaval-receber[i].valor;
      }
      if(!check.checked){
        ValorRecebido(i, receber[i], false);
        elementoareceber.classList.toggle('valorrecebido')
      }//CORRIGIR
    }
  )


  let novoitem = document.createElement('div');
  novoitem.classList.add('novovalor')

  const elementoareceber=document.createElement('div');
  elementoareceber.classList.add('impressaoreceber');

  elementoareceber.innerHTML= `<h5>${numberFormat.format(receber[i].valor) + " - " + receber[i].dequem + " (" + receber[i].por + ")"}</h5>`
  if(receber[i].pago){
    elementoareceber.classList.toggle('valorrecebido');
    check.checked = true;
  }
  const lixeira = document.createElement('span');
  lixeira.classList.add("fa-solid"); //Adicionando ícone da lixeira
  lixeira.classList.add("fa-trash");
  lixeira.addEventListener('click', () => DeletarReceber(receber[i].id))

  lista.appendChild(check)
  novoitem.appendChild(check)
  novoitem.appendChild(lista)
  novoitem.appendChild(elementoareceber)
  novoitem.appendChild(lixeira)
  lista.appendChild(elementoareceber)
  text2.appendChild(novoitem)

}
mostrarsomareceber.innerHTML=`<h3>${numberFormat.format(somaval)}</h3>`
}

//Deletar
function DeletarReceber(id){
  const response = fetch(urlReceber + '/' + id, {method:'DELETE'})
  alert("Valor deletado com sucesso!")
}

//Valor recebido
function ValorRecebido(index, recebimento, pagoOuNao){
  receber[index].pago="true"


  fetch('http://localhost:3000/receber/' + recebimento.id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "pago": pagoOuNao
    })
  })
  .then(response => {
    if (response.ok) {
      console.log(`Valor a receber atualizado com sucesso!`);
      CarregaValoresRec();
    } else {
      console.error(`Erro ao atualizar valor a receber`);
    }
  })
  .catch(error => {
    console.error('Erro ao atualizar json', error);
  });


  //OBS: O comando PUT está sempre dando erro
}

function EnviarNotificação(){
  let cont=0;
  for(let i=0; i<dividas.length; i++){

    if(dividas[i].pago!==true){
      cont++
    }
    else {
      cont=cont;
    }
  }
  if (cont===0){
    let notificação=document.getElementById("notificacao");
    notificação.innerHTML='<div class="toast" role="alert" aria-live="assertive" aria-atomic="true"><div class="toast-header"><strong class="me-auto">Bootstrap</strong> <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button></div><div class="toast-body"> Todas as suas dívidas foram pagas!</div></div>'
    //alert("Todas as suas dívidas foram pagas!") CORRIGIR
  }
}

window.onload = function() {
  EnviarNotificação();
}