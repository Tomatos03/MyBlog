# Java 常用类或接口

## 线程池接口

### Executor 接口

线程池是 Java 并发编程中用于管理和复用线程的核心工具。通过线程池，可以避免频繁创建和销毁线程的开销，提高系统性能和资源利用率。Java 提供了 `Executor` 框架来支持线程池的使用。

#### 核心方法

-   **`void execute(Runnable command)`**：执行给定的任务。

### ExecutorService 接口

`ExecutorService` 继承自 `Executor`，提供了更丰富的线程池管理功能，如任务提交、关闭线程池等。

#### 核心方法

-   **`Future<?> submit(Runnable task)`**：提交一个任务并返回其 `Future`。
-   **`void shutdown()`**：启动有序关闭，不再接受新任务。
-   **`List<Runnable> shutdownNow()`**：尝试停止所有正在执行的任务并返回等待执行的任务列表。
-   **`boolean isShutdown()`**：检查线程池是否已关闭。
-   **`boolean isTerminated()`**：检查所有任务是否已完成。

### ScheduledExecutorService 接口

`ScheduledExecutorService` 继承自 `ExecutorService`，支持任务的定时和周期性执行。

#### 核心方法

-   **`ScheduledFuture<?> schedule(Runnable command, long delay, TimeUnit unit)`**：延迟指定时间后执行任务。
-   **`ScheduledFuture<?> scheduleAtFixedRate(Runnable command, long initialDelay, long period, TimeUnit unit)`**：以固定速率周期性执行任务。
-   **`ScheduledFuture<?> scheduleWithFixedDelay(Runnable command, long initialDelay, long delay, TimeUnit unit)`**：以固定延迟周期性执行任务。

---

### 示例代码

#### 使用固定大小线程池

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Main {
    public static void main(String[] args) {
        // 创建一个固定大小的线程池
        ExecutorService executor = Executors.newFixedThreadPool(3);

        // 提交任务到线程池
        for (int i = 1; i <= 5; i++) {
            int taskId = i;
            executor.submit(() -> {
                System.out.println("任务 " + taskId + " 正在由线程 " + Thread.currentThread().getName() + " 执行");
                try {
                    Thread.sleep(1000); // 模拟任务执行时间
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            });
        }

        // 关闭线程池
        executor.shutdown();
    }
}
```

#### 自定义线程池

```java
import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) {
        // 自定义线程池
        ThreadPoolExecutor executor = new ThreadPoolExecutor(
            2, // 核心线程数
            4, // 最大线程数
            60, // 空闲线程存活时间
            TimeUnit.SECONDS, // 时间单位
            new LinkedBlockingQueue<>(10), // 任务队列
            Executors.defaultThreadFactory(), // 线程工厂
            new ThreadPoolExecutor.AbortPolicy() // 拒绝策略
        );

        // 提交任务
        for (int i = 1; i <= 10; i++) {
            int taskId = i;
            executor.submit(() -> {
                System.out.println("任务 " + taskId + " 正在由线程 " + Thread.currentThread().getName() + " 执行");
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            });
        }

        // 关闭线程池
        executor.shutdown();
    }
}
```

---

### 注意事项

1. **避免直接使用 `Executors` 创建线程池**：推荐使用 `ThreadPoolExecutor`，以便更精确地控制线程池的行为。
2. **合理设置线程池大小**：根据任务的性质（CPU 密集型或 IO 密集型）设置合适的线程池大小。
3. **处理未捕获的异常**：可以通过设置自定义的 `ThreadFactory` 或 `UncaughtExceptionHandler` 来捕获线程中的异常。
4. **及时关闭线程池**：使用 `shutdown()` 或 `shutdownNow()` 方法释放资源，避免资源泄漏。

> [!TIP]
> 使用线程池可以显著提高多线程程序的性能，但需要根据实际需求合理配置线程池参数。

## TimeUnit 枚举类

`TimeUnit` 是 Java 中的一个枚举类，位于 `java.util.concurrent` 包中，用于表示时间单位并提供了对时间单位之间的转换操作。它是多线程编程中处理时间延迟和超时的常用工具。

`TimeUnit` 提供了以下时间单位：

-   **NANOSECONDS**：纳秒
-   **MICROSECONDS**：微秒
-   **MILLISECONDS**：毫秒
-   **SECONDS**：秒
-   **MINUTES**：分钟
-   **HOURS**：小时
-   **DAYS**：天

### 核心方法

-   **`convert(long sourceDuration, TimeUnit sourceUnit)`**：将指定时间从一个单位转换为另一个单位。
-   **`toNanos(long duration)`**：将时间转换为纳秒。
-   **`toMicros(long duration)`**：将时间转换为微秒。
-   **`toMillis(long duration)`**：将时间转换为毫秒。
-   **`toSeconds(long duration)`**：将时间转换为秒。
-   **`toMinutes(long duration)`**：将时间转换为分钟。
-   **`toHours(long duration)`**：将时间转换为小时。
-   **`toDays(long duration)`**：将时间转换为天。
-   **`sleep(long timeout)`**：使当前线程休眠指定时间。

### 示例代码

```java
import java.util.concurrent.TimeUnit;

