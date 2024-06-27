var localStoragekey='listadeorcamento';
var localStoragekey2='soma';
var orcamento = JSON.parse(localStorage.getItem('listadeorcamento')||"[]");

function soma(){
    var soma=0;
    for(let i =0; i<orcamento.length; i++){
        soma+=parseFloat(orcamento[i].valor);
    }
    localStorage.setItem('soma', JSON.stringify(soma));
}

function imprimesoma(soma){    
    let somaorc = JSON.parse(localStorage.getItem('soma'));
    let impressao="<h3></h3>";
    
    const numberFormat = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
    
    var elementoExistente = document.getElementById('mostrarsoma');    
    var novoElemento = document.createElement('h3');
    novoElemento.innerHTML = impressao; 
    
    if(orcamento===""){
        impressao += `<h3>${numberFormat.format(somaorc)}</h3>`;
        novoElemento.innerHTML = impressao;        
    }
    
    else {        
        impressao += `<h3>${numberFormat.format(somaorc)}</h3>`;        
        novoElemento.innerHTML = impressao;
        elementoExistente.innerHTML=novoElemento.innerHTML;         
    }
    
}

function imprimeorcpess(orcamento){     
    
    let valororcamento = JSON.parse(localStorage.getItem(localStoragekey));
    let impressao="<h3></h3>";
    
    const numberFormat = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
    var elementoExistente = document.getElementById('mostrarorcpess');    
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
document.addEventListener("DOMContentLoaded", imprimeorcpess);
document.addEventListener("DOMContentLoaded", imprimesoma);