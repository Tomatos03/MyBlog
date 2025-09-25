# 生产者消费者模式（Producer-Consumer Pattern）

## 主要思想

1. **生产者**：负责生产数据，并将数据放入共享缓冲区。
2. **消费者**：负责从共享缓冲区中取出数据进行处理。
3. **缓冲区**：用于存储生产者生产的数据，实现生产者与消费者之间的解耦。
4. **同步机制**：通过锁、条件变量等方式保证线程安全，避免竞态条件和数据丢失。

## 应用场景

- 多线程环境下需要异步处理任务的场景，如消息队列、任务调度、日志处理等。
- 生产和消费速度不一致，需要通过缓冲区进行流量削峰和解耦。

## 优点

- 实现生产者与消费者的解耦，提高系统的并发能力和资源利用率。
- 支持异步处理，提升系统吞吐量和响应速度。
- 通过缓冲区和同步机制，保证数据的安全和一致性。

## 实现参考

```java
class BlockQueueDoubleCondition<T> {
    private final ArrayDeque<T> que = new ArrayDeque<>();
    private final ReentrantLock lock = new ReentrantLock();
    // 这里使用一个Condtion也能够实现, 但使用两个Condtion，分别用于队列满和队列空的情况, 能够提高性能
    private final Condition fullSet = lock.newCondition();
    private final Condition emptySet = lock.newCondition();
    private int capacity;

    public BlockQueueDoubleCondition(int capacity) {
        this.capacity = capacity;
    }

    public void poll(T e, long duration, TimeUnit unit) {
        long waitTime = unit.toNanos(duration);

        long endTime = System.nanoTime() + waitTime;
        lock.lock();
        try {
            while (que.size() == capacity) {
                if (waitTime <= 0) {
                    return;
                }
                fullSet.awaitNanos(waitTime);
                waitTime = endTime - System.nanoTime();
            }

            que.push(e);
            emptySet.signal();
        } catch (InterruptedException ex) {
            throw new RuntimeException(ex);
        } finally {
            lock.unlock();
        }
    }

    public T take(long duration, TimeUnit unit) {
        long waitTime = unit.toNanos(duration);
        long endTime = System.nanoTime();

        lock.lock();
        try {
            while (que.isEmpty()) {
                if (waitTime <= 0) {
                    return null;
                }
                emptySet.awaitNanos(waitTime);
                waitTime = endTime - System.nanoTime();
            }

            T e = que.removeFirst();
            fullSet.signal();
            return e;
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } finally {
            lock.unlock();
        }
    }

    public void poll(T e) {
        lock.lock();
        try {
            while (que.size() == capacity) {
                fullSet.await();
            }

            que.push(e);
            emptySet.signal();
        } catch (InterruptedException ex) {
            throw new RuntimeException(ex);
        } finally {
            lock.unlock();
        }
    }

    public T take() {
        lock.lock();
        try {
            while (que.isEmpty()) {
                log.info("queue is empty");
                emptySet.await();
            }
            T e = que.removeFirst();
            fullSet.signal();
            return e;
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } finally {
            lock.unlock();
        }
    }

    public int size() {
        lock.lock();

        try {
            return que.size();
        } finally {
            lock.unlock();
        }
    }
}
```