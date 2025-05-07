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

| 状态码 | 名称                | 描述                                       | 示例场景                                     |
| ------ | ------------------- | ------------------------------------------ | -------------------------------------------- |
| 100    | Continue            | 服务器已收到请求头，客户端应继续发送请求体 | 上传大文件时，服务器确认可以接收数据继续传输 |
| 101    | Switching Protocols | 服务器根据客户端的请求切换协议             | 从 HTTP 升级到 WebSocket 连接时              |

### 2xx 成功状态码

| 状态码 | 名称       | 描述                                   | 示例场景                                    |
| ------ | ---------- | -------------------------------------- | ------------------------------------------- |
| 200    | OK         | 请求成功                               | 成功获取网页、API 成功返回数据              |
| 201    | Created    | 请求已完成，新资源已创建               | 成功提交表单创建新用户、POST 请求创建新资源 |
| 204    | No Content | 服务器成功处理请求，但没有返回任何内容 | 删除操作成功、保存设置成功但不需要刷新页面  |

### 3xx 重定向状态码

| 状态码 | 名称              | 描述                              | 示例场景                                            |
| ------ | ----------------- | --------------------------------- | --------------------------------------------------- |
| 301    | Moved Permanently | 请求的资源已永久移动到新位置      | 网站域名更改、URL 结构永久调整                      |
| 302    | Found             | 请求的资源临时从不同 URI 响应请求 | 临时重定向到登录页、支付完成后重定向回商店          |
| 304    | Not Modified      | 资源未修改，可使用缓存版本        | 浏览器请求页面时使用 If-Modified-Since 获取缓存资源 |

### 4xx 客户端错误状态码

| 状态码 | 名称               | 描述                     | 示例场景                                             |
| ------ | ------------------ | ------------------------ | ---------------------------------------------------- |
| 400    | Bad Request        | 服务器无法理解请求的格式 | 提交的 JSON 格式错误、URL 参数格式不正确             |
| 401    | Unauthorized       | 请求未授权               | 访问需要登录的 API、token 过期                       |
| 403    | Forbidden          | 服务器拒绝请求           | 用户无权访问特定资源、IP 被封禁                      |
| 404    | Not Found          | 请求的资源不存在         | 访问已删除的页面、API 端点错误                       |
| 405    | Method Not Allowed | 请求方法不允许           | 对只读资源使用 POST 方法、对只能 POST 的接口使用 GET |
| 429    | Too Many Requests  | 客户端发送了太多请求     | API 限流保护、爬虫访问频率过高                       |

### 5xx 服务器错误状态码

| 状态码 | 名称                  | 描述                           | 示例场景                                       |
| ------ | --------------------- | ------------------------------ | ---------------------------------------------- |
| 500    | Internal Server Error | 服务器内部错误                 | 服务器代码异常、数据库连接失败                 |
| 502    | Bad Gateway           | 服务器作为网关时收到了无效响应 | 负载均衡器无法连接到后端服务、上游服务返回错误 |
| 503    | Service Unavailable   | 服务器暂时不可用               | 服务器维护中、系统过载                         |
| 504    | Gateway Timeout       | 作为网关的服务器请求超时       | 代理服务器等待后端服务响应超时                 |

## 跨域请求

### 什么是跨域请求

跨域请求（Cross-Origin Request）是指浏览器中的 JavaScript 代码发起的请求 URL 与当前页面 URL 的**源**（Origin）不同。

当以下任一条件不同时，浏览器认为这是一个跨域请求：

-   协议（Protocol）：如 HTTP 与 HTTPS
-   域名/主机（Domain/Host）：如 example.com 与 api.example.com
-   端口（Port）：如 example.com:80 与 example.com:8080

### 同源策略（Same-Origin Policy）

浏览器的同源策略是一种安全机制，限制一个源的文档或脚本如何与另一个源的资源进行交互，这是防止恶意网站读取其他网站数据的关键安全措施。

### 跨域情况示例

| 当前页面 URL               | 请求 URL                       | 是否跨域 | 原因                        |
| -------------------------- | ------------------------------ | -------- | --------------------------- |
| `https://example.com/page` | `https://example.com/api`      | 否       | 完全相同源                  |
| `https://example.com/page` | `http://example.com/api`       | 是       | 协议不同 (HTTPS vs HTTP)    |
| `https://example.com/page` | `https://api.example.com/v1`   | 是       | 子域名不同                  |
| `https://example.com/page` | `https://example.com:8080/api` | 是       | 端口不同 (默认 443 vs 8080) |
| `https://example.com/page` | `https://example.org/api`      | 是       | 域名完全不同                |

### 解决跨域问题的常见方法

-   **CORS (跨源资源共享)**：服务器设置 `Access-Control-Allow-Origin` 等响应头
-   **JSONP**：利用 `<script>` 标签不受同源策略限制的特性
-   **代理服务器**：在同源的服务器上创建代理转发请求
-   **WebSocket**：WebSocket 连接不受同源策略限制
