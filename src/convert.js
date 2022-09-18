import { handleADF } from './adf/index.js';

export default function convert(content) {
  // try adf json first
  if (typeof content === 'string') {
    try {
      content = JSON.parse(content);
    } catch (_) {
      // no op
    }
  }

  return typeof content === 'object' ? handleADF(content) : 'not yet';
}
