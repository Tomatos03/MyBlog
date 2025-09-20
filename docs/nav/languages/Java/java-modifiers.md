# Java 修饰符

Java 提供了多种修饰符，用于控制类、方法、变量等的访问权限和行为。修饰符分为两大类：访问控制修饰符和非访问控制修饰符。

## 访问控制修饰符

| 修饰符           | 类内部 | 同一包 | 子类 | 其他包 |
| ---------------- | ------ | ------ | ---- | ------ |
| `public`         | 是     | 是     | 是   | 是     |
| `protected`      | 是     | 是     | 是   | 否     |
| 默认（无修饰符） | 是     | 是     | 否   | 否     |
| `private`        | 是     | 否     | 否   | 否     |

-   **`public`**：对所有类可见。
-   **`protected`**：对同一包和子类可见。
-   **默认（无修饰符）**：仅对同一包内的类可见。
-   **`private`**：仅对类内部可见。

## 非访问控制修饰符

### 类修饰符

-   **`abstract`**：声明一个抽象类，不能直接实例化。
-   **`final`**：声明一个类不能被继承。
-   **`strictfp`**：限制浮点运算的精度和舍入行为。

### 方法修饰符

-   **`abstract`**：声明一个抽象方法，必须在子类中实现。
-   **`final`**：方法不能被子类重写。
-   **`static`**：方法属于类而不是实例。
-   **`synchronized`**：方法在多线程环境下同步执行。
-   **`native`**：方法由本地代码实现（非 Java 实现）。
-   **`strictfp`**：限制浮点运算的精度和舍入行为。

#### synchronized

`synchronized` 确保多个线程在并发访问共享资源时，能够以互斥的方式执行(**同一个时刻只能有一个线程访问到资源**)，从而避免数据竞争和不一致的问题。

##### 线程竞争

下面的示例会出现线程竞争问题，导致预期结果不一定是 0

> [!NOTE]
> 一个线程刚刚修改了变量的值，但还没有写回内存，另一个线程就读取了旧值并进行了修改,最终，后一个线程的修改会覆盖前一个线程的修改，导致最后结果的出错。

```java
class BankAccount {
    private int balance;
    public int getBalance() {
        return balance;
    }

    public void deposit(int amount) {
        this.balance += amount;
    }

    public void withdraw(int amount) {
        this.balance -= amount;
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        BankAccount bankAccount = new BankAccount();
        // 创建第一个线程
        Thread thread0 = new Thread(() -> {
            for (int i = 0; i < 1000; ++i) {
                System.out.println(Thread.currentThread().getName());
                bankAccount.deposit(1);
            }
            System.out.println("thread0 completed");
        });
        // 第二个线程
        Thread thread1 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                System.out.println(Thread.currentThread().getName());
                bankAccount.withdraw(1);
            }
            System.out.println("thread1 completed");
        });
        // 启动线程
        thread0.start();
        thread1.start();

        try {
            // 等待thread1、thread0执行完成
            thread1.join();
            thread0.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println(bankAccount.getBalance());
    }
}
```

解决方法

```java
class BankAccount {
    private int balance;
    public int getBalance() {
        return balance;
    }

    public synchronized void deposit(int amount) {
        this.balance += amount;
    }

    public synchronized void withdraw(int amount) {
        this.balance -= amount;
    }
}
```

> [!NOTE]
>
> -   当 `synchronized` 关键字修饰实例方法时，锁对象是 `this`，即当前实例对象。
> -   当 `synchronized` 关键字修饰静态方法时，锁对象是当前类的 `Class` 对象。

#### 变量修饰符

-   **`final`**：变量的值一旦初始化后不能更改。
-   **`static`**：变量属于类而不是实例。
-   **`transient`**：变量不会被序列化。
-   **`volatile`**：变量在多线程环境下保持可见性。