# Docker

Docker 是一个开源平台，旨在通过容器化技术自动化应用程序的部署、扩展和管理。容器轻量、可移植，并通过将应用程序代码与其依赖项打包在一起，确保在不同环境中的一致性。

## Docker 的主要特性

-   **可移植性**：在任何安装了 Docker 的系统上运行容器。
-   **高效性**：容器共享主机操作系统内核，减少开销。
-   **可扩展性**：通过添加或移除容器轻松扩展应用程序。
-   **隔离性**：每个容器都在其独立的隔离环境中运行。

## Docker 的安装

### Linux

#### Arch

1. 更新系统软件包：

    ```bash
    sudo pacman -Syu
    ```

2. 安装 Docker：

    ```bash
    sudo pacman -S docker
    ```

3. 启动并启用 Docker 服务：

    ```bash
    sudo systemctl start docker
    sudo systemctl enable docker
    ```

4. 验证 Docker 是否安装成功：

    ```bash
    docker --version
    ```

5. （可选）将当前用户添加到 `docker` 用户组以运行 Docker 命令时无需使用 `sudo`：

    ```bash
    sudo usermod -aG docker <user_name>
    ```

6. 重新登录以应用用户组更改。

完成以上步骤后，您可以在 Arch Linux 上使用 Docker Cli 进行 Docker 相关操作。

### Windwos
