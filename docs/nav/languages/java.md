# JAVA

## 动态绑定与静态绑定对比

| 特性     | 动态绑定               | 静态绑定                                           |
| -------- | ---------------------- | -------------------------------------------------- |
| 定义     | 在运行时确定调用的方法 | 在编译时确定调用的方法                             |
| 时机     | 运行时                 | 编译时                                             |
| 应用     | 方法覆盖(override)     | 方法重载(overload)、私有方法、静态方法、final 方法 |
| 关键字   | 无需特殊关键字         | static、private、final                             |
| 效率     | 相对较低               | 相对较高                                           |
| 多态性   | 支持                   | 不支持                                             |
| 实现方式 | 通过虚方法表           | 直接调用                                           |
| 示例     | 子类重写父类方法       | 构造方法、静态方法调用                             |

## 泛型擦拭

Java 编译器在编译泛型代码时，会移除所有泛型类型参数 ，并将它们替换为：

-   如果有上界（如 `<T extends Number>`），则替换为上界类型（如 Number）；
-   如果没有上界（如 `<T>`），则替换为 Object。

### 主要行为

泛型擦拭机制主要做到以下三件事情：

1. **类型参数替换** - 将泛型类型参数替换为原始类型（擦除类型变量，替换为界限类型或 Object）
2. **类型转换插入** - 在必要的位置自动插入类型转换代码，保证类型安全

3. **桥接方法生成** - 创建桥接方法以保持多态性，解决方法签名不一致的问题

这些实现方式保证了 Java 泛型的向后兼容性，但也带来了类型信息在运行时不可用等局限性。

**注：java**对于不同泛型参数的类得到的 class 对象相同

## 常用类或接口

### Properties

Properties 继承自 Hashtable，专门用于处理`.properties`配置文件。

#### 核心方法

-   `setProperty(String key, String value)` - 设置属性值
-   `getProperty(String key)` - 获取属性值
-   `getProperty(String key, String defaultValue)` - 获取属性值，若不存在则返回默认值
-   `load(InputStream/Reader)` - 从输入流加载属性
-   `store(OutputStream/Writer, String comments)` - 将当前 Properties 对象存储的 key-value 属性存储到输出流指定文件中

#### 示例

```properties
# config.properties
db.url=jdbc:mysql://localhost:3306/test
db.user=root
db.password=password
db.driver=com.mysql.jdbc.Driver
app.name=MyApplication
app.version=1.0.0
```

##### 读取配置文件

```java
Properties props = new Properties();
// 配置文件路径
String configFilePath = "src/main/resources/kaptcha.properties";

try (FileInputStream in = new FileInputStream(configFilePath)) {
    /*
     * 从文件加载配置到Properties对象
     * 加载到Properties对象中的值:
     *   db.user <-> root
     *   db.password <-> password
     */
    props.load(in);
} catch (IOException e) {
    // 如果文件读取失败，抛出运行时异常
    throw new RuntimeException(e);
}

// 获取数据库URL配置
String dbUrl = props.getProperty("db.url");
// ...
```

##### 持久化配置

```java
Properties properties = new Properties();
// 如果文件不存在，则创建一个新的文件
// 如果文件存在，原有的内容会先被清空
String path = "src/main/resources/application.properties";
try (FileOutputStream f_out = new FileOutputStream(path)){
    properties.setProperty("id", "test");
    properties.setProperty("name", "tom");
    properties.store(f_out, "comments");
} catch (IOException e) {
    e.printStackTrace();
}
```

向属性文件中写入配置后，生成的 application.properties 文件内容如下:

```properties
#comments
#Tue Aug 29 10:15:30 CST 2023
id=test
name=tom
```

## HttpSession 接口

Session（会话）是在客户端和服务器之间建立的一种状态机制，用于在多个请求之间保持用户状态信息。 在 Java Web 开发中，`HttpSession`接口是处理会话管理的核心 API，根据不同的 Java 版本有不同的包路径：

-   Jakarta EE (Java EE 9+): `jakarta.servlet.http.HttpSession`
-   Java EE 8 及更早版本: `javax.servlet.http.HttpSession`

这个接口提供了在多个页面请求或访问之间存储和检索用户信息的机制。

### 生命周期

