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

### HASH 相关命令

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
