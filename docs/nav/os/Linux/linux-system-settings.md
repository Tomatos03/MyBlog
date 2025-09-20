# Linux 系统配置

## vim 环境

::: code-group

```bash
sudo pacman -S vim
```

:::

### 插件

#### 系统剪切板 

让 vim 环境中能够使用系统剪切板, 插件安装参考[vim-wayland-clipborad](https://github.com/jasonccox/vim-wayland-clipboard)

## 输入法

### Ibus

ibus 是一个流行的输入法框架，支持多种语言和输入法。

1. 安装 ibus 和所需的输入法引擎

::: code-group

```bash
# 对于中文输入，可以安装 Rime 输入引擎:
paru -S ibus ibus-rime
```

:::


2. 配置 ibus

在 `~/.xprofile` 或 `~/.bash_profile` 中添加以下内容以确保 ibus 在系统启动时运行：

```bash
export GTK_IM_MODULE=ibus
export QT_IM_MODULE=ibus
export XMODIFIERS=@im=ibus
ibus-daemon -drx
```
## 输入方案

### 雾凇拼音

1. **安装雾凇输入方案**

::: code-group

```bash
paru -S rime-ice-git
```

:::

2. **配置雾凇输入方案**

Rime 输入引擎配置目录位于 `~/.config/ibus/rime/`，可以通过修改 `default.custom.yaml` 文件来设置输入法方案。

**注:** 如果没有`default.custom.yaml`文件, 请手动创建


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