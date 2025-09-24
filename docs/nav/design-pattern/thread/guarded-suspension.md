# 保护性暂停（Guarded Suspension）

## 主要思想

1. **等待条件**：线程在执行某项操作前，先判断某个条件是否满足。如果条件不满足，则线程进入等待状态，暂停执行。
2. **条件满足**：当其他线程使条件变为满足时，通过通知机制（如 `notify` 或 `signal`）唤醒等待线程，线程继续执行后续操作。

## 应用场景

- 需要等待某个结果或资源准备就绪后再继续执行的场景。
- 线程间通信、生产者-消费者模型、异步任务结果获取等。

## 优点

- 保证线程在条件未满足时不会继续执行，避免无效操作和资源浪费。
- 实现线程间的有效协作，提高程序的健壮性和可维护性。

## 实现参考

```java
public class ProtectiveSuspensionMode {
    private static boolean condition = false;
    private static final Object lock = new Object();

    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            synchronized (lock) {
                // 使用while防止虚假唤醒(即使这里不存在虚假唤醒, 仍然建议这样写)
                while (!condition) {
                    try {
                        lock.wait();
                    } catch (InterruptedException e) {
                        // 线程中断相关处理
                    }
                }

                // 满足条件后需要执行的任务...
                System.out.println("线程t1执行线程任务");
            }
        }, "t1");

        Thread thread1 = new Thread(() -> {
            synchronized (lock) {
                System.out.println("t2执行线程任务");
                System.out.println("t2完成线程的任务");
                condition = true;
                lock.notify();
            }
        }, "t2");

        thread.start();
        TimeUnit.SECONDS.sleep(2);
        thread1.start();
    }
}
```
