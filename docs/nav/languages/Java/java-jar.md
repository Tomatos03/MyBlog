# Java Jar 包

**JAR（Java ARchive）包**是一种用于打包 Java 类、资源文件（如图片、配置文件等）和元数据（如清单文件）的压缩文件格式。它本质上是一个 ZIP 文件，但专门用于 Java 项目。

## Jar 生成 Jar 包

利用 JDK 自带的 `jar` 命令行工具可以将编译后的 `.class` 文件打包成 `.jar` 文件。

在项目根目录执行:

```bash
# 如果项目还没有编译, 可以使用下面的命令编译:
javac -d out $(find . -name "*.java")

# 将编译后的 .class 文件打包成 Jar 文件
jar cvf jar_name.jar -C out .
# ── ── ─────────── ───── ───
# │  │      │         │   │
# │  │      │         │   └─ 指定要打包的目录（此处为 out 目录，点号表示目录下所有内容）
# │  │      │         └───── -C 表示切换到指定目录后再打包
# │  │      └─────────────── 生成的 Jar 文件名（如 myapp.jar）
# │  └────────────────────── v 表示显示详细输出（verbose）
# └───────────────────────── c 表示创建新的 Jar 包（create）
```

> [!NOTE] 可以使用 jar 命令或 unzip 命令查看 Jar 包中的内容：
>
> ```bash
> jar tf jar_name.jar
> # 或者
> unzip -l jar_name.jar
> ```

## Maven 生成 Jar 包

在项目根目录（有 `pom.xml` 的地方）执行:

```bash
# maven项目默认打包格式是 jar
# 清理项目旧的输出, 重新编译打包成 Jar 文件:
mvn clean package
```