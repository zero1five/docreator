const visit = require('unist-util-visit')

module.exports = () => tree => {
  visit(tree, 'heading', node => {
    visit(node, 'text', textNode => {
      textNode.value = textNode.value + ' custom'
    })
  })
}
