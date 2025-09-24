# 顺序控制（Sequencing Control）

## 主要思想

1. **顺序执行**：通过特定的同步机制，确保多个线程或任务按照预定顺序依次执行。
2. **信号传递**：常用如锁、条件变量、信号量、CountDownLatch、CyclicBarrier 等工具在线程间传递执行信号，实现顺序控制。

## 应用场景

- 多线程协作时，要求线程严格按照某种顺序执行（如 A 线程先执行，B 线程后执行）。
- 需要保证某些初始化、资源准备等操作完成后，其他线程才能继续执行的场景。
- 多阶段流水线处理、生产者-消费者模型等需要顺序依赖的场景。

## 优点

- 保证多线程环境下操作的有序性，避免竞态条件和数据不一致。
- 提高程序的可控性和可维护性，适用于对执行顺序有严格要求的业务逻辑。

## 实现参考

```java
class WaitNotifyABCSequenceOut {
    private int status = 0; // 状态机 0: a, 1: b, 2: c 
    private final int loopCount;
    private volatile boolean isEnd = false;
    private final Object lock = new Object();
    private final StringBuilder strBuilder = new StringBuilder();

    public WaitNotifyABCSequenceOut(int count) {
        this.loopCount = count;
    }

    public void start() {
        Thread thread1 = new Thread(() -> {
            synchronized (lock) {
                for (int i = 0; i < loopCount; ++i) {
                    while (status != 0) {
                        try {
                            lock.wait();
                        } catch (InterruptedException e) {
                            throw new RuntimeException(e);
                        }
                    }

                    strBuilder.append("a");
                    status = 1;
                    lock.notifyAll();
                }
            }
        }, "t1");
        thread1.start();

        Thread thread2 = new Thread(() -> {
            synchronized (lock) {
                for (int i = 0; i < loopCount; ++i) {
                    while (status != 1) {
                        try {
                            lock.wait();
                        } catch (InterruptedException e) {
                            throw new RuntimeException(e);
                        }
                    }

                    strBuilder.append("b");
                    status = 2;
                    lock.notifyAll();
                }
            }
        }, "t2");
        thread2.start();

        Thread thread3 = new Thread(() -> {
            synchronized (lock) {
                for (int i = 0; i < loopCount; ++i) {
                    while (status != 2) {
                        try {
                            lock.wait();
                        } catch (InterruptedException e) {
                            throw new RuntimeException(e);
                        }
                    }

                    strBuilder.append("c");
                    status = 0;
                    if (i != loopCount - 1) {
                        strBuilder.append("_");
                    } else {
                        isEnd = true;
                    }

                    lock.notifyAll();
                }
            }
        }, "t3");
        thread3.start();
    }

    public String get() {
        start();

        while (!isEnd) {
            Sleeper.sleep(50, TimeUnit.MILLISECONDS);
        }
        return strBuilder.toString();
    }
}

```