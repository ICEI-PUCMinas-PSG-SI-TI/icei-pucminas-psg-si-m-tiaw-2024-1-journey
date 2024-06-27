// Função para adicionar uma nova reclamação
function newTask() {
    const sacInput = document.getElementById("sacInput");
    const novaReclamacao = sacInput.value.trim();

    if (novaReclamacao) {
        $.ajax({
            url: apiUrl +"/reclamacoes",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ texto: novaReclamacao }),
            success: function() {
                sacInput.value = "";
                alert("Observação enviada com sucesso!");
            },
            error: function(error) {
                console.error("Erro ao adicionar a reclamação:", error);
            }
        });
    } else {
        alert("Por favor, digite uma observação antes de enviar.");
    }
}
// Carregar reclamações quando a página é carregada
window.onload = loadReclamacoes;
