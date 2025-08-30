'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface ResizableSidebarAdvancedProps {
  children: React.ReactNode;
  minWidth?: number;
  maxWidth?: number;
  defaultWidth?: number;
  className?: string;
  collapsedWidth?: number;
  showToggleButton?: boolean;
  enableTouch?: boolean;
  snapToGrid?: boolean;
  gridSize?: number;
}

export default function ResizableSidebarAdvanced({
  children,
  minWidth = 200,
  maxWidth = 400,
  defaultWidth = 250,
  className = '',
  collapsedWidth = 60,
  showToggleButton = true,
  enableTouch = true,
  snapToGrid = false,
  gridSize = 10,
}: ResizableSidebarAdvancedProps) {
  const [width, setWidth] = useState(defaultWidth);
  const [isResizing, setIsResizing] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number>(0);
  const startWidthRef = useRef<number>(0);
  const lastTouchXRef = useRef<number>(0);

  // 计算网格对齐的宽度
  const snapToGridWidth = useCallback((width: number) => {
    if (!snapToGrid) return width;
    return Math.round(width / gridSize) * gridSize;
  }, [snapToGrid, gridSize]);

  // 处理鼠标按下事件
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    setIsDragging(true);
    startXRef.current = e.clientX;
    startWidthRef.current = width;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, [width]);

  // 处理触摸开始事件
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!enableTouch) return;
    e.preventDefault();
    setIsResizing(true);
    setIsDragging(true);
    const touch = e.touches[0];
    startXRef.current = touch.clientX;
    startWidthRef.current = width;
    lastTouchXRef.current = touch.clientX;
    document.body.style.userSelect = 'none';
  }, [enableTouch, width]);

  // 处理鼠标移动事件
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing) return;

    const deltaX = e.clientX - startXRef.current;
    const newWidth = Math.max(minWidth, Math.min(maxWidth, startWidthRef.current + deltaX));
    const snappedWidth = snapToGridWidth(newWidth);
    setWidth(snappedWidth);
  }, [isResizing, minWidth, maxWidth, snapToGridWidth]);

  // 处理触摸移动事件
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isResizing || !enableTouch) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - startXRef.current;
    const newWidth = Math.max(minWidth, Math.min(maxWidth, startWidthRef.current + deltaX));
    const snappedWidth = snapToGridWidth(newWidth);
    setWidth(snappedWidth);
    lastTouchXRef.current = touch.clientX;
  }, [isResizing, enableTouch, minWidth, maxWidth, snapToGridWidth]);

  // 处理鼠标松开事件
  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    setIsDragging(false);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, []);

  // 处理触摸结束事件
  const handleTouchEnd = useCallback(() => {
    setIsResizing(false);
    setIsDragging(false);
    document.body.style.userSelect = '';
  }, []);

  // 切换折叠状态
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // 添加和移除全局事件监听器
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      if (enableTouch) {
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd);
      }
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isResizing, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd, enableTouch]);

  // 当前宽度
  const currentWidth = isCollapsed ? collapsedWidth : width;

  return (
    <div className="flex h-full">
      {/* 侧边栏 */}
      <div
        ref={sidebarRef}
        className={`relative bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
          isDragging ? 'transition-none' : ''
        } ${className}`}
        style={{ width: currentWidth }}
      >
        {/* 内容区域 */}
        <div className="h-full overflow-hidden">
          {children}
        </div>

        {/* 折叠/展开按钮 */}
        {showToggleButton && (
          <button
            onClick={toggleCollapse}
            className="absolute -right-3 top-4 w-6 h-6 bg-white border border-gray-200 rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
          >
            {isCollapsed ? (
              <ChevronRightIcon className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronLeftIcon className="w-4 h-4 text-gray-600" />
            )}
          </button>
        )}

        {/* 拖动分隔线 */}
        {!isCollapsed && (
          <div
            className="absolute -right-1 top-0 bottom-0 w-2 cursor-col-resize hover:bg-blue-500 hover:opacity-50 transition-colors z-5 touch-none"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-gray-300 rounded-full opacity-0 hover:opacity-100 transition-opacity" />
          </div>
        )}

        {/* 拖动指示器 */}
        {isDragging && (
          <div className="absolute inset-0 bg-blue-50 bg-opacity-20 pointer-events-none z-20" />
        )}
      </div>
    </div>
  );
}
