let selectedGender = "";

function Login() {
    // Obtenha os valores dos campos
    // const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // const data = document.getElementById('data').value;
    // const fone = document.getElementById('fone').value;

    // Validação
    // if (!nome || !email || !data || !fone || !generoSelecionado) {
    //     alert("Por favor, preencha todos os campos.");
    // }
    console.log("Dados", {email, senha});
    let params = {
        email: email,
        senha: senha,
    }
    let query = new URLSearchParams(params).toString();
    console.log("Aqui", apiUrl);
    fetch (`${apiUrl}/usuarios?${query}`,{
        method:'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {return response.json()})
    .then((data) => {
        let usuarioData = data[0];
        if(email === usuarioData.email.toString() && senha === usuarioData.senha.toString()){
            delete usuarioData.senha; // Remove a senha do json
            localStorage.setItem("usuario", JSON.stringify(usuarioData));
            //Redireciona para a tela principal
            console.log(window.location.origin)
            window.location.href = "../Tela-Minhas Viagens/minhasviagens.html";
        }else{
            alert("Usuario ou senha incorretos!")
        }
    })

}
