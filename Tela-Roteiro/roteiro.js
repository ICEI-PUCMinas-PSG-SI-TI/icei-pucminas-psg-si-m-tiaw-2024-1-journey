var viagem_id = window.location.search.substring(4);
var listaDias = [];
$(document).ready(function (){
    fetch (apiUrl + "/roteiro?viagem_id=" + viagem_id,{
        method:'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {return response.json()})
    .then((data) => {
        carregaDados(data)
    });
});

function carregaDados(data) {
    data.forEach((tarefa) => {
        if(listaDias[tarefa.dia -1] == undefined){
            for (let index = 0; index < tarefa.dia; index++) {
                listaDias.push({tarefas: []});
            }
        }
        listaDias[tarefa.dia-1].tarefas.push(tarefa.tarefa);
    })
    carregaDias();
}


//Salva os dados da tela no localStorage
function saveData() {
    atualizaDados();
    fetch (apiUrl + "/roteiro?viagem_id=" + viagem_id,{
        method:'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {return response.json()})
    .then((data) => {
        data.forEach((item)=>{
            fetch(apiUrl + '/roteiro/' + item.id, {method:"DELETE"})
        })
    });
    let arraySave = [];
    listaDias.forEach((dia, index) => {
        // console.log(dia, index);
        dia.tarefas.forEach((tarefa) => {
            // if(tarefa.id){
            //     fetch('http://localhost:3000/roteiro/' + tarefa.id, {method:"DELETE"})
            // }

            fetch (apiUrl + "/roteiro",{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "viagem_id": viagem_id,
                    "dia": index+1,
                    "tarefa": tarefa
                })
            });

            arraySave.push({
                "viagem_id": viagem_id,
                "dia": index+1,
                "tarefa": tarefa
            })
        })
    })
    // console.log(arraySave);

}

function atualizaDados() {
    listaDias.forEach((dia, index)=>{
        listaDias[index].tarefas = listaDias[index].tarefas.map((item, indexTarefa)=>{
            if($(`#dia${index}tarefa${indexTarefa}`)[0]){
                return $(`#dia${index}tarefa${indexTarefa}`)[0].value;
            }else{
                return item;
            }
        });
    });
}

//Carrega os dados no localStorage
function loadData() {
    // console.log("aqui")
}

//Carrega os dados salvos anteriormente
function loadPage() {
    // console.log("abc");
    fetch(apiUrl + "/roteiro?viagem_id="+ viagem_id)
    .then(response => {return response.json()})
    .then((data) => {
        // console.log(data)
    });
}

function carregaDia(dia, dados) {

}

function adicionaDia(){
    listaDias.push({
        tarefas: []
    });
    carregaDias();

}

function carregaDias() {
    listaDias.forEach((dia, index)=>{
        // console.log(dia);
        listaDias[index].tarefas = listaDias[index].tarefas.map((item, indexTarefa)=>{
            if($(`#dia${index}tarefa${indexTarefa}`)[0]){
                return $(`#dia${index}tarefa${indexTarefa}`)[0].value;
            }else{
                return item;
            }
        });
    });
    $("#tabelaDias")[0].innerHTML = "";
    listaDias.forEach((item, index) => {
        carregaTarefa(index);
        $("#tabelaDias")[0].innerHTML += `
            <div class="col-lg-4 col-sm-12">
                <div id="wrapper${index+1}" class="form-control pb-2 mb-4">
                    <div class="row pb-2 mb-4">
                        <div class="col">
                            <button id="btnDia${index+1}" onclick="adicionaTarefa(${index})" class="btn">Dia ${index+1} (+)</button>
                        </div>
                        <div type="button" onclick="removeDia('${index}')" class="text-danger col-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                            </svg>
                        </div>
                    </div>
                    <table style="width: 100%" id="table${index+1}">
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
        `;
        carregaTarefa(index);
    })
}

//Função do botão deltar (x)
function removeDia(dia) {
    // console.log(dia);
    listaDias.splice(dia, 1);
    carregaDias();
}

function adicionaTarefa(dia) {
    // console.log(dia);
    listaDias[dia].tarefas.push("");
    carregaTarefa(dia);
    //<ul id="list${index+1}"></ul>
}

function carregaTarefa(dia) {
    // console.log("carregaTarefa1",listaDias[dia].tarefas);
    listaDias[dia].tarefas = listaDias[dia].tarefas.map((item, index)=>{
        if($(`#dia${dia}tarefa${index}`)[0]){
            return $(`#dia${dia}tarefa${index}`)[0].value;
        }else{
            return item;
        }
    });
    // console.log("carregaTarefa2",listaDias[dia].tarefas);
    if($("#table"+ (dia+1))[0]){
        $("#table"+ (dia+1))[0].innerHTML = "";
        listaDias[dia].tarefas.forEach((item, index) => {
            $("#table"+ (dia+1))[0].innerHTML +=`
            <tr>
                <td>
                    <input type="text" id="dia${dia}tarefa${index}" value="${listaDias[dia].tarefas[index]}" />
                </td>
                <td>
                    <div type="button" onclick="removeTarefa(${dia}, ${index})" class="text-danger col-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                        </svg>
                    </div>
                </td>
            </tr> `
        })
    }
}

function removeTarefa(dia, tarefa) {
    // console.log($(`#dia${dia}tarefa${tarefa}`)[0].value);
    // listaDias[dia].tarefas.forEach((item,index) => {
    //     item = $(`#dia${dia}tarefa${index}`)[0].value;
    // });
    listaDias[dia].tarefas = listaDias[dia].tarefas.map((item, index)=>{
        return $(`#dia${dia}tarefa${index}`)[0].value;
    });
    listaDias[dia].tarefas.splice(tarefa, 1);
    $(`#dia${dia}tarefa${tarefa}`).remove();

    // console.log("removeTarefa",listaDias[dia].tarefas);
    carregaTarefa(dia);
}