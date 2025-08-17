## Proxy 代理

JavaScript 中的 **Proxy** 是 ES6 引入的元编程特性，允许开发者通过代理层**拦截并自定义对象的基本操作**（如属性访问、赋值、函数调用等）



### 基本语法

通过 `new Proxy(target, handler)`创建代理对象：

- `target`：被代理的目标对象（对象、数组、函数等）
- `handler`：包含**陷阱函数**（traps）的对象，用于拦截操作

```js
const target = { name: 'Alice' };
const handler = {
  get(target, prop) {
    return prop in target ? target[prop] : 'Property not found';
  }
};
const proxy = new Proxy(target, handler);
console.log(proxy.name); // "Alice"
console.log(proxy.age);  // "Property not found"
```

上面代码使用 handler 里面的 get 方法，拦截了默认的对象访问属性的方法。

### 常用陷阱函数（Traps）

#### 1.属性读取

```js
get(target, prop, receiver)
```

动态返回属性值或默认值

```js
// 权限控制：限制敏感属性的访问（如禁止读取密码字段）
const secureProxy = new Proxy({ password: '123' }, {
  get(target, prop) {
    if (prop === 'password') throw new Error('禁止访问');
    return target[prop];
  }
});

// 虚拟属性：动态生成属性（如计算数组部分和）
const proxy = new Proxy({ values: [10, 20, 30] }, {
  get(target, prop) {
    if (prop.startsWith('sum')) {
      const n = parseInt(prop.slice(3));
      return target.values.slice(0, n).reduce((a, b) => a + b, 0);
    }
    return target[prop];
  }
});
console.log(proxy.sum2);
```



#### 2.属性赋值

```js
set(target, prop, value, receiver)
```

数据校验（如类型检查）

```js
const validator = {
  set(target, prop, value) {
    if (prop === 'age' && (typeof value !== 'number' || value < 0)) {
      throw new Error('年龄必须是非负整数');
    }
    target[prop] = value;
    return true; // 表示操作成功
  }
};
const user = new Proxy({}, validator);
user.age = 25; // 正常
user.age = -5; // 抛出错误：年龄必须是非负整数
```

代理要求传入给 age 属性的值必须是非负整数。

```js
function reactive(obj) {
  return new Proxy(obj, {
    set(target, prop, value) {
      triggerUpdate(); // 触发更新逻辑
      return Reflect.set(target, prop, value);
    }
  });
}
```

Vue 3 使用 Proxy 实现响应式：拦截 `set`操作，触发视图更新

#### 3.函数调用

```js
apply(target, thisArg, args)
```

日志记录或缓存计算结果

```js
const cache = new Map();
const proxyFn = new Proxy(expensiveFn, {
  apply(target, thisArg, args) {
    const key = args.join('-');
    if (cache.has(key)) return cache.get(key);
    const result = Reflect.apply(target, thisArg, args);
    cache.set(key, result);
    return result;
  }
});
```



#### 4.属性存在性检查

```js
has(target, prop)
```

隐藏私有属性（如 `_secret`）

#### 5.删除属性

```js
deleteProperty(target, prop)
```

防止关键属性被误删

#### 6.构造函数调用

```js
construct(target, args, newTarget)
```

拦截 `new`操作













