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
