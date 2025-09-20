# 单例模式

## 优点

-   确保一个类只有一个实例，并提供一个全局访问点

## 实现

### 饿汉式

```java
public class Singleton {
    // 类加载时就初始化
    private static final Singleton INSTANCE = new Singleton();

    // 私有构造函数防止外部实例化
    private Singleton() {}

    public static Singleton getInstance() {
        return INSTANCE;
    }
}
```

### 懒汉式

```java
public class Singleton {
    // 延迟加载
    private static Singleton instance;

    // 私有构造函数防止外部实例化
    private Singleton() {}

    // synchronized 确保线程安全
    public static synchronized Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}
```
