function logout() {
  const usuario = localStorage.getItem("usuario");
  localStorage.removeItem("usuario");
  window.location.href = "../Tela-Login/index.html";
}