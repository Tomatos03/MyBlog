# Docker

更详细的信息可以参考[Docker Document](https://docs.docker.com/engine/reference/commandline/)

## Docker 容器

### 创建容器

Docker 提供了 `docker run` 命令，用于创建并启动一个新的容器：

```bash
# 基本用法，将 <镜像名称> 替换为镜像名称
docker run <镜像名称>

# 示例：运行一个基于 nginx 镜像的容器
docker run nginx

# 以交互模式运行容器，并附加到终端
docker run -it <镜像名称>

# 示例：运行一个交互式的 Ubuntu 容器
docker run -it ubuntu

# 指定容器名称，将 <容器名称> 替换为自定义名称
docker run --name <容器名称> <镜像名称>

# 示例：运行一个名为 my-nginx 的 nginx 容器
docker run --name my-nginx nginx

# 在后台运行容器
docker run -d <镜像名称>

# 示例：以后台模式运行 nginx 容器
docker run -d nginx

# 映射端口，将 <主机端口>:<容器端口> 替换为实际端口号
docker run -p <主机端口>:<容器端口> <镜像名称>

# 示例：将主机的 8080 端口映射到容器的 80 端口
docker run -p 8080:80 nginx

# 挂载卷，将 <主机路径>:<容器路径> 替换为实际路径
docker run -v <主机路径>:<容器路径> <镜像名称>

# 示例：将主机的 /data 目录挂载到容器的 /app 目录
docker run -v /data:/app nginx
```

#### 设置网络

Docker 允许在创建容器时指定网络，这对于需要自定义网络配置的场景非常有用：

```bash
# 使用 --network 参数指定网络
docker run --network <网络名称> <镜像名称>

# 示例：在 my-network 网络中运行一个 nginx 容器
docker run --network my-network nginx
```

> [!TIP]
> 如果未指定网络，Docker 会默认使用 `bridge` 网络。

#### 设置环境变量

Docker 允许在创建容器时设置环境变量，这对于配置应用程序行为非常有用：

```bash
# 使用 -e 参数设置单个环境变量
docker run -e KEY=VALUE <镜像名称>

# 示例：设置环境变量 MYSQL_ROOT_PASSWORD
docker run -e MYSQL_ROOT_PASSWORD=secret mysql

# 设置多个环境变量
docker run -e KEY1=VALUE1 -e KEY2=VALUE2 <镜像名称>

# 示例：设置多个环境变量
docker run -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=mydb mysql

# 从文件加载环境变量
docker run --env-file=<文件路径> <镜像名称>

# 示例：从 .env 文件加载环境变量
docker run --env-file=.env postgres
```

环境变量文件的格式应为每行一个 `KEY=VALUE` 对，例如：

```
# .env 文件示例
POSTGRES_USER=admin
POSTGRES_PASSWORD=secret
POSTGRES_DB=myapp
```

> [!TIP]
> 环境变量通常用于配置容器化应用程序，如数据库密码、连接字符串或功能标志。

> [!NOTE]
> 多次执行 `docker run` 命令会创建多个容器实例。如果创建容器的时候使用的镜像是不存在的，Docker 会自动从 Docker Hub 拉取最新的镜像。

#### 容器重启策略

Docker 支持多种重启策略，用于控制容器在退出时是否自动重启。以下是可用的重启策略及其用法：

```bash
# 使用 --restart 参数设置重启策略
docker run --restart=<策略> <镜像名称>
```

> [!TIP]
> Docker 提供的重启策略会在以下情况下生效：
>
> 1. 容器异常退出（如进程崩溃）。
> 2. Docker 服务重启。
> 3. 主机重启（Docker 服务随主机启动）。

#### 重启策略选项

| 策略                       | 描述                                                   |
| -------------------------- | ------------------------------------------------------ |
| `no`                       | 默认策略，容器退出时不自动重启                         |
| `on-failure[:max-retries]` | 仅当容器以非零状态码退出时重启，可选择设置最大重试次数 |
| `always`                   | 始终重启容器，无论退出状态如何                         |
| `unless-stopped`           | 始终重启容器，除非容器被明确停止或 Docker 本身停止     |

```bash
# 容器退出时不自动重启（默认行为）
docker run --restart=no nginx

# 容器非正常退出时重启，最多尝试 5 次
docker run --restart=on-failure:5 nginx

# 容器退出时始终自动重启
docker run --restart=always nginx

# 容器退出时始终自动重启，除非被明确停止
docker run --restart=unless-stopped nginx

# 修改已存在容器的重启策略
docker update --restart=always <容器ID或名称>
```

> [!TIP]
> 在生产环境中，建议使用 `unless-stopped` 或 `always` 策略确保关键服务持续运行。

> [!NOTE]
> Docker Swarm 或 Kubernetes 等容器编排平台提供了更高级的容器调度和自动恢复机制。

### 删除容器

Docker 提供了 `docker rm` 命令，用于删除容器。以下是一些常见的用法和示例：

```bash
# 删除容器，将 <容器ID或名称> 替换为容器的 ID 或名称
docker rm <容器ID或名称>

# 删除所有的容器
# $()表示将括号之中的命令的输出作为字符串
docker rm $(docker ps -aq)


# 删除所有停止运行的容器
docker rm $(docker ps -aq -f status=exited)


# 示例：删除名为 my-nginx 的容器
docker rm my-nginx

# 强制删除正在运行的容器
docker rm -f <容器ID或名称>

# 示例：强制删除名为 my-nginx 的容器
docker rm -f my-nginx

# 删除所有已停止的容器
docker container prune
```

> [!WARNING]
> 删除容器时，请确保容器中没有重要数据，或者已将数据挂载到主机路径中。

### 查看容器

Docker 提供了 `docker ps` 命令，用于查看当前运行的容器：

```bash
# 查看运行中的容器
docker ps

# 查看所有容器，包括已停止的容器
docker ps -a

# 仅显示容器 ID
docker ps -q

# 组合参数，列出所有容器的 ID，包括已停止的容器
docker ps -aq

# 查看特定容器的详细信息，将 <容器ID或名称> 替换为容器的 ID 或名称
docker inspect <容器ID或名称>

# 根据指定状态过滤容器，将 <状态> 替换为 desired 状态，例如 running 或 exited
docker ps --filter "status=<状态>"
# 示例：仅查看运行中的容器
docker ps --filter "status=running"
```

以下是 Docker 容器的一些常见运行状态及其含义：

| 状态         | 描述                                           |
| ------------ | ---------------------------------------------- |
| `created`    | 容器已创建，但尚未启动。                       |
| `restarting` | 容器正在重启中。                               |
| `running`    | 容器正在运行中。                               |
| `paused`     | 容器已暂停，所有进程被挂起。                   |
| `exited`     | 容器已停止，退出状态码可用于诊断问题。         |
| `dead`       | 容器处于非正常状态，可能由于错误导致无法恢复。 |

### 容器内执行命令

Docker 提供了 `docker exec` 命令，用于在运行中的容器内执行命令：

```bash
# 在容器内执行命令，将 <容器ID或名称> 替换为目标容器，将 <命令> 替换为要执行的命令
docker exec <容器ID或名称> <命令>

# 示例：在名为 my-nginx 的容器内列出 / 目录的内容
docker exec my-nginx ls /

# 以交互模式执行命令
docker exec -it <容器ID或名称> <命令>

# 示例：以交互模式进入名为 my-ubuntu 的容器，并启动 bash
docker exec -it my-ubuntu bash
```

> [!NOTE]
> 使用 `docker exec` 执行命令时，目标容器必须处于运行状态。

### 查看容器日志

Docker 提供了 `docker logs` 命令，用于查看容器的日志输出：

```bash
# 单次使用，执行完成之后退出
# 查看容器日志，将 <容器ID或名称> 替换为目标容器
docker logs <容器ID或名称>

# 实时查看容器日志
docker logs -f <容器ID或名称>

# 查看最近输出的n条日志
# 限制显示的日志行数，将 <行数> 替换为具体的行数
docker logs --tail <行数> <容器ID或名称>
# 或者使用
docker logs -n <行数> <容器ID或名称>


# 示例：查看名为 my-nginx 的容器的最近 100 行日志
docker logs --tail 100 my-nginx

# 查看指定时间范围的日志
docker logs --since <时间> <容器ID或名称>
docker logs --until <时间> <容器ID或名称>

# 示例：查看过去 10 分钟内的日志
docker logs --since 10m my-nginx
```

> [!NOTE]
> 日志内容取决于容器内运行的应用程序输出。

### 拷贝文件到容器或从容器拷贝文件

Docker 提供了 `docker cp` 命令，用于在主机和容器之间拷贝文件或目录：

```bash
# 从主机拷贝文件到容器，将 <主机路径> 替换为源文件路径，将 <容器ID或名称>:<容器路径> 替换为目标路径
docker cp <主机路径> <容器ID或名称>:<容器路径>

# 示例：将主机的 /data/file.txt 文件拷贝到容器 my-container 的 /app 目录
docker cp /data/file.txt my-container:/app

# 从容器拷贝文件到主机，将 <容器ID或名称>:<容器路径> 替换为源文件路径，将 <主机路径> 替换为目标路径
docker cp <容器ID或名称>:<容器路径> <主机路径>

# 示例：将容器 my-container 的 /app/file.txt 文件拷贝到主机的 /data 目录
docker cp my-container:/app/file.txt /data
```

> [!NOTE]
> 使用 `docker cp` 命令时，目标路径必须是有效的路径，且具有相应的读写权限。

### 停止容器

Docker 提供了 `docker stop` 命令，用于停止运行中的容器：

```bash
# 停止容器，将 <容器ID或名称> 替换为目标容器的 ID 或名称
docker stop <容器ID或名称>

# 示例：停止名为 my-nginx 的容器
docker stop my-nginx

# 停止多个容器
docker stop <容器ID或名称1> <容器ID或名称2>

# 示例：停止多个容器
docker stop my-nginx my-ubuntu

# 停止所有运行中的容器
docker stop $(docker ps -q)
```

> [!NOTE]
> 停止容器后，容器的状态会变为 `exited`，可以通过 `docker ps -a` 查看。

### 启动容器

Docker 提供了 `docker start` 命令，用于启动已停止的容器：

```bash
# 启动容器，将 <容器ID或名称> 替换为目标容器的 ID 或名称
docker start <容器ID或名称>

# 示例：启动名为 my-nginx 的容器
docker start my-nginx

# 启动多个容器
docker start <容器ID或名称1> <容器ID或名称2>

# 示例：启动多个容器
docker start my-nginx my-ubuntu

# 启动所有已停止的容器
docker start $(docker ps -aq -f status=exited)
```

> [!NOTE]
> 启动容器后，容器的状态会变为 `running`，可以通过 `docker ps` 查看。

### 重启容器

```bash
# 重启容器，将 <容器ID或名称> 替换为目标容器的 ID 或名称
docker restart <容器ID或名称>

# 示例：重启名为 my-nginx 的容器
docker restart my-nginx

# 重启多个容器
docker restart <容器ID或名称1> <容器ID或名称2>

# 示例：重启多个容器
docker restart my-nginx my-ubuntu
```

> [!NOTE]
> 重启容器会停止并重新启动容器，容器的状态会变为 `running`。

### 暂停和恢复容器

Docker 提供了 `docker pause` 和 `docker unpause` 命令，用于暂停和恢复容器的所有进程：

```bash
# 暂停容器，将 <容器ID或名称> 替换为目标容器的 ID 或名称
docker pause <容器ID或名称>

# 示例：暂停名为 my-nginx 的容器
docker pause my-nginx

# 恢复容器，将 <容器ID或名称> 替换为目标容器的 ID 或名称
docker unpause <容器ID或名称>

# 示例：恢复名为 my-nginx 的容器
docker unpause my-nginx
```

> [!NOTE]
> 暂停容器会挂起容器内的所有进程，恢复后进程将继续运行。

### 杀死容器

Docker 提供了 `docker kill` 命令，用于立即终止运行中的容器：

```bash
# 杀死容器，将 <容器ID或名称> 替换为目标容器的 ID 或名称
docker kill <容器ID或名称>

# 示例：杀死名为 my-nginx 的容器
docker kill my-nginx

# 杀死多个容器
docker kill <容器ID或名称1> <容器ID或名称2>

# 示例：杀死多个容器
docker kill my-nginx my-ubuntu
```

> [!WARNING]
> 使用 `docker kill` 会立即终止容器的运行，可能导致数据丢失或应用状态不一致。

## Docker 镜像

### 查看命令帮助

Docker 提供了一个内置的帮助系统，可以通过以下命令查看 Docker 的所有可用命令及其详细信息：

```bash
# 查看所有命令
docker --help

# 查看特定命令的帮助，将 <command> 替换为具体的 Docker 子命令，例如 run 或 ps
docker <command> --help
```

### 构建 Docker 镜像

Docker 提供了 `docker build` 命令，用于根据 Dockerfile 构建镜像。

#### 基本用法

```bash
# 使用 -t 参数为镜像指定名称和标签
docker build -t <镜像名称>:<标签> <Dockerfile路径>

# 示例：构建一个名为 my-app，标签为 latest 的镜像
docker build -t my-app:latest .

# 示例：指定 Dockerfile 的路径
docker build -t my-app:latest -f /path/to/Dockerfile .
```

#### 构建上下文

构建上下文是指 `docker build` 命令中指定的路径，Docker 会将该路径下的所有文件发送到 Docker 引擎进行构建。

> [!TIP]
> 构建上下文路径通常是 Dockerfile 所在的目录。

#### 使用缓存

Docker 在构建镜像时会利用分层缓存机制，加快构建速度。如果某一层未发生变化，Docker 会复用缓存。

```bash
# 禁用缓存
docker build --no-cache -t <镜像名称>:<标签> .
```

#### 构建时传递参数

可以通过 `--build-arg` 参数向 Dockerfile 中的 `ARG` 指令传递构建时参数：

```dockerfile
# Dockerfile 示例
ARG APP_VERSION
RUN echo "Building version $APP_VERSION"
```

```bash
# 构建镜像时传递参数
docker build --build-arg APP_VERSION=1.0.0 -t my-app:1.0.0 .
```

#### 查看构建历史

使用 `docker history` 命令可以查看镜像的构建历史：

```bash
docker history <镜像ID或名称>
```

#### 构建镜像的最佳实践

-   **最小化镜像体积**：选择轻量级基础镜像（如 `alpine`）。
-   **减少层数**：合并多个 `RUN` 指令。
-   **清理临时文件**：在构建过程中删除不必要的文件。
-   **使用多阶段构建**：仅保留最终运行所需的文件。
-   **避免泄露敏感信息**：不要在 Dockerfile 中硬编码密码或密钥。
-   **利用缓存**：将变化频率低的指令放在 Dockerfile 的顶部。
-   **定期更新基础镜像**：确保镜像包含最新的安全补丁。

### 搜索镜像仓库

Docker 提供了 `docker search` 命令，用于在 [Docker Hub](https://hub.docker.com/) 上搜索镜像：

```bash
# 搜索镜像，将 <镜像名称> 替换为您想要搜索的镜像名称
docker search <镜像名称>

# 示例：搜索 nginx 镜像
docker search nginx
```

### 拉取镜像

Docker 提供了 `docker pull` 命令，用于从 [Docker Hub](https://hub.docker.com/) 或其他镜像仓库中拉取镜像：

```bash
# 拉取镜像，将 <镜像名称> 替换为镜像名称，<标签> 替换为具体的镜像标签（如 latest）
docker pull <镜像名称>:<标签>

# 示例：拉取 nginx 的最新版本
docker pull nginx

# 示例：拉取指定版本的镜像，例如 nginx:1.21
docker pull nginx:1.21
```

### 查看镜像

Docker 提供了一组与镜像管理相关的命令，用于查看、删除和管理本地镜像：

```bash
# 查看本地镜像
docker images

# 展示所有镜像，包括隐藏镜像
docker images -a

# 仅展示镜像的 ID 信息
docker images -q

# 多个参数组合，列出所有镜像的 ID
docker images -aq

# 查看镜像详情，将 <镜像ID或名称> 替换为镜像的 ID 或名称
docker inspect <镜像ID或名称>
```

### 删除镜像

Docker 提供了 `docker rmi` 命令，用于删除本地的 Docker 镜像。

```bash
# 删除镜像，将 <镜像ID或名称> 替换为目标镜像的 ID 或名称
docker rmi <镜像ID或名称>
# 示例：删除名为 nginx 的镜像
docker rmi nginx

# 强制删除镜像
docker rmi -f <镜像ID或名称>
# 示例：强制删除名为 nginx 的镜像
docker rmi -f nginx

# 删除所有未使用的镜像
docker image prune

# 示例：删除所有未使用的镜像并释放空间
docker image prune -a
```

> [!WARNING]
> 删除镜像时，请确保没有容器正在使用该镜像，否则需要先删除相关容器。

> [!TIP]
> 使用 `docker images` 查看本地镜像列表，确认需要删除的镜像。

### 推送镜像到远程仓库

Docker 提供了 `docker push` 命令，用于将本地镜像推送到远程镜像仓库（如 Docker Hub 或私有仓库）。

```bash
# 登录到目标镜像仓库
# 不填写仓库地址时，默认登录到 Docker Hub
docker login <仓库地址>

# 为镜像打标签
docker tag <镜像ID或名称> <DockerHub用户名>/<镜像名称>:<标签>

# 示例：为本地镜像 my-app 打标签，推送到 Docker Hub 的 my-namespace 命名空间
# docker tag my-app my-namespace/my-app:latest

# 推送镜像到远程仓库
# 当执行 docker push 时，Docker 会根据镜像的标签信息将镜像推送到对应的远程仓库。
# 如果推动的镜像没有标签，Docker 会默认使用 latest 标签。
# 如果镜像在远程仓库中不存在，Docker 会自动创建一个新的镜像
docker push <DockerHub用户名>/<镜像名称>:<标签>
```

> [!TIP]
> 在推送镜像之前，确保镜像名称和标签符合目标仓库的命名规则。

> [!WARNING]
> 推送到公共仓库的镜像会被公开访问，请确保镜像中不包含敏感信息。

## Docker 端口映射

> [!NOTE]
> 在 Docker 中，容器的端口和当前主机的端口是相互独立的，默认情况下容器的端口不会直接影响主机的端口。只有当你显式地将容器的端口映射到主机的端口时，才会产生关联。

Docker 提供了端口映射功能，可以将容器内部的端口映射到主机的端口，从而使容器内的服务可以被外部访问。

```bash
# 使用 `docker ps` 查看容器的端口映射信息：

# 使用 -p 参数指定端口映射：
docker run -p <主机端口>:<容器端口> <镜像名称>

# 示例 1: 将主机的 8080 端口映射到容器的 80 端口
docker run -p 8080:80 nginx

# 示例 2: 映射多个端口
docker run -p 8080:80 -p 8443:443 nginx

# 示例 3: 指定绑定的主机 IP 地址
docker run -p 127.0.0.1:8080:80 nginx

# -P 参数可以随机映射容器的所有暴露端口到主机的可用端口：
docker run -P nginx
```

> [!NOTE]
> 端口映射仅适用于容器运行时指定的端口，确保容器内的服务监听了正确的端口。

> [!NOTE]
> 端口映射是在创建的过程之中执行的

## Docker 数据卷

Docker 提供了数据卷（Volume）功能，用于持久化容器中的数据。数据卷可以在容器之间共享，并且独立于容器的生命周期。

### 创建数据卷

```bash
# 创建数据卷，将 <卷名称> 替换为自定义的卷名称
docker volume create <卷名称>

# 示例：创建一个名为 my-volume 的数据卷
docker volume create my-volume
```

### 查看数据卷

```bash
# 列出所有数据卷
docker volume ls
```

### 挂载数据卷到容器

```bash
# 使用 -v 参数挂载数据卷，将 <卷名称>:<容器路径> 替换为实际值
docker run -v <卷名称>:<容器路径> <镜像名称>

# 示例：将 my-volume 数据卷挂载到容器的 /app 目录
# 如果挂载的数据卷不存在，docker会自动创建
docker run -v my-volume:/app nginx

# 使用 --mount 参数挂载数据卷
docker run --mount source=<卷名称>,target=<容器路径> <镜像名称>

# 示例：将 my-volume 数据卷挂载到容器的 /app 目录
docker run --mount source=my-volume,target=/app nginx
```

### 查看数据卷详情

```bash
# 查看数据卷详情，将 <卷名称> 替换为目标数据卷的名称
docker volume inspect <卷名称>

# 示例：查看 my-volume 数据卷的详情
docker volume inspect my-volume
```

### 删除数据卷

```bash
# 删除数据卷，将 <卷名称> 替换为目标数据卷的名称
docker volume rm <卷名称>

# 示例：删除 my-volume 数据卷
docker volume rm my-volume
```

> [!TIP]
> 无法删除正在使用中的数据卷，必须先停止并删除使用该数据卷的容器。

> [!WARNING]
> 删除数据卷时，请确保数据卷不再被任何容器使用，否则可能会导致数据丢失。

### 清理未使用的数据卷

```bash
# 清理未使用的数据卷
docker volume prune
```

> [!WARNING]
> 清理操作不可逆，请谨慎执行。

### 数据卷的优势

-   **持久化数据**：即使容器被删除，数据卷中的数据仍然保留。
-   **共享数据**：多个容器可以同时访问同一个数据卷。
-   **性能优化**：数据卷的性能优于直接挂载主机路径。
-   **备份与恢复**：可以轻松备份和恢复数据卷中的数据。
-   **隔离性**：数据卷与容器的生命周期独立，提供更高的灵活性。

## Docker 网络

Docker 提供了灵活的网络功能，用于管理容器之间的通信以及容器与外部网络的连接。

> [!TIP]
> 同一个网络的容器可以通过容器名称互相访问，而不需要使用 IP 地址。

### 查看网络

```bash
# 列出所有网络
docker network ls
```

### 创建网络

```bash
# 创建一个自定义网络，将 <网络名称> 替换为自定义的网络名称
docker network create <网络名称>

# 示例：创建一个名为 my-network 的网络
docker network create my-network
```

### 查看网络详情

```bash
# 查看网络的详细信息，将 <网络名称> 替换为目标网络的名称
docker network inspect <网络名称>

# 示例：查看 my-network 网络的详情
docker network inspect my-network
```

### 删除网络

```bash
# 删除网络，将 <网络名称> 替换为目标网络的名称
docker network rm <网络名称>

# 示例：删除名为 my-network 的网络
docker network rm my-network
```

> [!WARNING]
> 无法删除正在使用中的网络，必须先停止并移除使用该网络的容器。

### 将容器连接到网络

```bash
# 将容器连接到指定网络，将 <容器ID或名称> 和 <网络名称> 替换为实际值
docker network connect <网络名称> <容器ID或名称>

# 示例：将名为 my-container 的容器连接到 my-network 网络
docker network connect my-network my-container
```

### 从网络断开容器

```bash
# 将容器从指定网络断开，将 <容器ID或名称> 和 <网络名称> 替换为实际值
docker network disconnect <网络名称> <容器ID或名称>

# 示例：将名为 my-container 的容器从 my-network 网络断开
docker network disconnect my-network my-container
```

### 网络模式

Docker 支持以下几种网络模式：

| 网络模式  | 描述                                                          |
| --------- | ------------------------------------------------------------- |
| `bridge`  | 默认模式，容器通过桥接网络与主机通信。                        |
| `host`    | 容器与主机共享网络堆栈，性能较高，但隔离性较差。              |
| `none`    | 容器没有网络连接，适用于完全隔离的场景。                      |
| `overlay` | 用于跨主机的容器通信，通常在 Swarm 或 Kubernetes 中使用。     |
| `macvlan` | 为容器分配独立的 MAC 地址，使其像物理设备一样直接连接到网络。 |

### 使用指定网络运行容器

```bash
# 使用 --network 参数指定网络
docker run --network <网络名称> <镜像名称>

# 示例：在 my-network 网络中运行一个 nginx 容器
docker run --network my-network nginx
```

> [!TIP]
> 自定义网络可以更好地管理容器之间的通信，避免使用默认的 `bridge` 网络。

### 清理未使用的网络

```bash
# 清理未使用的网络
docker network prune
```

> [!WARNING]
> 清理操作不可逆，请确保未使用的网络不再需要。

## Dockerfile

Dockerfile 是一个文本文件，其中包含了构建 Docker 镜像所需的所有命令和指令。通过 Dockerfile，用户可以自动化镜像的创建过程。

### 指令参考

| 指令             | 描述                       |
| ---------------- | -------------------------- |
| FROM             | 指定基础镜像               |
| LABEL            | 添加作者或维护者信息       |
| ENV              | 设置环境变量               |
| RUN              | 执行命令安装软件或更新系统 |
| WORKDIR          | 定义工作目录               |
| COPY / ADD       | 复制文件或目录到镜像中     |
| EXPOSE           | 暴露容器端口               |
| CMD / ENTRYPOINT | 指定容器启动时执行的命令   |

```dockerfile
# 使用指定的基础镜像
FROM ubuntu:20.04

# 添加维护者信息
LABEL maintainer="your_email@example.com"

# 设置环境变量
ENV LANG=C.UTF-8

# 执行系统更新并安装必要的软件包
RUN apt-get update && apt-get install -y \
    curl \
    vim

# 定义工作目录
WORKDIR /app

# 复制当前目录所有文件到镜像中的 /app 目录
COPY . /app

# 暴露容器的 80 端口
EXPOSE 80

# 指定容器启动时执行的命令
CMD ["bash"]
```

### CMD 指令

`CMD` 指令用于指定容器启动时默认执行的命令。

> [!NOTE]
> 一个 Dockerfile 中只能有一个 `CMD` 指令，如果定义了多个，只有最后一个会生效。

#### 基本用法

```dockerfile
# 使用 exec 格式
CMD ["executable", "param1", "param2"]
#示例：
CMD ["nginx", "-g", "daemon off;"]

# 使用 shell 格式
CMD command param1 param2
# 示例：
CMD echo "Hello, World!"
```

> [!NOTE]
> exec 写法无法解析环境变量 \
> CMD ["echo", "$USER"]，实际输出: $USER, 并不是对应的用户名

> [!NOTE]
> 使用 shell 格式时，命令会通过 `/bin/sh -c` 执行。

#### 覆盖 CMD 指令

在运行容器时，可以通过命令行参数覆盖 `CMD` 指令：

```bash
docker run <镜像名称> <新命令>
# 示例：
docker run my-image echo "Overriding CMD"
```

> [!TIP]
> 如果需要确保命令不可被覆盖，建议使用 `ENTRYPOINT` 指令代替 `CMD`。

### ENV 指令

`ENV` 指令用于在 Dockerfile 中设置环境变量，这些变量在容器运行时可用。

#### 基础用法

```dockerfile
# 设置单个环境变量
ENV KEY=value

# 示例：设置环境变量 APP_ENV 为 production
ENV APP_ENV=production

# 设置多个环境变量
ENV KEY1=value1 \
    KEY2=value2

# 示例：设置多个环境变量
ENV APP_NAME=myapp \
    APP_VERSION=1.0.0
```

> [!TIP]
> 使用 `ENV` 指令设置的环境变量可以在后续的 Dockerfile 指令中使用，也可以在容器运行时通过 `docker inspect` 查看。

#### 覆盖环境变量

在运行容器时，可以通过 `-e` 参数覆盖 `ENV` 指令设置的环境变量：

```bash
docker run -e KEY=new_value <镜像名称>

# 示例：覆盖 APP_ENV 环境变量
docker run -e APP_ENV=development my-image
```

> [!NOTE]
> 如果同时使用 `ENV` 指令和 `-e` 参数，运行时的 `-e` 参数优先级更高。

### WORKDIR 命令

`WORKDIR` 指令用于设置容器内的工作目录。所有后续的 `RUN`、`CMD`、`ENTRYPOINT` 等指令都会在该目录下执行。

#### 基本用法

```dockerfile
# 设置工作目录
WORKDIR /path/to/workdir

# 示例：将工作目录设置为 /app
WORKDIR /app
```

`WORKDIR` 指令支持引用通过 `ENV` 指令定义的环境变量：

```dockerfile
# 设置环境变量
ENV APP_HOME=/app

# 使用环境变量设置工作目录
WORKDIR $APP_HOME

# 示例：将工作目录设置为 /app/logs
WORKDIR $APP_HOME/logs
```

> [!TIP]
> 使用变量可以提高 Dockerfile 的可读性和灵活性，尤其是在需要多次引用相同路径的情况下。

#### 多次使用

如果多次使用 `WORKDIR` 指令，路径会被逐步追加：

```dockerfile
WORKDIR /app
WORKDIR logs
# 最终工作目录为 /app/logs
```

> [!TIP]
> 如果指定的目录不存在，Docker 会自动创建该目录。

#### 覆盖工作目录

在运行容器时，可以通过 `docker run` 的 `-w` 参数覆盖 `WORKDIR` 指令设置的工作目录：

```bash
docker run -w /new/workdir <镜像名称>
```

> [!NOTE]
> 覆盖后的工作目录仅在当前容器运行时有效，不会影响镜像本身。

### RUN 指令

`RUN` 指令用于在构建镜像时执行命令。通常用于安装软件包、复制文件或执行其他初始化任务。

#### 基本用法

```dockerfile
# 使用 shell 格式
RUN command param1 param2
# 示例：更新系统并安装 curl
RUN apt-get update && apt-get install -y curl

# 使用 exec 格式
RUN ["executable", "param1", "param2"]
# 示例：安装软件包
RUN ["apt-get", "install", "-y", "vim"]
```

> [!NOTE]
> 使用 exec 格式时，命令不会通过 `/bin/sh -c` 执行。

#### 多行命令

为了提高可读性，可以使用反斜杠 `\` 将命令分成多行：

```dockerfile
RUN apt-get update && \
    apt-get install -y \
    curl \
    vim
```

#### 缓存机制

`RUN` 指令会利用 Docker 的分层缓存机制。如果命令未发生变化，Docker 会复用缓存层，从而加快构建速度。

> [!TIP]
> 为了避免缓存问题，可以在命令中添加动态内容，例如时间戳。

#### 清理临时文件

为了减小镜像体积，建议在 `RUN` 指令中清理临时文件：

```dockerfile
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
```

> [!WARNING]
> 未清理临时文件可能导致镜像体积过大。

### ADD 指令

`ADD` 指令用于将文件或目录从构建上下文复制到镜像中。与 `COPY` 指令类似，但 `ADD` 还支持解压归档文件和从 URL 下载文件。

> [!NOTE]
> 如果不需要解压或下载功能，建议使用 `COPY` 指令代替 `ADD`，以提高构建过程的可预测性。确保目标路径存在或可写，否则会导致构建失败。

> [!TIP]
> 使用 `ADD` 指令时，可以结合 `RUN` 指令对添加的文件进行进一步处理，例如解压后删除原始归档文件。

#### 基本用法

```dockerfile
# 将文件从构建上下文复制到镜像中
ADD <源路径> <目标路径>

# 示例：将本地文件 file.txt 复制到镜像的 /app 目录
ADD file.txt /app/

# 示例：将本地目录 src 复制到镜像的 /app 目录
ADD src /app/
```

#### 解压归档文件

如果源文件是 `.tar`、`.tar.gz`、`.tgz` 等格式的归档文件，`ADD` 指令会自动解压到目标路径：

```dockerfile
# 示例：将 archive.tar.gz 解压到镜像的 /app 目录
ADD archive.tar.gz /app/
```

> [!NOTE]
> 自动解压功能仅适用于本地文件，不适用于 URL。

#### 从 URL 下载文件

`ADD` 指令支持直接从 URL 下载文件到镜像中：

```dockerfile
# 示例：从 URL 下载文件到镜像的 /app 目录
ADD https://example.com/file.txt /app/
```

> [!WARNING]
> 从 URL 下载文件时，Docker 不会利用缓存机制，可能导致镜像构建时间增加。

### EXPOSE 指令

`EXPOSE` 指令用于声明容器运行时监听的端口。该指令仅用于表明容器内的哪些端口需要被映射或监听。

#### 基本用法

```dockerfile
# 暴露单个端口
EXPOSE <端口号>

# 示例：暴露容器的 80 端口
EXPOSE 80

# 暴露多个端口
EXPOSE <端口号1> <端口号2>

# 示例：同时暴露容器的 80 和 443 端口
EXPOSE 80 443
```

> [!NOTE]
> 使用 `EXPOSE` 指令声明的端口需要在运行容器时通过 `-p` 或 `-P` 参数显式映射到主机端口，才能被外部访问。

> [!TIP]
> 如果未指定端口映射，容器的端口只能被同一网络中的其他容器访问。

### COPY 指令

`COPY` 指令用于将文件或目录从构建上下文复制到镜像中。与 `ADD` 指令不同，`COPY` 不支持解压归档文件或从 URL 下载文件，因此更适合用于简单的文件复制操作。

#### 基本用法

```dockerfile
# 将文件从构建上下文复制到镜像中
COPY <源路径> <目标路径>

# 示例：将本地文件 file.txt 复制到镜像的 /app 目录
COPY file.txt /app/

# 示例：将本地目录 src 复制到镜像的 /app 目录
COPY src /app/
```

> [!WARNING]
> 确保目标路径存在或可写，否则会导致构建失败。

### ENTRYPOINT 指令

`ENTRYPOINT` 指令用于指定容器启动时执行的主命令。与 `CMD` 指令不同，`ENTRYPOINT` 更适合用于定义不可覆盖的默认行为。

#### 基本用法

```dockerfile
# 使用 exec 格式
ENTRYPOINT ["executable", "param1", "param2"]

# 示例：设置容器启动时运行 nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]

# 使用 shell 格式
ENTRYPOINT command param1 param2

# 示例：打印 "Hello, World!" 并退出
ENTRYPOINT echo "Hello, World!"
```

> [!NOTE]
> 使用 exec 格式时，命令不会通过 `/bin/sh -c` 执行。

#### 覆盖 ENTRYPOINT

在运行容器时，可以通过 `--entrypoint` 参数覆盖 `ENTRYPOINT` 指令：

```bash
docker run --entrypoint <新命令> <镜像名称>

# 示例：覆盖 ENTRYPOINT 执行 bash
docker run --entrypoint bash my-image
```

> [!WARNING]
> 覆盖 `ENTRYPOINT` 会完全替换原有的指令，可能导致容器行为异常。

#### ENTRYPOINT 的最佳实践

-   使用 exec 格式，避免通过 `/bin/sh -c` 执行命令。
-   配合 `CMD` 指令提供默认参数，提高灵活性。
-   确保 `ENTRYPOINT` 定义的命令是容器的核心功能。
-   在需要不可覆盖的默认行为时优先选择 `ENTRYPOINT`。

## Docker Compose

Docker Compose 是一个用于定义和运行多容器 Docker 应用程序的工具。通过一个 `docker-compose.yml` 文件，可以轻松管理应用程序的服务、网络和存储。

默认情况下，Docker Compose 使用 `docker-compose.yml` 作为配置文件的名称。如果需要使用其他名称，可以通过 `-f` 参数指定文件路径。

```bash
docker-compose -f custom-compose.yml up -d
```

> [!TIP]
> 使用 `-f` 参数时，可以指定多个 Compose 文件，Docker Compose 会按顺序合并这些文件。

### 示例配置

以下是一个常用的 `docker-compose.yml` 配置示例，包含一个基于 Nginx 的 Web 服务和一个 MySQL 数据库服务：

```yaml
# 使用 Compose 文件版本 3.8
version: '3.8'

# 定义所有服务，它们构成了一个完整的多容器 Docker 应用
services:
    # 定义 Web 服务，此处使用 Nginx 作为示例的前端服务
    web:
        # 指定使用官方提供的最新版本 Nginx 镜像
        image: nginx:latest
        # 端口映射说明：将主机的 8080 端口映射到容器内部的 80 端口，
        # 这样外部访问 http://localhost:8080 时会转发到容器内的 Nginx 服务器
        ports:
            - '8080:80'
        # 挂载本地目录到容器中，使得自定义的网页文件可以被 Nginx 提供服务
        volumes:
            - ./html:/usr/share/nginx/html
        # 将该服务放置在自定义网络 'app-network' 中，便于与其他服务通信
        networks:
            - app-network

    # 定义数据库服务，使用 MySQL 5.7 作为示例
    db:
        # 指定使用 MySQL 5.7 镜像，它适合多数对稳定性要求较高的老项目
        image: mysql:5.7
        # 定义环境变量提供数据库初始化所需的配置信息
        environment:
            # 设置 MySQL 根用户密码，确保数据库的最高权限密码被保护
            MYSQL_ROOT_PASSWORD: rootpassword
            # 初始化数据库名称，当容器启动后会自动创建此数据库
            MYSQL_DATABASE: mydatabase
            # 创建非 root 用户，以便应用程序使用较低的权限访问数据库
            MYSQL_USER: user
            # 为上述普通用户设置访问数据库时所需的密码
            MYSQL_PASSWORD: userpassword
        # 使用数据卷来持久化数据库数据，防止容器重启或重建时数据丢失
        volumes:
            - db-data:/var/lib/mysql
        # 同样，将数据库服务置于自定义网络 'app-network'，以便与 Web 服务通信
        networks:
            - app-network

# 定义一个命名的数据卷，用于持久化数据库的数据存储，
# 当容器被删除后，数据依然保留在此数据卷中
volumes:
    db-data:

# 定义自定义网络，这里使用 bridge 驱动创建一个虚拟网络，
# 使得多个容器可以在此网络中彼此通信且不暴露于外部环境
networks:
    app-network:
        driver: bridge
```

### 使用步骤

1. 创建 `docker-compose.yml` 文件并将上述内容保存到文件中。
2. 在文件所在目录运行以下命令启动服务：
    ```bash
    docker-compose up -d
    ```

> [!TIP]
> 使用 `docker-compose down` 停止并移除所有服务，同时保留数据卷。