public class Main {
    public static void main(String[] args) {
        // 时间单位转换
        long minutes = TimeUnit.HOURS.toMinutes(2); // 2 小时转换为分钟
        System.out.println("2 小时等于 " + minutes + " 分钟");

        long seconds = TimeUnit.MINUTES.toSeconds(5); // 5 分钟转换为秒
        System.out.println("5 分钟等于 " + seconds + " 秒");

        // 使用 sleep 方法
        try {
            System.out.println("开始休眠...");
            TimeUnit.SECONDS.sleep(3); // 休眠 3 秒
            System.out.println("休眠结束");
        } catch (InterruptedException e) {
            System.out.println("线程被中断");
        }
    }
}
```

输出示例

```text
2 小时等于 120 分钟
5 分钟等于 300 秒
开始休眠...
休眠结束
```

> [!TIP]
> 使用 `TimeUnit` 可以提高代码的可读性和可维护性，避免直接使用毫秒等硬编码值。

## LocalDateTime 类

`LocalDateTime` 类是 Java 中用于表示日期和时间（不含时区信息）的核心类。它是不可变的，线程安全的，提供了丰富的方法来操作日期和时间。

### 核心方法

-   **`now()`** 获取当前日期时间。
-   **`of(int year, int month, int dayOfMonth, int hour, int minute)`** 创建指定日期时间的实例。
-   **`plusDays(long days)` 和 `minusDays(long days)`** 增加或减少指定天数。
-   **`plusHours(long hours)` 和 `minusHours(long hours)`** 增加或减少指定小时数。
-   **`format(DateTimeFormatter formatter)`** 按指定格式化器格式化日期时间。
-   **`parse(CharSequence text, DateTimeFormatter formatter)`** 按指定格式解析日期时间字符串。
-   **`getYear()` 和 `getMonth()`** 获取年份和月份。
-   **`isBefore(LocalDateTime other)` 和 `isAfter(LocalDateTime other)`** 比较两个日期时间。

### 示例代码

```java
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Main {
    public static void main(String[] args) {
        // 获取当前日期时间
        LocalDateTime now = LocalDateTime.now();
        System.out.println("当前日期时间: " + now);

        // 创建指定日期时间
        LocalDateTime specificDateTime = LocalDateTime.of(2023, 10, 1, 12, 30);
        System.out.println("指定日期时间: " + specificDateTime);

        // 增加和减少日期时间
        LocalDateTime nextWeek = now.plusDays(7);
        LocalDateTime lastHour = now.minusHours(1);
        System.out.println("一周后: " + nextWeek);
        System.out.println("一小时前: " + lastHour);

        // 格式化日期时间
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = now.format(formatter);
        System.out.println("格式化日期时间: " + formattedDateTime);

        // 解析日期时间字符串
        String dateTimeString = "2023-10-01 12:30:00";
        LocalDateTime parsedDateTime = LocalDateTime.parse(dateTimeString, formatter);
        System.out.println("解析后的日期时间: " + parsedDateTime);

        // 比较日期时间
        if (now.isBefore(specificDateTime)) {
            System.out.println("当前时间在指定时间之前");
        } else {
            System.out.println("当前时间在指定时间之后或相等");
        }
    }
}
```

## Thread 类

`Thread` 类是 Java 中用于创建和管理线程的核心类。通过继承 `Thread` 类，可以直接创建线程并定义其行为。

### 核心方法

-   **`start()`** 启动线程，调用线程的 `run()` 方法。
-   **`run()`** 定义线程的执行逻辑，通常需要重写此方法。
-   **`sleep(long millis)`** 使当前线程休眠指定的毫秒数。
-   **`join()`** 等待线程执行完成。
-   **`interrupt()`** 中断线程。
-   **`isAlive()`** 检查线程是否仍在运行。
-   **`getName()` 和 `setName(String name)`** 获取或设置线程的名称。
-   **`getPriority()` 和 `setPriority(int priority)`** 获取或设置线程的优先级。
-   **`currentThread()`** 获取当前正在执行的线程对象。

### 示例代码

```java
class MyThread extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println(Thread.currentThread().getName() + " is running: " + i);
            try {
                Thread.sleep(500); // 线程休眠 500 毫秒
            } catch (InterruptedException e) {
                System.out.println(Thread.currentThread().getName() + " was interrupted.");
            }
        }
    }
}

