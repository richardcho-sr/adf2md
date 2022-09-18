/**
 * Imitate the PHP Heredoc/Nowdoc format -- dropping leading/trailing newline and whitespace chars.
 * @param {string} content
 * @returns
 */
export const heredoc = (content) => {
  let inset = content.match(/^(?<=\n)\s*/m);
  if (!inset) {
    throw new Error('Heredoc must begin with newline char.');
  }
  inset = inset[0].length;
  const regex = new RegExp(`((\\n\\s{${inset + 1}})|(\\n\\s{${inset}}))`, 'g');
  return content.replace(regex, '\n').replace(/((^\n)|(\n$))/g, '');
};

/**
 * Repeat a string or char by the given number of times.
 * @param {string} str The string or char to repeat.
 * @param {number} times The number of times to repeat the given string/char.
 * @returns string
 */
export const repeat = (str, times = 2) =>
  [...new Array(times)].map((_) => str).join('');

  