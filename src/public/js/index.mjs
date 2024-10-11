document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector("#shoppingCartModal");
  const closeButton = modal.querySelector('button[aria-label="Close panel"]');
  const backdrop = document.querySelector("#modalBackdrop");
  const modalContent = document.querySelector("#modalContent");

  function openModal() {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }

  function closeModal() {
    modal.classList.remove("flex");
    modal.classList.add("hidden");
  }

  if (closeButton) {
    closeButton.addEventListener("click", closeModal);
  }

  if (backdrop) {
    backdrop.addEventListener("click", closeModal);
  }

  if (modalContent) {
    modalContent.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  }

  // Example: Open the modal when a button is clicked
  document
    .querySelector("#openModalButton")
    .addEventListener("click", openModal);
});

document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(
    'button[aria-label="Abrir menu principal"]',
  );
  const closeButton = document.querySelector(
    'button[aria-label="Cerrar menu"]',
  );
  const mobileMenu = document.querySelector("#mobileMenu");

  menuButton.addEventListener("click", function () {
    mobileMenu.classList.remove("hidden");
  });

  closeButton.addEventListener("click", function () {
    mobileMenu.classList.add("hidden");
  });
});
