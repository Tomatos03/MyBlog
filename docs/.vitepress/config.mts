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
        // sidebar: {
        //     'nav/env-config/': [
        //         {
        //             text: '环境配置',
        //             items: [
        //                 {
        //                     text: '开发环境',
        //                     items: [
        //                         {
        //                             text: 'Node.js',
        //                             link: '/nav/env-config/dev/nodejs',
        //                         },
        //                         {
        //                             text: 'MySQL',
        //                             link: '/nav/env-config/dev/mysql',
        //                         },
        //                         {
        //                             text: 'Redis',
        //                             link: '/nav/env-config/dev/redis',
        //                         },
        //                     ],
        //                 },
        //                 {
        //                     text: '部署环境',
        //                     items: [],
        //                 },
        //                 {
        //                     text: '工具',
        //                     items: [
        //                         {
        //                             text: 'VS Code',
        //                             link: '/nav/env-config/tools/vscode',
        //                         },
        //                         { text: 'Git', link: '/nav/env-config/tools/git' },
        //                     ],
        //                 },
        //             ],
        //         },
        //     ],
        // },
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
