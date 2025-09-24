# 单例模式（Singleton Pattern）

## 主要思想

1. **唯一实例**：确保一个类在系统中只有一个实例，并提供全局访问点。
2. **延迟加载**：根据需要延迟创建实例，避免资源浪费。
3. **线程安全**：在多线程环境下保证实例的唯一性和安全性。

## 应用场景

- 需要全局唯一对象的场景，如配置管理器、线程池、日志对象等。
- 资源受限或需要集中管理的对象。
- 需要频繁访问且创建开销较大的对象。

## 优点

- 保证系统中只有一个实例，节省资源，便于统一管理。
- 提供全局访问点，方便共享数据和状态。
- 可结合懒加载和线程安全机制，提升性能和可靠性。

## 实现参考

```java
public final class Singleton {
    private Singleton() { }

    private static volatile Singleton INSTANCE;

    public static Singleton getInstance() {
        if (INSTANCE != null) {
            return INSTANCE;
        }

        synchronized (Singleton.class) {
            if (INSTANCE != null) {
                return INSTANCE;
            }
            /**
             * INSTANCE = new Singleton(); 实际分为三个指令：
             *   1. 分配内存
             *   2. 调用构造方法
             *   3. 将引用赋值给INSTANCE  
             * 如果不添加volatile关键字修饰, 无法保证2一定在3之前
             * 
             */
            INSTANCE = new Singleton();
            return INSTANCE;
        }
    }
}

```

