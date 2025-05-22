# SpringBoot

## 安装

### Maven

```xml
<!-- 指定父pom, 父pom包含一些springboot当前兼容的常用依赖 -->
<parent>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-parent</artifactId>
	<version>3.4.5</version>
	<relativePath/> <!-- 优先从远程仓库开始查找 -->
</parent>
```

## 集成

### Jackson

#### Maven 依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-json</artifactId>
    <version>[latest-version]</version>
</dependency>
```

> [!NOTE]
> Spring Boot Web Starter 包含 `spring-boot-starter-json` 依赖

#### 自定义配置

Spring Boot 自动配置了 Jackson 的 ObjectMapper，支持日期格式化、忽略未知属性、空对象处理、时区设置等功能，如果需要在 Spring Boot 中自定义 ObjectMapper，可以创建一个配置类：

```java
@Configuration
public class JacksonConfig {
    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();

        // 处理日期格式
        objectMapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));

        // 忽略未知属性
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        // 空对象不抛出异常
        objectMapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);

        // 设置时区
        objectMapper.setTimeZone(TimeZone.getTimeZone("GMT+8"));

        return objectMapper;
    }
}
```

#### 常用注解

```java
// 类级别注解
@JsonIgnoreProperties({"field1", "field2"})  // 忽略特定字段
@JsonInclude(JsonInclude.Include.NON_NULL)   // 排除 null 值字段
@JsonRootName("user")                        // 指定序列化根节点名称

// 字段/方法级别注解
@JsonProperty("custom_name")                 // 自定义序列化属性名
@JsonIgnore                                  // 忽略特定字段
@JsonFormat(pattern = "yyyy-MM-dd")          // 自定义日期格式
@JsonAlias({"name", "fullName"})             // 反序列化时支持多个属性名
@JsonSerialize(using = CustomSerializer.class)     // 自定义序列化器
@JsonDeserialize(using = CustomDeserializer.class) // 自定义反序列化器
```

#### 基本使用

```java
// 对象转JSON字符串
public String objectToJson(Object object) {
    try {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(object);
    } catch (JsonProcessingException e) {
        log.error("JSON序列化失败", e);
        return null;
    }
}

// JSON字符串转对象
public <T> T jsonToObject(String json, Class<T> valueType) {
    try {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(json, valueType);
    } catch (JsonProcessingException e) {
        log.error("JSON反序列化失败", e);
        return null;
    }
}

// 处理泛型
public <T> T jsonToGenericObject(String json, TypeReference<T> typeReference) {
    try {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(json, typeReference);
    } catch (JsonProcessingException e) {
        log.error("JSON泛型反序列化失败", e);
        return null;
    }
}
```

### JUnit 5

#### Maven 依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

> [!NOTE]
> Spring Boot Starter Test 已经包含了 JUnit 5、Mockito、Spring Test 等测试所需的依赖。

#### 基本测试类

```java
@SpringBootTest
class ApplicationTests {

    @Test
    void contextLoads() {
        // 测试 Spring 上下文是否正常加载
    }
}
```

#### 常用注解

```java
// 标记为 Spring Boot 测试类，加载完整的 Spring 应用程序上下文
@SpringBootTest

// 只加载特定配置类而不是整个应用上下文
@SpringBootTest(classes = SpecificConfig.class)

// 指定测试环境的配置属性
@SpringBootTest(properties = "spring.profiles.active=test")

// Web 环境相关测试
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)

// 模拟 MVC 测试，不启动完整服务器
@AutoConfigureMockMvc

// 用于在每个测试方法前后进行数据库回滚，保持测试隔离性
@Transactional

// 定义测试执行顺序
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)

// 指定执行顺序
@Order(1)
```

### Redis

#### Maven 依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
    <version>[latest-version]</version>
</dependency>
<!--如果使用连接池-->
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
    <version>[latest-version]</version>
</dependency>
```

#### 配置文件

在`application.yml`或`application.properties`中添加 Redis 配置：

```yaml
// 新版本
spring:
    data:
        redis:
            host: localhost
            port: 6379
            password: zjlljz
            timeout: 5000ms
            database: 0
            // 如果使用了连接池
            lettuce:
                pool:
                    max-active: 8
                    max-idle: 8
                    min-idle: 1
                    max-wait: 2000ms

// 老版本
spring:
  redis:
    host: localhost
    port: 6379
    password: zjlljz
    timeout: 5000ms
    database: 0
    # 如果使用了连接池
    lettuce:
      pool:
        max-active: 8
        max-idle: 8
        min-idle: 1
        max-wait: 2000ms
```

