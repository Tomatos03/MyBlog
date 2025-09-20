# Linux 网络配置

## 配置 PPPoE 连接

### 图形界面配置

::: code-group

```bash
sudo pacman -S networkmanager ppp network-manager-applet 
```

:::

### 命令行配置

在配置 PPPoE 之前，需要确保已安装相关依赖：
::: code-group
```bash
sudo pacman -S networkmanager ppp 
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