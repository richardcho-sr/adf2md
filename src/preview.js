import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import rehypeStringify from 'rehype-stringify';
import emoji from 'remark-emoji';
import remarkDirective from 'remark-directive';
import admonitionsPlugin from './admonitions/plugin';
import hljs from 'highlight.js';
import convert from './convert';

export default function preview(content, el = 'body') {
  if (typeof el === 'string') {
    el = document.querySelector(el);
  }
  if (!el) {
    throw new Error('Invalid selector given for preview target.');
  }

  content = convert(content);
  el.innerHTML = unified()
    .use(remarkParse)
    .use(remarkDirective)
    .use(admonitionsPlugin)
    .use(emoji)
    .use(remarkFrontmatter)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .processSync(content);

  hljs.highlightAll();
}
