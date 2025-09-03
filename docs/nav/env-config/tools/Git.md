# Git

## 信息配置

### 用户信息的配置

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

### 查看所有 Git 配置

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

## 基础操作

### 重置

当需要撤销修改或者切换到特定版本时，可以使用 Git 的重置功能。

#### 丢弃工作区修改

丢弃工作目录中的文件的修改 （恢复到最后一次提交的状态）

```bash
# 撤销单个文件的修改
git checkout -- <file-name>

# git 2.23+ 新命令
git restore <file-name>
```

#### 丢弃暂存区的暂存

```bash
# 丢弃文件在暂存区的暂存, 不影响文件在工作区变更内容
git reset HEAD <file-name>

# git 2.23+ 新命令
git restore --staged <file-name>
```

#### 丢弃远程仓库的文件

```bash
# 丢弃远程仓库的文件, 并将文件添加到暂存区
git rm <file-name>

# 如果不想将文件添加到暂存区, 可以使用 --cached 参数
# 文件仍然保留在工作区
# 与Linux的rm <file-name> 类似, 只是这个命令仍保留文件在工作区
git rm --cached <file-name>
```

#### 重置到指定提交点

| 模式   | 命令示例                                              | 工作区变更 | 暂存区暂存 | 提交历史变更 |
| ------ | ----------------------------------------------------- | ---------- | ---------- | ------------ |
| soft   | `git reset --soft <hash>`                             | 保留       | 保留       | 回退         |
| mixed  | `git reset --mixed <hash>`<br>`git reset <hash>`      | 保留       | 清除       | 回退         |
| hard   | `git reset --hard <hash>`                             | 清除       | 清除       | 回退         |

一些便捷命令: 

```bash
# 从最新的提交点开始, 回退到前一个版本
git reset --hard HEAD^
# 某些shell环境下不能够直接书写^, 需要''包裹
git reset --hard 'HEAD^'

# 从最新的提交点开始, 回退到前N个版本
git reset --hard HEAD~N
```


#### 撤销重置

1. 使用 `git reflog` 找到重置前的提交哈希值
2. 使用 `git reset --hard <commit-hash>` 恢复到该提交

### 本地仓库

代码需要提交到暂存区才能提交到本地仓库

#### 初始化本地仓库

```bash
git init
```

#### 添加文件到暂存区

```bash
# 提交单个文件
git add <file-name>

# 提交所有文件
git add .

# 提交指定目录下的所有文件
git add <dir-name>
```

#### 缓存暂存区和工作区的内容

在某些操作前, 需要确保暂存区内容是空, 这个时候可以使用 `git stash` 命令, 将暂存区和工作区的文件缓存, 等操作完成后再恢复

> [!NOTE]
> 缓存并不属于某个分支, 每一个分支都能够查看到存储的缓存

```bash
# 缓存当前所有未提交的更改（包括暂存区和工作区）
git stash

# 添加描述信息（新版本写法）
git stash push -m "message"
# 老版本
git stash save "message"

```

恢复缓存内容：

```bash
# 恢复最近一次缓存，并从缓存列表中移除
git stash pop

# 恢复最近一次缓存，但不移除
git stash apply

# 查看所有缓存
git stash list

# 恢复指定缓存
git stash apply stash@{n}
```

#### 修改本地仓库中的提交

```bash
# 使用交互式变基，修改最近n条提交
git rebase -i HEAD~n
```

**注:** 交互式变基会改变提交历史 hash

##### 交互命令参考

| 命令     | 意义                                               | 典型用途                             |
| :------- | :------------------------------------------------- | :----------------------------------- |
| `pick`   | 保持这个提交，不做改动                             | 大部分提交直接保留                   |
| `reword` | 保持提交内容，但**修改提交信息**                   | 改错别字、优化提交说明               |
| `edit`   | 停下来，**修改提交内容或者信息**                   | 发现代码有小错误，想补救             |
| `squash` | 将本提交**和上一个提交合并**，并编辑提交信息       | 多个小提交，想打包成一个             |
| `fixup`  | 将本提交**合并到上一个提交**，但**忽略本提交信息** | 修修补补的小提交，直接塞进上一个提交 |
| `drop`   | **丢弃这个提交**                                   | 提交错了，想干脆删掉                 |

#### 暂存区的变动提交到本地仓库

```bash
# 提交代码到暂存区, 并使用指定的默认编辑器编写提交信息
# 无提交信息视为取消本次提交
git commit

# 添加参数m显示指定提交信息
git commit -m "commit message"

# 修改最近一次提交信息
# 或
# 将暂存区的所有变动合并到最新提交
git commit --amend -m "new commit message"
```

