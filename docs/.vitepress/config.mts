import { defineConfig } from 'vitepress';
import autoGenerateNavItems from './utils/generateNav';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    markdown: {
        theme: {
            light: 'catppuccin-latte',
            dark: 'catppuccin-macchiato',
        },
    },
    lang: 'zh-cn',
    title: "Tomatos's Blog",
    description: 'Welcome',
    head: [['link', { rel: 'icon', href: '/logo.png' }]],
    lastUpdated: true,
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: '/logo.png',
        search: {
            provider: 'local',
        },
        outline: {
            level: [2, 6],
            label: '大纲',
        },
        nav: autoGenerateNavItems('nav'),
        docFooter: {
            prev: '上一页',
            next: '下一页',
        },

        socialLinks: [{ icon: 'github', link: 'https://github.com/Tomatos03' }],

        footer: {
            message: 'Released under the MIT License.',
            copyright: `Copyright © 2025-${new Date().getFullYear()} present Tomatos`,
        },
    },
});