fetch("http://localhost:3000/feedback")
.then(response => {return response.json()})
.then((data) => {
    carregaFeedbacks(data)
});

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

fetch("http://localhost:3000/desejo")
.then(response => {return response.json()})
.then((data) => {
    carregaDestinos(data)
    carregaDestinosSalvos()
});

function carregaDestinos(dados) {
    let listaDestinos = $("#destinosdesejados");
    let htmlDestinosDesejados = "<option selected>Selecione um país</option>";
    for (let index = 0; index < dados.length; index++) {
        const element = dados[index];
        htmlDestinosDesejados += `
        <option value="${element.id}">${element.nome}</option>`;
    }
    listaDestinos[0].innerHTML = htmlDestinosDesejados;
}

function carregaDestinosSalvos() {
    fetch("http://localhost:3000/destinosSalvos")
    .then(response => {return response.json()})
    .then((dados) => {
        let listaDestinos = $("#listaviagens");
        let htmlDestinosDesejados = "";
        for (let index = 0; index < dados.length; index++) {
            const element = dados[index];
            if (index % 2 == 0){
                htmlDestinosDesejados += `
                <div class="row mx-5 my-5">
                <div class="col-12 col-sm-12 col-lg-6">
                <div>
                <img class="imagem-viagem" src=${element.foto}>
                </div>
                </div>
                <div class="col-12 col-sm-12 col-lg-6 text-center">
                <div class="row justify-content-end">
                    <div type="button" onclick="removeSalvo('${element.id}')" class="col-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                        </svg>
                    </div>
                </div>
                <h3>${element.nome}</h3>
                <p>${element.resumo}</p>
                <p>${element.recomendacao}</p>
                </div>
                </div>`;
            }
            else{
                htmlDestinosDesejados += `
                <div class="row mx-5 my-5">
                <div class="col-12 col-sm-12 col-lg-6 text-center mt-5">
                <div class="row justify-content-start">
                    <div type="button" onclick="removeSalvo('${element.id}')" class="col-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                        </svg>
                    </div>
                </div>
                <h3>${element.nome}</h3>
                <p>${element.resumo}</p>
                <p>${element.recomendacao}</p>
                </div>
                <div class="col-12 col-sm-12 col-lg-6">
                <div>
                <img class="imagem-viagem" src=${element.foto}>
                </div>
                </div>
                </div>`;
            }
        }
        listaDestinos[0].innerHTML = htmlDestinosDesejados;
    });
}

function removeSalvo(id) {
    console.log(id)
    fetch("http://localhost:3000/destinosSalvos/" + id, {method: "DELETE"})
}

$(document).ready(function(){
    $('select').change(function(evento) {
        evento.stopPropagation();
        console.log(evento.target.value);
        carregaDesejo(evento.target.value);
    });
})

function carregaDesejo(id) {
    fetch("http://localhost:3000/desejo/" + id)
    .then(response => response.json())
    .then((dados) => {
        console.log(dados);
        fetch ("http://localhost:3000/destinosSalvos")
        .then(response => response.json())
        .then((lista) => {
            let jaSalvo = null;
            if(lista.length > 0){
                console.log("dados.pais_id",dados.pais_id);
                jaSalvo = lista.find(item => item.id == dados.pais_id);
                console.log("jaSalvo",jaSalvo);
            }
            if(!jaSalvo){
                fetch ("http://localhost:3000/destinosSalvos", {
                    method:"POST",
                    body:JSON.stringify({
                        pais_id: dados.id,
                        foto: dados.foto,
                        nome: dados.nome,
                        resumo: dados.resumo,
                        recomendacao: dados.recomendacao
                    })
                });
            }
        });
    });


}
