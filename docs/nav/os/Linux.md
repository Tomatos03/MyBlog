# 我的 ArchLinux 配置

## 主题相关

### KDE

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

或

```bash
[ids]

*

[main]

# Maps capslock to escape when pressed and control when held.
capslock = overload(control, esc)

# Remaps the escape key to capslock
esc = capslock
```

> [!TIP]
> 可以使用`sudo keyd reload` 重新加载配置，`sudo keyd monitor` 查看按键名称

> [!NOTE]
> 更详细的配置可以参考项目说明[keyd](https://github.com/rvaiya/keyd)

## 终端相关

### Zsh 快捷键

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

### 其他技巧

| 快捷键/命令 | 功能                         |
| ----------- | ---------------------------- |
| **Tab**     | 命令和文件名自动补全         |
| **↑/↓**     | 浏览命令历史                 |
| **!!**      | 重复执行上一条命令           |
| **!$**      | 引用上一条命令的最后一个参数 |
| **cd -**    | 返回上一个目录               |

## 插件

### GNOME

| 插件名称                | 描述                                                                               |
| ----------------------- | ---------------------------------------------------------------------------------- |
| Apps Menu               | 添加一个基于类别的应用菜单。                                                       |
| Bluetooth Battery Meter | 在系统托盘中显示蓝牙设备电池电量的指示器图标，并在快速设置菜单中提供详细电量信息。 |
| Blur my Shell           | 为 GNOME Shell 的不同部分（如顶部面板、Dash 和概览）添加模糊效果。                 |
| Coverflow Alt-Tab       | 替换 Alt-Tab，以封面流的方式切换窗口。                                             |
| Dash to Dock            | 将 GNOME Shell 的 Dash 移出概览，变成一个 Dock，支持侧边和底部放置选项。           |
| Forge                   | 为 GNOME 提供平铺和窗口管理功能。                                                  |
| GNOME Fuzzy App Search  | 为 GNOME 搜索提供模糊匹配的应用搜索结果。                                          |
| Hide Top Bar            | 隐藏顶部栏，除非鼠标指针接近屏幕边缘或启用了智能隐藏功能。                         |
| IBus Tweaker            | 调整 IBus 的主题、字体、输入模式和剪贴板历史记录。                                 |
| Native Window Placement | 在概览中以更紧凑的方式排列窗口。                                                   |
| Proxy Switcher          | 在网络设置中定义的系统代理设置配置文件之间切换。                                   |
| Removable Drive Menu    | 提供一个状态菜单，用于访问和卸载可移动设备。                                       |
| Status Icons            | 在顶部栏中显示状态图标。                                                           |

## 输入法

### Ibus

ibus 是一个流行的输入法框架，支持多种语言和输入法。

#### 安装 Ibus

::: code-group

```paru
paru -S ibus
```

:::

#### 配置 Ibus

在 `~/.xprofile` 或 `~/.bash_profile` 中添加以下内容以确保 ibus 在系统启动时运行：

```bash
export GTK_IM_MODULE=ibus
export QT_IM_MODULE=ibus
export XMODIFIERS=@im=ibus
ibus-daemon -drx
```

#### 安装中文输入法

对于中文输入，可以安装 Rime 输入法：

::: code-group

```paru
paru -S ibus-rime
```

:::

### 输入方案

#### 雾凇拼音

::: code-group

```bash
paru -S rime-ice-git
```

:::

##### 应用方案

Rime 配置文件位于 `~/.config/ibus/rime/`，可以通过修改 `default.custom.yaml` 文件来设置输入法方案。

> [!NOTE] > `~/.config/ibus/rime/` 目录下不存在`default.custom.yaml` 文件时请手动创建

```yaml
patch:
    __include: rime_ice_suggestion:/
    key_binder:
        bindings:
            # 设置翻页键
            - { accept: Control+k, send: Page_Up, when: has_menu }
            - { accept: Control+j, send: Page_Down, when: has_menu }
    menu:
        page_size: 7 # 设置每页显示的候选词数量
```

## 疑难杂症

### 终端和输入法无法显示 emoji

安装了 emoji 相关字体，但是在 gnome 的字符工具、输入法候选菜单，终端都无法显示 emoji,尝试在`~/.config/fontconfig/fonts.conf` 中的`fontconfig`标签之中添加以下内容：

```xml
	<match target="font">
		<edit name="antialias" mode="assign"><bool>true</bool></edit>
		<edit name="autohint" mode="assign"><bool>false</bool></edit>
		<edit name="dpi" mode="assign"><double>96</double></edit>
		<edit name="hinting" mode="assign"><bool>true</bool></edit>
		<edit name="hintstyle" mode="assign"><const>hintfull</const></edit>
		<edit name="lcdfilter" mode="assign"><const>lcddefault</const></edit>
	</match>
```

重启系统后，终端和输入法候选菜单应该可以正常显示 emoji 了。

## 网络配置

### 使用 nmcli 配置 PPPoE 连接

在配置 PPPoE 之前，需要确保已安装相关依赖：

::: code-group

```bash
# 如果安装了network-manager-applet可以通过图形界面配置, 而不是使用 nmcli
sudo pacman -S networkmanager ppp network-manager-applet
```

:::

安装完成后，启动并设置 NetworkManager 开机自启：

```bash
sudo systemctl enable --now NetworkManager
```

在 Arch Linux 中，可以使用 `nmcli` 命令行工具由(`NetworkManager`)来配置 PPPoE 连接。以下是配置步骤：

1. **创建 PPPoE 连接**

```bash
nmcli connection add type pppoe ifname <网卡名> con-name <连接名称> username <宽带账号>
```

示例：

```bash
nmcli connection add type pppoe ifname enp3s0 con-name pppoe-home username 123456789@isp
```

2. **设置密码**

```bash
nmcli connection modify <连接名称> pppoe.password <宽带密码>
```

3. **连接 PPPoE**

```bash
nmcli connection up <连接名称>
```

4. **断开 PPPoE**

```bash
nmcli connection down pppoe-home
```

> [!TIP]
> 可用 `nmcli device status` 查看网卡名称，`nmcli connection show` 查看连接列表。
