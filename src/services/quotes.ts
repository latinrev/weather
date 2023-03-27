
export const getQuote = async () => {
    const rawQuote = await fetch("", {
      next: { revalidate: 60 },
    });
    const { content, author } = await rawQuote.json();
    return { quote: content, author };
  };