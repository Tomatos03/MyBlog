# redis

## redis 配置

Redis 的根目录中有一个配置文件`redis.conf`。可以通过 CONFIG 命令获取和设置所有 Redis 配置

**注：**redis 命令大小写不敏感

### 查询

```bash
# 查看所有配置
CONFIG GET *

# 查看特定配置
CONFIG GET <config-name>
```

### 修改配置

```bash
# 设置特定配置
CONFIG SET <config-name>
```

### 常用配置项

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

## redis 基本数据类型

Redis 支持多种数据类型，每种类型适用于不同的使用场景：

| 数据类型    | 描述                                               | 应用场景                 |
| ----------- | -------------------------------------------------- | ------------------------ |
| String      | 二进制安全的字符串，可以存储文本、整数或二进制数据 | 缓存、计数器、分布式锁   |
| Hash        | 键值对集合，适合存储对象                           | 用户信息、商品数据       |
| List        | 按插入顺序排序的字符串列表                         | 消息队列、最新动态       |
| Set         | 无序且唯一的字符串集合                             | 标签、共同好友           |
| Sorted Set  | 有序且唯一的字符串集合，按分数排序                 | 排行榜、优先级队列       |
| Bitmap      | 位图，操作字符串的单个位                           | 用户活跃统计、布隆过滤器 |
| HyperLogLog | 用于基数统计的概率数据结构                         | 统计网站 UV              |
| Geo         | 地理空间索引                                       | 位置应用、附近的人       |
| Stream      | 强化版的消息队列                                   | 消息队列、事件溯源       |

### String

字符串是 Redis 最基本的数据类型，可以存储文本、整数或二进制数据。

#### 基本操作

```bash
# 设置键值
SET key value

# 获取值
GET key

# 设置键值并指定过期时间(秒)
SETEX key seconds value

# 设置键值并指定过期时间(毫秒)
PSETEX key milliseconds value

# 当key不存在时设置值(防止覆盖)
SETNX key value

# 删除键
DEL key
```

#### 批量操作

```bash
# 批量设置键值
MSET key1 value1 key2 value2

# 批量获取值
MGET key1 key2

# 当所有key都不存在时批量设置(原子操作)
MSETNX key1 value1 key2 value2
```

#### 数值操作

```bash
# 将value解析为整数并递增1
INCR key

# 将value解析为整数并递减1
DECR key

# 将value解析为整数并增加指定值
INCRBY key increment

# 将value解析为整数并减少指定值
DECRBY key decrement

# 将value解析为浮点数并增加指定值
INCRBYFLOAT key increment
```

#### 其他常用操作

```bash
# 追加内容到字符串
APPEND key value

# 获取字符串长度
STRLEN key

# 获取子字符串
GETRANGE key start end

# 替换部分字符串
SETRANGE key offset value

# 检查并设置值(比较并替换)
GETSET key value
```
