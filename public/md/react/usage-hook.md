## Hook 的使用



### 一、不能在条件语句或循环语句中使用 hook

**Hook 不能在条件语句、循环或嵌套函数中使用**的核心原因在于 React 依赖 Hook 的**调用顺序**来管理组件状态和副作用。这一规则是 React Hooks 设计的底层机制决定的，违反它会导致状态错乱、数据丢失或不可预测的 Bug。

#### 链表存储结构

React 内部通过**单向链表**（或称为“Hook 链表”）跟踪组件的所有 Hooks。每次组件渲染时，React 会按 Hook 的调用顺序依次访问链表节点，确保状态与副作用的正确关联。

- 首次渲染：Hook 调用顺序被记录为链表（如 [useState1, useState2, useEffect1]）。
- 后续渲染：严格按相同顺序匹配链表节点，更新状态或执行副作用。

若两次渲染的 Hook 调用顺序不一致（如因条件语句跳过某个 Hook），链表节点的匹配会错位，导致状态混乱

```jsx
function Component({ show }) {
  if (show) {
    const [count, setCount] = useState(0); // Hook 1（仅在 show=true 时调用）
  }
  const [name, setName] = useState(""); // Hook 2
}
```

当 show从 true变为 false：

- 首次渲染顺序：Hook1 → Hook2
- 二次渲染顺序：Hook2（原 Hook1 被跳过）

结果：name错误关联到首次渲染的 count值（链表节点错位）

#### 条件语句中的 Hook

条件变化导致 Hook 数量增减，链表顺序不一致，后续 Hook 状态错乱，如 `useEffect`依赖错误数据

```jsx
if (isLoggedIn) {
  const [user, setUser] = useState(null); // 可能被跳过
}

// 更改为

// 条件置于 Hook 内部
const [user, setUser] = useState(isLoggedIn ? initialUser : null); 

// 条件在 useEffect 内部
useEffect(() => {
  if (isLoggedIn) fetchUser(); 
}, [isLoggedIn]);
```

#### 循环中的 Hook

循环次数动态变化，Hook 数量不稳定，链表节点无法按索引匹配，状态相互覆盖

```jsx
for (let i = 0; i < items.length; i++) {
  const [value, setValue] = useState(items[i]); // 每次渲染 Hook 数量不同
}

// 更改为： 
const [values, setValues] = useState(Array(items.length).fill(0)); // 单 Hook 存储数组
```

#### 嵌套函数中的 Hook

嵌套函数可能未被调用，导致 React 遗漏管理该 Hook，状态初始化失败或更新无效，且无法触发重新渲染。

```jsx
const handleClick = () => {
  const [count, setCount] = useState(0); // 嵌套函数中的 Hook
};

// 更改为：
// 将 state 定义提升到顶层，然后函数内只更改
const [count, setCount] = useState(0);
const handleClick = () => setCount(c => c + 1); // 嵌套函数仅引用状态

```

> 解决方法：
>
> 使用官方插件 `eslint-plugin-react-hooks`自动检测违规代码





