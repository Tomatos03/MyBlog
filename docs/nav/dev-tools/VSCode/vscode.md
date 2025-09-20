# VSCode

## 配置

<details>
<summary>点击展开查看设置</summary>

```json
{
    // ********** Editor Settings **********
    // Font settings
    "editor.fontSize": 20, // 字体大小
    "editor.fontFamily": "Fira Code", // 字体
    "editor.fontLigatures": "'cv01', 'cv29', 'ss05', 'cv02'", // 字体连字样式
    "editor.fontWeight": "400", // 字体粗细
    "editor.tabSize": 4, // Tab 宽度

    // Cursor and scrolling
    "editor.cursorSmoothCaretAnimation": "on", // 光标平滑动画
    "editor.cursorBlinking": "smooth", // 光标平滑闪烁
    "editor.smoothScrolling": true, // 编辑器平滑滚动
    "workbench.list.smoothScrolling": true, // 工作台列表平滑滚动
    "terminal.integrated.smoothScrolling": true, // 终端平滑滚动

    // Line numbers and minimap
    "editor.lineNumbers": "relative", // 相对行号
    "editor.minimap.enabled": true, // 启用代码缩略图

    // Auto-save
    "files.autoSave": "onFocusChange", // 失去焦点时自动保存

    // ********** Theme and Appearance **********
    // Theme settings
    "workbench.colorTheme": "Catppuccin Macchiato", // 颜色主题
    "workbench.iconTheme": "a-file-icon-vscode", // 文件图标主题
    "workbench.productIconTheme": "a-file-icon-vscode-product-icon-theme", // 产品图标主题

    // Catppuccin theme customization
    "catppuccin.italicKeywords": false, // 禁用关键字斜体

    // ********** Formatting Settings **********
    // General formatting
    "editor.formatOnSave": true, // 保存时自动格式化
    "editor.defaultFormatter": "esbenp.prettier-vscode", // 默认格式化工具

    // Language-specific formatting
    "[cpp]": {
        "editor.defaultFormatter": "ms-vscode.cpptools" // C++ 使用的格式化工具
    },
    "[snippets]": {
        "editor.defaultFormatter": "vscode.json-language-features" // Snippets 使用的格式化工具
    },

    // Prettier settings
    "prettier.vueIndentScriptAndStyle": true, // Vue 文件中缩进 <script> 和 <style>
    "prettier.bracketSameLine": true, // 括号与标签同一行
    "prettier.useTabs": false, // 使用空格代替 Tab
    "prettier.tabWidth": 4, // Prettier 的缩进宽度

    // ********** C/C++ Settings **********
    "C_Cpp.default.compilerPath": "usr/bin/g++", // 默认编译器路径
    "C_Cpp.clang_format_fallbackStyle": "Chromium", // Clang 格式化的回退样式
    "C_Cpp.clang_format_style": "file:.vscode/.clang-format", // Clang 格式化的样式文件
    "C_Cpp.formatting": "clangFormat", // 使用 Clang 格式化
    "C_Cpp.default.cStandard": "gnu17", // C 标准
    "C_Cpp.default.cppStandard": "gnu++17", // C++ 标准

    // Competitive Programming Helper (CPH)
    "cph.general.defaultLanguage": "cpp", // 默认语言为 C++

    // ********** Terminal Settings **********
    "terminal.explorerKind": "external", // 使用外部终端
    "terminal.external.linuxExec": "konsole", // Linux 外部终端路径
    "terminal.integrated.profiles.linux": {
        "zsh": {
            "path": "/bin/zsh" // 使用 zsh 作为终端
        }
    },
    "terminal.integrated.defaultProfile.linux": "zsh", // 默认终端配置
    "terminal.integrated.fontLigatures.enabled": true, // 启用终端字体连字
    "terminal.integrated.cursorStyle": "line", // 终端光标样式

    // ********** Extensions Settings **********
    "extensions.ignoreRecommendations": true, // 忽略扩展推荐
    "github.copilot.nextEditSuggestions.enabled": false, // 禁用 Copilot 的下一步建议

    // ********** Explorer Settings **********
    "explorer.confirmDelete": false, // 删除文件时不确认
    "explorer.compactFolders": false, // 不启用紧凑文件夹视图

    // ********** Miscellaneous **********
    "scss.showErrors": true, // 显示 SCSS 错误
    "window.commandCenter": false // 禁用命令中心
}
```

</details>

## 插件

|                                                                  插件名称                                                                   | 功能描述                         |
| :-----------------------------------------------------------------------------------------------------------------------------------------: | -------------------------------- |
|                   [Catppuccin for VSCode](https://marketplace.visualstudio.com/items?itemName=Catppuccin.catppuccin-vsc)                    | 温暖的、柔和的主题               |
|                  [A-file-icon-vscode](https://marketplace.visualstudio.com/items?itemName=atommaterial.a-file-icon-vscode)                  | 文件图标和产品图标主题           |
|                           [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)                            | 代码格式化工具                   |
|                               [C/C++](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)                               | C/C++ 语言支持、调试和代码格式化 |
| [Competitive Programming Helper (CPH)](https://marketplace.visualstudio.com/items?itemName=DivyanshuAgrawal.competitive-programming-helper) | 拉取算法网站问题描述和测试案例   |
|                            [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)                             | AI 编程助手                      |
|                          [Live Preview](https://marketplace.visualstudio.com/items?itemName=ms-vscode.live-server)                          | 实时预览 HTML 文件               |
|                                  [Vim](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim)                                   | 提供 Vim 键绑定支持              |
|                               [CodeSnap](https://marketplace.visualstudio.com/items?itemName=adpyke.codesnap)                               | 创建美观的代码截图               |
