# Docker

## Docker 命令

更详细的信息可以参考[Docker Document](https://docs.docker.com/engine/reference/commandline/)

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

### 查看命令帮助

Docker 提供了一个内置的帮助系统，可以通过以下命令查看 Docker 的所有可用命令及其详细信息：

```bash
# 查看所有命令
docker --help

# 查看特定命令的帮助，将 <command> 替换为具体的 Docker 子命令，例如 run 或 ps
docker <command> --help
```

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

# 删除镜像，将 <镜像ID或名称> 替换为镜像的 ID 或名称
docker rmi <镜像ID或名称>

# 示例：删除名为 nginx 的镜像
docker rmi nginx

# 清理未使用的镜像
docker image prune

# 查看镜像详情，将 <镜像ID或名称> 替换为镜像的 ID 或名称
docker inspect <镜像ID或名称>
```

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

#### 容器运行状态表

以下是 Docker 容器的一些常见运行状态及其含义：

| 状态         | 描述                                           |
| ------------ | ---------------------------------------------- |
| `created`    | 容器已创建，但尚未启动。                       |
| `restarting` | 容器正在重启中。                               |
| `running`    | 容器正在运行中。                               |
| `paused`     | 容器已暂停，所有进程被挂起。                   |
| `exited`     | 容器已停止，退出状态码可用于诊断问题。         |
| `dead`       | 容器处于非正常状态，可能由于错误导致无法恢复。 |

### 执行容器内命令

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

### Docker 端口映射

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

### Docker 数据卷

Docker 提供了数据卷（Volume）功能，用于持久化容器中的数据。数据卷可以在容器之间共享，并且独立于容器的生命周期。

#### 创建数据卷

```bash
# 创建数据卷，将 <卷名称> 替换为自定义的卷名称
docker volume create <卷名称>

# 示例：创建一个名为 my-volume 的数据卷
docker volume create my-volume
```

#### 查看数据卷

```bash
# 列出所有数据卷
docker volume ls
```

#### 挂载数据卷到容器

```bash
# 使用 -v 参数挂载数据卷，将 <卷名称>:<容器路径> 替换为实际值
docker run -v <卷名称>:<容器路径> <镜像名称>

# 示例：将 my-volume 数据卷挂载到容器的 /app 目录
docker run -v my-volume:/app nginx

# 使用 --mount 参数挂载数据卷
docker run --mount source=<卷名称>,target=<容器路径> <镜像名称>

# 示例：将 my-volume 数据卷挂载到容器的 /app 目录
docker run --mount source=my-volume,target=/app nginx
```

#### 查看数据卷详情

```bash
# 查看数据卷详情，将 <卷名称> 替换为目标数据卷的名称
docker volume inspect <卷名称>

# 示例：查看 my-volume 数据卷的详情
docker volume inspect my-volume
```

#### 删除数据卷

```bash
# 删除数据卷，将 <卷名称> 替换为目标数据卷的名称
docker volume rm <卷名称>

# 示例：删除 my-volume 数据卷
docker volume rm my-volume
```

> [!WARNING]
> 删除数据卷时，请确保数据卷不再被任何容器使用，否则可能会导致数据丢失。

#### 清理未使用的数据卷

```bash
# 清理未使用的数据卷
docker volume prune
```

> [!WARNING]
> 清理操作不可逆，请谨慎执行。

#### 数据卷的优势

-   **持久化数据**：即使容器被删除，数据卷中的数据仍然保留。
-   **共享数据**：多个容器可以同时访问同一个数据卷。
-   **性能优化**：数据卷的性能优于直接挂载主机路径。
-   **备份与恢复**：可以轻松备份和恢复数据卷中的数据。
-   **隔离性**：数据卷与容器的生命周期独立，提供更高的灵活性。
