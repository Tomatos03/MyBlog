# redis

Redis（Remote Dictionary Server）是一个开源的高性能键值存储数据库，支持多种数据结构和功能，常用于缓存、消息队列和实时分析等场景。

## redis-cli

`redis-cli` 是 Redis 提供的命令行客户端工具，用于与 Redis 服务器交互。

### 登录 redis-server

#### 基本方法

默认情况下，使用以下命令连接到本地 Redis 服务器：

```bash
# 使用默认端口 6379、默认配置、默认 IP 地址
redis-cli

# 如果 Redis 服务器运行在其他主机或端口，可以通过指定 `-h` 和 `-p` 参数连接：

redis-cli -h <host> -p <port>

# 登录时指定密码
redis-cli -h <host> -p <port> -a <password>
```

#### 登录后验证用户密码

如果未在登录时提供密码，可以在登录后通过 `AUTH` 命令进行密码验证：

```bash
127.0.0.1:6379> AUTH <password>
OK
```

> [!NOTE]
> 确保密码安全，不要将密码直接暴露在脚本或日志中。

#### 测试连接

连接成功后，可以通过 `PING` 命令测试与 Redis 服务器的连接状态：

```bash
127.0.0.1:6379> PING
PONG # 返回 PONG，说明连接正常。
```

## redis-server

`redis-server` 是 Redis 的服务端程序，用于启动和管理 Redis 实例。

### 启动 Redis 服务端

#### 使用默认配置启动

```bash
redis-server
```

#### 指定配置文件启动

在启动 Redis 服务端时，可以通过指定配置文件来加载自定义配置：

```bash
redis-server /path/to/redis.conf
```

### 配置管理

Redis 的根目录中有一个配置文件 `redis.conf`，可以通过 `CONFIG` 命令获取和设置所有 Redis 配置。

#### 查询配置

```bash
# 查看所有配置
CONFIG GET *

# 查看特定配置
CONFIG GET <config-name>
```

#### 临时修改配置

```bash
# 设置特定配置
CONFIG SET <config-name>
```

> [!NOTE]
> 临时修改的配置在 Redis 重启后会失效，若需要永久生效，请修改配置文件。

#### 常用配置项

| 配置项             | 描述                 | 默认值         | 示例                           |
| ------------------ | -------------------- | -------------- | ------------------------------ |
| `port`             | Redis 服务端口       | 6379           | `port 6380`                    |
| `bind`             | 绑定的 IP 地址       | 127.0.0.1      | `bind 192.168.1.100`           |
| `maxmemory`        | 最大内存限制         | 不限制         | `maxmemory 2gb`                |
| `maxmemory-policy` | 内存策略             | noeviction     | `maxmemory-policy allkeys-lru` |
| `timeout`          | 客户端连接超时时间   | 0 (禁用)       | `timeout 300`                  |
| `requirepass`      | 设置访问密码         | 无             | `requirepass complexpassword`  |
| `appendonly`       | 是否开启 AOF 持久化  | no             | `appendonly yes`               |
| `appendfsync`      | AOF 同步策略         | everysec       | `appendfsync always`           |
| `save`             | RDB 持久化配置       | "900 1 300 10" | `save 60 1000`                 |
| `logfile`          | 日志文件路径         | "" (标准输出)  | `logfile /var/log/redis.log`   |
| `daemonize`        | 是否作为守护进程运行 | no             | `daemonize yes`                |

## redis 数据类型

| 数据类型              | 描述                                                   |
| --------------------- | ------------------------------------------------------ |
| 字符串 (String)       | 存储单个字符串值，如文本或数字。                       |
| 列表 (List)           | 有序字符串集合，允许重复，支持双向添加删除。           |
| 集合 (Set)            | 无序集合，元素唯一，支持交集、并集和差集操作。         |
| 有序集合 (Sorted Set) | 每个元素关联一个分数，可根据分数排序，用于排名等场景。 |
| 哈希 (Hash)           | 存储键值对，适合存储对象属性。                         |
| 位图 (Bitmap)         | 使用位操作存储数据，适合大规模状态标记。               |
| 超日志 (HyperLogLog)  | 用于基数统计，占用内存固定，但存在一定统计误差。       |
| 流 (Stream)           | 日志式数据结构，适用于消息队列和事件流处理。           |

## redis 命令

