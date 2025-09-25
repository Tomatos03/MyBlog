# Java 版本特性

## Java 8 新特性

Java 8 带来的新特性如下：

-   **Lambda 表达式**：支持函数式编程，使代码更加简洁。
-   **函数式接口**：引入 `@FunctionalInterface` 注解，支持函数式编程风格。
-   **Stream API**：用于处理集合的全新流式操作方式，简化数据处理。
-   **默认方法和静态方法**：接口可以有默认实现和静态方法。
-   **新的日期时间 API**：引入 `java.time` 包，提供更强大和易用的日期时间处理。
-   **Optional 类**：用于防止空指针异常的容器对象。
-   **重复注解与类型注解**：增强注解的使用灵活性。
-   **Nashorn JavaScript 引擎**：允许在 Java 中运行 JavaScript 代码。

### Stream API

Stream API 是 Java 8 引入的重要特性之一，主要用于对集合数据进行高效、简洁的操作。其核心优势包括：

-   **声明式编程**：通过链式调用表达数据处理逻辑，代码更简洁易读。
-   **支持并行操作**：可轻松利用多核架构提升性能。
-   **丰富的操作方法**：如 `filter`、`map`、`reduce`、`collect` 等，方便实现复杂的数据转换和聚合。

#### 基本流程

1. **获取数据源**：通常是集合、数组等。
2. **生成 Stream**：调用集合的 `stream()` 或 `parallelStream()` 方法。
3. **中间操作**：如 `filter`、`map`、`sorted` 等，对数据进行转换或筛选。
4. **终止操作**：如 `collect`、`forEach`、`reduce` 等，产生最终结果。
5. **关闭 Stream**：对于基于集合或数组的 Stream，通常不需要手动关闭；但对于基于 IO（如文件、网络）的 Stream，需要手动关闭以释放资源。

#### 数据源

在使用 Stream API 时，常见的数据源包括：

- **集合类**：如 `List`、`Set` 等，可以直接通过 `stream()` 或 `parallelStream()` 方法生成 Stream。
- **数组**：通过 `Arrays.stream(T[] array)` 方法将数组转为 Stream。
- **数值范围**：通过 `IntStream.range()`、`LongStream.range()` 等方法生成指定范围的数值流。
- **文件**：通过 `Files.lines(Path path)` 读取文件的每一行作为 Stream。
- **自定义生成**：通过 `Stream.generate()`、`Stream.iterate()` 等方法自定义生成无限流。

示例：

```java
// 集合
List<String> list = Arrays.asList("a", "b", "c");
Stream<String> stream1 = list.stream();

// 数组
int[] arr = {1, 2, 3};
IntStream stream2 = Arrays.stream(arr);

// 数值范围
IntStream stream3 = IntStream.range(0, 10);

// 文件
try (Stream<String> lines = Files.lines(Paths.get("test.txt"))) {
    lines.forEach(System.out::println);
}

// 自定义生成
Stream<Double> randoms = Stream.generate(Math::random).limit(5);
```

> [!TIP]
> 对于基于 IO 的数据源（如文件），使用完 Stream 后应及时关闭以释放资源。

#### 中间操作

中间操作用于对 Stream 中的数据进行转换、过滤、排序等处理，通常返回一个新的 Stream，可进行链式调用。常用的中间操作 API 如下表：

| 方法       | 方法签名                                                                          | 说明                         | 示例用法                                                        |
| ---------- | --------------------------------------------------------------------------------- | ---------------------------- | --------------------------------------------------------------- |
| `filter`   | `Stream<T> filter(Predicate<? super T> predicate)`                                | 过滤符合条件的元素           | `stream.filter(x -> x > 0)`                                     |
| `map`      | `<R> Stream<R> map(Function<? super T,? extends R> mapper)`                       | 元素映射为其他类型或值       | `stream.map(String::length)`                                    |
| `flatMap`  | `<R> Stream<R> flatMap(Function<? super T,? extends Stream<? extends R>> mapper)` | 扁平化处理嵌套结构           | `stream.flatMap(...)`                                           |
| `distinct` | `Stream<T> distinct()`                                                            | 去重                         | `stream.distinct()`                                             |
| `sorted`   | `Stream<T> sorted()`<br>`Stream<T> sorted(Comparator<? super T> comparator)`      | 排序                         | `stream.sorted()`<br>`stream.sorted(Comparator.reverseOrder())` |
| `peek`     | `Stream<T> peek(Consumer<? super T> action)`                                      | 对每个元素执行操作（调试用） | `stream.peek(System.out::println)`                              |
| `limit`    | `Stream<T> limit(long maxSize)`                                                   | 截取前 n 个元素              | `stream.limit(5)`                                               |
| `skip`     | `Stream<T> skip(long n)`                                                          | 跳过前 n 个元素              | `stream.skip(3)`                                                |

