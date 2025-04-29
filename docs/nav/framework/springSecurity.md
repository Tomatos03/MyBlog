# Spring Security

## 接口

### AuthenticationManager

定义 Spring Security 的 Filter 如何执行 认证 的 API

#### 接口实现类

##### ProviderManager

这个实现类，内置了一个 `List<AuthenticationProvider>`实例，在进行认证的时候调用列表之中的`AuthenticationProvider`实现类进行实际的认证

### AuthenticationProvider

定义具体的凭证认证方式

### AuthenticationEntryPoint

定义如何处理认证失败或者没有提供凭证的 API

### AbstractAuthenticationProcessingFilter

用作验证用户凭证的基础`Filter`
