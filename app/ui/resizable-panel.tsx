'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

interface ResizablePanelProps {
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  minLeftWidth?: number;
  maxLeftWidth?: number;
  defaultLeftWidth?: number;
  className?: string;
  separatorClassName?: string;
  showSeparator?: boolean;
}

export default function ResizablePanel({
  leftPanel,
  rightPanel,
  minLeftWidth = 200,
  maxLeftWidth = 600,
  defaultLeftWidth = 300,
  className = '',
  separatorClassName = '',
  showSeparator = true,
}: ResizablePanelProps) {
  const [leftWidth, setLeftWidth] = useState(defaultLeftWidth);
  const [isResizing, setIsResizing] = useState(false);
  const startXRef = useRef<number>(0);
  const startWidthRef = useRef<number>(0);

  // 处理鼠标按下事件
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    startXRef.current = e.clientX;
    startWidthRef.current = leftWidth;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, [leftWidth]);

  // 处理鼠标移动事件
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing) return;

    const deltaX = e.clientX - startXRef.current;
    const newWidth = Math.max(minLeftWidth, Math.min(maxLeftWidth, startWidthRef.current + deltaX));
    setLeftWidth(newWidth);
  }, [isResizing, minLeftWidth, maxLeftWidth]);

  // 处理鼠标松开事件
  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
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

  return (
    <div className={`flex h-full ${className}`}>
      {/* 左侧面板 */}
      <div
        className="flex-shrink-0 overflow-hidden"
        style={{ width: leftWidth }}
      >
        {leftPanel}
      </div>

      {/* 拖动分隔线 */}
      {showSeparator && (
        <div
          className={`relative flex-shrink-0 w-1 bg-gray-200 hover:bg-blue-500 cursor-col-resize transition-colors ${separatorClassName}`}
          onMouseDown={handleMouseDown}
        >
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-gray-400 rounded-full opacity-0 hover:opacity-100 transition-opacity" />
        </div>
      )}

      {/* 右侧面板 */}
      <div className="flex-1 overflow-hidden">
        {rightPanel}
      </div>
    </div>
  );
}


