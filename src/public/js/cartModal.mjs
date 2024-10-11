document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector('[role="dialog"]');
  const closeButton = modal.querySelector('button[aria-label="Close panel"]');

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

  // Example: Open the modal when a button is clicked
  document
    .querySelector("#openModalButton")
    .addEventListener("click", openModal);
});
