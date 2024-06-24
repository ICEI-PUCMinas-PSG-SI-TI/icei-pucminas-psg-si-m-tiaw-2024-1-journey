var inputorcamento = document.getElementById("entradadeorcamento");

var localStoragekey='listadeorcamento';

// Atribuição inicial 
var valorinicial = {
    orcamento: {
        "valor": "000"
    }
};

var orcamento = JSON.parse(localStorage.getItem('listadeorcamento')||"[]");

//Adicionar valor
 
function adicionarorcamento(){   
    orcamento.length=0

    var valor = inputorcamento.value.trim();

    //Validação para caso o input esteja vazio    
    if (valor === "") {        
        alert("Por favor, insira um valor.");
        return; 
    }   
    let orcamentoAnterior = JSON.parse(localStorage.getItem('listadeorcamento'));

    //if(usuario==orcamento.usuario){
    orcamento.push({
        valor: inputorcamento.value
    })

    localStorage.setItem('listadeorcamento', JSON.stringify(orcamento));

    if (JSON.stringify(orcamento) !== JSON.stringify(orcamentoAnterior)) {
        imprimeorc();
    }
    alert("Orçamento alterado com sucesso!");
    inputorcamento.value = "";       
}


//Mostrando na tela 
function imprimeorc(orcamento){
    let valororcamento = JSON.parse(localStorage.getItem('listadeorcamento'));
    let impressao="<h3></h3>";

    const numberFormat = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
   });
   var elementoExistente = document.getElementById('mostrarorc');    
   var novoElemento = document.createElement('h3');
   novoElemento.innerHTML = impressao; 

   if(orcamento===""){
       impressao += `<h3>${numberFormat.format(valororcamento[0].valor)}</h3>`;
       novoElemento.innerHTML = impressao;        
   }
   
   else {        
       impressao += `<h3>${numberFormat.format(valororcamento[0].valor)}</h3>`;        
        novoElemento.innerHTML = impressao;         
       elementoExistente.innerHTML=novoElemento.innerHTML;         
   }
    
    
}
document.addEventListener("DOMContentLoaded", imprimeorc);
































