<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  export let inputText: string = '';

  function handleInput() {
    dispatch('textChange', inputText);
  }
</script>

<textarea
  bind:value={inputText}
  on:input={handleInput}
  class="glass-box"
  placeholder="Escribe o pega tu texto aquí..."
  style="resize: none;"
/>