> [!TIP]
> 中间操作是惰性求值，只有在终止操作执行时才会真正处理数据。

#### 终止操作

终止操作（Terminal Operation）用于触发 Stream 的实际计算，产生最终结果或副作用。终止操作执行后，Stream 就不能再被使用。常见的终止操作包括收集、遍历、聚合、匹配等。

| 方法         | 方法签名                                         | 说明                         | 示例用法                                 |
| ------------ | ------------------------------------------------ | ---------------------------- | ---------------------------------------- |
| `forEach`    | `void forEach(Consumer<? super T> action)`       | 遍历每个元素，执行操作       | `stream.forEach(System.out::println)`    |
| `collect`    | `<R, A> R collect(Collector<? super T, A, R>)`   | 收集结果到集合或其他容器     | `stream.collect(Collectors.toList())`    |
| `toArray`    | `Object[] toArray()`                             | 转为数组                     | `stream.toArray()`                       |
| `reduce`     | `T reduce(T identity, BinaryOperator<T> op)`     | 归约操作，合并元素           | `stream.reduce(0, Integer::sum)`         |
| `count`      | `long count()`                                   | 统计元素个数                 | `stream.count()`                         |
| `min`/`max`  | `Optional<T> min(Comparator<? super T> comp)`    | 求最小/最大值                | `stream.max(Comparator.naturalOrder())`  |
| `findFirst`  | `Optional<T> findFirst()`                        | 查找第一个元素               | `stream.findFirst()`                     |
| `findAny`    | `Optional<T> findAny()`                          | 查找任意一个元素（并行流常用）| `stream.findAny()`                       |
| `anyMatch`   | `boolean anyMatch(Predicate<? super T> pred)`    | 是否有任意元素匹配条件       | `stream.anyMatch(x -> x > 0)`            |
| `allMatch`   | `boolean allMatch(Predicate<? super T> pred)`    | 是否所有元素都匹配条件       | `stream.allMatch(x -> x != null)`        |
| `noneMatch`  | `boolean noneMatch(Predicate<? super T> pred)`   | 是否所有元素都不匹配条件     | `stream.noneMatch(x -> x < 0)`           |

示例

```java
List<String> list = Arrays.asList("a", "bb", "ccc");

// forEach 遍历
list.stream().forEach(System.out::println);

// collect 收集到 List
List<String> upper = list.stream()
    .map(String::toUpperCase)
    .collect(Collectors.toList());

// reduce 求和
int sum = Arrays.asList(1, 2, 3).stream()
    .reduce(0, Integer::sum);

// count 统计数量
long count = list.stream().count();

// anyMatch 判断是否有长度为2的字符串
boolean hasLen2 = list.stream().anyMatch(s -> s.length() == 2);
```

> [!TIP]
> 终止操作会触发流的遍历和计算，执行后流会被“消费”，不能再进行其他操作。

### 函数式接口与注解

Java 8 为支持函数式编程，引入了若干常用的函数式接口，主要位于 `java.util.function` 包中。这些接口可用于 Lambda 表达式和方法引用，极大提升了代码的灵活性和可读性。

#### @FunctionalInterface 注解

`@FunctionalInterface` 注解用于标记接口为函数式接口。被标记的接口只能有**一个抽象方法**，编译器会进行校验，防止误用。

```java
@FunctionalInterface
public interface Converter<F, T> {
    T convert(F from);
}
```

#### 常用函数式接口

*只有一个抽象方法的接口被定义为***函数式接口**

| 接口名              | 抽象方法签名          | 说明                     |
| ------------------- | --------------------- | ------------------------ |
| `Function<T,R>`     | `R apply(T t)`        | 接收 T，返回 R           |
| `Predicate<T>`      | `boolean test(T t)`   | 判断条件，返回布尔值     |
| `Consumer<T>`       | `void accept(T t)`    | 消费型，无返回值         |
| `Supplier<T>`       | `T get()`             | 供给型，无参数           |
| `UnaryOperator<T>`  | `T apply(T t)`        | 一元操作，输入输出同类型 |
| `BinaryOperator<T>` | `T apply(T t1, T t2)` | 二元操作，输入输出同类型 |

