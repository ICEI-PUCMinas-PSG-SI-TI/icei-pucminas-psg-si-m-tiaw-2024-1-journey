function salvaFeedback() {
    const fotoInput = document.getElementById("fotoInput");
    const nomeInput = document.getElementById("nomeInput");
    const feedInput = document.getElementById("feedInput");
    const feedback = feedInput.value.trim();
    const nome = nomeInput.value.trim();
    const foto = fotoInput.value.trim();

    if (feedback) {
        $.ajax({
            url: "http://localhost:3000/feedback",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ 
                foto: foto,
                nome: nome,
                feedback: feedback
            }),
            success: function() {
                sacInput.value = "";
                alert("Feedback enviada com sucesso!");
            },
            error: function(error) {
                console.error("Erro ao adicionar a feedback:", error);
            }
        });
    } else {
        alert("Por favor, digite uma observação antes de enviar.");
    }
}