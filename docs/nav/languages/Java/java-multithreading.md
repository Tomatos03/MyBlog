# Java 多线程

## 线程创建

Java中创建线程有以下四种方式：

1. **继承 Thread 类**
2. **实现 Runnable 接口**
3. **实现 Callable 接口并结合 FutureTask**
4. **使用线程池（Executor 框架）**

代码示例:

```java
import java.util.concurrent.Callable;
import java.util.concurrent.FutureTask;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

// 1. 继承 Thread 类
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("继承 Thread 类方式运行线程");
    }
}

// 2. 实现 Runnable 接口
class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("实现 Runnable 接口方式运行线程");
    }
}

// 3. 实现 Callable 接口并结合 FutureTask
class MyCallable implements Callable<String> {
    @Override
    public String call() throws Exception {
        return "实现 Callable 接口方式运行线程";
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        // 1. 继承 Thread 类
        Thread thread1 = new MyThread();
        thread1.start();

        // 2. 实现 Runnable 接口
        Thread thread2 = new Thread(new MyRunnable());
        thread2.start();

        // 3. 实现 Callable 接口并结合 FutureTask
        FutureTask<String> futureTask = new FutureTask<>(new MyCallable());
        Thread thread3 = new Thread(futureTask);
        thread3.start();
        System.out.println(futureTask.get());

        // 4. 使用线程池（Executor 框架）
        ExecutorService executor = Executors.newFixedThreadPool(2);
        executor.execute(() -> System.out.println("线程池方式运行线程"));
        executor.shutdown();
    }
}
```


> [!TIP]
> 实现 `Runnable` 接口的方式更为常用，因为它避免了 Java 单继承的限制，并且更符合面向接口编程的思想。

## 线程状态

Java 中的线程模型有以下几种状态：

| 状态              | 描述                                                             |
| ----------------- | ---------------------------------------------------------------- |
| **NEW**           | 初始状态，线程被创建但还未启动。                                 |
| **RUNNABLE**      | 可运行状态，包括 `READY`（就绪）和 `RUNNING`（运行中）两种状态。 |
| **BLOCKED**       | 阻塞状态，线程等待锁释放。                                       |
| **WAITING**       | 等待状态，线程等待其他线程的通知。                               |
| **TIMED_WAITING** | 定时等待状态，线程在指定时间内等待其他线程的通知。               |
| **TERMINATED**    | 终止状态，线程执行完毕。                                         |

简化图示:
![alt text](assets/image.png-1752249576397.png)

完整线程模型以及线程状态转图示：
![alt text](assets/image.png-1752249497567.png)
