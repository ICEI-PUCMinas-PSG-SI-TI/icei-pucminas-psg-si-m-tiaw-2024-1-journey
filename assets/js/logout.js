function logout() {
  const usuario = localStorage.getItem("usuario");
  localStorage.removeItem("usuario");
  window.location.href = window.location.origin + "/Tela-Login/index.html";
}