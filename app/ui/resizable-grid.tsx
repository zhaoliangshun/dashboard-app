'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

interface ResizableGridProps {
  children: React.ReactNode[];
  direction?: 'horizontal' | 'vertical' | 'both';
  minSizes?: number[];
  maxSizes?: number[];
  defaultSizes?: number[];
  className?: string;
  separatorClassName?: string;
  showSeparators?: boolean;
}

export default function ResizableGrid({
  children,
  direction = 'horizontal',
  minSizes = [],
  maxSizes = [],
  defaultSizes = [],
  className = '',
  separatorClassName = '',
  showSeparators = true,
}: ResizableGridProps) {
  const [sizes, setSizes] = useState(() => {
    if (defaultSizes.length > 0) {
      return defaultSizes;
    }
    // 默认平均分配
    return new Array(children.length).fill(100 / children.length);
  });
  
  const [isResizing, setIsResizing] = useState(false);
  const [resizingIndex, setResizingIndex] = useState(-1);
  const startPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const startSizesRef = useRef<number[]>([]);

  // 处理鼠标按下事件
  const handleMouseDown = useCallback((index: number, e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    setResizingIndex(index);
    startPosRef.current = { x: e.clientX, y: e.clientY };
    startSizesRef.current = [...sizes];
    
    if (direction === 'horizontal' || direction === 'both') {
      document.body.style.cursor = 'col-resize';
    } else {
      document.body.style.cursor = 'row-resize';
    }
    document.body.style.userSelect = 'none';
  }, [sizes, direction]);

  // 处理鼠标移动事件
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing || resizingIndex === -1) return;

    const deltaX = e.clientX - startPosRef.current.x;
    const deltaY = e.clientY - startPosRef.current.y;
    
    let delta = 0;
    if (direction === 'horizontal') {
      delta = deltaX;
    } else if (direction === 'vertical') {
      delta = deltaY;
    } else {
      // both - 使用较大的变化量
      delta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;
    }

    const containerSize = direction === 'horizontal' ? window.innerWidth : window.innerHeight;
    const deltaPercent = (delta / containerSize) * 100;

    const newSizes = [...startSizesRef.current];
    const currentSize = newSizes[resizingIndex];
    const nextSize = newSizes[resizingIndex + 1];

    // 计算新的尺寸
    const newCurrentSize = Math.max(
      minSizes[resizingIndex] || 10,
      Math.min(maxSizes[resizingIndex] || 90, currentSize + deltaPercent)
    );
    const newNextSize = Math.max(
      minSizes[resizingIndex + 1] || 10,
      Math.min(maxSizes[resizingIndex + 1] || 90, nextSize - deltaPercent)
    );

    // 确保总和不超过100%
    const totalSize = newCurrentSize + newNextSize;
    if (totalSize <= 100) {
      newSizes[resizingIndex] = newCurrentSize;
      newSizes[resizingIndex + 1] = newNextSize;
      setSizes(newSizes);
    }
  }, [isResizing, resizingIndex, direction, minSizes, maxSizes]);

  // 处理鼠标松开事件
  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    setResizingIndex(-1);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, []);

  // 添加和移除全局事件监听器
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  const isHorizontal = direction === 'horizontal' || direction === 'both';
  const isVertical = direction === 'vertical' || direction === 'both';

  return (
    <div 
      className={`${isHorizontal ? 'flex' : 'flex-col'} h-full ${className}`}
    >
      {children.map((child, index) => (
        <React.Fragment key={index}>
          {/* 面板 */}
          <div
            className={`${isHorizontal ? 'flex-shrink-0' : 'flex-shrink-0'} overflow-hidden`}
            style={{
              [isHorizontal ? 'width' : 'height']: `${sizes[index]}%`,
            }}
          >
            {child}
          </div>

          {/* 分隔线 */}
          {showSeparators && index < children.length - 1 && (
            <div
              className={`relative flex-shrink-0 ${
                isHorizontal 
                  ? 'w-1 cursor-col-resize' 
                  : 'h-1 cursor-row-resize'
              } bg-gray-200 hover:bg-blue-500 transition-colors ${separatorClassName}`}
              onMouseDown={(e) => handleMouseDown(index, e)}
            >
              <div 
                className={`absolute ${
                  isHorizontal
                    ? 'left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-8'
                    : 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-1 w-8'
                } bg-gray-400 rounded-full opacity-0 hover:opacity-100 transition-opacity`} 
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}


