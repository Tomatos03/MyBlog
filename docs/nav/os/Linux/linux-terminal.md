# Linux 终端

## 快捷键

| 快捷键     | 功能                         |
| ---------- | ---------------------------- |
| **Ctrl+A** | 移动到行首                   |
| **Ctrl+E** | 移动到行尾                   |
| **Ctrl+U** | 删除光标前所有内容           |
| **Ctrl+K** | 删除光标后所有内容           |
| **Ctrl+W** | 删除光标前的一个单词         |
| **Ctrl+L** | 清屏                         |
| **Ctrl+R** | 历史命令搜索                 |
| **Alt+.**  | 插入上一个命令的最后一个参数 |
| **Tab**     | 命令和文件名自动补全         |
| **↑/↓**     | 浏览命令历史                 |
| **!!**      | 重复执行上一条命令           |
| **!$**      | 引用上一条命令的最后一个参数 |
| **cd -**    | 返回上一个目录               |

## Shell 配置

### 设置默认 Shell

```bash
chsh -s /bin/zsh
```

### Zsh
#### 安装

zsh 提供了强大的自动补全、主题支持和插件系统。

::: code-group

```paru
paru -S zsh zsh-completions
```

:::

#### 配置

```bash
# 加载插件
source /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
source /usr/share/autojump/autojump.zsh
source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh

# 历史记录设置
HISTFILE=~/.histfile
HISTSIZE=1000
SAVEHIST=1000

# 常用别名
alias ll='ls --color=auto -lah'
# 使用 -E 参数确保使用sudo权限的时候仍然能够使用当前用户剪切板
alias svim='sudo -E vim'


# 键绑定
bindkey '\eq' autosuggest-accept

# 自定义提示符
PROMPT='%F{blue}%n@%m%f %F{green}%~%f %# '

# 编辑器设置
export EDITOR='gvim'
```

#### 扩展插件

-   **[zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)** - 根据历史记录提供命令建议
-   **[autojump](https://github.com/wting/autojump)** - 智能目录跳转工具
-   **[zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)** - 命令语法高亮

::: code-group

```paru
paru -S zsh-autosuggestions autojump zsh-syntax-highlighting
```

:::
