
export const QUOTES_URL = "https://api.quotable.io/random?tags=inspirational&minLength=40&maxLength=140"
export const getQuote = async () => {
  const rawQuote = await fetch("", {
    next: { revalidate: 60 },
  });
  const { content, author } = await rawQuote.json();
  return { quote: content, author };
};