# 可拖动组件使用说明

这个项目包含了多个可拖动调整大小的组件，可以用于创建灵活的布局。

## 组件列表

### 1. ResizableSidebar - 可拖动侧边栏

一个带有折叠功能的侧边栏组件，支持拖动调整宽度。

**特性：**
- 左右拖动调整宽度
- 点击按钮折叠/展开
- 平滑动画过渡
- 可配置最小/最大宽度

**使用示例：**
```tsx
import ResizableSidebar from './ui/resizable-sidebar';

<ResizableSidebar
  minWidth={180}
  maxWidth={350}
  defaultWidth={250}
  collapsedWidth={60}
>
  <div>侧边栏内容</div>
</ResizableSidebar>
```

**演示页面：** `/resizable-sidebar-demo`

### 2. ResizablePanel - 可拖动面板

一个简单的双面板布局组件，支持拖动分隔线调整左右面板大小。

**特性：**
- 左右拖动分隔线
- 可配置最小/最大宽度
- 响应式设计
- 可自定义分隔线样式

**使用示例：**
```tsx
import ResizablePanel from './ui/resizable-panel';

<ResizablePanel
  minLeftWidth={200}
  maxLeftWidth={600}
  defaultLeftWidth={300}
>
  <div>左侧面板内容</div>
  <div>右侧面板内容</div>
</ResizablePanel>
```

**演示页面：** `/resizable-panel-demo`

### 3. ResizableGrid - 可拖动网格

一个支持多个面板的网格布局组件，可以水平、垂直或双向拖动。

**特性：**
- 支持多个面板
- 水平、垂直或双向拖动
- 百分比布局
- 可配置每个面板的最小/最大尺寸

**使用示例：**
```tsx
import ResizableGrid from './ui/resizable-grid';

<ResizableGrid
  direction="horizontal"
  minSizes={[15, 15, 15]}
  maxSizes={[60, 60, 60]}
  defaultSizes={[33.33, 33.33, 33.34]}
>
  <div>面板1内容</div>
  <div>面板2内容</div>
  <div>面板3内容</div>
</ResizableGrid>
```

**演示页面：** `/resizable-grid-demo`

## 使用方法

1. **访问演示页面：**
   - 侧边栏演示：`http://localhost:3000/resizable-sidebar-demo`
   - 面板演示：`http://localhost:3000/resizable-panel-demo`
   - 网格演示：`http://localhost:3000/resizable-grid-demo`

2. **拖动操作：**
   - 将鼠标悬停在分隔线上
   - 光标会变为调整大小样式
   - 按住鼠标左键并拖动来调整大小

3. **自定义配置：**
   - 修改 `minWidth`/`maxWidth` 设置宽度限制
   - 修改 `defaultWidth` 设置默认宽度
   - 修改 `className` 自定义样式

## 技术实现

所有组件都使用了以下技术：

- **React Hooks：** 使用 `useState`、`useRef`、`useEffect`、`useCallback`
- **事件处理：** 监听 `mousedown`、`mousemove`、`mouseup` 事件
- **全局事件：** 在拖动时添加全局事件监听器
- **样式控制：** 动态设置光标样式和用户选择
- **TypeScript：** 完整的类型定义

## 注意事项

1. 所有组件都是客户端组件（使用 `'use client'` 指令）
2. 拖动时会禁用文本选择，避免干扰
3. 组件会自动清理事件监听器
4. 支持触摸设备（通过鼠标事件模拟）

## 扩展功能

你可以基于这些基础组件扩展更多功能：

- 保存用户的自定义布局到本地存储
- 添加双击重置功能
- 支持键盘快捷键
- 添加更多动画效果
- 支持嵌套布局
