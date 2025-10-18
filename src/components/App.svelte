<script lang="ts">
  import TextInput from './TextInput.svelte';
  import ThreadControls from './ThreadControls.svelte';
  import ThreadPreview from './ThreadPreview.svelte';
  import { splitIntoTweets } from '../utils/threadSplitter';
  import Notification from './Notification.svelte';

  let inputText = '';
  let tweets: string[] = [];
  let showNotification = false;
  let notificationMessage = '';

  function handleTextChange(event: CustomEvent<string>) {
    inputText = event.detail;
    tweets = splitIntoTweets(inputText);
  }

  function copyThread() {
    const text = tweets.join('\n\n');
    navigator.clipboard.writeText(text);
    notificationMessage = '¡Hilo copiado al portapapeles!';
    showNotification = true;
    hideNotification();
  }

  function handleCopyTweet(tweet: CustomEvent<string>) {
    navigator.clipboard.writeText(tweet.detail);
    notificationMessage = '¡Tweet copiado al portapapeles!';
    showNotification = true;
    hideNotification();
  }

  function resetThread() {
    inputText = '';
    tweets = [];
  }

  function hideNotification() {
    setTimeout(() => {
      showNotification = false;
    }, 1000);
  }

  function handleEmojiSelect(emoji: CustomEvent<string>) {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const cursorPos = textarea.selectionStart ?? inputText.length;
    const newCursorPos = cursorPos + emoji.detail.length;

    inputText = inputText.slice(0, cursorPos) + emoji.detail + inputText.slice(cursorPos);
    tweets = splitIntoTweets(inputText);

    // Esperamos al siguiente ciclo para asegurar que el DOM se ha actualizado
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  }
</script>

<div class="app">
  <div>
    <TextInput on:textChange={handleTextChange} bind:inputText />
    <ThreadControls
      on:copy={copyThread}
      on:reset={resetThread}
      on:emojiSelect={handleEmojiSelect}
    />
  </div>
  <ThreadPreview {tweets} on:copyTweet={(tweet) => handleCopyTweet(tweet)} />
  <div class="notification">
    {#if showNotification}
      <Notification message={notificationMessage} />
    {/if}
  </div>
</div>
