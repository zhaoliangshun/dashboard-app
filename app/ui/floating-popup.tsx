'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'

export interface FloatingPopupProps {
  trigger: React.ReactNode
  children: React.ReactNode
  position?: 'top' | 'bottom'
  align?: 'left' | 'right' | 'center'
  offset?: number
  className?: string
  popupClassName?: string
  onOpenChange?: (open: boolean) => void
  closeOnClickOutside?: boolean
  closeOnEscape?: boolean
}

interface Position {
  top: number
  left: number
  align: 'left' | 'right' | 'center'
}

export function FloatingPopup({
  trigger,
  children,
  position = 'bottom',
  align = 'center',
  offset = 8,
  className = '',
  popupClassName = '',
  onOpenChange,
  closeOnClickOutside = true,
  closeOnEscape = true,
}: FloatingPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [popupPosition, setPopupPosition] = useState<Position>({
    top: 0,
    left: 0,
    align: 'center',
  })
  const triggerRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !popupRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const popupRect = popupRef.current.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    let top: number
    let left: number
    let finalAlign: 'left' | 'right' | 'center' = align

    // 计算垂直位置
    if (position === 'top') {
      top = triggerRect.top - popupRect.height - offset
      // 如果上方空间不够，改为下方显示
      if (top < 0) {
        top = triggerRect.bottom + offset
      }
    } else {
      top = triggerRect.bottom + offset
      // 如果下方空间不够，改为上方显示
      if (top + popupRect.height > viewportHeight) {
        top = triggerRect.top - popupRect.height - offset
      }
    }

    // 计算水平位置和对齐方式
    const triggerCenter = triggerRect.left + triggerRect.width / 2
    const popupCenter = popupRect.width / 2

    if (align === 'center') {
      left = triggerCenter - popupCenter
      
      // 检查是否超出左边界
      if (left < 0) {
        left = 0
        finalAlign = 'left'
      }
      // 检查是否超出右边界
      else if (left + popupRect.width > viewportWidth) {
        left = viewportWidth - popupRect.width
        finalAlign = 'right'
      }
    } else if (align === 'left') {
      left = triggerRect.left
      
      // 如果超出右边界，改为右对齐
      if (left + popupRect.width > viewportWidth) {
        left = triggerRect.right - popupRect.width
        finalAlign = 'right'
      }
    } else if (align === 'right') {
      left = triggerRect.right - popupRect.width
      
      // 如果超出左边界，改为左对齐
      if (left < 0) {
        left = triggerRect.left
        finalAlign = 'left'
      }
    }

    // 确保弹窗完全在视口内
    if (left < 0) left = 0
    if (left + popupRect.width > viewportWidth) {
      left = viewportWidth - popupRect.width
    }
    if (top < 0) top = 0
    if (top + popupRect.height > viewportHeight) {
      top = viewportHeight - popupRect.height
    }

    setPopupPosition({ top, left, align: finalAlign })
  }, [position, align, offset])

  const handleToggle = () => {
    const newOpen = !isOpen
    setIsOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  const handleClose = useCallback(() => {
    setIsOpen(false)
    onOpenChange?.(false)
  }, [onOpenChange])

  // 点击外部关闭
  useEffect(() => {
    if (!isOpen || !closeOnClickOutside) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        handleClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, closeOnClickOutside, handleClose])

  // ESC键关闭
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, closeOnEscape, handleClose])

  // 计算位置
  useEffect(() => {
    if (isOpen) {
      // 延迟计算位置，确保弹窗已渲染
      const timer = setTimeout(calculatePosition, 0)
      return () => clearTimeout(timer)
    }
  }, [isOpen, calculatePosition])

  // 窗口大小改变时重新计算位置
  useEffect(() => {
    if (!isOpen) return

    const handleResize = () => {
      calculatePosition()
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', calculatePosition, true)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', calculatePosition, true)
    }
  }, [isOpen, calculatePosition])

  return (
    <>
      <div ref={triggerRef} className={className} onClick={handleToggle}>
        {trigger}
      </div>
      
      {isOpen &&
        createPortal(
          <div
            ref={popupRef}
            className={`fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-[200px] max-w-[400px] ${popupClassName}`}
            style={{
              top: `${popupPosition.top}px`,
              left: `${popupPosition.left}px`,
            }}
          >
            {/* 箭头指示器 */}
            <div
              className={`absolute w-0 h-0 border-4 border-transparent ${
                position === 'top'
                  ? 'border-t-gray-200 -bottom-2'
                  : 'border-b-gray-200 -top-2'
              } ${
                popupPosition.align === 'left'
                  ? 'left-4'
                  : popupPosition.align === 'right'
                  ? 'right-4'
                  : 'left-1/2 transform -translate-x-1/2'
              }`}
            />
            
            {/* 内容 */}
            <div className="relative z-10">
              {children}
            </div>
          </div>,
          document.body
        )}
    </>
  )
}

