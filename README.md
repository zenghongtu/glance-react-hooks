# react-hooks

### Effect Hook

- 相当于生命周期函数`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`的组合。
- 可以返回一个函数(`cleanup`)用于清理。
- 每次重新渲染都将会发生`cleanup phase`。（原因如下）
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

### Hooks 规则

- 只能在顶层调用，不能再循环、条件语句和嵌套函数中使用。
- 只能在`React`函数组件中被调用。（可以通过自定义钩子函数解决）
