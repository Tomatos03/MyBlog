# Linux 按键映射

## Keyd
在 Linux 系统中，`keyd` 是一个强大的键盘映射工具，可以让用户自定义按键行为，实现更高效的键盘操作

### 安装

::: code-group

```paru
paru -S keyd
```

:::

安装完成之后，使用 `sudo systemctl enable keyd --now` 命令设置自动启动

### 配置

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