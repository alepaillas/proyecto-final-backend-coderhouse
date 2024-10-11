document.addEventListener("DOMContentLoaded", function () {
  const logoutButtons = document.querySelectorAll("#logoutButton");

  logoutButtons.forEach((button) => {
    button.addEventListener("click", async function (event) {
      event.preventDefault(); // Evita el comportamiento predeterminado del enlace

      try {
        const response = await fetch("/api/session/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();

        if (response.ok) {
          alert(result.msg); // Mostrar mensaje de éxito
          // Redirigir al usuario a la página de inicio de sesión u otra página
          window.location.href = "/";
        } else {
          alert(result.msg); // Mostrar mensaje de error
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error al cerrar sesión. Inténtalo de nuevo más tarde.");
      }
    });
  });
});
