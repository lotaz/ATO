export const sanitizeHtml = (content) => {
  if (!content) return '';
  
  // Ensure content is wrapped in a container
  let sanitizedContent = content;
  
  // Wrap plain text (not in p tags) with p tags
  sanitizedContent = sanitizedContent.replace(/(?<!>)([^<]+)(?!<)/g, '<p>$1</p>');
  
  // Remove empty paragraphs
  sanitizedContent = sanitizedContent.replace(/<p>\s*<\/p>/g, '');
  
  // Ensure images have proper attributes
  sanitizedContent = sanitizedContent.replace(/<img/g, '<img loading="lazy"');
  
  return sanitizedContent;
};