# Git

## 基础信息配置

### 用户信息的配置

```git
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

```git
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

### 远程仓库

#### 克隆远程仓库

```git
# 克隆远程仓库
git clone <remote-repo-url>
```

#### 查看远程仓库

```git
# 查看远程仓库
git remote -v
```

#### 关联远程仓库

关联远程仓库后，下一次可以直接使用 `git push` 提交代码到远程仓库

```git
git push --set-upstream origin main

# 简化命令
git push -u origin main
```

### 日志

#### 查看提交日志

```git
git log

# 查看简洁的提交日志
git log --oneline

# 查看简洁的提交日志，包含分支信息
git log --oneline --graph
```

### 分支

#### 查看所有分支、 所处分支

```git
git branch

```

#### 重命名分支

```git
# 不提供old-branch-name参数时，默认重命名当前分支
git branch -m [<old-branch-name>] <new-branch-name>
```

#### 创建分支

```git
git branch <branch-name>
```

#### 切换分支

```git
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

```git
# 删除分支
git branch -d <branch-name>
```

## 个人开发

### 分支调整

现在有如下需求，将分支 v4 调整到分支 v3 之后

<img src="/home/Tomatos/Projects/GithubProjects/MyBlog/docs/env-config/tools/git/assets/image-20250424152608002.png" alt="image-20250424152608002"  />

### # 操作步骤

1. 查看分支日志，找对提交记录 v2 对应的 hash 值

![image-20250424153056890](/home/Tomatos/Projects/GithubProjects/MyBlog/docs/env-config/tools/git/assets/image-20250424153056890.png)

2. 基于提交点 v2 创建并切换到新分支

```git
git switch -c new-dev 4e116a6
```

3. 挑选其他分支点

```
git cheery-pick <branch-hash>
```

4. 切换回主分支

```git
git switch main
```

5. 硬重置主分支到新分支最新提交

```git
git reset --hard new-dev
```

6. 强制推送到远程分支

```git
git push -f origin main
```
