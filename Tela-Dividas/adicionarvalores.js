//Pegando "API"
const urldividas= 'http://localhost:3000/dividas'
const urlreceber='http://localhost:3000/receber'

$(document).ready(function (){
    document.getElementById('valdivida').value = "";
    document.getElementById('aquempagar').value = "";
    document.getElementById('oquepagar').value = "";
    document.getElementById('valareceber').value = "";
    document.getElementById('dequemreceber').value = "";
    document.getElementById('porreceber').value = "";
});

document.getElementById("btnAdicionarDivida").addEventListener("click", function(event){
    event.preventDefault()
  });

function AdicionarDivida(){
    // console.log(event);
    //Pegando as informações digitadas pelo usuário
    var valordiv = document.getElementById('valdivida').value;
    var aquempagar = document.getElementById('aquempagar').value;
    var oquepagar = document.getElementById('oquepagar').value;

    //Validação
  const validainputdiv=()=>{
        if(valordiv && aquempagar && oquepagar){
            return true;
        }
        else {
            return false;
        }
    }

    //Adicionando no json
    if(!validainputdiv()){
        alert('É necessário preencher todos os campos de adicionar dívidas')
    }
    else{
        alert("Dívida salva com sucesso!")
        fetch (urldividas,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "valor":Number(valordiv),
                "recebedor":aquempagar,
                "por": oquepagar,
                "pago": false
            })
        })
        .then((response)=>{
            return response.json()
        })
        .then((data)=>{
            alert("Dívida salva com sucesso!")
            limpaCampos();
        });
    }
}

function AdicionarValReceber(){
    //Pegando as informações digitadas pelo usuário
    var valorreceber = document.getElementById('valareceber').value
    var dequem = document.getElementById('dequemreceber').value
    var por=document.getElementById('porreceber').value

    //Validação
    const validainputreceber=()=>{
        if(valorreceber && dequem && por){
            return true;
        }
        else {
            return false;
        }
    }

    //Adicionando no json
    if(!validainputreceber()){
        alert('É necessário preencher todos os campos de adicionar valores a receber')
    }
    else{
        alert("Valor salvo com sucesso!")
        fetch (urlreceber,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "valor":Number(valorreceber),
                "dequem":dequem,
                "por": por,
                "pago": false
            })
        })
    }
}