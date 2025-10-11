export function splitIntoTweets(text: string): string[] {
  const TWEET_MAX_LENGTH = 280;
  const tweets: string[] = [];

  const paragraphs = text
    .split(/\n+/)
    .map(paragraph => paragraph.trim())
    .filter(Boolean);

  for (const paragraph of paragraphs) {
    if (paragraph.length <= TWEET_MAX_LENGTH) {
      tweets.push(paragraph);
      continue;
    }

    tweets.push(...splitLongParagraph(paragraph, TWEET_MAX_LENGTH));
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
