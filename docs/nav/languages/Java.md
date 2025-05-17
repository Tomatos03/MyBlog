# Java

## Java 基本数据类型

| 数据类型 | 最小值                  | 最大值                 | 占用字节数 |
| -------- | ----------------------- | ---------------------- | ---------- |
| byte     | -2<sup>7</sup>          | 2<sup>7</sup> - 1      | 1          |
| short    | -2<sup>15</sup>         | 2<sup>15</sup> - 1     | 2          |
| int      | -2<sup>31</sup>         | 2<sup>31</sup> - 1     | 4          |
| long     | -2<sup>63</sup>         | 2<sup>63</sup> - 1     | 8          |
| float    | -3.4 × 10<sup>38</sup>  | 3.4 × 10<sup>38</sup>  | 4          |
| double   | -1.7 × 10<sup>308</sup> | 1.7 × 10<sup>308</sup> | 8          |
| char     | 0                       | 2<sup>16</sup> - 1     | 2          |
| boolean  | false                   | true                   | 1 (理论上) |

## Java 变量初始值

> [!NOTE]
> 只有类的成员变量（字段）才会有默认初始值。局部变量不会被自动初始化，必须显式赋值后才能使用。

| 数据类型 | 默认值   |
| -------- | -------- |
| byte     | 0        |
| short    | 0        |
| int      | 0        |
| long     | 0L       |
| float    | 0.0f     |
| double   | 0.0d     |
| char     | '\u0000' |
| boolean  | false    |
| 引用类型 | null     |

## Java 修饰符

Java 提供了多种修饰符，用于控制类、方法、变量等的访问权限和行为。修饰符分为两大类：访问控制修饰符和非访问控制修饰符。

### 访问控制修饰符

| 修饰符           | 类内部 | 同一包 | 子类 | 其他包 |
| ---------------- | ------ | ------ | ---- | ------ |
| `public`         | 是     | 是     | 是   | 是     |
| `protected`      | 是     | 是     | 是   | 否     |
| 默认（无修饰符） | 是     | 是     | 否   | 否     |
| `private`        | 是     | 否     | 否   | 否     |

-   **`public`**：对所有类可见。
-   **`protected`**：对同一包和子类可见。
-   **默认（无修饰符）**：仅对同一包内的类可见。
-   **`private`**：仅对类内部可见。

### 非访问控制修饰符

#### 类修饰符

-   **`abstract`**：声明一个抽象类，不能直接实例化。
-   **`final`**：声明一个类不能被继承。
-   **`strictfp`**：限制浮点运算的精度和舍入行为。

#### 方法修饰符

-   **`abstract`**：声明一个抽象方法，必须在子类中实现。
-   **`final`**：方法不能被子类重写。
-   **`static`**：方法属于类而不是实例。
-   **`synchronized`**：方法在多线程环境下同步执行。
-   **`native`**：方法由本地代码实现（非 Java 实现）。
-   **`strictfp`**：限制浮点运算的精度和舍入行为。

##### synchronized

`synchronized` 确保多个线程在并发访问共享资源时，能够以互斥的方式执行(**同一个时刻只能有一个线程访问到资源**)，从而避免数据竞争和不一致的问题。

###### 线程竞争

下面的示例会出现线程竞争问题，导致预期结果不一定是 0

> [!NOTE]
> 一个线程刚刚修改了变量的值，但还没有写回内存，另一个线程就读取了旧值并进行了修改,最终，后一个线程的修改会覆盖前一个线程的修改，导致最后结果的出错。

```java
class BankAccount {
    private int balance;
    public int getBalance() {
        return balance;
    }

    public void deposit(int amount) {
        this.balance += amount;
    }

    public void withdraw(int amount) {
        this.balance -= amount;
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        BankAccount bankAccount = new BankAccount();
        // 创建第一个线程
        Thread thread0 = new Thread(() -> {
            for (int i = 0; i < 1000; ++i) {
                System.out.println(Thread.currentThread().getName());
                bankAccount.deposit(1);
            }
            System.out.println("thread0 completed");
        });
        // 第二个线程
        Thread thread1 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                System.out.println(Thread.currentThread().getName());
                bankAccount.withdraw(1);
            }
            System.out.println("thread1 completed");
        });
        // 启动线程
        thread0.start();
        thread1.start();

        try {
            // 等待thread1、thread0执行完成
            thread1.join();
            thread0.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println(bankAccount.getBalance());
    }
}
```

