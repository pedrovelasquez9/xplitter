<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  const dispatch = createEventDispatcher();

  let isVisible = false;
  let picker: HTMLElement | null = null;

  onMount(() => {
    import('emoji-picker-element').then(() => {
      picker = document.createElement('emoji-picker');
      picker.addEventListener('emoji-click', (event: any) => {
        dispatch('emojiSelect', event.detail.unicode);
        isVisible = false; // Ocultar después de seleccionar
      });
      const container = document.getElementById('emoji-picker-container');
      if (container) {
        container.appendChild(picker);
      }
    });
  });

  function togglePicker() {
    isVisible = !isVisible;
  }
</script>

<div class="emoji-wrapper">
  <button on:click={togglePicker}> 😀 </button>
  <div id="emoji-picker-container" class:visible={isVisible}>
    {#if isVisible}
      <!-- El picker se insertará aquí -->
    {/if}
  </div>
</div>

<style>
  @media (max-width: 768px) {
    .emoji-wrapper {
      display: none;
    }
  }

  .emoji-wrapper {
    position: relative;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5em;
    padding: 0.2em;
  }

  #emoji-picker-container {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
  }

  #emoji-picker-container.visible {
    display: block;
  }
</style>