// 使用示例组件
export function FloatingPopupDemo() {
  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold mb-6">浮动弹窗演示</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 左对齐弹窗 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">左对齐</h3>
          <FloatingPopup
            trigger={
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                左对齐弹窗
              </button>
            }
            align="left"
            position="bottom"
          >
            <div className="space-y-2">
              <h4 className="font-semibold">左对齐弹窗</h4>
              <p className="text-sm text-gray-600">
                这个弹窗会根据触发元素的位置自动左对齐显示。
              </p>
              <button className="text-sm text-blue-500 hover:text-blue-600">
                了解更多
              </button>
            </div>
          </FloatingPopup>
        </div>

        {/* 居中对齐弹窗 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">居中对齐</h3>
          <FloatingPopup
            trigger={
              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                居中对齐弹窗
              </button>
            }
            align="center"
            position="bottom"
          >
            <div className="space-y-2">
              <h4 className="font-semibold">居中对齐弹窗</h4>
              <p className="text-sm text-gray-600">
                这个弹窗会居中显示在触发元素下方。
              </p>
              <div className="flex space-x-2">
                <button className="text-sm text-green-500 hover:text-green-600">
                  确认
                </button>
                <button className="text-sm text-gray-500 hover:text-gray-600">
                  取消
                </button>
              </div>
            </div>
          </FloatingPopup>
        </div>

        {/* 右对齐弹窗 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">右对齐</h3>
          <FloatingPopup
            trigger={
              <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
                右对齐弹窗
              </button>
            }
            align="right"
            position="bottom"
          >
            <div className="space-y-2">
              <h4 className="font-semibold">右对齐弹窗</h4>
              <p className="text-sm text-gray-600">
                这个弹窗会右对齐显示在触发元素下方。
              </p>
              <button className="text-sm text-purple-500 hover:text-purple-600">
                关闭
              </button>
            </div>
          </FloatingPopup>
        </div>
      </div>

      {/* 上方弹窗演示 */}
      <div className="mt-12 space-y-4">
        <h3 className="text-lg font-semibold">上方弹窗</h3>
        <div className="flex space-x-4">
          <FloatingPopup
            trigger={
              <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                上方弹窗
              </button>
            }
            align="center"
            position="top"
          >
            <div className="space-y-2">
              <h4 className="font-semibold">上方弹窗</h4>
              <p className="text-sm text-gray-600">
                这个弹窗显示在触发元素的上方。
              </p>
            </div>
          </FloatingPopup>
        </div>
      </div>

      {/* 边界情况演示 */}
      <div className="mt-12 space-y-4">
        <h3 className="text-lg font-semibold">边界自适应演示</h3>
        <div className="flex justify-between">
          <FloatingPopup
            trigger={
              <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                左边界测试
              </button>
            }
            align="left"
            position="bottom"
          >
            <div className="space-y-2">
              <h4 className="font-semibold">左边界自适应</h4>
              <p className="text-sm text-gray-600">
                当空间不足时会自动调整对齐方式。
              </p>
            </div>
          </FloatingPopup>

          <FloatingPopup
            trigger={
              <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                右边界测试
              </button>
            }
            align="right"
            position="bottom"
          >
            <div className="space-y-2">
              <h4 className="font-semibold">右边界自适应</h4>
              <p className="text-sm text-gray-600">
                当空间不足时会自动调整对齐方式。
              </p>
            </div>
          </FloatingPopup>
        </div>
      </div>
    </div>
  )
}
