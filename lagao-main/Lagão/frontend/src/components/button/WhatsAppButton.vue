<template>
  <a
    :href="whatsappLink"
    target="_blank"
    class="whatsapp-button"
    aria-label="Fale conosco no WhatsApp"
  >
    <img src="/WhatsApp.svg" alt="WhatsApp" class="whatsapp-icon" />
  </a>
</template>

<script>
export default {
  computed: {
    whatsappLink() {
      const telefone = "5561998385830"; // Número da Lagão (formato internacional)
      const mensagem = encodeURIComponent("Olá! Gostaria de mais informações.");
      return `https://wa.me/${telefone}?text=${mensagem}`;
    }
  }
};
</script>

<style>
.whatsapp-button {
  position: fixed;
  top: 30vh;
  right: 40px;
  width: 60px;
  height: 60px;
  background-color: #25d366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 1000;
  transform: translateY(-50%);
}

.whatsapp-button:hover {
  background-color: #1ebe5d;
}

.whatsapp-icon {
  width: 35px;
  height: 35px;
}
</style>