解决方法

```java
class BankAccount {
    private int balance;
    public int getBalance() {
        return balance;
    }

    public synchronized void deposit(int amount) {
        this.balance += amount;
    }

    public synchronized void withdraw(int amount) {
        this.balance -= amount;
    }
}
```

> [!NOTE]
>
> -   当 `synchronized` 关键字修饰实例方法时，锁对象是 `this`，即当前实例对象。
> -   当 `synchronized` 关键字修饰静态方法时，锁对象是当前类的 `Class` 对象。

#### 变量修饰符

-   **`final`**：变量的值一旦初始化后不能更改。
-   **`static`**：变量属于类而不是实例。
-   **`transient`**：变量不会被序列化。
-   **`volatile`**：变量在多线程环境下保持可见性。

## Java 类加载顺序

在 Java 中，类的加载顺序是由 JVM 在运行时动态决定的。类加载的顺序直接影响类的初始化和静态块的执行顺序。

### 加载顺序

以下是类加载的顺序，使用箭头图示说明：

```plaintext
父类静态代码块和静态变量
    ↓
子类静态代码块和静态变量
    ↓
父类实例变量和初始化块
    ↓
父类构造方法
    ↓
子类实例变量和初始化块
    ↓
子类构造方法
```

```java
class Parent {
     static {
          System.out.println("父类静态代码块");
     }

     {
          System.out.println("父类实例初始化块");
     }

     public Parent() {
          System.out.println("父类构造方法");
     }
}

class Child extends Parent {
     static {
          System.out.println("子类静态代码块");
     }

     {
          System.out.println("子类实例初始化块");
     }

     public Child() {
          System.out.println("子类构造方法");
     }
}

public class Main {
     public static void main(String[] args) {
          System.out.println("创建第一个子类对象：");
          new Child();

          System.out.println("\n创建第二个子类对象：");
          new Child();
     }
}
```

输出结果:

```text
    父类静态代码块
    子类静态代码块

    创建第一个子类对象时：

    父类实例初始化块
    父类构造方法
    子类实例初始化块
    子类构造方法

    创建第二个子类对象时：

    父类实例初始化块
    父类构造方法
    子类实例初始化块
    子类构造方法
```

> [!TIP]
> 静态代码块的执行顺序与类的加载顺序一致，而实例初始化块和构造方法的执行顺序与对象的创建顺序一致。

## Java 泛型

Java 泛型（Generics）是 Java 5 引入的一种特性，用于在编译时提供类型检查和消除类型转换的需要。它允许类、接口和方法操作指定类型的对象。

### 泛型类

泛型类允许在类定义时指定类型参数。

```java
// <T>表示声明一个泛型类
// <T>必须在类名后书写
public class Box<T> {
    private T item;

    public void setItem(T item) {
        this.item = item;
    }

    public T getItem() {
        return item;
    }
}

// 使用泛型类
Box<String> stringBox = new Box<>();
stringBox.setItem("Hello");
```

### 泛型方法

泛型方法允许在方法定义时指定类型参数。

```java
public class Utils {
    // <T>表示声明一个泛型方法
    // <T>必须在方法返回值前书写
    public static <T> void printArray(T[] array) {
        for (T element : array) {
            System.out.println(element);
        }
    }
}

// 使用泛型方法
String[] names = {"Alice", "Bob", "Charlie"};
Utils.printArray(names);
```

> [!TIP]
> 如果方法和类都使用了泛型，且方法的泛型参数与类的泛型参数同名，方法的泛型参数会覆盖类的泛型参数。

### 通配符

通配符 `?` 用于表示未知类型，常用于泛型的上下界约束。

