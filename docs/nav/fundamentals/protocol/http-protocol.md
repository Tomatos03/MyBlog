# HTTP

HTTP（HyperText Transfer Protocol，超文本传输协议）是用于从 Web 服务器传输超文本（如 HTML、CSS、JS、图片等）到客户端（如浏览器）的 应用层协议

## 基本特点

**无状态（Stateless）**: 

每个 HTTP 请求都是独立的，服务器不会记住之前的请求（需借助 Cookie/Session机制维持状态）。

**基于请求-响应模型（Request-Response）**: 

客户端发送请求，服务器返回响应。

**可扩展性强**: 

支持自定义头部（Headers）和多种数据格式（JSON、XML 等）。

> [!NOTE]
> 默认端口
>
> HTTP：80, HTTPS：443

## 请求方式

| 方法   | 名称         | 作用描述                                   | 是否有请求体 | 是否有响应体 | 常见用途                   |
| ------ | ------------ | ------------------------------------------ | ------------ | ------------ | -------------------------- |
| GET    | 获取资源     | 从服务器获取数据或资源                     | 否           | 是           | 获取网页、API数据           |
| POST   | 创建资源     | 向服务器提交数据，通常用于创建新资源       | 是           | 是           | 表单提交、用户注册、登录    |
| PUT    | 更新资源     | 用于更新服务器上的资源（整体替换）         | 是           | 是           | 更新用户信息、修改数据      |
| PATCH  | 局部更新资源 | 用于对服务器资源进行部分修改               | 是           | 是           | 局部更新，如修改部分字段    |
| DELETE | 删除资源     | 请求服务器删除指定资源                     | 否/是        | 是           | 删除用户、移除数据          |
| HEAD   | 获取头部信息 | 类似 GET，但只返回响应头，不返回响应体     | 否           | 否           | 检查资源是否存在、获取元数据|
| OPTIONS| 查询支持方法 | 查询服务器支持哪些 HTTP 方法               | 否           | 是           | 跨域预检、API能力查询       |
| TRACE  | 跟踪请求     | 回显收到的请求，主要用于诊断和调试         | 否           | 是           | 网络调试、诊断              |
| CONNECT| 建立隧道     | 用于代理服务器建立 TCP 隧道（如 HTTPS）    | 否           | 是           | HTTPS 代理、VPN连接         |

> [!NOTE]
> GET 和 POST 请求的区别：
> - GET 请求通过 URL 传递参数，参数暴露在地址栏，且有长度限制(具体长度限制由浏览器和服务器决定)
> - POST 请求通过请求体传递参数，参数不暴露在地址栏，且没有长度限制
> - GET 请求支持缓存，POST 请求不支持缓存

> [!TIP]
>  在ful API设计中，CRUD操作通常映射为：
> - Create -> POST
> - Read -> GET
> - Update -> PUT
> - Delete -> DELETE

## 请求结构

HTTP 请求是客户端（如浏览器、Postman、curl）向服务器发送数据的格式。其结构主要包括三部分：Reuest Line、Headers 和 Body(可选)。

```http
# Request Line = 请求方法 + 请求路径 + HTTP版本
POST /api/login HTTP/1.1   
# Headers
Host: www.example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Accept: application/json
Content-Type: application/json
Content-Length: 49
Connection: keep-alive
# 空白行
# Body(可选)
{
  "username": "alice",
  "password": "secret123"
}

```
> [!TIP]
> 请求头和请求体之间使用空行分隔

## 响应结构

HTTP 响应是服务器返回给客户端的数据格式。其结构主要包括三部分：Status Line、Headers 和 Body(可选)。

```http
# Status Line = HTTP版本 + 状态码 + 状态描述
HTTP/1.1 200 OK
# Headers
Date: Tue, 09 Jul 2024 12:00:00 GMT
Server: Apache/2.4.41 (Ubuntu)
Content-Type: text/html; charset=UTF-8
Content-Length: 70
Connection: close
# 空白行
# Body(可选)
<html>
  <head><title>Example</title></head>
  <body>Hello, world!</body>
</html>

```

## 状态码表

| 状态码 | 名称                  | 描述                                       | 示例场景                                         |
| ------ | --------------------- | ------------------------------------------ | ------------------------------------------------ |
| 100    | Continue              | 服务器已收到请求头，客户端应继续发送请求体 | 上传大文件时，服务器确认可以接收数据继续传输     |
| 101    | Switching Protocols   | 服务器根据客户端的请求切换协议             | 从 HTTP 升级到 WebSocket 连接时                  |
| 200    | OK                    | 请求成功                                   | 成功获取网页、API 成功返回数据                   |
| 201    | Created               | 请求已完成，新资源已创建                   | 成功提交表单创建新用户、POST 请求创建新资源      |
| 204    | No Content            | 服务器成功处理请求，但没有返回任何内容      | 删除操作成功、保存设置成功但不需要刷新页面        |
| 301    | Moved Permanently     | 请求的资源已永久移动到新位置               | 网站域名更改、URL 结构永久调整                   |
| 302    | Found                 | 请求的资源临时从不同 URI 响应请求          | 临时重定向到登录页、支付完成后重定向回商店        |
| 304    | Not Modified          | 资源未修改，可使用缓存版本                 | 浏览器请求页面时使用 If-Modified-Since 获取缓存资源 |
| 400    | Bad Request           | 服务器无法理解请求的格式                   | 提交的 JSON 格式错误、URL 参数格式不正确         |
| 401    | Unauthorized          | 请求未授权                                 | 访问需要登录的 API、token 过期                   |
| 403    | Forbidden             | 服务器拒绝请求                             | 用户无权访问特定资源、IP 被封禁                  |
| 404    | Not Found             | 请求的资源不存在                           | 访问已删除的页面、API 端点错误                   |
| 405    | Method Not Allowed    | 请求方法不允许                             | 对只读资源使用 POST 方法、对只能 POST 的接口使用 GET |
| 429    | Too Many Requests     | 客户端发送了太多请求                       | API 限流保护、爬虫访问频率过高                   |
| 500    | Internal Server Error | 服务器内部错误                             | 服务器代码异常、数据库连接失败                   |
| 502    | Bad Gateway           | 服务器作为网关时收到了无效响应             | 负载均衡器无法连接到后端服务、上游服务返回错误   |
| 503    | Service Unavailable   | 服务器暂时不可用                           | 服务器维护中、系统过载                           |
| 504    | Gateway Timeout       | 作为网关的服务器请求超时                   | 代理服务器等待后端服务响应超时                   |


## Redirect

Redirect（重定向）是指服务器指示客户端自动跳转到另一个 URL 的过程。常见的重定向状态码有 301（永久重定向）和 302（临时重定向）。

### 工作流程

![alt text](assets/image.png-1759139812989.png)

> [!TIP]
> - 重定向的新请求由浏览器自动发送
> - 重定向支持跨域, 新的 URL 能够跨域
> - 重定向总共发送两次请求
> - 重定向通常情况下不会自动传递原请求的参数和请求