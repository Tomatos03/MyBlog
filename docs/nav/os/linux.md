# 我的 ArchLinux 配置

## 主题相关

-   **[Konsole](https://github.com/catppuccin/konsole)** - KDE 终端模拟器主题
-   **[SDDM Astronaut](https://github.com/Keyitdev/sddm-astronaut-theme)** - 简洁现代的登录管理器主题
-   **[Konsole](https://github.com/catppuccin/konsole)** - KDE 终端模拟器主题
-   **[Catppuccin for Fcitx5](https://github.com/catppuccin/fcitx5)** - 输入法框架主题
-   **[Catppuccin for KDE](https://github.com/catppuccin/kde)** - KDE 等离子桌面主题
-   **[Catppuccin for GRUB](https://github.com/catppuccin/grub)** - GRUB 启动加载器主题
-   **[Tela Icon Theme](https://github.com/vinceliuice/Tela-icon-theme)** - 一款现代、简洁的图标主题，适用于多种桌面环境

::: code-group

```paru
paru -S tela-icon-theme
```

:::

-   **[Bibata Modern Ice](https://github.com/ful1e5/Bibata_Cursor)** - 现代简约的鼠标指针主题

## shell 配置

### zsh 安装

zsh 提供了强大的自动补全、主题支持和插件系统。

::: code-group

```paru
paru -S zsh zsh-completions
```

:::

#### 设置 zsh 为默认 shell

```bash
chsh -s /bin/zsh
```

### zsh 插件

-   **[zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)** - 根据历史记录提供命令建议
-   **[autojump](https://github.com/wting/autojump)** - 智能目录跳转工具
-   **[zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)** - 命令语法高亮

::: code-group

```paru
paru -S zsh-autosuggestions autojump zsh-syntax-highlighting
```

:::

### zsh 配置

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

## vim 配置

### vim 安装

::: code-group

```pacman
sudo pacman -S vim
```

:::

### 使用系统剪切板

#### Wayland

按照[vim-wayland-clipborad](https://github.com/jasonccox/vim-wayland-clipboard)的说明安装依赖,然后安装插件

## 按键映射

wayland 下修改原有键盘按键映射能够使用 keyd

### keyd 安装

::: code-group

```paru
paru -S keyd
```

:::

安装完成之后，使用 `sudo systemctl enable keyd --now` 命令设置自动启动

### keyd 配置

keyd 的配置文件位于 `/etc/keyd/keyd.conf`，可以直接使用如下配置:

```bash
[ids]

*

[main]

# 直接按下为ese，长按为control
capslock = overload(control, esc)

# 配置组合键
[control]
j = down #  control + j
k = up # control + k
```

**注：**更详细的配置可以参考项目说明[keyd](https://github.com/rvaiya/keyd)
