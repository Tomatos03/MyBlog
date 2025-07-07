# Nginx 配置指南

## Nginx 命令

### Nginx 配置信息

`nginx -V` 命令用于输出 Nginx 版本, 以及一些编译信息(通常包含了一些默认配置的路径)

### Ngnix 状态控制

`nginx -s signal_name` 命令用于向 Nginx 主进程发送信号，以控制其运行状态。常用的`signal_name`标记有：

-   `stop`：快速停止 Nginx 服务（立即终止所有工作进程）。
-   `quit`：优雅地关闭 Nginx（处理完当前请求后再关闭）。
-   `reload`：重新加载配置文件（不中断服务）。
-   `reopen`：重新打开日志文件（常用于日志轮转）。

**用法示例：**

```bash
nginx -s stop      # 立即停止 Nginx
nginx -s quit      # 优雅关闭 Nginx
nginx -s reload    # 重新加载配置
nginx -s reopen    # 重新打开日志文件
```

## Nginx 配置目录位置

Nginx 的配置和运行相关的目录通常如下：

-   **主配置文件**  
     `/etc/nginx/nginx.conf`：Nginx 的主配置文件。

-   **站点配置目录**  
     `/etc/nginx/conf.d/`：存放额外的配置片段（如虚拟主机配置）。\
    `/etc/nginx/sites-available/` 和 `/etc/nginx/sites-enabled/`：部分发行版（如 Ubuntu）采用的站点配置管理方式。

-   **日志目录**  
     `/var/log/nginx/access.log`：访问日志。\
    `/var/log/nginx/error.log`：错误日志。

-   **静态文件目录**  
     `/usr/share/nginx/html/`：默认的站点根目录。

-   **运行相关目录**  
     `/var/run/nginx.pid`：Nginx 主进程的 PID 文件。 \
    `/var/cache/nginx/`：缓存目录（如启用缓存时）。

> [!NOTE]
> 具体路径可能因操作系统或安装方式不同而有所变化，可通过 `nginx -V` 命令查看编译参数和默认路径。

## Nginx 配置参数

### Nginx 配置块结构

```nginx
# main 块（全局配置）
worker_processes  1;

events {
    # events 块（全局事件配置）
    worker_connections  1024;
}

http {
    # http 块（HTTP 相关配置）

    upstream backend {
        # upstream 块（后端服务器组）
        server 127.0.0.1:8080;
        server 192.168.1.2:8080 backup;
    }

    server {
        # server 块（虚拟主机）

        listen       80;
        server_name  example.com;

        location / {
            # location 块（请求匹配规则）
            proxy_pass http://backend;
        }
    }
}
```

### upstream 配置块

`upstream` 用于定义一组后端服务器，实现负载均衡。常见参数如下：

-   `server`：指定后端服务器地址和端口，可附加权重、状态等参数。
-   `weight`：指定该服务器的权重，权重越高分配的请求越多。
-   `max_fails`：允许请求失败的次数，超过后暂时不请求该服务器。
-   `fail_timeout`：在多长时间内达到 `max_fails` 次失败后，暂停请求该服务器的时间。
-   `backup`：标记为备用服务器，仅在主服务器全部不可用时启用。

**示例：**

```nginx
upstream backend {
    # 定义一组后端服务器地址
    server 127.0.0.1:8080 weight=3 max_fails=2 fail_timeout=30s;
    server 192.168.1.2:8080 backup;
}
```

### server 配置块

`server` 用于定义虚拟主机，常见参数如下：

-   `listen`：监听的端口和地址（如 `80`、`443 ssl`）。
-   `server_name`：定义主机名（域名），支持通配符。
-   `root`：指定站点根目录。
-   `index`：默认首页文件名。
-   `location`：用于匹配 URI 并定义处理规则。
-   `access_log` / `error_log`：指定访问和错误日志路径。
-   `ssl_certificate` / `ssl_certificate_key`：SSL 证书和私钥路径（HTTPS 配置时使用）。

**示例：**

```nginx
server {
    listen 80;
    server_name example.com www.example.com;

    root /usr/share/nginx/html;
    index index.html index.htm;

    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    location / {
        try_files $uri $uri/ =404;
    }

    location /api/ {
        proxy_pass http://backend;
    }
}
```

### location 配置块

`location` 用于根据请求的 URI 匹配不同的处理规则。常见参数和用法如下：

-   `=`：精确匹配请求 URI。
-   `~`：区分大小写的正则匹配。
-   `~*`：不区分大小写的正则匹配。
-   `^~`：前缀匹配，优先级高于正则。
-   `root` / `alias`：指定资源根目录或别名路径。
-   `proxy_pass`：反向代理到后端服务器。
-   `rewrite`：重写请求 URI。
-   `try_files`：按顺序尝试文件路径。
-   `index`：指定默认首页文件名。
-   `default_type`：默认响应类型。
-   `keepalive_timeout`、`keepalive_requests`、`proxy_http_version`：支持 HTTP keep-alive，提升性能。
-   `proxy_pass_request_headers`：代理时转发请求头（新版 Nginx 已默认开启）。
-   `proxy_next_upstream`：后端出错或超时时自动切换到下一个 upstream 服务器。
-   `proxy_pass`：把请求转你定义的 upstream 后端。

**示例：**

```nginx
server {
    # 精确匹配 /exact-match 路径的请求，返回 200 状态码和自定义内容
    location = /exact-match {
        return 200 "This is an exact match.\n";
    }

    # 以 /static/ 开头的请求进行前缀匹配，优先级高于正则，资源根目录为 /var/www/html
    location ^~ /static/ {
        root /var/www/html;
        try_files $uri $uri/ =404;
        default_type application/json;
    }

    # 匹配以 .php 结尾的请求（区分大小写），转发到 PHP-FPM 处理
    location ~ \.php$ {
        fastcgi_pass unix:/run/php/php7.4-fpm.sock;
        include fastcgi_params;
        keepalive_timeout 30s;
        keepalive_requests 100;
    }

    # 匹配以 .jpg 或 .png 结尾的图片请求（不区分大小写），重写 URI 并设置默认类型
    location ~* \.(jpg|png)$ {
        rewrite ^/images/(.*)$ /img/$1 break;
        default_type image/jpeg;
    }

    # 匹配 /images/ 路径，使用别名路径 /data/images/
    location /images/ {
        alias /data/images/;
        index index.html;
    }

    # 匹配 /api/ 路径，反向代理到名为 backend 的后端服务器，开启 keep-alive 和请求头转发
    location /api/ {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_pass_request_headers on;
        proxy_next_upstream error timeout;
    }

    # 使用 index 指定默认首页文件
    location /docs/ {
        root /var/www/html;
        index index.html index.htm; # 找不到index.html再尝试找index.htm
    }
}
```

> [!TIP]
> `location` 块的匹配顺序和优先级对请求路由有重要影响，建议合理规划 URI 结构和匹配规则。
