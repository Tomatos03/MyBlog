# 两阶段终止（Two-Phase Termination）

## 主要思想

1. **第一阶段**：通过设置终止标志（如 `volatile` 变量或中断标志）通知线程需要终止。
2. **第二阶段**：线程检测到终止信号后，进行必要的清理操作（如释放资源、保存状态等），然后安全退出。

## 应用场景

- 需要在终止线程前完成资源释放、日志记录等收尾工作的场景。
- 线程中包含阻塞操作（如 `sleep`、`wait`、IO 等），需要通过中断唤醒线程以便及时终止。

## 优点

- 保证线程能够有序、可控地终止，避免资源泄漏和不一致状态。
- 适用于需要优雅关闭的后台线程、定时任务线程等。

## 实现参考

```java
public class GracefulShutdown {T
    // volatile 确保isExits在线程间的可见性
    private static volatile boolean isExit = false;

    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            while (!isExit) {
                System.out.println("Thread run...");
                try {
                    TimeUnit.SECONDS.sleep(5);
                } catch (InterruptedException ignored) {
                }

            }
            System.out.println("Thread exit...");
        }, "t1");

        thread.start();
        TimeUnit.SECONDS.sleep(2);
        isExit = true;
        thread.interrupt();
    }
}

```
