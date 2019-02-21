# react-hooks

### State Hook

1. 多个`useState`时，`React`依赖于每次渲染时钩子的调用顺序都是一样的，从而实现钩子与状态的一一对应关系。

### Effect Hook

1. 相当于生命周期函数`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`的组合。
1. 可以返回一个函数(`cleanup`)用于清理。
1. 每次重新渲染都将会发生`cleanup phase`⏬
```
useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
```
```
  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  // ====== 原因在这里 ======
  componentDidUpdate(prevProps) {
    // Unsubscribe from the previous friend.id
    ChatAPI.unsubscribeFromFriendStatus(
      prevProps.friend.id,
      this.handleStatusChange
    );
    // Subscribe to the next friend.id
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
```
```
// Mount with { friend: { id: 100 } } props
ChatAPI.subscribeToFriendStatus(100, handleStatusChange);     // Run first effect

// Update with { friend: { id: 200 } } props
ChatAPI.unsubscribeFromFriendStatus(100, handleStatusChange); // Clean up previous effect
ChatAPI.subscribeToFriendStatus(200, handleStatusChange);     // Run next effect

// Update with { friend: { id: 300 } } props
ChatAPI.unsubscribeFromFriendStatus(200, handleStatusChange); // Clean up previous effect
ChatAPI.subscribeToFriendStatus(300, handleStatusChange);     // Run next effect

// Unmount
ChatAPI.unsubscribeFromFriendStatus(300, handleStatusChange); // Clean up last effect
```
- `useEffect(() => {document.title = You clicked ${count} times;}, [count]); ` ，指定只有当`count`变化才发生`cleanup phase`；如果为`[]`则表示只运行一次，永远不重新运行。

### 钩子（Hooks）规则

#### 1. 只能在顶层调用，不能再循环、条件语句和嵌套函数中使用。 （原因：[State Hook](#State Hook) 第1条）

正确做法：
```
useEffect(function persistForm() {
      // 👍 We're not breaking the first rule anymore
      if (name !== '') {
        localStorage.setItem('formData', name);
      }
    });
```

#### 2. 只能在`React`函数组件中被调用。（可以通过自定义钩子函数解决）

可以使用[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)来强制自动执行这些规则。

### 自定义钩子（Hook）

1. 以`use`开头，一种公约。
1. 自定钩子是一种复用状态逻辑的机制（例如设置订阅和记住当前值），每次使用，内部所有状态和作用都是独立的。
1. 自定义钩子每个状态独立的能力源于`useState`和`useEffect`是完全独立的。
