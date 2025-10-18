import { defineConfig } from 'vitepress';
// import autoGenerateNavItems from './utils/generateNav';
import { MermaidMarkdown, MermaidPlugin } from 'vitepress-plugin-mermaid';

export default defineConfig({
    markdown: {
        theme: {
            light: 'catppuccin-latte',
            dark: 'catppuccin-macchiato',
        },
        config(md) {
            md.use(MermaidMarkdown);
        },
    },
    vite: {
        plugins: [MermaidPlugin()],
        optimizeDeps: {
            include: ['mermaid'],
        },
        ssr: {
            noExternal: ['mermaid'],
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
        nav: [
            {
                text: '操作系统',
                items: [
                    {
                        text: 'Linux',
                        link: 'nav/os/Linux/linux-desktop-env-config.md',
                    },
                    {
                        text: 'Windows',
                        link: 'nav/os/Windows/windows-skill.md',
                    },
                ],
            },
            {
                text: '设计图',
                link: 'nav/design-diagram.md',
            },
            {
                text: '设计模式',
                link: '/nav/design-pattern/builder.md',
            },
            // {
            //     text: '框架',
            //     items: [
            //         {
            //             text: 'ElementUI',
            //             link: 'nav/framework/ElementUI.md',
            //         },
            //         {
            //             text: 'SpringBoot',
            //             link: 'nav/framework/SpringBoot.md',
            //         },
            //         {
            //             text: 'SpringSecurity',
            //             link: 'nav/framework/SpringSecurity.md',
            //         },
            //         {
            //             text: 'Vue Router',
            //             link: 'nav/framework/Vue Router.md',
            //         },
            //     ],
            // },
            {
                text: '开发工具',
                link: 'nav/dev-tools/VSCode/vscode.md',
            },
            {
                text: '环境配置',
                items: [
                    {
                        text: '开发环境',
                        items: [
                            {
                                text: 'MySQL',
                                link: 'nav/env-config/dev/MySQL.md',
                            },
                            // {
                            //     text: 'NodeJs',
                            //     link: 'nav/env-config/dev/NodeJs.md',
                            // },
                        ],
                    },
                    {
                        text: '环境部署',
                        items: [
                            {
                                text: 'Docker',
                                link: 'nav/env-config/deploy/Docker.md',
                            },
                            {
                                text: 'Nginx',
                                link: 'nav/env-config/deploy/Nginx.md',
                            },
                        ],
                    },
                    {
                        text: '工具',
                        items: [
                            {
                                text: 'Redis',
                                link: 'nav/env-config/tools/Redis.md',
                            },
                        ],
                    },
                ],
            },
            {
                text: '编程基础',
                items: [
                    { text: '协议', link: '/nav/fundamentals/protocol/http-protocol.md' },
                    { text: '算法', link: '/nav/fundamentals/algorithm.md' },
                    { text: '技术名词', link: '/nav/fundamentals/terminology.md' },
                ],
            },
            {
                text: '编程语言',
                items: [
                    {
                        text: 'Java',
                        link: 'nav/languages/Java/java-data-type.md',
                    },
                ],
            },
            // {
            //     text: '常见项目方案',
            //     link: 'nav/project-solution.md',
            // },
            {
                text: '关于',
                link: 'nav/about.md',
            },
        ],
        docFooter: {
            prev: '上一页',
            next: '下一页',
        },
        sidebar: {
            '/nav/dev-tools/': [
                {
                    text: '开发工具',
                    collapsed: false,
                    items: [
                        { text: 'VSCode', link: '/nav/dev-tools/VSCode/vscode.md' },
                        { text: 'Jmeter', link: '/nav/dev-tools/Jmeter/jmeter.md' },
                        { text: 'IDEA', link: '/nav/dev-tools/IDEA/idea.md' },
                        {
                            text: 'Git',
                            collapsed: true,
                            items: [
                                {
                                    text: 'Git 配置',
                                    link: '/nav/dev-tools/Git/git-config.md',
                                },
                                {
                                    text: 'Git 仓库管理',
                                    link: '/nav/dev-tools/Git/git-repository-management.md',
                                },
                                {
                                    text: 'Git 分支',
                                    link: '/nav/dev-tools/Git/git-branch.md',
                                },
                                {
                                    text: 'Git 恢复与重置',
                                    link: '/nav/dev-tools/Git/git-restore-and-reset.md',
                                },
                                {
                                    text: 'Git 日志管理',
                                    link: '/nav/dev-tools/Git/git-log-management.md',
                                },
                                {
                                    text: 'Git 高级',
                                    link: '/nav/dev-tools/Git/git-advanced.md',
                                },
                            ],
                        },
                    ],
                },
            ],
            '/nav/design-pattern/': [
                {
                  text: '设计模式',
                  collapsed: false,
                  items: [
                    { text: '建造者模式', link: '/nav/design-pattern/builder.md' },
                    { text: '单例模式', link: '/nav/design-pattern/singleton.md' },
                    // { text: '工厂模式', link: '/nav/design-pattern/factory.md' },
                    // { text: '代理模式', link: '/nav/design-pattern/proxy.md' },
                    // { text: '观察者模式', link: '/nav/design-pattern/observer.md' },
                    // { text: '策略模式', link: '/nav/design-pattern/strategy.md' },
                    // { text: '模板方法模式', link: '/nav/design-pattern/template-method.md' },
                    // { text: '适配器模式', link: '/nav/design-pattern/adapter.md' },
                    // { text: '装饰器模式', link: '/nav/design-pattern/decorator.md' }
                  ],
                },
                {
                  text: '多线程设计模式',
                  collapsed: false,
                  items: [
                    { text: '顺序控制', link: '/nav/design-pattern/thread/sequencing-control.md' },
                    { text: '犹豫模式', link: '/nav/design-pattern/thread/balking-pattern.md' },
                    { text: '单例模式', link: '/nav/design-pattern/thread/singleton-pattern.md' },
                    { text: '生产者消费者模式', link: '/nav/design-pattern/thread/producer-consumer.md' },
                    { text: '保护性暂停', link: '/nav/design-pattern/thread/guarded-suspension.md' },
                    { text: '两阶段终止', link: '/nav/design-pattern/thread/two-phase-termination.md' },
                  ],
                }
            ],
            '/nav/fundamentals/protocol/': [
                {
                    text: '计算机协议',
                    collapsed: false,
                    items: [
                        { text: 'HTTP', link: '/nav/fundamentals/protocol/http-protocol.md' },
                        { text: 'SSH', link: '/nav/fundamentals/protocol/ssh-protocol.md' },
                        { text: 'OAuth', link: '/nav/fundamentals/protocol/oauth-protocol.md' },
                    ],
                },
            ],
            '/nav/os/Windows/': [
                {
                    text: 'Windows',
                    collapsed: false,
                    items: [{ text: '技巧', link: '/nav/os/Windows/windows-skill.md' }],
                },
            ],
            '/nav/os/Linux/': [
                {
                    text: 'Linux',
                    collapsed: false,
                    items: [
                        { text: '终端', link: '/nav/os/Linux/linux-terminal.md' },
                        { text: '按键映射', link: '/nav/os/Linux/linux-key-mapping.md' },
                        { text: '桌面环境配置', link: '/nav/os/Linux/linux-desktop-env-config.md' },
                        { text: '系统设置', link: '/nav/os/Linux/linux-system-settings.md' },
                        { text: '网络配置', link: '/nav/os/Linux/linux-network-config.md' },
                        { text: '疑难杂症', link: '/nav/os/Linux/linux-troubleshooting.md' },
                    ],
                },
            ],
            '/nav/languages/Java/': [
                {
                    text: 'Java基础',
                    collapsed: false,
                    items: [
                        { text: 'Java数据类型', link: '/nav/languages/Java/java-data-type.md' },
                        { text: 'Java修饰符', link: '/nav/languages/Java/java-modifiers.md' },
                        {
                            text: 'Java默认行为',
                            link: '/nav/languages/Java/java-default-behavior.md',
                        },
                        { text: 'Java字符串', link: '/nav/languages/Java/java-string.md' },
                        { text: 'Java类', link: '/nav/languages/Java/java-class.md' },
                        { text: 'Java接口', link: '/nav/languages/Java/java-interface.md' },
                        { text: 'Java枚举', link: '/nav/languages/Java/java-enum.md' },
                        { text: 'Java方法', link: '/nav/languages/Java/java-methods.md' },
                        { text: 'Java异常', link: '/nav/languages/Java/java-exception.md' },
                    ],
                },
                {
                    text: '进阶特性',
                    collapsed: false,
                    items: [
                        { text: 'Java多线程', link: '/nav/languages/Java/java-multithreading.md' },
                        { text: 'Java JUC', link: '/nav/languages/Java/java-juc.md' },
                        { text: 'Java内存结构', link: '/nav/languages/Java/java-memoery-struct.md' },
                        { text: 'Java泛型', link: '/nav/languages/Java/java-generics.md' },
                        { text: 'Java注解', link: '/nav/languages/Java/java-annotation.md' },
                        {
                            text: 'Java核心机制',
                            link: '/nav/languages/Java/java-core-mechanism.md',
                        },
                        {
                            text: 'Java常用类和接口',
                            link: '/nav/languages/Java/java-common-classes.md',
                        },
                        {
                            text: 'Java源码解读',
                            link: '/nav/languages/Java/java-source-analysis.md',
                        },
                        {
                            text: 'Java版本特性',
                            link: '/nav/languages/Java/java-version-features.md',
                        },
                        { text: 'Java Jar 包', link: '/nav/languages/Java/java-jar.md' },
                    ],
                },
                {
                    text: 'Java工具链',
                    collapsed: false,
                    items: [
                        { text: 'Maven', link: '/nav/languages/Java/tool-chains/maven.md' }, 
                    ],
                },
            ],
        },

        socialLinks: [{ icon: 'github', link: 'https://github.com/Tomatos03' }],

        footer: {
            message: 'Released under the MIT License.',
            copyright: `Copyright © 2025-${new Date().getFullYear()} present Tomatos`,
        },
    },
});
