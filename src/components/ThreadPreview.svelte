<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade, fly, slide } from 'svelte/transition';
  import clipboardIcon from '/icons/clipboard.svg?url';

  export let tweets: string[] = [];
  const dispatch = createEventDispatcher();

  function copyTweet(tweet: string) {
    dispatch('copyTweet', tweet);
  }
</script>

<div class="thread-preview">
  {#if tweets.length > 0}
    {#each tweets as tweet, i}
      <div
        class="tweet glass-box"
        in:slide={{ duration: 300, delay: i * 150 }}
        out:slide={{ duration: 300, delay: i * 150 }}
      >
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <div class="tweet-user-container">
          <img src="https://avatar.iran.liara.run/public" alt="avatar image" width="50" />
          <div class="tweet-user-info">
            <p>Awesome username</p>
            <p>@awesomeusername</p>
          </div>
        </div>
        <p>{tweet}</p>
        <div class="tweet-button-container">
          <button class="btn-icon glass-box tweet-copy-icon" on:click={() => copyTweet(tweet)}
            ><img src={clipboardIcon} alt="Copiar hilo completo" /></button
          >
        </div>
      </div>
    {/each}
  {/if}
</div>

<style>
  .thread-preview {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .tweet {
    transform-origin: top;
    will-change: transform, opacity;
  }

  :global(.tweet) {
    opacity: 0;
    animation: fadeIn 0.3s ease-out forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
