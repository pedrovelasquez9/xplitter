export function splitIntoTweets(text: string): string[] {
  const TWEET_MAX_LENGTH = 280;
  const tweets: string[] = [];

  const paragraphs = text.split(/\n/).map(p => p.trim()).filter(p => p.length > 0);

  let currentTweet = '';

  for (const paragraph of paragraphs) {
    if (currentTweet.length + paragraph.length + 1 <= TWEET_MAX_LENGTH) {
      currentTweet = currentTweet
        ? currentTweet + '\n' + paragraph
        : paragraph;
    } else {
      if (currentTweet) {
        tweets.push(currentTweet);
        currentTweet = '';
      }

      if (paragraph.length > TWEET_MAX_LENGTH) {
        const chunks = splitLongParagraph(paragraph, TWEET_MAX_LENGTH);
        tweets.push(...chunks);
      } else {
        currentTweet = paragraph;
      }
    }
  }

  if (currentTweet) {
    tweets.push(currentTweet);
  }

  return tweets;
}

function splitLongParagraph(paragraph: string, maxLength: number): string[] {
  const chunks: string[] = [];
  let remainingText = paragraph;

  while (remainingText.length > 0) {
    const chunk = extractChunk(remainingText, maxLength);
    chunks.push(chunk);
    remainingText = remainingText.slice(chunk.length).trim();
  }

  return chunks;
}

function extractChunk(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;

  const chunk = text.slice(0, maxLength);
  const lastSpaceIndex = chunk.lastIndexOf(' ');

  return lastSpaceIndex > 0 ? chunk.slice(0, lastSpaceIndex).trim() : chunk;
}
