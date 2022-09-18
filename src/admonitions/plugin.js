import { visit } from 'unist-util-visit';
import { h } from 'hastscript';

export default function plugin() {
  const styles = ['note', 'tip', 'info', 'warning', 'danger', 'success'];
  return (tree) => {
    visit(tree, (node) => {
      const { name: style } = node;
      if (node.type === 'containerDirective') {
        if (!styles.includes(style)) {
          return;
        }

        // main
        Object.assign(node, {
          data: {
            hName: 'div',
            hProperties: h('div', { class: `admonition ${style}` }).properties,
          },
        });

        // edge highlight
        const edge = h('div', { class: 'edge' });
        Object.assign(edge, { data: { hProperties: edge.properties } });

        // colourized overlay
        const overlay = h('div', { class: 'overlay' });
        Object.assign(overlay, {
          data: { hProperties: overlay.properties },
          children: [h('div')],
        });

        // primary content
        const content = h('div', { class: 'content' });
        Object.assign(content, {
          data: { hProperties: content.properties },
          children: [
            Object.assign(h('div'), {
              data: { hProperties: h('div', { class: 'title' }).properties },
              children: [
                Object.assign(h('i'), { data: { hName: 'i' } }),
                Object.assign(h('span'), { data: { hName: 'span' } }),
              ],
            }),

            Object.assign(h('div'), {
              data: { hProperties: h('div', { class: 'body' }).properties },
              children: [...node.children],
            }),
          ],
        });

        node.children = [edge, overlay, content];
      }
    });
  };
}