-   **无界通配符**：`<?>` 表示任意类型。
-   **上界通配符**：`<? extends T>` 表示 T 或 T 的子类。
-   **下界通配符**：`<? super T>` 表示 T 或 T 的父类。

```java
public void printList(List<?> list) {
    for (Object item : list) {
        System.out.println(item);
    }
}
```

### 泛型的局限性

1. **类型擦除**：泛型在运行时会被擦除，导致类型信息不可用。
2. **不能使用基本类型**：泛型不支持基本数据类型（如 `int`），需要使用包装类（如 `Integer`）。
3. **不能创建泛型数组**：例如，`new T[10]` 是非法的。

## Java 接口

### 成员变量

接口中的字段默认是 `public static final`，即常量，不能被修改。

> [!NOTE]
> 由于成员变量默认是常量，所以在接口中定义的变量必须初始化。

```java
public interface Example {
    // 下面两种写法是等价的
    int VALUE = 10;
    public static final int VALUE2 = 20;
}
```

### 成员方法

接口中的方法默认是 `public abstract`，即抽象方法。

-   Java 8 之前，接口方法只能是 `public abstract`。
-   Java 8 引入了默认方法（`default`）和静态方法（`static`）。
-   Java 9 开始支持私有方法（`private`），用于辅助默认方法或静态方法。

> [!NOTE]
> 接口中的方法不能有方法体，除非是默认方法或静态方法。其中默认方法还可以被实现类重写。

### 多继承冲突

如果一个类实现了多个接口，且这些接口中有相同签名的默认方法，必须在实现类中重写该方法以解决冲突。

```java
public interface A {
    default void method() {
        System.out.println("A");
    }
}

public interface B {
    default void method() {
        System.out.println("B");
    }
}

public class C implements A, B {
    @Override
    public void method() {
        A.super.method(); // 或 B.super.method()
    }
}
```

### 修饰符

在 Java 中，接口可以使用以下修饰符：

1. **访问修饰符**：

    - `public`：接口可以被任何类访问。
    - 默认（无修饰符）：接口仅限于同一包内访问。

2. **其他修饰符**：
    - `abstract`：接口默认是抽象的，即使不显式声明。
    - `strictfp`：用于限制浮点计算的精度和舍入行为，使其符合 IEEE 754 标准。

> [!NOTE]
> 接口类不能使用 `final` 修饰，因为接口本质上是用来被实现的。

## Java 核心机制

### 动态绑定与静态绑定

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

### 泛型擦拭

Java 编译器在编译泛型代码时，会移除所有泛型类型参数 ，并将它们替换为：

-   如果有上界（如 `<T extends Number>`），则替换为上界类型（如 Number）；
-   如果没有上界（如 `<T>`），则替换为 Object。

泛型擦拭机制主要做到以下三件事情：

1. **类型参数替换** - 将泛型类型参数替换为原始类型（擦除类型变量，替换为界限类型或 Object）
2. **类型转换插入** - 在必要的位置自动插入类型转换代码，保证类型安全

3. **桥接方法生成** - 创建桥接方法以保持多态性，解决方法签名不一致的问题

这些实现方式保证了 Java 泛型的向后兼容性，但也带来了类型信息在运行时不可用等局限性。

> [!NOTE]
> 对于不同泛型参数的类得到的 class 对象相同

## Java 常用类或接口

### Thread 类

`Thread` 类是 Java 中用于创建和管理线程的核心类。通过继承 `Thread` 类，可以直接创建线程并定义其行为。

#### 核心方法

-   **`start()`** 启动线程，调用线程的 `run()` 方法。
-   **`run()`** 定义线程的执行逻辑，通常需要重写此方法。
-   **`sleep(long millis)`** 使当前线程休眠指定的毫秒数。
-   **`join()`** 等待线程执行完成。
-   **`interrupt()`** 中断线程。
-   **`isAlive()`** 检查线程是否仍在运行。
-   **`getName()` 和 `setName(String name)`** 获取或设置线程的名称。
-   **`getPriority()` 和 `setPriority(int priority)`** 获取或设置线程的优先级。
-   **`currentThread()`** 获取当前正在执行的线程对象。

#### 示例代码

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

### Properties

