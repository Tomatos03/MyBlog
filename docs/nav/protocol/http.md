# Http 协议

## 介绍

HTTP（HyperText Transfer Protocol，超文本传输协议）是用于从 Web 服务器传输超文本（如 HTML、CSS、JS、图片等）到客户端（如浏览器）的 应用层协议

## 特点

-   **无状态（Stateless）**

    -   每个 HTTP 请求都是独立的，服务器不会记住之前的请求（需借助 Cookie/Session 维持状态）。

-   **基于请求-响应模型（Request-Response）**

    -   客户端发送请求，服务器返回响应。

-   **可扩展性强**

    -   支持自定义头部（Headers）和多种数据格式（JSON、XML 等）。

## 默认端口

> HTTP：80
>
> HTTPS（加密 HTTP）：443

## 请求和响应结构

### HTTP 请求结构

```http
GET /index.html HTTP/1.1            # 请求行：方法 URL HTTP版本
Host: www.example.com               # 请求头部开始
User-Agent: Mozilla/5.0
Accept: text/html
Content-Type: application/json      # 请求头部结束
                                    # 空行，分隔头部和请求体
{"name": "example", "id": 123}      # 请求体（可选，常用于POST、PUT等方法）
```

### HTTP 响应结构

```http
HTTP/1.1 200 OK                     # 状态行：HTTP版本 状态码 状态消息
Date: Mon, 23 May 2023 22:38:34 GMT # 响应头部开始
Server: Apache/2.4.1
Content-Type: text/html
Content-Length: 138                 # 响应头部结束
                                    # 空行，分隔头部和响应体
<!DOCTYPE html>                     # 响应体，包含请求的资源
<html>
<head>
    <title>Example Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>
```