#### 工具类封装

```java
@Component
public class RedisUtil {
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    /**
     * 存储普通对象
     */
    public void set(String key, Object value) {
        redisTemplate.opsForValue().set(key, value);
    }

    /**
     * 存储普通对象并设置过期时间
     */
    public void set(String key, Object value, long timeout, TimeUnit unit) {
        redisTemplate.opsForValue().set(key, value, timeout, unit);
    }

    /**
     * 获取普通对象
     */
    public Object get(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    /**
     * 删除对象
     */
    public Boolean delete(String key) {
        return redisTemplate.delete(key);
    }

    /**
     * 判断key是否存在
     */
    public Boolean hasKey(String key) {
        return redisTemplate.hasKey(key);
    }
}
```

#### 常用操作

| 数据类型   | 基本操作类      | 常用操作              | 代码示例                                                                      |
| ---------- | --------------- | --------------------- | ----------------------------------------------------------------------------- |
| **String** | `opsForValue()` | 设置值                | `redisTemplate.opsForValue().set("key", "value");`                            |
|            |                 | 获取值                | `String value = (String) redisTemplate.opsForValue().get("key");`             |
|            |                 | 设置带过期时间的值    | `redisTemplate.opsForValue().set("key", "value", 1, TimeUnit.HOURS);`         |
|            |                 | 当 key 不存在时设置值 | `redisTemplate.opsForValue().setIfAbsent("key", "value");`                    |
|            |                 | 自增操作              | `redisTemplate.opsForValue().increment("counter", 1);`                        |
| **Hash**   | `opsForHash()`  | 设置哈希字段          | `redisTemplate.opsForHash().put("user:1", "name", "John");`                   |
|            |                 | 获取哈希字段          | `Object name = redisTemplate.opsForHash().get("user:1", "name");`             |
|            |                 | 获取所有哈希字段      | `Map<Object, Object> entries = redisTemplate.opsForHash().entries("user:1");` |
|            |                 | 删除哈希字段          | `redisTemplate.opsForHash().delete("user:1", "name", "age");`                 |
|            |                 | 哈希字段自增          | `redisTemplate.opsForHash().increment("user:1", "visits", 1);`                |
| **List**   | `opsForList()`  | 左侧添加元素          | `redisTemplate.opsForList().leftPush("queue", "item1");`                      |
|            |                 | 右侧添加元素          | `redisTemplate.opsForList().rightPush("queue", "item2");`                     |
|            |                 | 获取范围元素          | `List<Object> items = redisTemplate.opsForList().range("queue", 0, -1);`      |
|            |                 | 左侧弹出元素          | `Object item = redisTemplate.opsForList().leftPop("queue");`                  |
|            |                 | 右侧弹出元素          | `Object item = redisTemplate.opsForList().rightPop("queue");`                 |
| **Set**    | `opsForSet()`   | 添加元素              | `redisTemplate.opsForSet().add("tags", "java", "spring", "redis");`           |
|            |                 | 获取所有成员          | `Set<Object> tags = redisTemplate.opsForSet().members("tags");`               |
|            |                 | 判断成员是否存在      | `Boolean exists = redisTemplate.opsForSet().isMember("tags", "java");`        |
|            |                 | 移除成员              | `redisTemplate.opsForSet().remove("tags", "java");`                           |
| **ZSet**   | `opsForZSet()`  | 添加带分数的成员      | `redisTemplate.opsForZSet().add("scores", "player1", 85.5);`                  |
|            |                 | 获取成员分数          | `Double score = redisTemplate.opsForZSet().score("scores", "player1");`       |
|            |                 | 获取排名范围成员      | `Set<Object> top = redisTemplate.opsForZSet().range("scores", 0, 2);`         |
|            |                 | 自增分数              | `redisTemplate.opsForZSet().incrementScore("scores", "player1", 5.0);`        |

### Spring Security

```xml
<!--如果使用springboot提供了parent，可以不指定版本号，而是由父项目之中提供的版本-->
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
		<version>[last-version]</version>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
		<version>[last-version]</version>
    </dependency>
</dependencies>
```

### 二维码

#### Kaptcha

##### Maven 依赖

```xml
<dependency>
	<groupId>com.github.penggle</groupId>
	<artifactId>kaptcha</artifactId>
	<version>2.3.2</version>
</dependency>
```

##### 配置类

