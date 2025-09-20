# Git 高级

## 变基

变基操作会将当前分支的提交记录移动到指定分支的最新提交之后

```bash
# 变基前
A --- B --- C (main)
         \
          D --- E (feature)

# 切换到 feature 分支, 进行变基:
git rebase main

# 变基后
A --- B --- C (main)
             \
              D' --- E' (feature)

```

## 挑选

挑选（cherry-pick）操作可以将某个分支上的指定提交应用到当前分支。

```bash
git cherry-pick <hash> # hash 表示某个分支的提交点hash

# 也可以一次性挑选多个提交
git cherry-pick <hash1> <hash2> <hash3>
# 或
git cherry-pick <hash1>^..<hash3> # 挑选[hash1, hash3]的所有提交
# 或
git cherry-pick <hash1>~2..<hash3> # 挑选[hash1前一个提交点, hash3]的所有提交
# 或
git cherry-pick <hash1>~2^..<hash3> # 挑选[hash1前两个提交点, hash3]的所有提交
# 或
git cherry-pick <hash1>..<hash3> # 挑选(hash1, hash3]的所有提交
```
## 策略同步

```bash
# 同步远程分支时对远程分支进行变基
git pull --rebase

# 同步远程分支时不进行变基(默认行为)
git pull --no-rebase
# 等价于
git pull

# 如果本地没有新增提交, 远程有新增提交点, 效果和使用git pull一样
# 如果本地分支有新增提交, 远程分支也有新增提交这个时候, 这个命令会停止拉取, git pull 仍然拉取(拉取后发生冲突)
git pull --ff-only
```