# 浮动弹窗组件

一个智能的CSS浮动弹窗组件，可以根据目标元素位置自动调整左右对齐方式，支持多种位置、对齐方式和动画效果。

## 特性

- ✅ **智能对齐**: 根据目标元素位置自动调整左右对齐
- ✅ **边界自适应**: 当空间不足时自动调整显示位置
- ✅ **多种位置**: 支持上方和下方显示
- ✅ **多种对齐**: 支持左对齐、居中对齐、右对齐
- ✅ **响应式设计**: 在小屏幕上自动调整布局
- ✅ **动画效果**: 支持淡入、滑入、缩放等动画
- ✅ **主题变体**: 支持浅色和深色主题
- ✅ **尺寸变体**: 支持小、中、大三种尺寸
- ✅ **无障碍支持**: 支持键盘导航和屏幕阅读器

## 文件结构

```
app/ui/
├── floating-popup.tsx          # React组件版本
├── floating-popup.css          # 纯CSS版本
└── floating-popup-html-example.html  # HTML示例

app/floating-popup-demo/
└── page.tsx                   # 演示页面

FLOATING_POPUP_README.md       # 说明文档
```

## 使用方法

### React组件版本

```tsx
import { FloatingPopup } from './ui/floating-popup'

function MyComponent() {
  return (
    <FloatingPopup
      trigger={<button>点击我</button>}
      align="center"
      position="bottom"
    >
      <div>
        <h4>弹窗标题</h4>
        <p>弹窗内容</p>
        <button>确认</button>
      </div>
    </FloatingPopup>
  )
}
```

### 纯CSS版本

```html
<div class="floating-popup-container">
  <button onclick="togglePopup('my-popup')">点击我</button>
  <div id="my-popup" class="floating-popup bottom align-center">
    <div class="popup-content">
      <div class="popup-title">弹窗标题</div>
      <div class="popup-text">弹窗内容</div>
      <div class="popup-actions">
        <button class="popup-btn popup-btn-primary">确认</button>
      </div>
    </div>
  </div>
</div>

<script>
function togglePopup(popupId) {
  const popup = document.getElementById(popupId);
  popup.classList.toggle('show');
}
</script>
```

## API参考

### React组件属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `trigger` | `React.ReactNode` | - | 触发弹窗的元素 |
| `children` | `React.ReactNode` | - | 弹窗内容 |
| `position` | `'top' \| 'bottom'` | `'bottom'` | 弹窗显示位置 |
| `align` | `'left' \| 'right' \| 'center'` | `'center'` | 弹窗对齐方式 |
| `offset` | `number` | `8` | 弹窗与触发元素的间距 |
| `className` | `string` | `''` | 触发元素容器的CSS类名 |
| `popupClassName` | `string` | `''` | 弹窗的CSS类名 |
| `onOpenChange` | `(open: boolean) => void` | - | 弹窗状态变化回调 |
| `closeOnClickOutside` | `boolean` | `true` | 是否点击外部关闭 |
| `closeOnEscape` | `boolean` | `true` | 是否按ESC键关闭 |

### CSS类名

#### 基础类名
- `.floating-popup-container` - 弹窗容器
- `.floating-popup` - 弹窗主体
- `.floating-popup.show` - 显示状态

#### 位置类名
- `.floating-popup.top` - 上方显示
- `.floating-popup.bottom` - 下方显示

#### 对齐类名
- `.floating-popup.align-left` - 左对齐
- `.floating-popup.align-center` - 居中对齐
- `.floating-popup.align-right` - 右对齐

#### 尺寸类名
- `.floating-popup.small` - 小尺寸
- `.floating-popup.large` - 大尺寸

#### 主题类名
- `.floating-popup.dark` - 深色主题
- `.floating-popup.no-border` - 无边框

#### 动画类名
- `.floating-popup.fade-in` - 淡入动画
- `.floating-popup.slide-up` - 滑入动画
- `.floating-popup.scale-in` - 缩放动画

## 示例

### 基础用法

```tsx
// 左对齐弹窗
<FloatingPopup
  trigger={<button>左对齐</button>}
  align="left"
  position="bottom"
>
  <div>这是左对齐的弹窗内容</div>
</FloatingPopup>

// 居中对齐弹窗
<FloatingPopup
  trigger={<button>居中对齐</button>}
  align="center"
  position="bottom"
>
  <div>这是居中对齐的弹窗内容</div>
</FloatingPopup>

// 右对齐弹窗
<FloatingPopup
  trigger={<button>右对齐</button>}
  align="right"
  position="bottom"
>
  <div>这是右对齐的弹窗内容</div>
</FloatingPopup>
```

### 上方弹窗

```tsx
<FloatingPopup
  trigger={<button>上方弹窗</button>}
  align="center"
  position="top"
>
  <div>这个弹窗显示在触发元素的上方</div>
</FloatingPopup>
```

### 自定义样式

```tsx
<FloatingPopup
  trigger={<button>自定义样式</button>}
  popupClassName="custom-popup"
  offset={16}
>
  <div>自定义样式的弹窗内容</div>
</FloatingPopup>
```

### 事件处理

```tsx
<FloatingPopup
  trigger={<button>事件处理</button>}
  onOpenChange={(open) => console.log('弹窗状态:', open)}
  closeOnClickOutside={false}
  closeOnEscape={true}
>
  <div>这个弹窗有自定义的事件处理</div>
</FloatingPopup>
```

## 智能对齐逻辑

组件会根据以下规则自动调整弹窗位置：

1. **垂直位置调整**:
   - 如果指定上方显示但空间不足，自动改为下方显示
   - 如果指定下方显示但空间不足，自动改为上方显示

2. **水平位置调整**:
   - 居中对齐时，如果超出左边界则改为左对齐
   - 居中对齐时，如果超出右边界则改为右对齐
   - 左对齐时，如果超出右边界则改为右对齐
   - 右对齐时，如果超出左边界则改为左对齐

3. **边界保护**:
   - 确保弹窗完全在视口内
   - 响应式设计，在小屏幕上强制居中对齐

## 浏览器兼容性

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 性能优化

- 使用 `useCallback` 和 `useMemo` 优化计算
- 事件监听器正确清理
- 使用 `createPortal` 避免布局影响
- 延迟计算位置，确保弹窗已渲染

## 无障碍支持

- 支持键盘导航（ESC键关闭）
- 支持屏幕阅读器
- 正确的焦点管理
- 语义化的HTML结构

## 自定义主题

可以通过CSS变量自定义主题：

```css
.floating-popup {
  --popup-bg: #ffffff;
  --popup-border: #e5e7eb;
  --popup-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --popup-radius: 0.5rem;
  --popup-padding: 1rem;
}
```

## 许可证

MIT License
