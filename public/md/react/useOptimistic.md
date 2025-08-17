## useOptimistic乐观更新

useOptimistic 是 React 19 引入的核心 Hook，用于实现**乐观更新**（Optimistic Update），即在异步操作（如网络请求）完成前提前更新 UI，提升用户体验的流畅性。

#### 什么是乐观更新？

用户触发操作（如点赞、评论、消息发送、表单提交）后，**不等待服务端响应，立即在 UI 上呈现预期结果**，若后续请求失败则回滚状态，主要用于减少用户感知延迟，增强交互响应速度

### 如何使用乐观更新

基本使用语法：

```javascript
const [optimisticState, addOptimistic] = useOptimistic(
  state,          // 当前真实状态（通常来自 useState）
  updateFn        // 计算乐观状态的函数：(currentState, optimisticValue) => newState
);
```

- optimisticState：乐观状态值，请求进行时显示预期结果，否则等于 state。
- addOptimistic(value)：触发乐观更新，value作为参数传入 updateFn的第二个参数optimisticValue

#### 实现流程与关键步骤

```jsx
function CommentBox() {
  const [comments, setComments] = useState([]); // 真实状态
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (prev, newComment) => [...prev, { ...newComment, sending: true }] // 添加临时状态标识
  );

  const handleSubmit = async (content) => {
    const tempId = `temp-${Date.now()}`;
    // 1. 触发乐观更新
    addOptimisticComment({ id: tempId, content });
    
    try {
      // 2. 发起异步请求
      const savedComment = await api.saveComment(content);
      // 3. 请求成功：替换临时数据
      setComments(prev => prev.map(c => c.id === tempId ? savedComment : c));
    } catch (error) {
      // 4. 请求失败：移除临时数据
      setComments(prev => prev.filter(c => c.id !== tempId));
    }
  };
}
```





























