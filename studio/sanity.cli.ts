import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '01xufuk5',
    dataset: 'production',
  },
  graphql: [
    {
      playground: true,
    }
  ]
})
