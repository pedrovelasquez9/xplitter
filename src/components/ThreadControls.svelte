<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import clipboardIcon from '/icons/clipboard.svg?url';
  import resetIcon from '/icons/refresh.svg?url';

  const dispatch = createEventDispatcher();
  function copyAll() {
    dispatch('copy');
  }

  function reset() {
    dispatch('reset');
  }
</script>

<div class="btn-controls-container">
  <button class="glass-box control-btn" on:click={copyAll}>
    <img src={clipboardIcon} class="btn-icon" alt="Copiar hilo completo" />
    Copiar hilo completo
  </button>
  <button class="glass-box control-btn" on:click={reset}>
    <img src={resetIcon} class="btn-icon" alt="Resetear" />
    Resetear
  </button>
</div>