Properties 继承自 Hashtable，专门用于处理`.properties`配置文件。

#### 核心方法

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

#### 读取配置文件

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

#### 持久化配置

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

### HttpSession 接口

Session（会话）是在客户端和服务器之间建立的一种状态机制，用于在多个请求之间保持用户状态信息。 在 Java Web 开发中，`HttpSession`接口是处理会话管理的核心 API，根据不同的 Java 版本有不同的包路径：

-   Jakarta EE (Java EE 9+): `jakarta.servlet.http.HttpSession`
-   Java EE 8 及更早版本: `javax.servlet.http.HttpSession`

这个接口提供了在多个页面请求或访问之间存储和检索用户信息的机制。

#### 生命周期

-   **创建**：首次调用`request.getSession()`或`request.getSession(true)`
-   **销毁**：超时（默认 30 分钟）、调用`session.invalidate()`、服务器关闭

#### 核心方法

-   `String getId()` - 获取会话的唯一标识符
-   `void setAttribute(String name, Object value)` - 存储会话数据
-   `Object getAttribute(String name)` - 获取会话数据
-   `void removeAttribute(String name)` - 移除会话数据
-   `void invalidate()` - 使会话失效
-   `void setMaxInactiveInterval(int interval)` - 设置会话超时时间(秒)

#### 创建和使用 Session

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

### Cookie

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

#### 创建和发送 Cookie

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

#### 读取 Cookie

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

#### 删除 Cookie

```java
// 创建同名 Cookie 并设置最大年龄为0
Cookie cookie = new Cookie("username", null);
cookie.setMaxAge(0);
cookie.setPath("/");
response.addCookie(cookie);
```

## Java 线程

### 创建线程

在 Java 中，创建线程主要有两种方式：

1.  继承 `Thread` 类：

```java
// 1. 定义一个类，继承 Thread 类
class MyThread extends Thread {
    // 2. 重写 run() 方法，编写线程执行的任务
    @Override
    public void run() {
        // 线程要执行的任务
        System.out.println("线程正在执行：" + Thread.currentThread().getName());
    }
}

public class Main {
    public static void main(String[] args) {
        // 3. 创建线程对象
        MyThread thread1 = new MyThread();
        // 4. 启动线程
        thread1.start(); // 启动线程，执行 run() 方法

        MyThread thread2 = new MyThread();
        thread2.start();
    }
}
```

2.  实现 `Runnable` 接口：

```java
// 1. 定义一个类，实现 Runnable 接口
class MyRunnable implements Runnable {
    // 2. 实现 run() 方法，编写线程执行的任务
    @Override
    public void run() {
        // 线程要执行的任务
        System.out.println("线程正在执行：" + Thread.currentThread().getName());
    }
}

public class Main {
    public static void main(String[] args) {
        // 3. 创建 Runnable 对象
        MyRunnable runnable = new MyRunnable();
        // 4. 创建 Thread 对象，并将 Runnable 对象作为参数传递
        Thread thread1 = new Thread(runnable);
        // 5. 启动线程
        thread1.start(); // 启动线程，执行 run() 方法
        // 实际上由thread 代理执行runnable的run方法

        Thread thread2 = new Thread(runnable);
        thread2.start();
    }
}
```

> [!TIP]
> 实现 `Runnable` 接口的方式更为常用，因为它避免了 Java 单继承的限制，并且更符合面向接口编程的思想。

### 线程状态

Java 线程有以下几种状态：

| 状态              | 描述                                                             |
| ----------------- | ---------------------------------------------------------------- |
| **NEW**           | 初始状态，线程被创建但还未启动。                                 |
| **RUNNABLE**      | 可运行状态，包括 `READY`（就绪）和 `RUNNING`（运行中）两种状态。 |
| **BLOCKED**       | 阻塞状态，线程等待锁释放。                                       |
| **WAITING**       | 等待状态，线程等待其他线程的通知。                               |
| **TIMED_WAITING** | 定时等待状态，线程在指定时间内等待其他线程的通知。               |
| **TERMINATED**    | 终止状态，线程执行完毕。                                         |
