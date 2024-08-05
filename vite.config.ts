import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    disableConsoleIntercept: false,
    browser: {
      enabled: true,
      name: 'chrome'
    }
  }
})
