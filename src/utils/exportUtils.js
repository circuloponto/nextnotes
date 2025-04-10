// We need to import jsPDF and htmlToText only on the client side
// to avoid hydration errors
let jsPDF;
let htmlToText;

// Only import these modules on the client side
if (typeof window !== 'undefined') {
  import('jspdf').then(module => {
    jsPDF = module.jsPDF;
  });
  
  import('html-to-text').then(module => {
    htmlToText = module.htmlToText;
  });
}

/**
 * Convert HTML content to plain text
 * @param {string} htmlContent - HTML content to convert
 * @returns {string} Plain text content
 */
export const convertToPlainText = (htmlContent) => {
  // If running on the server, return a simplified version
  if (typeof window === 'undefined' || !htmlToText) {
    return htmlContent.replace(/<[^>]*>/g, '');
  }
  
  return htmlToText(htmlContent, {
    wordwrap: 130,
    selectors: [
      { selector: 'a', options: { hideLinkHrefIfSameAsText: true } },
      { selector: 'img', format: 'skip' }
    ]
  });
};

/**
 * Convert HTML content to Markdown
 * @param {string} htmlContent - HTML content to convert
 * @returns {string} Markdown content
 */
export const convertToMarkdown = (htmlContent) => {
  // This is a simple conversion - for more complex needs, consider using a library like turndown
  let markdown = htmlContent;
  
  // Replace headings
  markdown = markdown.replace(/<h1>(.*?)<\/h1>/g, '# $1\n\n');
  markdown = markdown.replace(/<h2>(.*?)<\/h2>/g, '## $1\n\n');
  markdown = markdown.replace(/<h3>(.*?)<\/h3>/g, '### $1\n\n');
  
  // Replace paragraphs
  markdown = markdown.replace(/<p>(.*?)<\/p>/g, '$1\n\n');
  
  // Replace bold
  markdown = markdown.replace(/<strong>(.*?)<\/strong>/g, '**$1**');
  markdown = markdown.replace(/<b>(.*?)<\/b>/g, '**$1**');
  
  // Replace italic
  markdown = markdown.replace(/<em>(.*?)<\/em>/g, '*$1*');
  markdown = markdown.replace(/<i>(.*?)<\/i>/g, '*$1*');
  
  // Replace lists
  markdown = markdown.replace(/<ul>(.*?)<\/ul>/gs, (match, p1) => {
    return p1.replace(/<li>(.*?)<\/li>/g, '- $1\n');
  });
  
  markdown = markdown.replace(/<ol>(.*?)<\/ol>/gs, (match, p1) => {
    let index = 1;
    return p1.replace(/<li>(.*?)<\/li>/g, () => {
      return `${index++}. $1\n`;
    });
  });
  
  // Replace links
  markdown = markdown.replace(/<a href="(.*?)">(.*?)<\/a>/g, '[$2]($1)');
  
  // Replace line breaks
  markdown = markdown.replace(/<br\s*\/?>/g, '\n');
  
  // Remove remaining HTML tags
  markdown = markdown.replace(/<[^>]*>/g, '');
  
  // Fix extra line breaks
  markdown = markdown.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  return markdown;
};

/**
 * Export note as PDF
 * @param {Object} note - Note object with title and content
 */
export const exportAsPDF = (note) => {
  // Only run on client side
  if (typeof window === 'undefined' || !jsPDF) {
    console.error('PDF export is only available in the browser');
    return;
  }
  
  const { title, content } = note;
  
  // Create a new PDF document
  const doc = new jsPDF();
  
  // Set title
  doc.setFontSize(18);
  doc.text(title, 20, 20);
  
  // Add content
  doc.setFontSize(12);
  
  // Convert HTML to plain text for simplicity
  const textContent = convertToPlainText(content);
  
  // Split text into lines that fit the page width
  const splitText = doc.splitTextToSize(textContent, 170);
  
  // Add text with proper positioning
  doc.text(splitText, 20, 30);
  
  // Save the PDF
  doc.save(`${title.replace(/\s+/g, '_')}.pdf`);
};

/**
 * Export note as Markdown file
 * @param {Object} note - Note object with title and content
 */
export const exportAsMarkdown = (note) => {
  // Only run on client side
  if (typeof window === 'undefined') {
    console.error('Markdown export is only available in the browser');
    return;
  }
  
  const { title, content } = note;
  
  // Convert HTML to Markdown
  const markdown = `# ${title}\n\n${convertToMarkdown(content)}`;
  
  // Create a download link
  const blob = new Blob([markdown], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title.replace(/\s+/g, '_')}.md`;
  
  // Trigger download
  document.body.appendChild(a);
  a.click();
  
  // Cleanup
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Export note as plain text file
 * @param {Object} note - Note object with title and content
 */
export const exportAsText = (note) => {
  // Only run on client side
  if (typeof window === 'undefined') {
    console.error('Text export is only available in the browser');
    return;
  }
  
  const { title, content } = note;
  
  // Convert HTML to plain text
  const text = `${title}\n\n${convertToPlainText(content)}`;
  
  // Create a download link
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title.replace(/\s+/g, '_')}.txt`;
  
  // Trigger download
  document.body.appendChild(a);
  a.click();
  
  // Cleanup
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
