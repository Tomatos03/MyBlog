# Git 日志管理

## 提交点信息

```bash
# 输出包含一些变更的内容
git show <hash-code>

# 输出不包含变更的内容
git show -s <hash-code>
```

## 提交日志

```bash
git log

# 查看简洁的提交日志
git log --oneline

# 查看简洁的提交日志，包含分支信息
git log --oneline --graph
```

## 远程和与地日志差异

```bash
# 查看本地和远程分支的差异
git log <remote-repo-name>/<branch-name>..<branch-name>
# 示例
git log origin/main..main
```

## 查看操作日志

```bash
git reflog

# 查看简洁的操作日志
git reflog --oneline
```