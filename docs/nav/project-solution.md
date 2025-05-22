# 常见项目方案

## 全局唯一 ID 生成策略

全局唯一 ID（UUID）的生成是分布式系统中常见的需求，以下是几种常见的生成策略：

1. **UUID（通用唯一标识符）**
2. **数据库自增 ID**
3. **雪花算法（Snowflake）**
4. **哈希函数**
5. **时间戳+随机数**

### 基于 Redis 的分布式 ID 生成方案

以下是基于 Redis 实现的分布式 ID 生成方案的具体描述：

-   ID 生成规则：1 位符号位 + 31 位时间戳 + 32 位自增序列
-   redisKey 选择策略：`incr:prefixKey:yyyy-MM-dd`

#### 代码实现

```java
public class RedisWorker {
    // Redis 操作模板，用于与 Redis 交互
    private StringRedisTemplate stringRedisTemplate;

    // 自增序列的位数，32 位
    private final int BASE_COUNT = 32;

    // 时间戳的起始时间（2025 年 5 月 1 日 00:00:00）
    private final long BEGIN_TIMESTAMP = LocalDateTime.of(2025, 5, 1, 0, 0).toEpochSecond(ZoneOffset.UTC);

    // 构造函数，初始化 Redis 操作模板
    public RedisWorker(StringRedisTemplate stringRedisTemplate) {
        this.stringRedisTemplate = stringRedisTemplate;
    }

    /**
     * 生成下一个全局唯一 ID
     * @param prefixKey 前缀键，用于区分不同业务场景
     * @return 生成的全局唯一 ID
     */
    public long nextId(String prefixKey) {
        // 获取当前时间的时间戳（秒级别）
        // 减去一个时间戳，防止进行位运算的时候，因为数过大得到一个负数
        long timeStamp = LocalDateTime.now().toEpochSecond(ZoneOffset.UTC) - BEGIN_TIMESTAMP;

        // 获取当前日期，格式为 yyyy-MM-dd
        String nowDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        // 构造 Redis 键，格式为 incr:prefixKey:yyyy-MM-dd
        String key = String.format("incr:%s:%s", prefixKey, nowDate);

        // 使用 Redis 的自增操作获取当天的自增序列值
        // 当对应的key不存在的时候，为使用一个默认的值0
        Long count = stringRedisTemplate.opsForValue().increment(key);

        // 将时间戳左移 32 位，并与自增序列值进行按位或运算，生成唯一 ID
        return timeStamp << BASE_COUNT | count;
    }
}
```

#### 优缺点

优点：

1. **高性能**：Redis 的自增操作是原子性的，性能优异。
2. **分布式支持**：Redis 天然支持分布式部署，适合分布式系统。
3. **简单易用**：实现逻辑清晰，易于维护。

缺点：

1. **Redis 持久化**：确保 Redis 数据持久化，以防止数据丢失。
2. **时间戳精度**：时间戳的精度决定了 ID 的唯一性，需确保系统时间同步。
3. **自增值溢出**：根据业务需求，合理设置自增值的位数，避免溢出。

## 多线程问题

### 相关术语

#### 竟态条件

竟态条件（Race Condition）是指多个线程或进程在并发执行时，由于对共享资源的访问顺序不确定，导致程序的行为不可预测或产生错误的情况。

### 超卖问题

超卖问题是指在高并发场景下，多个线程同时操作共享资源（如库存）时，可能会导致库存被多次扣减，出现实际库存为负的情况。

#### 问题复刻

> [!TIP]
> 如果基于数据库插入的实现的复刻，需要将数据库的事务隔离级别降低

```java
public class InventoryManager {
    private int stock = 100; // 初始库存

    public void reduceStock(int quantity) {
        if (stock >= quantity) {
            System.out.println("库存扣减成功，扣减数量: " + quantity);
            stock -= quantity;
        } else {
            System.out.println("库存不足，扣减失败");
        }
    }

    public static void main(String[] args) {
        InventoryManager manager = new InventoryManager();

        // 模拟多个线程同时扣减库存
        Runnable task = () -> manager.reduceStock(1);

        Thread thread1 = new Thread(task);
        Thread thread2 = new Thread(task);
        Thread thread3 = new Thread(task);

        thread1.start();
        thread2.start();
        thread3.start();
    }
}
```

#### 解决方案

1. **数据库锁**

    - 使用数据库的行锁或表锁，确保同一时间只有一个线程能够操作库存。
    - 缺点：性能较低，容易造成数据库瓶颈。

2. **分布式锁**

    - 使用 Redis 或 Zookeeper 实现分布式锁，确保分布式环境下的线程安全。
    - 优点：性能较高，适合分布式系统。
    - 缺点：需要额外的锁管理逻辑。

3. **乐观锁**

    - 使用数据库的版本号机制（如 `version` 字段）实现乐观锁。
    - 优点：性能较高，适合读多写少的场景。
    - 缺点：需要处理更新失败的重试逻辑。

4. **消息队列**

    - 将扣减库存的操作放入消息队列，按顺序处理。
    - 优点：能够削峰填谷，适合高并发场景。
    - 缺点：增加了系统复杂性。

5. **悲观锁**

    - 在操作库存前，先获取锁，确保同一时间只有一个线程能够操作库存。
    - 优点：实现简单，能够有效避免并发问题。
    - 缺点：性能较低，可能导致线程阻塞。

#### 注意事项

1. **锁的粒度**：锁的粒度需要根据业务需求合理设计，避免锁冲突。
2. **锁的超时**：确保锁的超时时间足够长，避免锁提前释放导致并发问题。
3. **异常处理**：在锁的获取和释放过程中，需要处理异常情况，确保锁的正确释放。
