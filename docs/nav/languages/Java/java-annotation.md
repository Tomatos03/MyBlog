# Java 注解

## 定义注解

使用`@interface`来声明自己的注解, 通过无参数的方法声明注解的属性，其中`方法名`即为`属性名`，`方法返回值类型`即为`属性值需要的类型`。如果想要指定默认值，可以使用 `default` 关键字

```java
public @interface Example {
    String name();           // 必须赋值的属性
    int count() default 1;   // 有默认值的属性，可选赋值
}
```

> [!NOTE]
> 如果注解只有一个名为 `value` 的属性，使用时可以省略属性名直接赋值。 \
> 如果注解要求的值是数组, 使用大括号 `{}` 来指定多个值, 在只有一个值的时候, 可以省略大括号.
> 注解属性类型只能是基本类型、`String`、`Class`、枚举、注解或这些类型的数组。

使用注解时，必须为没有默认值的属性赋值：

```java
@Example(name = "test")
public void foo() {}

@Example(name = "test", count = 5)
public void bar() {}
```

## 组合注解

组合注解（Meta-Annotation Composition）是指在定义注解时, 使用了其他注解. 这样的做法会将多个注解的功能组合在一起, 在使用组合注解时, 就相当于同时使用了这些注解。

Spring 中的 `@RestController` 就是一个组合注解，它本身被 `@Controller` 和 `@ResponseBody` 注解所修饰：

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Controller
@ResponseBody
public @interface RestController {
    String value() default "";
}
```

使用 `@RestController` 注解的类，实际上同时具备了 `@Controller` 和 `@ResponseBody` 的功能。

> [!TIP]
> 组合注解可以减少重复注解，提高开发效率，常用于框架设计和规范约定。

## 常见内置注解

-   `@Override`：用于标记方法是重写父类方法，编译器会检查方法签名是否正确。
-   `@Deprecated`：标记方法或类已过时，使用时会有警告。
-   `@SuppressWarnings`：抑制编译器警告。
-   `@FunctionalInterface`：标记接口为函数式接口（只能有一个抽象方法）。

元注解是用于修饰注解的注解，常见的有：

-   `@Retention`：指定注解的保留策略（如 `SOURCE`、`CLASS`、`RUNTIME`）。
-   `@Target`：指定注解可以应用的位置（如类、方法、字段等）。
-   `@Documented`：在生成对应的 Javadoc 的时候, 注解是否包含在 Javadoc 中。
-   `@Inherited`：子类是否可以继承父类的注解。

## 注解相关枚举

### RetentionPolicy

`RetentionPolicy` 枚举用于指定注解在什么阶段保留：

-   `SOURCE`：注解只在源代码中保留，编译后被丢弃（如 `@Override`）。
-   `CLASS`：注解在编译后保留在 class 文件中，但运行时不可见（默认值）。
-   `RUNTIME`：注解在运行时依然存在，JVM 可以读取（如自定义运行时注解）。

```java
@Retention(RetentionPolicy.RUNTIME)
public @interface MyAnnotation {}
```

### ElementType

`ElementType` 枚举用于指定注解可以应用于哪些 Java 程序元素：

-   `TYPE`：类、接口（包括注解类型）、枚举
-   `FIELD`：字段（成员变量、枚举常量）
-   `METHOD`：方法
-   `PARAMETER`：方法参数
-   `CONSTRUCTOR`：构造方法
-   `LOCAL_VARIABLE`：局部变量
-   `ANNOTATION_TYPE`：注解类型
-   `PACKAGE`：包
-   `TYPE_PARAMETER`：类型参数（Java 8+）
-   `TYPE_USE`：任何使用类型的地方（Java 8+）

```java
@Target({ElementType.METHOD, ElementType.TYPE})
public @interface MyAnnotation {}
```

> [!TIP]
> 可以通过组合多个 `ElementType`，让注解同时作用于多种目标。