```java
@Component
public class CodeConfig {
    @Bean
    public DefaultKaptcha producer() {
        Properties props = new Properties();
        props.setProperty("kaptcha.textproducer.char.length", "5");
        props.setProperty("kaptcha.image.width", "150");
        props.setProperty("kaptcha.image.height", "50");
        props.setProperty("kaptcha.textproducer.font.color", "black");

        Config config = new Config(props);
        DefaultKaptcha kaptcha = new DefaultKaptcha();
        kaptcha.setConfig(config);

        return kaptcha;
    }
}

```

##### Controller 类

```java
@RestController // 标记该类为RESTful控制器，处理HTTP请求
public class CaptchaController {
    @Autowired // 自动注入验证码生成器
    DefaultKaptcha kaptcha;

    @GetMapping("/captchaImage") // 映射GET请求到/captchaImage路径
    public void getCode(HttpServletResponse response, HttpSession session) throws IOException {
        response.setHeader("Cache-Control", "no-store, no-cache"); // 禁止浏览器缓存验证码图片
        response.setContentType("image/jpeg"); // 设置响应内容类型为JPEG图片

        try (OutputStream outputStream = response.getOutputStream()) { // 使用try-with-resources获取输出流并确保关闭
            String text = kaptcha.createText(); // 生成随机验证码文本

            session.setAttribute("captcha", text); // 将验证码文本存入session，用于后续验证
            BufferedImage image = kaptcha.createImage(text); // 根据验证码文本生成图片

            ImageIO.write(image, "jpg", outputStream); // 将验证码图片写入输出流
            outputStream.flush(); // 刷新输出流确保数据发送完毕
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "验证码生成失败"); // 发生异常时返回500错误
        }
    }
}
```

## 其他配置

### 数据库连接配置

配置之前需要在 pom.xml 中添加 mysql 驱动依赖

```xml
<dependency>
	<groupId>mysql</groupId>
	<artifactId>mysql-connector-java</artifactId>
	<!--如果使用springboot-start-parent，可以省略版本号，使用父pom指定的版本-->
	<version>[latest-version]</version>
```

```yaml
spring:
  datasource:
	url: jdbc:<database_type>://<hostname>[:<port>]/<database>[?<param1>[&<param2>...]]
	username: <username>
	password: <password>
	driver-class-name: <full-qualified-class-name>

# 示例
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/testdb?useSSL=false&serverTimezone=UTC
    username: root
    password: root
    driver-class-name: com.mysql.cj.jdbc.Driver
```

## 核心接口和类

### 拦截器相关接口

#### HandlerInterceptor 接口

`HandlerInterceptor` 是 Spring MVC 提供的一个接口，用于在请求处理的不同阶段执行自定义逻辑，通过实现 `HandlerInterceptor` 接口，可以定义自定义拦截器，用于在请求的不同阶段插入特定逻辑。

> [!NOTE]
> 定义了拦截器后，需要注册在`WebMvcConfigurer`实现类中拦截器。

```java
public interface HandlerInterceptor {

    /**
     * 在请求处理之前调用
     * @param request 当前的 HTTP 请求
     * @param response 当前的 HTTP 响应
     * @param handler 处理器（控制器方法）
     * @return 返回 true 表示继续处理，返回 false 表示中断请求
     * @throws Exception 如果发生错误
     */
    boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception;

    /**
     * 在请求处理之后但在视图渲染之前调用
     * @param request 当前的 HTTP 请求
     * @param response 当前的 HTTP 响应
     * @param handler 处理器（控制器方法）
     * @param modelAndView 视图模型对象
     * @throws Exception 如果发生错误
     */
    void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception;

    /**
     * 在整个请求完成后调用
     * @param request 当前的 HTTP 请求
     * @param response 当前的 HTTP 响应
     * @param handler 处理器（控制器方法）
     * @param ex 异常对象（如果有）
     * @throws Exception 如果发生错误
     */
    void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception;
}
```

注册自定义的拦截器

> [!NOTE]
> 如果路径书写错误，不会有错误提示，并且会导致拦截器不生效！

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new CustomInterceptor())
                .addPathPatterns("/**") // 拦截所有路径
                .excludePathPatterns("/login", "/error"); // 排除特定路径
    }
}
```

-   **`preHandle`**：在请求处理之前调用，通常用于权限验证、日志记录等操作。返回 `true` 表示继续处理，返回 `false` 表示中断请求。
-   **`postHandle`**：在请求处理之后但在视图渲染之前调用，适合用于修改模型数据或记录处理结果。
-   **`afterCompletion`**：在整个请求完成后调用，通常用于资源清理或异常处理。

## 前端传入数据注意事项

前端传入数据的时候，后端对应的对象成员变量名称，默认情况下**需要和前端传入的参数名称一致**，
