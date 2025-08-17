## 一些常用的 git 命令



### 仓库的创建于克隆

`git init`：将当前目录初始化为 Git 仓库，生成隐藏的 .git 目录

`git clone <远程仓库地址>`：完整复制远程仓库到本地（所有分支和历史）



### 基础工作流

`git status`：显示工作去与暂存区的文件状态（修改，新增，删除）

`git add <文件名>`：添加指定文件

`git add .`：添加所有修改的文件

`git commit -m "提交信息"`：将暂存区内容提交到本地仓库

`git diff`：比较工作区与暂存区的差异

`git diff --staged`：比较暂存区与最新提交的差异



### 分支管理

`git branch`：列出所有本地分支

`git branch <新分支名>`：创建新分支

`git switch <分支名>`：切换到指定分支

`git switch -`：切换到上一个分支

`git checkout <分支名>`：切换到指定分支

`git checkout -`：切换到上一个分支

`git switch -c <新分支名>`：创建并切换到新分支



### 合并

`git merge <分支名>`：将指定分支合并到当前分支



### 变基

`git rebase <分支名>`：将当前分支修改变基到目标分支（保持线性历史）

`git rebase --onto main C feature`：将 `feature`分支从提交 `C`后的提交移到 `main`

`git rebase --continue`：解决冲突后继续变基

`git rebase --abort`：中止变基并恢复原状

`git push --force-with-lease`：安全强制推送（重写历史后必需）



#### 交互式 rebase

`git rebase -i HEAD~3`：交互式编辑最近 3 个提交







### 删除分支

`git branch -d <分支名>`：删除已合并的分支

`git branch -D <分支名>`：强制删除未合并的分支（慎用！）



### 远程协作

`git remote add origin <远程地址>`：关联远程仓库

`git push origin <分支名>`：推送本地分支到远程

`git pull origin <分支名>`：拉取远程分支并自动合并（相当于 `git fetch`+ `git merge`）

`git remote -v`：显示远程仓库地址



### 查看历史

`git log`：查看详细历史

`git log --online --graph`：简洁图形化历史



### 撤销操作

`git restore <文件名>`：工作区修改，放弃未暂存的修改

`git restore --staged <文件名>`：暂存区回退，取消暂存

`git reset --hard HEAD^`：版本回退，回退到上一版本（`HEAD~n`回退 n 个版本）

`git revert <提交ID>`：安全撤销提交，生成新提交来撤销指定更改



### 临时储藏

`git stash`：临时储藏工作区修改

`git stash save "备注信息"`：临时储藏工作区修改，并标记名称

`git stash list`：显示所有储藏记录，格式为 `stash@{n}` 

`git stash apply`： 取出最新的储藏的工作区修改，不删除记录

`git stash apply stash@{1}`：取出指定的储藏，不删除记录

`git stash pop`：恢复最新的储藏的工作去修改，并删除记录

`git stash pop stash@{1}`：恢复指定的储藏的工作去修改，并删除记录

`git stash drop stash@{1}`：删除指定储藏

`git stash clear`：清空所有储藏

#### 高级用法

`git stash -u`：包含未跟踪文件

`git stash -a`：包含所有文件（含 .gitignore 忽略的文件）

`git stash -p`：交互式选择要储藏的代码块

`git stash --keep-index`：仅储藏工作区修改，保留暂存区内容不变

`git stash branch <新分支名> stash@{1}`：基于储藏创建分支并应用修改（自动删除该储藏）

`git stash show stash@{1}`：显示简略修改摘要

`git stash show -p stash@{1}`：显示详细差异



#### 经典工作流

```shell
# 1. 开发中接到紧急任务
git stash save "开发购物车功能"  # 临时保存当前进度
git checkout main              # 切到主分支修复 Bug

# 2. 修复完成后返回原分支
git checkout feature
git stash list                # 确认贮藏记录
git stash pop                 # 恢复最新进度并删除记录

# 3. 若恢复时发生冲突
#    手动解决冲突 → git add → 继续开发
```





### 标签管理

`git tag v1.0.0`：创建轻量标签

`git tag -a v1.0.0 -m "正式发布版本 1.0.0"`：创建轻量标签，`-a` 指定附注标签，`-m `添加描述

`Git tag -a v1.0.0 abc123 -m "修改历史版本"`：abc123 为目标提交的哈希值（前7位即可）

`git tag`：按字母顺序列出本地标签

`git ls-remote --tags origin`：查看远程上的标签列表

`git tag -l "v1.*"`：列出所有 v1. 开头的标签

`git show v1.0.0`：显示标签作者、日期、描述及关联提交的变更内容

`git tag --contains abc123`：列出包含提交 abc123 的标签

`git push origin v1.0.0`：将指定标签推送到远程仓库

`git push origin --tags`：一次性推送全部未同步的标签

`git tag -d v1.0.0`：删除本地标签

`git push origin --delete v1.0.0`：方式一：直接删除远程标签

`git push origin :refs/tags/v1.0.0`：方式二：引用语法删除（更通用）

#### 经典工作流

```shell
# 1. 创建附注标签（正式版本）
git tag -a v2.1.0 -m "新增支付功能"

# 2. 推送标签到远程
git push origin v2.1.0

# 3. 为历史提交打补丁标签（如 v1.5 有 Bug）
git tag -a v1.5.1 abc123 -m "紧急修复登录漏洞"

# 4. 推送新标签
git push origin v1.5.1

# 5. 查看远程标签
git ls-remote --tags origin

# 6. 删除临时测试标签（本地+远程）
git tag -d test-tag
git push origin --delete test-tag
```



### 其他

`git blame <文件名>`：显示文件的逐行修改记录（含作者和提交）











