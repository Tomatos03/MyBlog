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

## 整合

### Mybatis

```xml
<dependency>
	<groupId>org.mybatis.spring.boot</groupId>
	<artifactId>mybatis-spring-boot-starter</artifactId>
	<version>[last-version]</version>
</dependency>
```

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

##### 依赖

```xml
<dependency>
	<groupId>com.github.penggle</groupId>
	<artifactId>kaptcha</artifactId>
	<version>2.3.2</version>
</dependency>
```

##### 定义配置

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

##### 定义 Controller

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

## 配置

### 数据库连接配置

配置之前需要在 pom.xml 中添加 mysql 驱动依赖

```xml
<dependency>
	<groupId>mysql</groupId>
	<artifactId>mysql-connector-java</artifactId>
	<!--如果使用springboot-start-parent，可以省略版本号，使用父pom指定的版本-->
	<version>8.0.33</version>
```

```yaml
spring:
  datasource:
	url: jdbc:mysql://<hostname>[:<port>]/<database>[?<param1>[&<param2>...]]
	username: <username>
	password: <password>
	driver-class-name: <full-qualified-class-name>
```
