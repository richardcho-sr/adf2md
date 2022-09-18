/**
 * Return strong/bold markdown chars where specified by included marks.
 * @param {ADFTextNode} textNode The inline text node to process.
 * @returns
 */
export const strong = ({ marks = [] }) =>
  marks.map(({ type }) => type).includes('strong') ? '**' : '';

/**
 * Return italic markdown chars where specified by included marks.
 * @param {ADFTextNode} textNode The inline text node to process.
 * @returns
 */
export const italic = ({ marks = [] }) =>
  marks.map(({ type }) => type).includes('em') ? '_' : '';

/**
 * Wrap the given text as a markdown link, where specified by included marks.
 * @param {ADFTextNode} textNode The inline text node to process.
 * @returns
 */
export const link = ({ text, marks = [] }) => (
  (ln = marks.find(({ type }) => type === 'link')),
  ln ? `[${text}](${ln.attrs.href})` : text
);

/**
 * Wrap the given text as a markdown inline-code segment, where specified by included marks.
 * @param {ADFTextNode} textNode The inline text node to process.
 * @returns
 */
export const code = ({ text, marks = [] }) => (
  (ln = marks.find(({ type }) => type === 'code')),
  (txt = ln ? `\`${text}\`` : text),
  { text: txt, marks }
);

/**
 * Handle an ADF text node during document traversal.
 * @param {ADFTextNode} textNode The text node to process.
 * @returns string
 */
export const handleTextNode = (t) =>
  `${italic(t)}${strong(t)}${link(code(t))}${strong(t)}${italic(t)}`;

/**
 * Handle an ADF emoji node during document traversal.
 * @param {ADFEmojiNode} emojiNode The string node to process.
 * @returns string
 */
export const handleEmojiNode = ({ attrs: { shortName } }) => shortName;

/**
 * Handle an ADF hardBreak node during document traversal.
 * @param {ADFHardBreakNode} hardBreakNode The panel node to process.
 * @returns string
 */
export const handleHardBreakNode = () => '\n\n';


