import type { DefaultTheme } from 'vitepress/theme'
import { defineUserConfig } from 'vitepress-export-pdf'

import userConfig from './config.mts'


function extractLinksFromConfig(config: DefaultTheme.Config) {
  const links: string[] = []

  function extractLinks(obj: any) {
    if (obj.hasOwnProperty('link')) {
      links.push(obj?.link);
    } else if (obj.hasOwnProperty('items')) {
      obj.items.forEach(item => extractLinks(item));
    }
  }

  for (const value of (config.sidebar as any)["/"].items)
    extractLinks(value)

  return links
}

const links = extractLinksFromConfig(userConfig.themeConfig!)


const routeOrder = [
  '/index.html',
  ...links,
]

console.log('routeOrder==>', routeOrder);


const headerTemplate = `<div style="margin-top: -0.4cm; height: 70%; width: 100%; display: flex; justify-content: center; align-items: center; color: lightgray; border-bottom: solid lightgray 1px; font-size: 10px;">
  <span class="title"></span>
</div>`

const footerTemplate = `<div style="margin-bottom: -0.4cm; height: 70%; width: 100%; display: flex; justify-content: flex-start; align-items: center; color: lightgray; border-top: solid lightgray 1px; font-size: 10px;">
  <span style="margin-left: 15px;" class="url"></span>
</div>`

const configs = defineUserConfig({
  outFile: 'ufactory_docs_cn.pdf',
  outDir: 'pdf',
  routePatterns: ['!/server/**/**.*', '!/en/index.*', '!/**/index.*', '!/en/**'],
  pdfOptions: {
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: false,
    headerTemplate,
    footerTemplate,
    margin: {
      bottom: 60,
      left: 25,
      right: 25,
      top: 60,
    },
  },
  urlOrigin: 'https://testdocs.ufactory.cc/',
  sorter: (pageA, pageB) => {
    const aIndex = routeOrder.findIndex(route => route === pageA.path)
    const bIndex = routeOrder.findIndex(route => route === pageB.path)
    return aIndex - bIndex
  },
})


// console.log('configs', configs);

export default configs