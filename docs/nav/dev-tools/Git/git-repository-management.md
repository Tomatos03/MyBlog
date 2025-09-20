# Git 仓库管理

## 初始化本地仓库

```bash
git init
```

## 添加文件到暂存区

```bash
# 提交单个文件
git add <file-name>

# 提交所有文件
git add .

# 提交指定目录下的所有文件
git add <dir-name>
```

## 缓存暂存区和工作区的内容

在某些操作前, 需要确保暂存区内容是空, 这个时候可以使用 `git stash` 命令, 将暂存区和工作区的文件缓存, 等操作完成后再恢复

```bash
# 缓存当前所有未提交的更改（包括暂存区和工作区）
git stash

# 添加描述信息（新版本写法）
git stash push -m "message"
# 老版本
git stash save "message"

```

> [!NOTE]
> 缓存的内容并不属于某个分支, 每一个分支都能够查看到存储的缓存

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

## 修改本地仓库中的提交

```bash
# 使用交互式变基，修改最近n条提交
git rebase -i HEAD~n
```

**注:** 交互式变基会改变提交历史 hash

### 交互命令参考

| 命令     | 意义                                               | 典型用途                             |
| :------- | :------------------------------------------------- | :----------------------------------- |
| `pick`   | 保持这个提交，不做改动                             | 大部分提交直接保留                   |
| `reword` | 保持提交内容，但**修改提交信息**                   | 改错别字、优化提交说明               |
| `edit`   | 停下来，**修改提交内容或者信息**                   | 发现代码有小错误，想补救             |
| `squash` | 将本提交**和上一个提交合并**，并编辑提交信息       | 多个小提交，想打包成一个             |
| `fixup`  | 将本提交**合并到上一个提交**，但**忽略本提交信息** | 修修补补的小提交，直接塞进上一个提交 |
| `drop`   | **丢弃这个提交**                                   | 提交错了，想干脆删掉                 |

## 暂存区的变动提交到本地仓库

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

## 克隆远程仓库

```bash
# 克隆远程仓库
git clone <remote-repo-url>
```

## 查看远程仓库

```bash
# 查看已经配置的远程仓库信息
git remote -v
```

## 关联远程仓库

关联远程仓库后, 可以使用 `git push` 命令将本地和远程仓库的内容进行同步

```bash
git push --set-upstream origin main
# 简化命令:
git push -u origin main
```