这些接口可直接用于 Stream API、集合操作等场景。

> [!TIP]
> 即使不加 `@FunctionalInterface` 注解，只要接口只有一个抽象方法，也被视为函数式接口。但加上注解可增强代码可读性和安全性。

### Lambda 表达式

Lambda 表达式用于简化匿名内部类的写法，使代码更加简洁和易读。它本质上是对函数式接口（只包含一个抽象方法的接口）的实现。

#### 基本语法

```java
// 语法格式
(参数列表) -> { 方法体 }
```

#### 省略规则

Lambda 表达式支持多种省略写法，让代码更加简洁：

1. **参数类型省略**：编译器可以根据上下文推断参数类型。

```java
// 完整写法
Function<String, Integer> func1 = (String s) -> s.length();

// 省略参数类型
Function<String, Integer> func2 = (s) -> s.length();
```

2. **单个参数时省略括号**：当只有一个参数时，可以省略参数列表的括号。

```java
// 带括号
Function<String, Integer> func1 = (s) -> s.length();

// 省略括号
Function<String, Integer> func2 = s -> s.length();
```

3. **方法体只有一条语句时省略大括号**：当方法体只有一条语句时，可以省略大括号和 `return` 关键字。

```java
// 完整写法
Function<Integer, Integer> func1 = (x) -> {
    return x * 2;
};

// 省略大括号和 return
Function<Integer, Integer> func2 = x -> x * 2;
```

4. **无参数时使用空括号**：没有参数时必须使用空括号 `()`。

```java
// 无参数 Lambda
Supplier<String> supplier = () -> "Hello World";
Runnable runnable = () -> System.out.println("Running");
```

5. **方法引用进一步简化**：当 Lambda 表达式只是调用某个方法时，可以使用方法引用。

```java
// Lambda 表达式
Function<String, Integer> func1 = s -> s.length();
Consumer<String> consumer1 = s -> System.out.println(s);

// 方法引用（更简洁）
Function<String, Integer> func2 = String::length;
Consumer<String> consumer2 = System.out::println;
```

#### 注意事项

使用 Lambda 表达式时需要注意以下几点：

1. **变量捕获限制**：Lambda 表达式只能访问 `final` 或事实上为 `final` 的局部变量。

```java
int count = 0;
// 编译错误：count 不是 final 或 effectively final
// list.forEach(item -> count++);

final int finalCount = 0;
list.forEach(item -> System.out.println(finalCount)); // 正确
```

2. **this 引用**：在 Lambda 中，`this` 指向外部类实例，而不是 Lambda 本身。

```java
public class MyClass {
    private String name = "MyClass";
    
    public void test() {
        Runnable r = () -> System.out.println(this.name); // this 指向 MyClass
    }
}
```

3. **异常处理**：Lambda 中的受检异常需要在函数式接口中声明或在 Lambda 内部处理。

```java
// 需要处理异常
list.forEach(item -> {
    try {
        // 可能抛出异常的代码
        Thread.sleep(1000);
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }
});
```

4. **类型推断**：编译器会根据上下文推断参数类型，但复杂情况下可能需要显式声明。

```java
// 类型推断
Function<String, Integer> func1 = s -> s.length();

// 显式类型声明
Function<String, Integer> func2 = (String s) -> s.length();
```

5. **性能考虑**：Lambda 表达式会产生额外的类文件，频繁创建可能影响性能。对于简单操作，传统方法可能更高效。


```java
// 传统写法
Runnable r1 = new Runnable() {
    @Override
    public void run() {
        System.out.println("Hello Lambda!");
    }
};

// Lambda 写法
Runnable r2 = () -> System.out.println("Hello Lambda!");
```

#### 函数式接口

Lambda 只能用于实现函数式接口，如 `Runnable`、`Comparator<T>`、`Callable<T>` 等。可以使用 `@FunctionalInterface` 注解标记。

```java
@FunctionalInterface
interface MyFunc {
    int add(int a, int b);
}

MyFunc func = (a, b) -> a + b;
System.out.println(func.add(2, 3)); // 输出 5
```

> [!TIP]
> Lambda 表达式让代码更简洁，但要注意只适用于函数式接口。
