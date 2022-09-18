import { heredoc, repeat } from '../../util/strings';
import { wrapADF, wrapParagraph } from '../util';

/**
 * Handle an ADF panel node during document traversal.
 * @param {Function} adfHandler The ADF handler function.
 * @param {ADFPanelNode} panelNode The panel node to process.
 * @returns {ADFParagraphNode}
 */
export const handlePanelNode = (
  adfHandler,
  { attrs: { panelType: type }, content },
) => {
  type = {
    warning: 'warning',
    error: 'danger',
    note: 'note',
    tip: 'tip',
    success: 'success',
    info: 'info',
  }[type];

  content = adfHandler(wrapADF(content));
  content = heredoc(`
        :::${type}
  
        ${content}
        

        :::
        `);

  return wrapParagraph(content);
};

/**
 * Handle an ADF code block node during document traversal.
 * @param {ADFCodeBlockNode} codeBlockNode The code block node to process.
 * @returns {ADFParagraphNode}
 */
export const handleCodeBlockNode = ({
  attrs: { language: lang = 'plaintext' },
  content: [{ text }],
}) => {
  let content = heredoc(`
    \`\`\`${lang}
    ${text}
    \`\`\`
    `);
  return wrapParagraph(content);
};

/**
 * Handle an ADF heading node during document traversal.
 * @param {ADFHeadingNode} headingNode The heading node to process.
 * @returns string
 */
export const handleHeadingNode = ({ attrs: { level }, content: [text] }) =>
  `${repeat('#', level)} ${text}`;

/**
 * Handle an ADF paragraph node during document traversal.
 * @param {ADFParagraphNode} paragraphNode The paragraph node to process.
 * @returns {string}
 */
export const handleParagraphNode = ({ content }) => {
  return content.join('');
};

/**
 * Handle an ADF rule node during document traversal.
 * @param {ADFRuleNode} ruleNode The rule node to process.
 * @returns {string}
 */
export const handleRuleNode = () => '---';

/**
 *
 * @param {ADFBlockquoteNode} param0 The blockquote node to process.
 * @returns  {string}
 */
export const handleBlockquoteNode = ({ content }) =>
  content.map((line) => `> ${line}`).join('\n>\n');
