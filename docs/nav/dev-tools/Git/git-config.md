# Git 配置

## 用户信息的配置

```bash
# 默认为局部配置
# 配置用户邮箱
git config user.email "Your Email"
# 配置用户名
git config user.name "Your Name"

# 配置默认编辑器
git config --global core.editor "vim"

# git 2.28+
# 配置初始化git仓库时默认分支
git config --global init.defaultBranch main

# 配置全局用户信息
git config --global user.name "Your Name"
git config --global user.email "Your Email"

```

## 查看所有 Git 配置

```bash
# 查看所有配置
git config --list

# 查看当前仓库用户的用户名
git config --get user.name
# 查看当前仓库用户的邮箱
git config --get user.email


# 参数顺序任意
# 查看全局用户名
git config --global --get user.name
# 查看全局用户邮箱
git config --global --get user.email
```

## .gitignore 文件

`.gitignore` 文件用于指定 Git 在提交时应忽略的文件和目录，常用于排除编译生成文件、临时文件、敏感信息等。

> [!NOTE]
> `.gitignore` 文件只会影响未被 Git 跟踪的文件。如果某个文件已经被 Git 跟踪，添加到 `.gitignore` 后仍然需要手动将其从 Git 暂存区中移除。


### 排除规则

-   `build/`：忽略所有名为 `build`的目录, 包括子目录中的 `build` 目录
-   `build`：忽略所有名为 `build` 的文件和目录, 包括子目录中的 `build` 文件和目录
-   `/build/`：忽略 `.gitignore` 所在目录下的 `build` 目录
-   `*.log`：忽略所有以 `.log` 结尾的文件
-   `!important.log`：不忽略 `important.log` 文件, 统测搭配其他规则使用

> [!TIP]
>  `git status --ignored ` 查看已经忽略的内容