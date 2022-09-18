/**
 * Handle an ADF table row node during document traversal.
 * @param {ADFTableRowNode} param0 The table row node to process.
 * @returns {string}
 */
export const handleTableRowNode = ({ content }) => `|${content.join('|')}|`;

/**
 * Handle an ADF table node during document traversal.
 * @param {ADFTableNode} param0 The table node to process.
 * @returns {string}
 */
export const handleTableNode = ({ content }) =>
  [
    content[0],
    `${content[0]
      .split(/.\|./)
      .map((_) => '|:---')
      .join('')}|`,
    ...content.slice(1),
  ].join('\n');

/**
 * Handle an ADF table header node during document traversal.
 * @param {ADFTableHeaderNode} param0 The table header node to process.
 * @returns {string}
 */
export const handleTableHeaderNode = ({ content }) => content.join('');

/**
 * Handle an ADF table cell node during document traversal.
 * @param {ADFTableCellNode} param0 The cell header node to process.
 * @returns {string}
 */
export const handleTableCellNode = ({ content }) => content.join('');
