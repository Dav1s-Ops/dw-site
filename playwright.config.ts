import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    use: { baseURL: 'http://localhost:4321' },
    webServer: {
        command: 'npm run build && npm run preview',
        url: 'http://localhost:4321',
        reuseExistingServer: true,
        timeout: 180_000
    },
    projects: [
       { name: 'phone', use: { viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true } },
        { name: 'tablet', use: { viewport: { width: 768, height: 1024 }, hasTouch: true } },
        { name: 'desktop', use: { viewport: { width: 1280, height: 800 } } },
    ], 
});