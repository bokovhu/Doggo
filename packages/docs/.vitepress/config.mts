import { defineConfig } from 'vitepress'
import tasklist from 'markdown-it-task-lists'
import markdownItTextualUml from 'markdown-it-textual-uml';

export default defineConfig({
  title: "Doggo",
  description: "Dogfighting Simulation",
  head: [['link', { rel: 'icon', href: 'https://i.ibb.co/F6NMTSd/DALL-E-2024-01-11-17-03-47-A-playful-and-engaging-logo-for-a-simulation-game-application-named-Dogo.png' }]],
  markdown: {
    config: (md) => {
      md
        .use(markdownItTextualUml)
        .use(tasklist)
    }
  },
  themeConfig: {
    nav: [
      { text: 'Intro', link: '/01-Intro/01-Summary' },
      { text: 'Main', link: '/02-Main/00-Overview' },
      { text: 'Outro', link: '/03-Outro/01-Summary' },
    ],
    logo: "https://i.ibb.co/F6NMTSd/DALL-E-2024-01-11-17-03-47-A-playful-and-engaging-logo-for-a-simulation-game-application-named-Dogo.png",
    sidebar: [
      {
        text: 'Intro',
        items: [
          { text: 'Summary', link: '/01-Intro/01-Summary.md' },
        ]
      },
      {
        text: 'Main',
        items: [
          { text: 'Overview', link: '/02-Main/00-Overview' },
          { text: 'Milestone 1', link: '/02-Main/01-Milestone/01-Journal' },
          { text: 'Test Match 123', link: '/02-Main/01-Milestone/02-Test-Match' },
          { text: 'Test Match 456', link: '/02-Main/01-Milestone/02-Test-Match-456' },
          { text: 'First 5k Cards', link: '/02-Main/01-Milestone/03-First-5000-Cards' },
        ]
      },
      {
        text: 'Outro',
        items: [
          { text: 'Summary', link: '/03-Outro/01-Summary' },
        ]
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/bokovhu/doggo' }
    ]
  }
})
