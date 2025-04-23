# Git

## 基础信息配置

### 用户信息的配置

```git
# 配置用户邮箱
git config user.email "Your Email"
# 配置用户名
git config user.name "Your Name"

# 配置全局用户信息
git config --global user.name "Your Name"
git config --global user.email "Your Email"
```

**注：**命令默认作用范围是当前仓库

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
