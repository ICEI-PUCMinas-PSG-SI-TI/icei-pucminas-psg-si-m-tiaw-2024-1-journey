let selectedGender = "";

function FormatarData(input) {
    // Remove todos os caracteres não numéricos
    const limparespaco= ('' + input.value).replace(/\D/g, '');
    const match = limparespaco.match(/^(\d{2})(\d{2})(\d{0,4})$/);
    if (match) {
        input.value = [match[1], match[2], match[3]].filter(Boolean).join('/');
    }
}

function SelecionarGenero(element) {
    // Remove a classe 'active' de todos os botões de gênero
    document.querySelectorAll('.gender-button').forEach(btn => btn.classList.remove('active'));
    // Adiciona a classe 'active' ao botão clicado
    element.classList.add('active');
    // Define o gênero selecionado
    generoSelecionado = element.textContent;
}

async function CriarConta() {
    // Obtenha os valores dos campos
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    const data = document.getElementById('data').value;
    const fone = document.getElementById('fone').value;
    const senha = document.getElementById('senha').value;

    let fotoUsuario = "";

    const fileInput = document.getElementById('foto');
    const foto = fileInput.files[0];
    // Validação
    if (!nome || !email || !data || !fone || !generoSelecionado) {
        alert("Por favor, preencha todos os campos.");
        return;
    }
    if (foto) {
        const reader = new FileReader();

        reader.onload = async (e) => {
            const base64String = e.target.result;
            console.log(base64String); // Exibe a string Base64 no console
            fotoUsuario = base64String;
            // console.log(fotoUsuario);
            // Exibir a string Base64 na página
            // $('#output').text(base64String);
            fetch (apiUrl + "/usuarios",{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "nome":nome,
                    "email":email,
                    "telefone": fone,
                    "nascimento": data,
                    "genero": generoSelecionado,
                    "senha": senha,
                    "foto": fotoUsuario,
                })
            })
        };

        // reader.onerror = function(error) {
        //     console.error('Error: ', error);
        // };

        console.log(reader.readAsDataURL(foto));
    }
    alert("Conta criada com sucesso!")

}