/*var inputorcamento = document.getElementById("entradadeorcamento");

var localStoragekey='listadeorcamento';

// Atribuição inicial 
var valorinicial = {
    orcamento: {
        //usuario:server,
        valor:0
    }
};

var orcamento = JSON.parse(localStorage.getItem('listadeorcamento')||"[]");

//Adicionar valor
 
function adicionarorcamento(){   
    orcamento.length=0

    var valor = inputorcamento.value.trim();

    //Validação para caso o input esteja vazio    
    if (valor === "") {        
        alert("Por favor, insira um valor.");
        return; 
    }   
    let orcamentoAnterior = JSON.parse(localStorage.getItem(localStoragekey));

    //if(usuario==orcamento.usuario){
    orcamento.push({
        valor: inputorcamento.value
    })

    localStorage.setItem(localStoragekey, JSON.stringify(orcamento));

    if (JSON.stringify(orcamento) !== JSON.stringify(orcamentoAnterior)) {
        imprimeorc();
    }
    alert("Orçamento alterado com sucesso!");
    inputorcamento.value = "";      
}
inputorcamento.value = "";

//Mostrando na tela 
function imprimeorc(orcamento){
    
    let valororcamento = JSON.parse(localStorage.getItem(localStoragekey));
    let impressao="<h3></h3>";

    const numberFormat = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
   });
   var elementoExistente = document.getElementById('mostrarorc');    
   var novoElemento = document.createElement('h3');
   novoElemento.innerHTML = impressao; 

   if(orcamento===""){
       impressao += `<h3>${numberFormat.format(valororcamento[0].valor)}</h3>`;
       novoElemento.innerHTML = impressao;        
   }
   
   else {        
       impressao += `<h3>${numberFormat.format(valororcamento[0].valor)}</h3>`;        
        novoElemento.innerHTML = impressao;         
       elementoExistente.innerHTML=novoElemento.innerHTML;         
   }
}
document.addEventListener("DOMContentLoaded", imprimeorc);





































/*var inputorcamento = document.getElementById("entradadeorcamento");
const botaoconfirma = document.querySelector(".confirmar");
var localStoragekey='listadeorcamento';

// Atribuição inicial 
var valorinicial = {
    orcamento: {
        valor: 0
    }
};

var orcamento = JSON.parse(localStorage.getItem(localStoragekey)||"[]");

//Adicionar valor
 
function adicionarorcamento(){   
    orcamento.length=0

    var valor = inputorcamento.value.trim();

    //Validação para caso o input esteja vazio    
    if (valor === "") {        
        alert("Por favor, insira um valor.");
        return; 
    }   
    let orcamentoAnterior = JSON.parse(localStorage.getItem(localStoragekey));

    orcamento.push({
        //adicionar o usuario
        valor: inputorcamento.value
    })

    localStorage.setItem(localStoragekey, JSON.stringify(orcamento));

    if (JSON.stringify(orcamento) !== JSON.stringify(orcamentoAnterior)) {
        imprimeorc();
    }
    alert("Orçamento alterado com sucesso!");
    inputorcamento.value = "";      
}
inputorcamento.value = "";

//Mostrando na tela 
function imprimeorc(orcamento){
    let tela=document.getElementById('orcamentoatual');
    let valororcamento = JSON.parse(localStorage.getItem(localStoragekey));
    let impressao="<h3></h3>";

    const numberFormat = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
   });

      impressao += `<h3>${numberFormat.format(valororcamento[0].valor)}</h3>`;
      const elementoExistente = document.getElementById('orcamentoatual');

  const novoElemento = document.createElement('h3');
  novoElemento.innerHTML = impressao; 
  novoElemento.innerHTML;
  elementoExistente.appendChild(novoElemento);
    
    
}
document.addEventListener("DOMContentLoaded", imprimeorc);






























/*var inputorcamento = document.getElementById("entradadeorcamento");
var localStoragekey='listadeorcamento';
var usuarioatual = JSON.parse(sessionStorage.getItem(usuarioCorrente));

// Atribuição inicial 
var valorinicial = {
    orcamento: {
        usuario:server,
        valor: 0
    }
};
var somadosorc = [];

var orcamento = JSON.parse(localStorage.getItem('listadeorcamento')||"[]");

//Adicionar valor

/*function adicionarorcamento(){   
    orcamento.length=0;    
    var valor = inputorcamento.value.trim();
    
    //Validação para caso o input esteja vazio    
    if (valor === "") {        
        alert("Por favor, insira um valor.");
        return; 
    }   
    let orcamentoAnterior = JSON.parse(localStorage.getItem(localStoragekey));
    
    //if(usuario==orcamento.usuario){
        orcamento.push({
            //usuario=usarioatual.email
            valor: inputorcamento.value
        })
        
        localStorage.setItem(localStoragekey, JSON.stringify(orcamento));

    //}   
    
    if (JSON.stringify(orcamento) !== JSON.stringify(orcamentoAnterior)) {
        imprimeorc();
    }
    alert("Orçamento alterado com sucesso!");
    inputorcamento.value = "";      
}
inputorcamento.value = "";*/

/*function somaorcamentos(somadosorc){
    var soma=0;
    for (let i =0; i<orcamento.length; i++){
        soma+=parseFloat(orcamento[i].valor);
    }
    somadosorc.push({
        somatotal:soma
    })
    localStorage.setItem(localStoragekey, JSON.stringify({
        orcamentos: orcamento,
        somatotal: soma
    }));

    return soma;
}

//Mostrando na tela 
function imprimeorc(orcamento){    
    
    let valororcamento = JSON.parse(localStorage.getItem(localStoragekey));
    let impressao="";    
    const numberFormat = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
    
    var elementoExistente = document.getElementById('mostrarorc');    
    var novoElemento = document.createElement('h3');
    novoElemento.innerHTML = impressao; 

    if(orcamento===""){
        impressao += `<h3>${numberFormat.format(valororcamento[0].valor)}</h3>`;
        var novoElemento = document.createElement('h3');
        novoElemento.innerHTML = impressao;        
    }
    
    else {        
        impressao += `<h3>${numberFormat.format(valororcamento[0].valor)}</h3>`;        
        novoElemento.innerHTML = impressao;         
        elementoExistente.innerHTML=novoElemento.innerHTML;         
    }
    
}
document.addEventListener("DOMContentLoaded", imprimeorc);*/