import { repeat } from "../../util/strings";

/**
 * Handle an ADF ordered or unordered list node during document traversal.
 * @param {ADFBulletList | ADFOrderedList} param0 The list to process.
 * @param {number} level The level of nesting at which to process.
 * @returns
 */
export const handleList = ({ content, type }, level = 0) =>
  content.flatMap((item, i) => handleListItem(item, i, type, level)).join('\n');

/**
 * Handle an ADF unordered list member list item during document traversal.
 * @param {ADFListItem} item The unordered list item to process.
 * @param {number} level The level of nesting at which to process.
 * @returns {string}
 */
export const handleBulletItem = (item, level) =>
  `${repeat(' ', level * 2)}* ${item}`;

/**
 * Handle an ADF ordered list member list item during document traversal.
 * @param {ADFListItem} item The ordered list item to process.
 * @param {number} level The level of nesting at which to process.
 * @returns {string}
 */
export const handleOrderedItem = (item, iterator, level) =>
  `${repeat(' ', level * 3)}${iterator + 1}. ${item}`;

/**
 *
 * @param {ADFListItem} param0 The list item to process.
 * @param {number} iterator The present list item number.
 * @param {'orderedList'|'bulletList'} type The type of list of which the list item is a member.
 * @param {number} level The level of nesting at which to process.
 * @returns {object}
 */
export const handleListItem = ({ content }, iterator, type, level = 0) => {
  return content.flatMap((item) =>
    typeof item === 'object'
      ? handleList(item, level + 1)
      : type === 'orderedList'
      ? handleOrderedItem(item, iterator, level)
      : handleBulletItem(item, level),
  );
};
