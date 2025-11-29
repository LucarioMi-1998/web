(() => {
  const backdrop = document.getElementById("modal-backdrop");
  const modalContent = document.getElementById("modal-content");
  const closeBtn = backdrop.querySelector(".modal-close");

  let lastFocused = null;

  function openModal(templateId){
    const tpl = document.getElementById(templateId);
    if (!tpl) return;

    lastFocused = document.activeElement;

    modalContent.innerHTML = "";
    modalContent.appendChild(tpl.content.cloneNode(true));

    
    // Slider-Animation resetten (startet bei jedem Öffnen sauber)
    const track = modalContent.querySelector(".modal-slider-track");
    if (track) {
      track.style.animation = "none";
      track.offsetHeight; // reflow
      track.style.animation = "";
    }
backdrop.classList.add("is-open");
    backdrop.setAttribute("aria-hidden", "false");

    closeBtn.focus();
    document.body.style.overflow = "hidden";
  }

  function closeModal(){
    backdrop.classList.remove("is-open");
    backdrop.setAttribute("aria-hidden", "true");
    modalContent.innerHTML = "";

    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  // Öffnen: jedes Element mit data-modal
  document.querySelectorAll("[data-modal]").forEach(el => {
    el.style.cursor = "pointer";
    el.addEventListener("click", () => openModal(el.dataset.modal));
  });

  // Schließen
  closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && backdrop.classList.contains("is-open")) closeModal();
  });
})();
