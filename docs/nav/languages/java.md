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

## 常用类

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
