$(document).ready(function () {
    // Pega o usuario no localStorage
    let usuario = localStorage.getItem("usuario");
    // Verifica se ele é existente
    if(!usuario){
        // Se não existir redireciona para o login
        window.location.href = window.location.origin + "/Tela-Login/index.html";
    }
})

fetch(`${apiUrl}viagens`)
.then(response => {return response.json()})
.then((data) => {
    //console.log(data)
    carregaDados(data)
});

fetch("http://localhost:3000/feedback")
.then(response => {return response.json()})
.then((data) => {
    //console.log(data)
    carregaFeedbacks(data)
});


function carregaDados(dados) {
    let listaviagens = $("#listaviagens");
    let htmlviagens = "";
    for (let index = 0; index < dados.length; index++) {
        const element = dados[index];
        if (index % 2){
            htmlviagens += `
            <div class="row mx-5 my-5">
                <div class="col-12 col-sm-12 col-lg-6 text-center mt-5">
                    <h3>${element.nome}</h3>
                    <p>${element.resumo}</p>
                    <a href="../Tela-Veja mais/index.html?id=${element.id}" class="btn">Veja Mais</a>
                </div>
                <div class="col-12 col-sm-12 col-lg-6">
                    <div>
                        <img class="imagem-viagem" src=${element.imagem}>
                    </div>
                </div>
            </div>`;
        }
        else{
            htmlviagens += `
            <div class="row mx-5 my-5">
                <div class="col-12 col-sm-12 col-lg-6">
                    <div>
                        <img class="imagem-viagem" src=${element.imagem}>
                    </div>
                </div>
                <div class="col-12 col-sm-12 col-lg-6 text-center mt-5">
                    <h3>${element.nome}</h3>
                    <p>${element.resumo}</p>
                    <a href="../Tela-Veja mais/index.html?id=${element.id}" class="btn">Veja Mais</a>
                </div>
            </div>`;
        }
    }
    listaviagens[0].innerHTML = htmlviagens;
}

function carregaFeedbacks(dados) {
    let listaFeedbacks = $("#cards-feedback");
    let htmlFeedbacks = "";
    for (let index = 0; index < dados.length; index++) {
        const element = dados[index];
        htmlFeedbacks += `
        <div class="col-12 col-lg-3 mb-3">
                <div class="card">
                    <img src="${element.foto}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${element.nome}</h5>
                    <p class="card-text">${element.feedback}</p>
                    </div>
                </div>
            </div>`;
    }
    listaFeedbacks[0].innerHTML = htmlFeedbacks;
}