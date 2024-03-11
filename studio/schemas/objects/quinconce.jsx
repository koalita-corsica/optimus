import { defineType } from 'sanity'

export default defineType({
  name: 'quinconce',
  type: 'array',
  title: 'Paragraphes en quinconce',
  of: [{type: 'combi'}],
})