### 远程仓库

#### 克隆远程仓库

```bash
# 克隆远程仓库
git clone <remote-repo-url>
```

#### 查看远程仓库

```bash
# 查看远程仓库
git remote -v
```

#### 关联远程仓库

关联远程仓库后，下一次可以直接使用 `git push` 提交代码到远程仓库

```bash
git push --set-upstream origin main

# 简化命令
git push -u origin main
```

### 信息查看

#### 查看某个提交点提交信息

```bash
# 输出包含一些变更的内容
git show <hash-code>

# 输出不包含变更的内容
git show -s <hash-code>
```


#### 查看所有分支以及所处分支

```bash
git branch

# 查看本地和远程分支
git branch -a

# 该命令结果可能如下
# * main
#   remotes/origin/HEAD -> origin/main
#   remotes/origin/main
#   remotes/origin/feature

# * 表示当前所在分支
# remotes/origin/HEAD -> origin/main 表示远程仓库的默认分支是 main
# remotes/origin/feature 表示远程仓库的 feature 分支
```

#### 查看提交日志

```bash
git log

# 查看简洁的提交日志
git log --oneline

# 查看简洁的提交日志，包含分支信息
git log --oneline --graph
```

#### 远程和本地日志差异

```bash
# 查看本地和远程分支的差异
git log <remote-repo-name>/<branch-name>..<branch-name>
# 示例
git log origin/main..main
```

#### 查看操作日志

```bash
git reflog

# 查看简洁的操作日志
git reflog --oneline
```

### 分支


#### 重命名分支

```bash
# 不提供old-branch-name参数时，默认重命名当前分支
git branch -m [<old-branch-name>] <new-branch-name>
```

#### 创建分支

```bash
git branch <branch-name>
```

#### 拉取远程分支

> [!NOTE]
> 从远程仓库拉取的内容不会影响当前暂存区和工作区, 在 merge 操作之后才会影响

```bash
git fetch <remote-repo-name> <branch-name>
# 示例
git fetch origin main
```

#### 合并分支

```bash
git merge <branch-name>
```

#### 拉取并合并分支

```bash
# 拉取远程分支合并到当前分支
# 没有追踪远程仓库
git pull <remote-repo-name> <branch-name>

# 有追踪远程仓库
git pull

```

#### 拉取时指定策略

```bash
# 使用rebase策略
git pull --rebase

# 使用merge策略(默认)
git pull --no-rebase

# 只允许快进合并，如有冲突则失败
git pull --ff-only
```

#### 切换分支

```bash
# 切换到指定分支(分支必须存在)
git checkout <branch-name>
# 切换到指定分支(分支必须不存在)
git checkout -b <branch-name>

# git 2.23 版本后推荐使用

# 切换到指定分支(分支必须存在)
git switch <branch-name>
# 切换到指定分支(分支必须不存在)
git switch -c <branch-name>
```

#### 删除分支

```bash
# 删除分支
git branch -d <branch-name>
```

#### 变基

变基操作会将当前分支的提交记录移动到指定分支的最新提交之后

```bash
# 1. 开发前先同步主分支
git checkout main
git pull origin main

# 2. 变基当前分支
git checkout feature
git rebase main

# 变基前
A --- B --- C (main)
         \
          D --- E (feature)

# 变基后
A --- B --- C (main)
             \
              D' --- E' (feature)

```

## .gitignore 文件

`.gitignore` 文件用于指定 Git 在提交时应忽略的文件和目录，常用于排除编译生成文件、临时文件、敏感信息等。

> [!NOTE]
> `.gitignore` 文件只会影响未被 Git 跟踪的文件。如果某个文件已经被 Git 跟踪，添加到 `.gitignore` 后仍然需要手动将其从 Git 暂存区中移除。

### 创建 .gitignore 文件

在项目根目录下新建 `.gitignore` 文件，并添加需要忽略的规则。例如：

### 常用规则说明

-   `*.log`：忽略所有以 `.log` 结尾的文件
-   `build/`：忽略所有名为 `build` 目录, 包括子目录之中的`build` 目录, 不忽略名为 `build` 的文件
-   `build`：与上一条规则基本一致, 但这规则会忽略名为 `build` 的文件
-   `!important.log`：不忽略 `important.log` 文件, 统测搭配其他规则使用
-   `/build/`：只忽略项目根目录下的 `build` 文件夹, 不忽略子目录中的 `build` 文件夹

### 查看已忽略文件

```bash
git status --ignored
```

