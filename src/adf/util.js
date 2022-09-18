/**
 * Wrap ADF content as an unprocessed ADF document.
 * @param {Array<ADFNode>} content An array of ADF node content.
 * @returns {ADFDocument}
 */
export const wrapADF = (content) => ({ version: 1, type: 'doc', content });

/**
 * Wrap a given string as the content of an unprocessed ADFParagraphNode.
 * @param {string} body The stirng to encapsulate.
 * @returns {ADFParagraphNode}
 */
export const wrapParagraph = (body) => ({
  type: 'paragraph',
  content: [{ type: 'text', text: body }],
});
