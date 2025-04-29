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

| 术语                  | 说明                                 |
| --------------------- | ------------------------------------ |
| **Headers**           | 简写或泛称（常见于 curl、Postman）   |
| **HTTP Headers**      | 更完整说法                           |
| **元信息 (Metadata)** | 有些文档会用“元数据”描述 Header 信息 |
| **报文头部**          | 在中文资料中经常出现的叫法           |

### HTTP 请求结构(Header)

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

**常见别名或等价术语**：

| 术语                       | 说明                                      |
| -------------------------- | ----------------------------------------- |
| **Body**                   | 简称（最常见）                            |
| **Payload**                | 更偏向语义上“负载”（强调传递的数据内容）  |
| **Entity Body**            | 在 HTTP/1.1 规范中用于区分 header 和 body |
| **请求负载**（Payload）    | 中文常见译法                              |
| **消息体**（Message Body） | **技术文档中也有使用**                    |

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

## 状态码

### 1xx 信息性状态码

| 状态码 | 名称                | 描述                                       |
| ------ | ------------------- | ------------------------------------------ |
| 100    | Continue            | 服务器已收到请求头，客户端应继续发送请求体 |
| 101    | Switching Protocols | 服务器正在根据客户端的请求切换协议         |

### 2xx 成功状态码

| 状态码 | 名称       | 描述                                   |
| ------ | ---------- | -------------------------------------- |
| 200    | OK         | 请求成功                               |
| 201    | Created    | 请求已完成，新资源已创建               |
| 204    | No Content | 服务器成功处理请求，但没有返回任何内容 |

### 3xx 重定向状态码

| 状态码 | 名称              | 描述                              |
| ------ | ----------------- | --------------------------------- |
| 301    | Moved Permanently | 请求的资源已永久移动到新位置      |
| 302    | Found             | 请求的资源临时从不同 URI 响应请求 |
| 304    | Not Modified      | 资源未修改，可使用缓存版本        |

### 4xx 客户端错误状态码

| 状态码 | 名称              | 描述                     |
| ------ | ----------------- | ------------------------ |
| 400    | Bad Request       | 服务器无法理解请求的格式 |
| 401    | Unauthorized      | 请求未授权               |
| 403    | Forbidden         | 服务器拒绝请求           |
| 404    | Not Found         | 请求的资源不存在         |
| 429    | Too Many Requests | 客户端发送了太多请求     |

### 5xx 服务器错误状态码

| 状态码 | 名称                  | 描述                           |
| ------ | --------------------- | ------------------------------ |
| 500    | Internal Server Error | 服务器内部错误                 |
| 502    | Bad Gateway           | 服务器作为网关时收到了无效响应 |
| 503    | Service Unavailable   | 服务器暂时不可用               |
| 504    | Gateway Timeout       | 作为网关的服务器请求超时       |
