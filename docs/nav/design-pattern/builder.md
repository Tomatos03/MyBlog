# 建造者模式

## 优点

- 不需要知道参数顺序, 参数设置顺序可以任意组合
- 需要新增参数时，只需在 Builder 类中添加对应方法即可，不影响已有代码，符合开闭原择(OCP)
- 链式调用
- 可以在 build() 方法中统一做参数校验，避免对象处于非法状态

## 实现

```java
public class User {
    private String name;
    private int age;
    private String address;

    private User(Builder builder) {
        this.name = builder.name;
        this.age = builder.age;
        this.address = builder.address;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String name;
        private int age;
        private String address;

        public Builder setName(String name) {
            this.name = name;
            return this;
        }
        public Builder setAge(int age) {
            this.age = age;
            return this;
        }
        public Builder setAddress(String address) {
            this.address = address;
            return this;
        }

        public User build() {
            return new User(this);
        }
    }
}

```

### 调用

```java
    User user = User.builder()
                    .setName("John")
                    .setAge(30)
                    .setAddress("123 Main St")
                    .build();
```
