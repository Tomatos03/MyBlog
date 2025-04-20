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
                text: "环境配置",
                items: [
                    { text: "概述", link: "/env-config/" },
                    {
                        text: "开发环境",
                        items: [
                            { text: "Node.js", link: "/env-config/dev/node" },
                        ],
                    },
                    {
                        text: "部署环境",
                        items: [
                            { text: "MySQL", link: "/env-config/deploy/mysql" },
                            { text: "Redis", link: "/env-config/deploy/redis" },
                        ],
                    },
                    {
                        text: "工具",
                        items: [
                            { text: "VS Code", link: "/env-config/tools/vscode" },
                            { text: "Git", link: "/env-config/tools/git" },
                        ],
                    },
                ],
            },
            { text: "关于", link: "/about" },
        ],
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