-   **创建**：首次调用`request.getSession()`或`request.getSession(true)`
-   **销毁**：超时（默认 30 分钟）、调用`session.invalidate()`、服务器关闭

### 核心方法

-   `String getId()` - 获取会话的唯一标识符
-   `void setAttribute(String name, Object value)` - 存储会话数据
-   `Object getAttribute(String name)` - 获取会话数据
-   `void removeAttribute(String name)` - 移除会话数据
-   `void invalidate()` - 使会话失效
-   `void setMaxInactiveInterval(int interval)` - 设置会话超时时间(秒)

### 示例代码

```java
// 获取会话对象(若不存在则创建)
HttpSession session = request.getSession();

// 存储数据
session.setAttribute("username", "admin");
session.setAttribute("loginTime", System.currentTimeMillis());

// 设置超时时间(1小时)
session.setMaxInactiveInterval(3600);

// 读取数据
String username = (String) session.getAttribute("username");
Long loginTime = (Long) session.getAttribute("loginTime");

// 移除数据
session.removeAttribute("loginTime");

// 销毁会话
session.invalidate();
```

## Cookie

Cookie 是存储在客户端浏览器中的小型文本数据，用于在 HTTP 请求之间保持状态信息。在 Java Web 开发中，`javax.servlet.http.Cookie` 类用于创建和管理 Cookie。

#### 主要特性

-   **大小限制**：单个 Cookie 通常限制为 4KB
-   **数量限制**：每个域名下通常限制为 20-50 个
-   **存储位置**：客户端浏览器
-   **生命周期**：可以是会话级或持久性的

#### 核心方法

-   `Cookie(String name, String value)` - 创建 Cookie
-   `void setMaxAge(int expiry)` - 设置 Cookie 过期时间(秒)
-   `void setValue(String value)` - 设置 Cookie 的值
-   `void setPath(String path)` - 设置 Cookie 的路径
-   `void setDomain(String domain)` - 设置 Cookie 的域
-   `void setSecure(boolean flag)` - 设置是否仅通过 HTTPS 传输
-   `void setHttpOnly(boolean httpOnly)` - 设置是否允许 JavaScript 访问
-   `String getName()` - 获取 Cookie 的名称
-   `String getValue()` - 获取 Cookie 的值

#### 示例代码

##### 创建和发送 Cookie

```java
// 创建新的 Cookie
Cookie userCookie = new Cookie("username", "john_doe");

// 设置 Cookie 的过期时间(7天)
// 单位：秒
userCookie.setMaxAge(7 * 24 * 60 * 60);

// 设置 Cookie 的路径
// 当前路径以及子路径发送请求的时候都会携带这个cookie
userCookie.setPath("/");

// 设置为 HttpOnly，防止 JavaScript 访问
userCookie.setHttpOnly(true);

// 设置为安全 Cookie，仅通过 HTTPS 发送
userCookie.setSecure(true);

// 将 Cookie 添加到响应
response.addCookie(userCookie);
```

##### 读取 Cookie

```java
// 获取请求中的所有 Cookie
Cookie[] cookies = request.getCookies();

if (cookies != null) {
    for (Cookie cookie : cookies) {
        if ("username".equals(cookie.getName())) {
            String username = cookie.getValue();
            System.out.println("欢迎回来, " + username);
            break;
        }
    }
}
```

##### 删除 Cookie

```java
// 创建同名 Cookie 并设置最大年龄为0
Cookie cookie = new Cookie("username", null);
cookie.setMaxAge(0);
cookie.setPath("/");
response.addCookie(cookie);
```

### Cookie 与 Session 对比

| 特性     | Cookie                           | Session                        |
| -------- | -------------------------------- | ------------------------------ |
| 存储位置 | 客户端浏览器                     | 服务器内存                     |
| 安全性   | 较低，可被客户端查看和修改       | 较高，存储在服务器             |
| 生命周期 | 可持久化存储                     | 默认为会话级，可配置超时时间   |
| 存储容量 | 有限(通常 4KB)                   | 较大(受服务器内存限制)         |
| 性能     | 每次请求都会传输                 | 只传输会话标识符               |
| 适用场景 | 记住用户名、主题偏好等非敏感信息 | 用户认证状态、购物车等敏感数据 |
