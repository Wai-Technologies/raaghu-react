import { test, chromium } from '@playwright/test'
import * as fs from 'fs'
import * as path from 'path'

const DEV_PORT = 6006
const CENT_PORT = 6007
const OUTPUT = 'e2e/branch-diff-report'

const STORIES = [
  { name: 'rds-button', id: 'elements-button--default' },
  { name: 'rds-badge', id: 'elements-badge--default' },
  { name: 'rds-accordion', id: 'elements-accordion--default' },
  { name: 'rds-app-bar', id: 'elements-appbar--default' },
  { name: 'rds-stepper', id: 'elements-stepper--default' },
  { name: 'rds-menu', id: 'elements-menu--default' },
  { name: 'rds-loader', id: 'elements-loader--default' },
  { name: 'rds-fab', id: 'elements-fab--default' },
  { name: 'rds-alert', id: 'elements-alert--default' },
  { name: 'rds-comp-grid', id: 'elements-grid--default' },
  { name: 'rds-comp-kanban', id: 'components-kanban-board--default' },
  { name: 'rds-comp-filter-button', id: 'components-filter-button--default' },
  { name: 'rds-comp-notification', id: 'components-notification--default' },
  { name: 'rds-comp-toast', id: 'components-toast--default' },
  { name: 'rds-comp-reviews', id: 'components-reviews--default' },
  { name: 'rds-comp-spinner', id: 'components-spinner--default' },
  { name: 'rds-comp-details-pane', id: 'components-details-pane--default' },
  { name: 'rds-comp-chat', id: 'components-chat--default' },
]

async function stableScreenshot(page, url) {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 })

  await page.addStyleTag({ content: `
    *, *::before, *::after {
      animation-duration: 0s !important;
      animation-delay: 0s !important;
      transition-duration: 0s !important;
      transition-delay: 0s !important;
    }
  ` })

  await page.evaluate(() => {
    document.body.style.background = '#ffffff'
    document.documentElement.style.colorScheme = 'light'
  })

  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(1500)

  return page.screenshot({ fullPage: false })
}

test.beforeAll(() => {
  if (fs.existsSync(OUTPUT)) {
    fs.readdirSync(OUTPUT)
      .filter((file) => file.endsWith('.png'))
      .forEach((file) => fs.unlinkSync(path.join(OUTPUT, file)))
  } else {
    fs.mkdirSync(OUTPUT, { recursive: true })
  }
})

for (const story of STORIES) {
  test(story.name, async () => {
    const browser = await chromium.launch()
    try {
      const devPage = await browser.newPage()
      await devPage.setViewportSize({ width: 1280, height: 800 })
      fs.writeFileSync(
        path.join(OUTPUT, `${story.name}--dev.png`),
        await stableScreenshot(devPage, `http://localhost:${DEV_PORT}/iframe.html?id=${story.id}&viewMode=story`),
      )
      await devPage.close()

      const centPage = await browser.newPage()
      await centPage.setViewportSize({ width: 1280, height: 800 })
      fs.writeFileSync(
        path.join(OUTPUT, `${story.name}--centralized.png`),
        await stableScreenshot(centPage, `http://localhost:${CENT_PORT}/iframe.html?id=${story.id}&viewMode=story`),
      )
      await centPage.close()

      console.log('✅ ' + story.name)
    } catch (err: any) {
      console.log('❌ SKIPPED ' + story.name + ': ' + err.message)
      fs.appendFileSync(path.join(OUTPUT, '_skipped.txt'), story.name + ': ' + err.message + '\n')
    } finally {
      await browser.close()
    }
  })
}