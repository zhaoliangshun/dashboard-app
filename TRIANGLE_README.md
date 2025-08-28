# CSS 三角形函数

这是一个完整的CSS三角形函数库，提供了多种方式来创建和使用三角形。

## 功能特性

- 🎯 **多种方向**: 向上、向下、向左、向右
- 📏 **多种尺寸**: XS、SM、MD、LG、XL、2XL
- 🎨 **多种类型**: 基础、高级、渐变、等边、等腰
- ⚛️ **React组件**: 提供完整的React组件封装
- 🎛️ **CSS自定义属性**: 支持动态控制
- 📱 **响应式**: 完全兼容移动端

## 快速开始

### 1. CSS 类使用

```html
<!-- 基础三角形 -->
<div class="triangle-up text-blue-500"></div>
<div class="triangle-down text-red-500 triangle-lg"></div>

<!-- 高级三角形 -->
<div class="triangle-advanced text-green-500" data-direction="up" data-size="xl"></div>

<!-- 渐变三角形 -->
<div class="triangle-gradient" data-direction="up"></div>
```

### 2. React 组件使用

```jsx
import { TriangleUp, TriangleDown, TriangleLeft, TriangleRight } from './ui/triangle';

// 基础使用
<TriangleUp size="md" color="#3b82f6" />
<TriangleDown size="lg" color="#ef4444" />

// 高级使用
<Triangle type="advanced" direction="up" size="xl" color="#10b981" />
<GradientTriangle direction="down" size="lg" />
```

## API 文档

### CSS 类

#### 基础类

- `.triangle` - 基础三角形类
- `.triangle-up` - 向上三角形
- `.triangle-down` - 向下三角形
- `.triangle-left` - 向左三角形
- `.triangle-right` - 向右三角形

#### 尺寸类

- `.triangle-sm` - 小号 (6px)
- `.triangle-md` - 中号 (10px) - 默认
- `.triangle-lg` - 大号 (15px)
- `.triangle-xl` - 超大号 (20px)

#### 高级类

- `.triangle-advanced` - 使用CSS自定义属性的高级三角形
- `.triangle-gradient` - 渐变三角形
- `.triangle-equilateral` - 等边三角形
- `.triangle-isosceles` - 等腰三角形

### React 组件

#### Triangle 主组件

```tsx
interface TriangleProps {
  direction?: 'up' | 'down' | 'left' | 'right';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  color?: string;
  className?: string;
  type?: 'basic' | 'advanced' | 'gradient' | 'equilateral' | 'isosceles';
  style?: React.CSSProperties;
}
```

#### 便捷组件

```tsx
// 方向组件
<TriangleUp size="md" color="#3b82f6" />
<TriangleDown size="lg" color="#ef4444" />
<TriangleLeft size="sm" color="#10b981" />
<TriangleRight size="xl" color="#8b5cf6" />

// 特殊三角形组件
<EquilateralTriangle color="#f97316" />
<IsoscelesTriangle color="#ec4899" />

// 渐变三角形组件
<GradientTriangle direction="up" size="lg" />
```

## 使用示例

### 1. 下拉菜单箭头

```jsx
<div className="flex items-center gap-2">
  <span>下拉菜单</span>
  <TriangleDown size="sm" color="#6b7280" />
</div>
```

### 2. 面包屑导航

```jsx
<div className="flex items-center gap-2">
  <span>首页</span>
  <TriangleRight size="sm" color="#9ca3af" />
  <span>产品</span>
  <TriangleRight size="sm" color="#9ca3af" />
  <span>详情</span>
</div>
```

### 3. 可折叠面板

```jsx
<div className="border border-gray-200 rounded-lg">
  <button className="w-full flex items-center justify-between p-4">
    <span>可折叠面板</span>
    <TriangleDown size="sm" color="#6b7280" />
  </button>
  <div className="p-4 border-t border-gray-200">
    <p>面板内容...</p>
  </div>
</div>
```

### 4. 进度指示器

```jsx
<div className="flex items-center gap-2">
  <span>步骤 1</span>
  <TriangleRight size="xs" color="#10b981" />
  <span>步骤 2</span>
  <TriangleRight size="xs" color="#d1d5db" />
  <span>步骤 3</span>
</div>
```

### 5. 提示框

```jsx
<div className="relative inline-block">
  <div className="bg-blue-100 border border-blue-300 rounded-lg p-3">
    <p className="text-blue-800">这是一个提示框</p>
    <div className="absolute top-full left-4 triangle-up text-blue-100"></div>
  </div>
</div>
```

## 自定义样式

### 使用CSS自定义属性

```css
.triangle-advanced {
  --triangle-size: 15px;
  --triangle-color: #3b82f6;
}
```

### 使用Tailwind类

```html
<div class="triangle-up text-blue-500 triangle-lg hover:text-blue-700 transition-colors"></div>
```

### 使用内联样式

```jsx
<TriangleUp 
  size="lg" 
  style={{ 
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
    transform: 'rotate(45deg)'
  }} 
/>
```

## 浏览器兼容性

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 性能优化

1. **CSS类优先**: 对于简单的三角形，优先使用CSS类而不是React组件
2. **缓存组件**: 对于频繁使用的三角形，考虑缓存React组件实例
3. **避免过度使用**: 不要在一个页面中使用过多三角形，可能影响性能

## 最佳实践

1. **语义化使用**: 使用三角形来表达正确的语义（如箭头、指示器等）
2. **一致性**: 在同一个项目中保持三角形样式的一致性
3. **可访问性**: 为装饰性三角形添加适当的ARIA标签
4. **响应式**: 在不同屏幕尺寸下调整三角形大小

## 故障排除

### 三角形不显示

- 检查是否正确引入了CSS文件
- 确认元素有足够的空间显示三角形
- 验证颜色值是否正确

### 三角形方向错误

- 检查`direction`属性值是否正确
- 确认CSS类名拼写正确

### 尺寸不正确

- 检查`size`属性值是否在允许范围内
- 确认CSS自定义属性是否正确设置

## 贡献

欢迎提交Issue和Pull Request来改进这个三角形函数库！

## 许可证

MIT License
