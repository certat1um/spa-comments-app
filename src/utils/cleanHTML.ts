import sanitizeHtml from 'sanitize-html';

export const cleanHTML = (text: string) => {
  return sanitizeHtml(text, {
    allowedTags: ['a', 'code', 'i', 'strong'],
    allowedAttributes: {
      a: ['href', 'title'],
    },
  });
};
