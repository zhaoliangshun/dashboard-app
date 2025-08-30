# 可拖动菜单栏组件

这是一个功能强大的可拖动调整大小的侧边栏组件，支持鼠标和触摸设备操作。

## 功能特性

### 基础版 (`ResizableSidebar`)
- ✅ 鼠标拖动调整宽度
- ✅ 折叠/展开功能
- ✅ 平滑动画过渡
- ✅ 最小/最大宽度限制
- ✅ 可自定义配置

### 高级版 (`ResizableSidebarAdvanced`)
- ✅ 所有基础版功能
- ✅ 触摸设备支持
- ✅ 网格对齐功能
- ✅ 拖动时视觉反馈
- ✅ 更好的性能优化

## 安装和使用

### 1. 基础使用

```tsx
import ResizableSidebar from './ui/resizable-sidebar';

function App() {
  return (
    <div className="h-screen flex">
      <ResizableSidebar
        minWidth={200}
        maxWidth={400}
        defaultWidth={250}
        collapsedWidth={60}
      >
        {/* 你的菜单内容 */}
        <div>菜单内容</div>
      </ResizableSidebar>
      
      <div className="flex-1">
        {/* 主内容区域 */}
        主内容
      </div>
    </div>
  );
}
```

### 2. 高级使用

```tsx
import ResizableSidebarAdvanced from './ui/resizable-sidebar-advanced';

function App() {
  return (
    <div className="h-screen flex">
      <ResizableSidebarAdvanced
        minWidth={200}
        maxWidth={400}
        defaultWidth={250}
        collapsedWidth={60}
        enableTouch={true}
        snapToGrid={true}
        gridSize={10}
      >
        {/* 你的菜单内容 */}
        <div>菜单内容</div>
      </ResizableSidebarAdvanced>
      
      <div className="flex-1">
        {/* 主内容区域 */}
        主内容
      </div>
    </div>
  );
}
```

## 组件属性

### ResizableSidebar 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `children` | `React.ReactNode` | - | 菜单内容 |
| `minWidth` | `number` | `200` | 最小宽度 (px) |
| `maxWidth` | `number` | `400` | 最大宽度 (px) |
| `defaultWidth` | `number` | `250` | 默认宽度 (px) |
| `className` | `string` | `''` | 自定义 CSS 类名 |
| `collapsedWidth` | `number` | `60` | 折叠时宽度 (px) |
| `showToggleButton` | `boolean` | `true` | 是否显示折叠按钮 |

### ResizableSidebarAdvanced 额外属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `enableTouch` | `boolean` | `true` | 是否启用触摸支持 |
| `snapToGrid` | `boolean` | `false` | 是否启用网格对齐 |
| `gridSize` | `number` | `10` | 网格大小 (px) |

## 演示页面

项目包含两个演示页面：

1. **基础演示**: `/resizable-sidebar-demo`
   - 展示基础版功能
   - 包含完整的使用说明

2. **高级演示**: `/resizable-sidebar-demo/advanced`
   - 展示两个版本的对比
   - 实时切换功能
   - 网格对齐控制

## 使用技巧

### 1. 响应式设计
```tsx
<ResizableSidebar
  minWidth={window.innerWidth < 768 ? 150 : 200}
  maxWidth={window.innerWidth < 768 ? 300 : 400}
>
  {/* 内容 */}
</ResizableSidebar>
```

### 2. 自定义样式
```tsx
<ResizableSidebar
  className="bg-gray-800 text-white shadow-xl"
  collapsedWidth={80}
>
  {/* 内容 */}
</ResizableSidebar>
```

### 3. 条件渲染
```tsx
{isMobile ? (
  <ResizableSidebarAdvanced enableTouch={true} />
) : (
  <ResizableSidebar />
)}
```

## 浏览器兼容性

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ 移动端浏览器

## 性能优化

1. **防抖处理**: 拖动时使用 `requestAnimationFrame` 优化性能
2. **事件清理**: 组件卸载时自动清理事件监听器
3. **内存管理**: 使用 `useCallback` 和 `useRef` 避免不必要的重渲染

## 故障排除

### 常见问题

1. **拖动不流畅**
   - 检查是否有其他 CSS 影响
   - 确保没有 `pointer-events: none` 样式

2. **触摸设备不工作**
   - 确保 `enableTouch={true}`
   - 检查设备是否支持触摸事件

3. **宽度限制不生效**
   - 检查 `minWidth` 和 `maxWidth` 的值
   - 确保 `minWidth < maxWidth`

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个组件！

## 许可证

MIT License
