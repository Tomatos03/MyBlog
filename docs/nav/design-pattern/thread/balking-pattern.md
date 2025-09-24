# 犹豫模式（Balking Pattern）

## 主要思想

1. **条件判断**：在多线程环境下，某个操作只有在对象处于特定状态时才会被执行，否则直接“犹豫”返回，不做任何处理。
2. **保护性操作**：通过同步和状态检查，避免重复或非法操作，确保对象状态的一致性和安全性。

## 应用场景

- 只允许某个操作在特定条件下执行一次，如单例初始化、资源启动、关闭等。
- 防止重复启动、重复关闭等操作，保护对象状态不被破坏。

## 优点

- 避免了重复操作带来的资源浪费和状态异常。
- 提高了多线程环境下的程序健壮性和安全性。
- 适用于需要保护性暂停的场景，如线程池启动、服务关闭等。

## 实现参考

```java
@Slf4j(topic = "balk-class")
class BalkMode {
    private Thread monitorThread;
    private final Object lock = new Object();
    // TODO: 防止双重检测的指令重排问题
    private volatile boolean isStop = false;

    public void start() {
        if (!isStop) {
            synchronized (lock) {
                if (!isStop) {
                    init();
                    isStop = true;
                }
            }
        }
    }

    private void init() {
        monitorThread = new Thread(() -> {
            log.info("monitor start...");
        }, "monitorThread");
        monitorThread.start();
    }
}
```
