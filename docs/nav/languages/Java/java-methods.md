# Java 方法

## 方法重载

方法重载（Overloading）是指在同一个类中，允许存在多个方法名相同但参数列表不同（参数类型、数量或顺序不同）的方法。重载方法可以有不同的返回类型。

```java
public class Example {
    public void print(int a) {
        System.out.println(a);
    }
    public void print(String s) {
        System.out.println(s);
    }
}
```

> [!TIP]
> 方法重载只看方法名和参数列表，与返回值类型和修饰符无关。

## 方法重写
方法重写（Overriding）是指子类对父类中已经存在的方法进行重新实现。重写的方法必须具有相同的方法名、参数列表和返回类型，访问修饰符不能更严格，且不能抛出比父类更多的异常。

```java
class Parent {
    public void show() {
        System.out.println("Parent");
    }
}
class Child extends Parent {
    @Override
    public void show() {
        System.out.println("Child");
    }
}
```

> [!TIP]
> 重写方法加上 `@Override` 注解以增强可读性和编译检查。

## 对比总结

| 特性          | 方法重载（Overloading） | 方法重写（Overriding）     |
| ------------- | ----------------------- | -------------------------- |
| 发生位置      | 同一个类中              | 父类与子类之间             |
| 参数列表      | 必须不同                | 必须相同                   |
| 返回类型      | 可以不同                | 必须相同（或协变返回类型） |
| 访问修饰符    | 可以不同                | 不能更严格                 |
| 静态/实例方法 | 都可以                  | 只能是实例方法             |
| 关键字        | 无需特殊关键字          | 推荐使用 `@Override` 注解  |

> [!Note] 什么是协变返回类型？
> 在 Java 中，子类重写父类方法时，允许返回类型是父类方法返回类型的子类型，这被称为协变返回类型（Covariant Return Type）。这样可以让重写方法返回更具体的类型，提高代码灵活性和可读性。

> [!TIP]
> 访问修饰符按访问权限从大到小依次为：`public` > `protected` > 默认（无修饰符） > `private`。权限越大，越开放；权限越小，越受限制。