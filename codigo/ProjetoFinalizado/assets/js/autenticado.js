$(document).ready(function () {
  // Pega o usuario no localStorage
  let usuario = localStorage.getItem("usuario");
  // Verifica se ele é existente
  if(!usuario){
      // Se não existir redireciona para o login
      // window.location.href = window.location.origin + "/Tela-Login/index.html";
      window.location.href = "../Tela-Login/index.html";
  }
})