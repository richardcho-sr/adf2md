import { traverse } from '@atlaskit/adf-utils/traverse';
import {
  handleBlockquoteNode,
  handleCodeBlockNode,
  handleHeadingNode,
  handlePanelNode,
  handleParagraphNode,
  handleRuleNode,
} from './nodes/block';
import {
  handleEmojiNode,
  handleHardBreakNode,
  handleTextNode,
} from './nodes/inline';
import { handleList } from './nodes/list';
import {
  handleTableCellNode,
  handleTableHeaderNode,
  handleTableNode,
  handleTableRowNode,
} from './nodes/table';

const stashStore = [];
const stash = (doc) =>
  doc.content.map((entity) =>
    typeof entity === 'object'
      ? entity
      : (stashStore.push(entity),
        { type: 'placeholder', attrs: { index: stashStore.length - 1 } }),
  );

const applyStash = (doc) =>
  doc.content.map((entity) =>
    entity.type === 'placeholder' ? stashStore[entity.attrs.index] : entity,
  );

/**
 * Convert an ADF document into remark-compliant markdown.
 * @param {ADFDocument} doc The ADF document to process into markdown.
 * @returns {string}
 */
export const handleADF = (doc) => {
  // special block elements
  doc = traverse(doc, {
    panel: (node) => handlePanelNode(handleADF, node),
    codeBlock: handleCodeBlockNode,
  });

  // basic inline elements
  doc = traverse(doc, {
    text: handleTextNode,
    hardBreak: handleHardBreakNode,
    emoji: handleEmojiNode,
  });

  // simple block elements
  doc = traverse(doc, {
    heading: handleHeadingNode,
    paragraph: handleParagraphNode,
    rule: handleRuleNode,
  });

  // begin stashing final strings
  doc.content = stash(doc);

  // nesting block elements
  doc = traverse(doc, {
    tableHeader: handleTableHeaderNode,
    tableCell: handleTableCellNode,
    bulletList: (list) => handleList(list, 0),
    orderedList: (list) => handleList(list, 0),
    blockquote: handleBlockquoteNode,
  });

  // stash final strings
  doc.content = stash(doc);

  // table rows
  doc = traverse(doc, {
    tableRow: handleTableRowNode,
  });

  // outer table
  doc = traverse(doc, {
    table: handleTableNode,
  });

  // restore strings
  doc.content = applyStash(doc);

  // clear empty paragraphs
  if (!!doc.content)
    doc.content = doc.content.filter((entity) =>
      typeof entity === 'string'
        ? true
        : typeof entity === 'object' &&
          entity.type === 'paragraph' &&
          !entity.content.length
        ? false
        : true,
    );

  return doc.content.join('\n\n');
};
