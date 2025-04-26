# SpringBoot

## 安装

### Maven

```xml
<!-- 指定父pom, 父pom包含一些springboot当前兼容的常用依赖 -->
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>3.4.5</version>
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
	url: jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=utf-8&serverTimezone=UTC
	username: root
	password: 123456
	driver-class-name: com.mysql.cj.jdbc.Driver
```
