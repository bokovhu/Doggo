import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Dogo",
  description: "Dogfighting Simulation",
  head: [['link', { rel: 'icon', href: 'https://i.ibb.co/F6NMTSd/DALL-E-2024-01-11-17-03-47-A-playful-and-engaging-logo-for-a-simulation-game-application-named-Dogo.png' }]],
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
      { icon: 'github', link: 'https://github.com/bokovhu/aleph-hack-2024-game' }
    ]
  }
})