public class Main {
    public static void main(String[] args) {
        MyThread thread1 = new MyThread();
        thread1.setName("Thread-1");
        thread1.setPriority(Thread.MAX_PRIORITY);

        MyThread thread2 = new MyThread();
        thread2.setName("Thread-2");
        thread2.setPriority(Thread.MIN_PRIORITY);

        thread1.start();
        thread2.start();

        try {
            // 当前线程阻塞，等待thread1 和 thread2 执行完成
            thread1.join();
            thread2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("All threads have finished execution.");
    }
}
```

输出示例

```text
Thread-1 is running: 0
Thread-2 is running: 0
Thread-1 is running: 1
Thread-2 is running: 1
Thread-1 is running: 2
Thread-2 is running: 2
Thread-1 is running: 3
Thread-2 is running: 3
Thread-1 is running: 4
Thread-2 is running: 4
All threads have finished execution.
```

> [!TIP]
> 使用 `Thread` 类时，尽量避免直接操作线程的生命周期，推荐使用更高级的并发工具类（如 `ExecutorService`）来管理线程。

## Properties

Properties 继承自 Hashtable，专门用于处理`.properties`配置文件。

### 核心方法

-   `setProperty(String key, String value)` - 设置属性值
-   `getProperty(String key)` - 获取属性值
-   `getProperty(String key, String defaultValue)` - 获取属性值，若不存在则返回默认值
-   `load(InputStream/Reader)` - 从输入流加载属性
-   `store(OutputStream/Writer, String comments)` - 将当前 Properties 对象存储的 key-value 属性存储到输出流指定文件中

```properties
# config.properties
db.url=jdbc:mysql://localhost:3306/test
db.user=root
db.password=password
db.driver=com.mysql.jdbc.Driver
app.name=MyApplication
app.version=1.0.0
```

### 读取配置文件

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

### 持久化配置

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

### 创建和使用 Session

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

### 主要特性

-   **大小限制**：单个 Cookie 通常限制为 4KB
-   **数量限制**：每个域名下通常限制为 20-50 个
-   **存储位置**：客户端浏览器
-   **生命周期**：可以是会话级或持久性的

### 核心方法

-   `Cookie(String name, String value)` - 创建 Cookie
-   `void setMaxAge(int expiry)` - 设置 Cookie 过期时间(秒)
-   `void setValue(String value)` - 设置 Cookie 的值
-   `void setPath(String path)` - 设置 Cookie 的路径
-   `void setDomain(String domain)` - 设置 Cookie 的域
-   `void setSecure(boolean flag)` - 设置是否仅通过 HTTPS 传输
-   `void setHttpOnly(boolean httpOnly)` - 设置是否允许 JavaScript 访问
-   `String getName()` - 获取 Cookie 的名称
-   `String getValue()` - 获取 Cookie 的值

### 创建和发送 Cookie

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

### 读取 Cookie

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

### 删除 Cookie

```java
// 创建同名 Cookie 并设置最大年龄为0
Cookie cookie = new Cookie("username", null);
cookie.setMaxAge(0);
cookie.setPath("/");
response.addCookie(cookie);
```
