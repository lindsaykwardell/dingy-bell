import { defineConfig, Preset } from '@vite-pwa/assets-generator/config'

const preset: Preset = {
  transparent: {
    sizes: [30, 32, 44, 48, 64, 71, 89, 107, 128, 142, 150, 192, 256, 284, 310, 512],
    favicons: [
      [48, 'favicon.ico'],
      [256, 'icon.ico']
    ]
  },
  maskable: {
    sizes: [512]
  },
  apple: {
    sizes: [180]
  }
}

export default defineConfig({
  headLinkOptions: {
    preset: '2023'
  },
  preset,
  images: ['public/logo.svg']
})