更详细的命令列表和用法可以参考 [Redis 官方文档](https://redis.io/docs/commands/)。

### 通用命令

#### help 命令

Redis 提供了 `HELP` 命令，用于查看特定命令的帮助信息。通过该命令，可以快速了解某个 Redis 命令的用途和参数。

```bash
# 使用 HELP 命令查看特定命令的帮助信息
127.0.0.1:6379> HELP <command>

# 示例：查看 SET 命令的帮助信息
127.0.0.1:6379> HELP SET
# 返回结果
1) "SET key value [EX seconds|PX milliseconds|EXAT timestamp|PXAT milliseconds-timestamp|KEEPTTL] [NX|XX] [GET]"
2) "summary: Set the string value of a key"
3) "since: 1.0.0"
4) "group: string"
```

> [!NOTE] > `HELP` 命令返回的信息包括命令的语法、功能摘要、引入版本以及所属的命令组。

### String 相关命令

#### 设置键值对

使用 `SET` 命令可以设置一个键值对：

```bash
# 基本用法
127.0.0.1:6379> SET key value

# 可选参数示例
# 设置键的过期时间为 10 秒
127.0.0.1:6379> SET mykey "Hello" EX 10

# 设置键的过期时间为 10000 毫秒
127.0.0.1:6379> SET mykey "Hello" PX 10000

# 仅当键不存在时设置
127.0.0.1:6379> SET mykey "Hello" NX
# 或者
127.0.0.1:6379> SETNX mykey "Hello"


# 仅当键已存在时设置
127.0.0.1:6379> SET mykey "Hello" XX
```

#### 获取键值

使用 `GET` 命令可以获取键的值：

```bash
127.0.0.1:6379> GET key
```

如果键不存在，返回 `nil`。

#### 删除键

使用 `DEL` 命令可以删除一个或多个键：

```bash
127.0.0.1:6379> DEL key1 key2
```

#### 检查键是否存在

使用 `EXISTS` 命令检查键是否存在：

```bash
127.0.0.1:6379> EXISTS key
```

返回值：

-   `1` 表示键存在。
-   `0` 表示键不存在。

#### 增加或减少数值

对于数值类型的键，可以使用 `INCR` 和 `DECR` 命令进行自增或自减：

```bash
127.0.0.1:6379> SET counter 10
127.0.0.1:6379> INCR counter
127.0.0.1:6379> DECR counter
```

#### 批量操作

使用 `MSET` 和 `MGET` 命令可以批量设置和获取键值：

```bash
127.0.0.1:6379> MSET key1 value1 key2 value2
OK
127.0.0.1:6379> MGET key1 key2
1) "value1"
2) "value2"
```

### Hash 相关命令

#### 设置哈希字段

使用 `HSET` 命令可以设置哈希表中的字段和值：

```bash
# 可以理解为
# HSET <hash_table_name> <key> <value>
127.0.0.1:6379> HSET myhash field1 value1
(integer) 1
127.0.0.1:6379> HSET myhash field2 value2
(integer) 1
```

#### 获取哈希字段值

使用 `HGET` 命令可以获取哈希表中特定字段的值：

```bash
127.0.0.1:6379> HGET myhash field1
"value1"
```

#### 获取所有字段和值

使用 `HGETALL` 命令可以获取哈希表中的所有字段和值：

```bash
127.0.0.1:6379> HGETALL myhash
1) "field1"
2) "value1"
3) "field2"
4) "value2"
```

#### 删除哈希字段

使用 `HDEL` 命令可以删除哈希表中的一个或多个字段：

```bash
127.0.0.1:6379> HDEL myhash field1
(integer) 1

#### 删除多个哈希字段
127.0.0.1:6379> HDEL myhash field1 field2
(integer) 2
```

#### 检查字段是否存在

使用 `HEXISTS` 命令检查哈希表中是否存在某个字段：

```bash
127.0.0.1:6379> HEXISTS myhash field1
(integer) 0
127.0.0.1:6379> HEXISTS myhash field2
(integer) 1
```

#### 获取字段数量

使用 `HLEN` 命令可以获取哈希表中字段的数量：

```bash
127.0.0.1:6379> HLEN myhash
(integer) 1
```

#### 获取所有字段名或值

使用 `HKEYS` 和 `HVALS` 命令可以分别获取哈希表中的所有字段名或值：

```bash
127.0.0.1:6379> HKEYS myhash
1) "field2"
127.0.0.1:6379> HVALS myhash
1) "value2"
```

#### 批量处理操作

使用 `HMSET` 命令可以一次设置多个字段和值，同时可以使用 `HMGET` 命令一次获取多个字段的值：

```bash
# 批量设置字段和值
127.0.0.1:6379> HMSET myhash field1 value1 field2 value2
OK

# 批量获取字段的值
127.0.0.1:6379> HMGET myhash field1 field2
1) "value1"
2) "value2"
```

### List 相关命令

redis 之中的 List 是一个双向链表，支持从两端添加和删除元素。

#### 添加元素到列表

使用 `LPUSH` 和 `RPUSH` 命令可以分别从列表的左侧或右侧添加元素：

```bash
# 从左侧添加元素
127.0.0.1:6379> LPUSH mylist "value1"
(integer) 1
127.0.0.1:6379> LPUSH mylist "value2"
(integer) 2

# 从右侧添加元素
127.0.0.1:6379> RPUSH mylist "value3"
(integer) 3
```

#### 获取列表中的元素

使用 `LRANGE` 命令可以获取列表中指定范围的元素：

```bash
# 获取列表中所有元素
127.0.0.1:6379> LRANGE mylist 0 -1
1) "value2"
2) "value1"
3) "value3"
```

#### 删除列表中的元素

使用 `LPOP` 和 `RPOP` 命令可以分别从列表的左侧或右侧删除元素：

```bash

# 命令结构
LPOP list_name
RPOP list_name

# 从左侧删除元素
127.0.0.1:6379> LPOP mylist
"value2"
# 从右侧删除元素
127.0.0.1:6379> RPOP mylist
"value3"

# 命令结构
BLPOP list_name [key ...] timeout
BRPOP list_name [key ...] timeout

# 使用 `BLPOP` 和 `BRPOP` 命令可以阻塞地从列表的左侧或右侧删除元素：

# 从左侧阻塞删除元素
127.0.0.1:6379> BLPOP mylist 5
1) "mylist"
2) "value2"

# 从右侧阻塞删除元素
127.0.0.1:6379> BRPOP mylist 5
1) "mylist"
2) "value3"
```

> [!NOTE] > `BLPOP` 和 `BRPOP` 命令会在列表为空时阻塞，直到超时（以秒为单位）或有新元素插入列表。

#### 获取列表长度

使用 `LLEN` 命令可以获取列表的长度：

```bash
127.0.0.1:6379> LLEN mylist
(integer) 1
```

#### 插入元素到指定位置

使用 `LINSERT` 命令可以在列表中指定元素的前或后插入新元素：

```bash
# 在指定元素前插入
127.0.0.1:6379> LINSERT mylist BEFORE "value1" "newvalue"
(integer) 2

# 在指定元素后插入
127.0.0.1:6379> LINSERT mylist AFTER "value1" "anothernewvalue"
(integer) 3
```

#### 设置列表中指定索引的值

使用 `LSET` 命令可以设置列表中指定索引的值：

```bash
127.0.0.1:6379> LSET mylist 0 "updatedvalue"
OK
```

#### 删除列表中指定值的元素

使用 `LREM` 命令可以删除列表中指定值的元素：

```bash
# 删除列表中前 N 个匹配的元素
127.0.0.1:6379> LREM mylist 1 "value1"
(integer) 1
```

#### 修剪列表

使用 `LTRIM` 命令可以修剪列表，只保留指定范围内的元素：

```bash
127.0.0.1:6379> LTRIM mylist 0 1
OK
```

#### 获取列表中指定范围的所有元素

使用 `LRANGE` 命令可以获取列表中指定范围的所有元素：

```bash
# 获取列表中所有元素
127.0.0.1:6379> LRANGE mylist 0 -1
1) "value1"
2) "value2"
3) "value3"
```

> [!NOTE]
> 索引范围从 0 开始，`-1` 表示最后一个元素。

### Set 相关命令

redis 中的 Set 是一个无序集合，支持添加、删除和查询元素。

#### 添加元素到集合

```bash
127.0.0.1:6379> SADD myset "value1" "value2"
(integer) 2
```

#### 获取集合中的所有元素

使用 `SMEMBERS` 命令可以获取集合中的所有元素：
使用 `SADD` 命令可以向集合中添加一个或多个元素：#

```bash
127.0.0.1:6379> SMEMBERS myset
1) "value1"
```

#### 检查元素是否存在于集合中

使用 `SISMEMBER` 命令可以检查某个元素是否存在于集合中：

```bash
127.0.0.1:6379> SISMEMBER myset "value1"
(integer) 1
127.0.0.1:6379> SISMEMBER myset "value3"
(integer) 0
```

#### 删除集合中的元素

使用 `SREM` 命令可以从集合中删除一个或多个元素：

```bash
127.0.0.1:6379> SREM myset "value1"
(integer) 1
```

#### 获取集合的大小

使用 `SCARD` 命令可以获取集合的大小：

```bash
127.0.0.1:6379> SCARD myset
(integer) 1
```

#### 随机获取集合中的元素

使用 `SRANDMEMBER` 命令可以随机获取集合中的一个或多个元素：

```bash
# 获取一个随机元素
127.0.0.1:6379> SRANDMEMBER myset
"value2"

# 获取多个随机元素
127.0.0.1:6379> SRANDMEMBER myset 2
1) "value2"
```

#### 随机移除集合中的元素

使用 `SPOP` 命令可以随机移除集合中的一个或多个元素：

```bash
# 移除一个随机元素
127.0.0.1:6379> SPOP myset
"value2"
```

#### 集合运算

Redis 提供了集合的交集、并集和差集操作：

-   **交集**：使用 `SINTER` 命令获取多个集合的交集。
-   **并集**：使用 `SUNION` 命令获取多个集合的并集。
-   **差集**：使用 `SDIFF` 命令获取一个集合与其他集合的差集。

```bash
# 示例集合
127.0.0.1:6379> SADD set1 "a" "b" "c"
(integer) 3
127.0.0.1:6379> SADD set2 "b" "c" "d"
(integer) 3

# 获取交集
127.0.0.1:6379> SINTER set1 set2
1) "b"
2) "c"

# 获取并集
127.0.0.1:6379> SUNION set1 set2
1) "a"
2) "b"
3) "c"
4) "d"

# 获取差集
127.0.0.1:6379> SDIFF set1 set2
1) "a"
```

#### 将元素从一个集合移动到另一个集合

使用 `SMOVE` 命令可以将元素从一个集合移动到另一个集合：

```bash
127.0.0.1:6379> SMOVE set1 set2 "a"
(integer) 1
```

### SotedSet 相关命令

redis 中的 Sorted Set 是一个有序集合，每个元素都有一个分数（score），根据分数进行排序。底层使用跳表（Skip List）实现。

#### 添加元素到有序集合

使用 `ZADD` 命令可以向有序集合中添加一个或多个元素，并指定分数：

```bash
# 结构
ZADD <sorted_set_name> <score> <value>
127.0.0.1:6379> ZADD myzset 1 "value1" 2 "value2"
(integer) 2
```

#### 获取有序集合中的所有元素

使用 `ZRANGE` 命令可以按分数从低到高获取有序集合中的元素：

```bash
# 结构
ZRANGE <sorted_set_name> <start_index> <end_index>
127.0.0.1:6379> ZRANGE myzset 0 -1
1) "value1"
2) "value2"
```

#### 获取有序集合中的元素和分数

使用 `ZRANGE` 命令并带上 `WITHSCORES` 参数可以获取元素及其分数：

```bash
127.0.0.1:6379> ZRANGE myzset 0 -1 WITHSCORES
1) "value1"
2) "1"
3) "value2"
4) "2"
```

#### 删除有序集合中的元素

使用 `ZREM` 命令可以从有序集合中删除一个或多个元素：

```bash
127.0.0.1:6379> ZREM myzset "value1"
(integer) 1
```

#### 获取有序集合的大小

使用 `ZCARD` 命令可以获取有序集合的大小：

```bash
127.0.0.1:6379> ZCARD myzset
(integer) 1
```

#### 获取指定分数范围内的元素

使用 `ZRANGEBYSCORE` 命令可以获取指定分数范围内的元素：

```bash
127.0.0.1:6379> ZRANGEBYSCORE myzset 1 2
1) "value1"
2) "value2"
```

#### 获取元素的分数

使用 `ZSCORE` 命令可以获取指定元素的分数：

```bash
127.0.0.1:6379> ZSCORE myzset "value2"
"2"
```

#### 增加元素的分数

使用 `ZINCRBY` 命令可以增加指定元素的分数：

```bash
127.0.0.1:6379> ZINCRBY myzset 1 "value2"
"3"
```

#### 获取指定排名范围内的元素

使用 `ZRANGE` 和 `ZREVRANGE` 命令可以获取指定排名范围内的元素：

```bash
# 按排名从低到高
127.0.0.1:6379> ZRANGE myzset 0 1
1) "value1"

# 按排名从高到低
127.0.0.1:6379> ZREVRANGE myzset 0 1
1) "value2"
```

#### 删除指定分数范围内的元素

使用 `ZREMRANGEBYSCORE` 命令可以删除指定分数范围内的元素：

```bash
127.0.0.1:6379> ZREMRANGEBYSCORE myzset 1 2
```

#### 获取元素的排名

使用 `ZRANK` 和 `ZREVRANK` 命令可以获取指定元素的排名：

```bash
# 结构
ZRANK <sorted_set_name> <value>
# 按分数从低到高，排名从 0 开始
127.0.0.1:6379> ZRANK myzset "value2"

# 这个命令相当于先倒序原有表，在获取指定值
127.0.0.1:6379> ZREVRANK myzset "value2"

```

#### 获取指定分数范围内的元素数量

使用 `ZCOUNT` 命令可以获取指定分数范围内的元素数量：

```bash
ZCOUNT <sorted_set_name> <min_score> <max_score>
127.0.0.1:6379> ZCOUNT myzset 1 2

```

## Redis 集成

### Redis 集成 Java

在 Java 中，可以使用多种客户端库与 Redis 进行交互，其中最常用的是 Jedis 和 Lettuce。

#### Jedis

Jedis 是一个简单易用的 Redis Java 客户端，支持大部分 Redis 功能。

> [!NOTE]
> Jedis 是一个同步的 Redis 客户端，api 方法名称与 redis 命令一致

##### 添加依赖

在 Maven 项目中添加 Jedis 的依赖：

```xml
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>[latest-version]</version>
</dependency>
```

##### 基本用法

以下是使用 Jedis 连接 Redis 并执行基本操作的示例：

```java
import redis.clients.jedis.Jedis;

public class RedisExample {
    public static void main(String[] args) {
        // Step 1: 创建 Jedis 实例，连接到 Redis 服务器
        // 参数说明：
        // - "localhost"：Redis 服务器的主机名或 IP 地址
        // - 6379：Redis 服务器的端口号
        try (Jedis jedis = new Jedis("localhost", 6379)) {

            // Step 2: 设置键值对
            // 使用 set 方法将键 "key" 的值设置为 "value"
            jedis.set("key", "value");
            System.out.println("Set key: " + jedis.get("key")); // 输出键的值

            // Step 3: 检查键是否存在
            // 使用 exists 方法检查键 "key" 是否存在，返回 true 或 false
            System.out.println("Key exists: " + jedis.exists("key"));

            // Step 4: 删除键
            // 使用 del 方法删除键 "key"
            jedis.del("key");
            System.out.println("Key deleted. Exists: " + jedis.exists("key")); // 再次检查键是否存在
        } catch (Exception e) {
            // 捕获并打印异常
            e.printStackTrace();
        }
    }
}
```

##### 使用连接池

为了提高性能，可以使用 Jedis 提供的连接池：

```java
public class JedisConnectionFactory {
    // 定义一个静态的 Jedis 连接池
    private static final JedisPool jedisPool;

    static {
        // 创建连接池配置对象
        JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();

        // 设置最大连接数，表示连接池中最多可以同时存在的连接数量
        jedisPoolConfig.setMaxTotal(8);

        // 设置最大空闲连接数，表示连接池中最多可以保持空闲状态的连接数量
        jedisPoolConfig.setMaxIdle(8);

        // 设置最小空闲连接数，表示连接池中最少需要保持空闲状态的连接数量
        jedisPoolConfig.setMinIdle(0);

        // 设置最大等待时间，表示当连接池中没有可用连接时，客户端等待连接的最长时间（单位：毫秒）
        jedisPoolConfig.setMaxWaitMillis(1000);

        // 初始化 Jedis 连接池，指定 Redis 服务器地址和端口
        jedisPool = new JedisPool(jedisPoolConfig, "127.0.0.1", 6379);
    }

    // 获取 Jedis 实例的方法，从连接池中获取一个可用的连接
    public static Jedis getJedis() {
        return jedisPool.getResource();
    }
}
```

## 内存淘汰机制

Redis 提供了多种内存淘汰策略，用于在内存达到最大限制时决定如何处理新数据的写入请求。

| 策略名称          | 描述                                             |
| ----------------- | ------------------------------------------------ |
| `noeviction`      | 不淘汰任何数据，新写入操作会返回错误。           |
| `allkeys-lru`     | 淘汰最少使用的键，适用于所有键。                 |
| `volatile-lru`    | 淘汰最少使用的键，仅限于设置了过期时间的键。     |
| `allkeys-random`  | 随机淘汰键，适用于所有键。                       |
| `volatile-random` | 随机淘汰键，仅限于设置了过期时间的键。           |
| `volatile-ttl`    | 淘汰即将过期的键，仅限于设置了过期时间的键。     |
| `volatile-lfu`    | 淘汰最少使用频率的键，仅限于设置了过期时间的键。 |
| `allkeys-lfu`     | 淘汰最少使用频率的键，适用于所有键。             |

> [!NOTE]
> 可以通过配置文件中的 `maxmemory-policy` 参数设置内存淘汰策略，例如：`maxmemory-policy allkeys-lru`。

### 示例配置

在 `redis.conf` 文件中设置最大内存和淘汰策略：

```conf
# 设置最大内存为 2GB
maxmemory 2gb

# 设置淘汰策略为 allkeys-lru
maxmemory-policy allkeys-lru
```

> [!TIP]
> 使用 `INFO memory` 命令可以查看当前内存使用情况。

## 缓存穿透

缓存穿透是指查询一个在缓存和数据库中都不存在的数据，由于缓存未命中，系统会直接访问数据库。当大量此类请求发生时，会对数据库造成很大的压力，甚至可能导致数据库崩溃。

### 解决方法

#### 使用布隆过滤器

布隆过滤器是一种高效的概率数据结构，用于快速判断某个元素是否可能存在于集合中。在缓存穿透场景中，可以在缓存层增加布隆过滤器，用于拦截不存在的数据请求。如果布隆过滤器判断数据不存在，则直接返回空结果，避免访问数据库，从而减少数据库的压力。

#### 缓存空值

对于查询结果为空的数据，也可以将其缓存起来，并设置较短的过期时间。这样可以防止频繁访问数据库，尤其是针对一些恶意请求或高频查询不存在的数据的情况。缓存空值的策略可以有效减少数据库的查询次数，但需要注意合理设置过期时间，以免占用过多缓存空间。

##### 示例代码

```java
    public Result queryWithPassThrough(Long id) {
        // 尝试从 Redis 中获取缓存数据
        String key = RedisConstants.CACHE_SHOP_KEY + id;
        String shopJson = stringRedisTemplate.opsForValue()
                                      .get(key);

        // 如果缓存中存在数据，则直接返回
        if (!StrUtil.isBlank(shopJson)) {
            return JSONUtil.toBean(shopJson, Shop.class);
        } else if (shopJson != null) {
            return null;
        }

        // 如果缓存中不存在数据，则查询数据库
        Shop shop = getById(id);
        if (Objects.isNull(shop)) {
            stringRedisTemplate.opsForValue().set(
                    RedisConstants.CACHE_SHOP_KEY + id,
                    "",
                    RedisConstants.CACHE_NULL_TTL,
                    TimeUnit.MINUTES
            );
            return null;
        }

        // 将查询到的数据存入缓存
        stringRedisTemplate.opsForValue().set(
                key,
                JSONUtil.toJsonStr(shop),
                RedisConstants.CACHE_SHOP_TTL,
                TimeUnit.SECONDS
        );
        return shop;
    }

```

##### 优缺点

**优点**

1. **减少数据库压力**：缓存空值可以有效避免频繁查询数据库，尤其是针对不存在的数据请求。
2. **防止恶意请求**：能够拦截高频查询不存在数据的恶意请求，保护数据库免受攻击。
3. **提升系统性能**：通过减少数据库访问次数，提升系统整体的响应速度和性能。
4. **简单易用**：实现相对简单，只需在缓存中存储空值并设置合理的过期时间。

**缺点**

1. **内存占用**：缓存空值会占用一定的内存资源，可能影响其他数据的缓存效果。
2. **过期时间管理**：需要合理设置空值的过期时间，避免占用过多缓存空间或频繁失效。
3. **潜在误判**：如果缓存空值的逻辑不完善，可能导致误判，影响正常数据的查询。
4. **适用场景有限**：对于高频更新的数据场景，缓存空值的效果可能不明显。

#### 参数校验

在应用层对请求参数进行校验，可以过滤掉明显无效的请求。例如，对于格式错误或超出范围的参数，可以直接拒绝处理，而无需查询缓存或数据库。这种方法可以在请求进入系统之前就拦截无效请求，从而减少系统的负载。

> [!NOTE]
> 合理设计缓存策略和过滤机制，可以有效缓解缓存雪崩问题对系统的影响。减少缓存穿透

## 缓存雪崩

缓存雪崩是指在某一时刻，大量缓存同时失效，导致所有请求直接访问数据库，从而对数据库造成巨大压力，甚至可能导致系统崩溃。

### 解决方法

#### 缓存过期时间分散

为不同的缓存设置随机的过期时间，避免大量缓存同时失效。

##### 示例代码

```java
import java.util.Random;
import java.util.concurrent.TimeUnit;

public class CacheService {

    private static final Random RANDOM = new Random();

    public void setCacheWithRandomTTL(String key, String value, int baseTTL) {
        // 在基础过期时间上增加一个随机值，避免缓存同时失效
        int randomTTL = baseTTL + RANDOM.nextInt(300); // 随机增加 0 到 300 秒
        stringRedisTemplate.opsForValue().set(key, value, randomTTL, TimeUnit.SECONDS);
    }
}
```

##### 优缺点

**优点**:

1. **简单易用**：实现简单，只需在设置缓存时增加随机过期时间。
2. **减少缓存同时失效的风险**：通过分散过期时间，避免大量缓存同时失效导致的数据库压力。
3. **适用广泛**：适用于大多数缓存场景，无需额外的复杂逻辑。

**缺点**:

1. **缓存管理复杂性增加**：随机过期时间可能导致缓存数据的生命周期不一致，增加管理难度。
2. **无法完全避免雪崩**：对于极端高并发场景，仍可能存在部分缓存失效导致的数据库压力。
3. **数据一致性问题**：随机过期时间可能导致部分数据更新延迟，影响一致性要求较高的场景。

#### 缓存预热

在系统启动或流量高峰到来之前，提前将热点数据加载到缓存中，确保缓存命中率较高，从而减少对数据库的直接访问。

#### 缓存降级

在缓存失效或不可用时，可以通过降级策略返回默认值或部分数据，避免直接访问数据库。例如，可以返回静态页面或提示用户稍后重试。

#### 多级缓存

通过引入多级缓存（如本地缓存和分布式缓存），在缓存失效时优先从本地缓存中获取数据，减少对数据库的压力。

#### 限流与熔断

在缓存失效时，通过限流和熔断机制控制请求的数量，避免数据库因过载而崩溃。例如，可以限制每秒访问数据库的请求数量，并对超出限制的请求返回错误或延迟处理。

> [!NOTE]
> 合理设计缓存策略和失效机制，可以有效缓解缓存雪崩问题对系统的影响，确保系统的稳定性和高可用性。

## 缓存击穿

缓存击穿是指某些热点数据在缓存中失效后，大量并发请求直接访问数据库，导致数据库压力骤增，甚至可能引发系统性能问题。

### 解决方法

#### 设置热点数据永不过期

对于热点数据，可以设置缓存永不过期，确保其始终存在于缓存中，从而避免缓存失效带来的问题。

#### 逻辑过期

逻辑过期是一种通过在缓存中存储数据的同时记录其过期时间的方式来解决缓存击穿的问题。即使数据在逻辑上已经过期，仍然可以暂时返回旧数据，同时异步更新缓存。

> [!NOTE]
> 逻辑过期的方案牺牲了数据的一致性，但可以有效避免缓存击穿的问题。

##### 示例代码

> [!TIP]
> 逻辑过期的方案会事先将数据存储在 redis 中，并设置一个过期时间

```java
    public boolean tryLock(Long id) {
        String lockKey = RedisConstants.LOCK_SHOP_KEY + id;
        Boolean ok = stringRedisTemplate.opsForValue().setIfAbsent(
                lockKey,
                id.toString(),
                RedisConstants.LOCK_SHOP_TTL,
                TimeUnit.SECONDS
        );
        return BooleanUtil.isTrue(ok);
    }

    public void unlock(Long id) {
        String lockKey = RedisConstants.LOCK_SHOP_KEY + id;
        stringRedisTemplate.delete(lockKey);
    }

    public Shop queryWithLogicalExpire(Long id) {
        // 构建缓存的键
        String shopKey = RedisConstants.CACHE_SHOP_KEY + id;

        // 从 Redis 中获取缓存数据
        String shopJson = stringRedisTemplate.opsForValue().get(shopKey);

        // 如果缓存中没有数据，直接返回 null
        if (StringUtils.isBlank(shopJson)) {
            return null;
        }

        // 将缓存中的 JSON 数据转换为 RedisData 对象
        RedisData redisData = JSONUtil.toBean(shopJson, RedisData.class);

        // 从 RedisData 中提取实际数据并转换为 JSON 对象
        JSONObject shop = JSONUtil.toBean((JSONObject) redisData.getData(), JSONObject.class);

        // 获取缓存的逻辑过期时间
        LocalDateTime expireTime = redisData.getExpireTime();

        // 如果当前时间在逻辑过期时间之前，直接返回缓存中的数据
        if (expireTime.isAfter(LocalDateTime.now())) {
            return JSONUtil.toBean(shop, Shop.class);
        }

        // 尝试获取互斥锁，避免多个线程同时重建缓存
        if (tryLock(id)) {
            // 双重检测缓存，防止其他线程已经更新了缓存
            shopJson = stringRedisTemplate.opsForValue().get(shopKey);
            if (StringUtils.isNotBlank(shopJson)) {
                redisData = JSONUtil.toBean(shopJson, RedisData.class);
                shop = JSONUtil.toBean((JSONObject) redisData.getData(), JSONObject.class);
                expireTime = redisData.getExpireTime();
                if (expireTime.isAfter(LocalDateTime.now())) {
                    return JSONUtil.toBean(shop, Shop.class);
                }
            }

            // 提交缓存重建任务到线程池
            CACHE_REBUILD_EXECUTOR.submit(() -> {
                try {
                    // 重建缓存数据，并设置新的逻辑过期时间
                    rebuildShopCache(id, 30L);
                } catch (RuntimeException | InterruptedException e) {
                    // 捕获异常并重新抛出
                    throw new RuntimeException("<UNK>", e);
                } finally {
                    // 释放互斥锁
                    unlock(id);
                }
            });
        }

        // 返回缓存中的旧数据（即使逻辑上已过期）
        return JSONUtil.toBean(shop, Shop.class);
    }
```

##### 优缺点

**优点:**

1. **性能提升**: 逻辑过期避免了直接删除数据的操作，减少了数据库的写操作频率，从而提升了系统性能。
2. **数据可恢复性**: 数据并未真正删除，保留了历史记录，方便后续数据恢复或审计。
3. **实现简单**: 逻辑过期通常通过添加一个标志位或时间戳字段实现，逻辑简单，易于维护。

**缺点:**

1. **数据膨胀**: 数据库中会保留大量过期数据，可能导致存储空间的浪费。
2. **查询复杂性**: 查询时需要额外的条件过滤逻辑，可能增加查询复杂度和性能开销。
3. **维护成本**: 需要定期清理过期数据，否则可能影响系统整体性能。

#### 使用互斥锁

在缓存失效时，通过加锁机制限制只有一个线程能够访问数据库并更新缓存，其余线程等待缓存更新完成后再读取数据。例如，可以使用分布式锁（如 Redis 的 `SETNX`）实现互斥访问。

##### 示例代码

```java
    public boolean tryLock(Long id) {
        String lockKey = RedisConstants.LOCK_SHOP_KEY + id;
        Boolean ok = stringRedisTemplate.opsForValue().setIfAbsent(
                lockKey,
                id.toString(),
                RedisConstants.LOCK_SHOP_TTL,
                TimeUnit.SECONDS
        );
        return BooleanUtil.isTrue(ok);
    }

    public void unlock(Long id) {
        String lockKey = RedisConstants.LOCK_SHOP_KEY + id;
        stringRedisTemplate.delete(lockKey);
    }

    public Shop queryWithMutex(Long id) {
        // 构建缓存的键
        String shopKey = RedisConstants.CACHE_SHOP_KEY + id;

        // 从 Redis 中获取缓存数据
        String shopJson = stringRedisTemplate.opsForValue().get(shopKey);

        // 如果缓存中存在数据，直接返回
        if (StringUtils.isNotBlank(shopJson)) {
            return JSONUtil.toBean(shopJson, Shop.class);
        } else if (!Objects.isNull(shopJson)) {
            // 如果缓存中存在空值（防止缓存穿透），返回 null
            return null;
        }

        Shop shop = null;
        try {
            // 尝试获取互斥锁，未获取到则等待一段时间后重试
            if (!tryLock(id)) {
                Thread.sleep(50);
                return queryWithMutex(id); // 递归调用，重试获取数据
            }

            // 再次检查缓存，防止其他线程已更新缓存
            shopJson = stringRedisTemplate.opsForValue().get(shopKey);
            if (StringUtils.isNotBlank(shopJson)) {
                return JSONUtil.toBean(shopJson, Shop.class);
            } else if (!Objects.isNull(shopJson)) {
                // 如果缓存中存在空值（防止缓存穿透），返回 null
                return null;
            }

            // 缓存未命中，从数据库中查询数据
            shop = getById(id);
            if (Objects.isNull(shop)) {
                // 如果数据库中也不存在，缓存空值以防止缓存穿透
                stringRedisTemplate.opsForValue().set(
                        shopKey,
                        "",
                        RedisConstants.CACHE_NULL_TTL,
                        TimeUnit.MINUTES
                );
                return null;
            }

            // 将查询到的数据写入缓存
            stringRedisTemplate.opsForValue().set(
                    shopKey,
                    JSONUtil.toJsonStr(shop),
                    RedisConstants.CACHE_SHOP_TTL,
                    TimeUnit.MINUTES
            );
        } catch (InterruptedException e) {
            // 捕获线程中断异常
            e.printStackTrace();
        } finally {
            // 释放互斥锁
            unlock(id);
        }
        return shop; // 返回查询结果
    }
```

##### 优缺点

**优点**:

1. **有效防止缓存击穿**：通过互斥锁限制并发访问，确保只有一个线程能够更新缓存，避免大量请求同时访问数据库。
2. **保证数据一致性**：在缓存更新期间，其余线程等待缓存更新完成后再读取数据，确保返回的数据是最新的。
3. **适用高并发场景**：在高并发场景下，互斥锁可以有效减少对数据库的压力，保护数据库的稳定性。

**缺点**:

1. **增加响应延迟**：未获取到锁的线程需要等待，可能导致请求响应时间增加。
2. **潜在死锁风险**：如果锁未正确释放，可能导致死锁问题，影响系统的正常运行。
3. **实现复杂性较高**：需要额外的逻辑处理锁的获取和释放，增加了代码的复杂性。
4. **性能瓶颈**：在极高并发场景下，锁的竞争可能成为性能瓶颈，影响系统吞吐量。

> [!TIP]
> 在使用互斥锁时，应合理设置锁的超时时间，并确保锁能够正确释放，以避免死锁问题。

> [!NOTE]
> 通过互斥锁限制只有一个线程能够访问数据库并更新缓存，其余线程等待缓存更新完成后再读取数据，可以有效避免缓存击穿问题。

#### 请求分流

通过对请求进行分流，将高并发请求分散到多个缓存节点或服务实例上，减少单点压力。例如，可以使用一致性哈希算法将请求分配到不同的缓存节点。

#### 限流与熔断

在缓存失效时，通过限流和熔断机制控制访问数据库的请求数量，避免数据库因过载而崩溃。例如，可以限制每秒访问数据库的请求数量，并对超出限制的请求返回错误或延迟处理。

> [!NOTE]
> 合理设计缓存更新策略和并发控制机制，可以有效缓解缓存击穿问题对系统的影响，确保系统的稳定性和高可用性。
