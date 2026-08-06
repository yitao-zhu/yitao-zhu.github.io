document.addEventListener("DOMContentLoaded", () => {
  if (window.__wechatModalInitialized) return;

  const modal = document.getElementById("WeChatMod");
  const buttons = document.querySelectorAll('[id="WeChatBtn"]');
  if (!modal || buttons.length === 0) return;

  window.__wechatModalInitialized = true;
  let activeButton = null;

  // The blurred navbar creates its own containing block. Moving the dialog to
  // the body keeps fixed positioning relative to the full viewport.
  document.body.appendChild(modal);

  function openModal(button) {
    activeButton = button;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("wechat-modal-open");
    buttons.forEach((item) => item.setAttribute("aria-expanded", "true"));
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("wechat-modal-open");
    buttons.forEach((item) => item.setAttribute("aria-expanded", "false"));
    activeButton?.focus();
    activeButton = null;
  }

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      openModal(button);
    });

    button.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openModal(button);
      }
    });
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });
});
