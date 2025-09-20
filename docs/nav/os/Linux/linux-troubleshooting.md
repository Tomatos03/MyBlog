# Linux 疑难杂症

## Gnome
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