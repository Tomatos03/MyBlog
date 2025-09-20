# Java 数据类型

## 基本数据类型

Java 有八种基本数据类型（primitive data types）, 分别为：

| 数据类型 | 最小值                  | 最大值                 | 占用字节数 |
| -------- | ----------------------- | ---------------------- | ---------- |
| byte     | -2<sup>7</sup>          | 2<sup>7</sup> - 1      | 1          |
| short    | -2<sup>15</sup>         | 2<sup>15</sup> - 1     | 2          |
| int      | -2<sup>31</sup>         | 2<sup>31</sup> - 1     | 4          |
| long     | -2<sup>63</sup>         | 2<sup>63</sup> - 1     | 8          |
| float    | -3.4 × 10<sup>38</sup>  | 3.4 × 10<sup>38</sup>  | 4          |
| double   | -1.7 × 10<sup>308</sup> | 1.7 × 10<sup>308</sup> | 8          |
| char     | 0                       | 2<sup>16</sup> - 1     | 2          |
| boolean  | false                   | true                   | 1 (理论上) |

## 基础数据初始值

在 Java 类加载阶段, **类的字段**会被赋予默认值. 不同数据类型默认值参考下表:

| 数据类型 | 默认值   |
| -------- | -------- |
| byte     | 0        |
| short    | 0        |
| int      | 0        |
| long     | 0L       |
| float    | 0.0f     |
| double   | 0.0d     |
| char     | '\u0000' |
| boolean  | false    |
| 引用类型 | null     |


> [!TIP]
> '\u0000'` 是 Unicode 的空字符. 常用于表示“无内容”或初始化状态