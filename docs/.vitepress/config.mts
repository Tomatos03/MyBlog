import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    markdown: {
        theme: {
            light: "catppuccin-latte",
            dark: "catppuccin-macchiato",
        },
    },
    lang: "zh-cn",
    title: "Tomatos's Blog",
    description: "Welcome",
    head: [["link", { rel: "icon", href: "/logo.png" }]],
    lastUpdated: true,
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: "/logo.png",
        search: {
            provider: "local",
        },
        outline: {
            level: [2, 6],
            label: "大纲",
        },
        nav: [
            { text: "首页", link: "/" },
            {
                text: "操作系统",
                items: [
                    { text: "Linux", link: "/os/linux" },
                    { text: "Windows", link: "/os/windows" },
                ],
            },
            {
                text: "设计模式",
                items: [
                    { text: "builder模式", link: "/design-pattern/builder" },
                ],
            },
            {
                text: "协议",
                items: [{ text: "HTTP", link: "/protocol/http" }],
            },
            {
                text: "框架",
                items: [
                    { text: "elementUI", link: "/framework/elementUI" },
                    { text: "springBoot", link: "/framework/springBoot" },
                ],
            },
            {
                text: "环境配置",
                items: [
                    {
                        text: "开发环境",
                        items: [
                            {
                                text: "Node.js",
                                link: "/env-config/dev/nodejs",
                            },
                            {
                                text: "MySQL",
                                link: "/env-config/dev/mysql",
                            },
                            {
                                text: "Redis",
                                link: "/env-config/dev/redis",
                            },
                        ],
                    },
                    {
                        text: "部署环境",
                        items: [],
                    },
                    {
                        text: "工具",
                        items: [
                            {
                                text: "VS Code",
                                link: "/env-config/tools/vscode",
                            },
                            { text: "Git", link: "/env-config/tools/git" },
                        ],
                    },
                ],
            },
            { text: "关于", link: "/about" },
        ],
        sidebar: {
            "/env-config/": [
                {
                    text: "环境配置",
                    items: [
                        {
                            text: "开发环境",
                            items: [
                                {
                                    text: "Node.js",
                                    link: "/env-config/dev/nodejs",
                                },
                                {
                                    text: "MySQL",
                                    link: "/env-config/dev/mysql",
                                },
                                {
                                    text: "Redis",
                                    link: "/env-config/dev/redis",
                                },
                            ],
                        },
                        {
                            text: "部署环境",
                            items: [],
                        },
                        {
                            text: "工具",
                            items: [
                                {
                                    text: "VS Code",
                                    link: "/env-config/tools/vscode",
                                },
                                { text: "Git", link: "/env-config/tools/git" },
                            ],
                        },
                    ],
                },
            ],
        },
        docFooter: {
            prev: "上一页",
            next: "下一页",
        },

        socialLinks: [{ icon: "github", link: "https://github.com/Tomatos03" }],

        footer: {
            message: "Released under the MIT License.",
            copyright: `Copyright © 2025-${new Date().getFullYear()} present Tomatos`,
        },
    },
});
