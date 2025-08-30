'use client';

import { useState } from 'react';
import ResizableGrid from '../ui/resizable-grid';

export default function ResizableGridDemo() {
  const [layout, setLayout] = useState<'horizontal' | 'vertical' | 'both'>('horizontal');

  return (
    <div className="h-screen bg-gray-50 p-4">
      {/* 控制面板 */}
      <div className="mb-4 bg-white rounded-lg shadow-sm p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">可拖动网格布局演示</h1>
        <div className="flex items-center space-x-4">
          <label htmlFor="layout-select" className="text-sm font-medium text-gray-700">布局方向：</label>
          <select
            id="layout-select"
            value={layout}
            onChange={(e) => setLayout(e.target.value as any)}
            className="px-3 py-1 border border-gray-300 rounded text-sm"
            aria-label="选择布局方向"
          >
            <option value="horizontal">水平布局</option>
            <option value="vertical">垂直布局</option>
            <option value="both">双向布局</option>
          </select>
        </div>
      </div>

      {/* 网格布局 */}
      <div className="h-[calc(100vh-120px)] bg-white rounded-lg shadow-sm overflow-hidden">
        <ResizableGrid
          direction={layout}
          minSizes={[15, 15, 15]}
          maxSizes={[60, 60, 60]}
          defaultSizes={[33.33, 33.33, 33.34]}
          className="h-full"
        >
          {/* 第一个面板 */}
          <div className="h-full bg-blue-50 p-4">
            <h2 className="text-lg font-semibold text-blue-900 mb-3">面板 1</h2>
            <div className="space-y-3">
              <div className="bg-blue-100 p-3 rounded">
                <h3 className="font-medium text-blue-800 mb-2">文件管理器</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>📁 文档</li>
                  <li>📁 图片</li>
                  <li>📁 视频</li>
                  <li>📁 音乐</li>
                </ul>
              </div>
              <div className="bg-blue-200 p-3 rounded">
                <h3 className="font-medium text-blue-800 mb-2">快速操作</h3>
                <button className="w-full bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                  新建文件夹
                </button>
              </div>
            </div>
          </div>

          {/* 第二个面板 */}
          <div className="h-full bg-green-50 p-4">
            <h2 className="text-lg font-semibold text-green-900 mb-3">面板 2</h2>
            <div className="space-y-3">
              <div className="bg-green-100 p-3 rounded">
                <h3 className="font-medium text-green-800 mb-2">预览区域</h3>
                <div className="bg-white p-4 rounded border-2 border-dashed border-green-300 text-center">
                  <p className="text-green-600 text-sm">拖拽文件到此处预览</p>
                </div>
              </div>
              <div className="bg-green-200 p-3 rounded">
                <h3 className="font-medium text-green-800 mb-2">文件信息</h3>
                <div className="text-sm text-green-700 space-y-1">
                  <p>名称：example.jpg</p>
                  <p>大小：2.5 MB</p>
                  <p>类型：图片文件</p>
                </div>
              </div>
            </div>
          </div>

          {/* 第三个面板 */}
          <div className="h-full bg-purple-50 p-4">
            <h2 className="text-lg font-semibold text-purple-900 mb-3">面板 3</h2>
            <div className="space-y-3">
              <div className="bg-purple-100 p-3 rounded">
                <h3 className="font-medium text-purple-800 mb-2">属性面板</h3>
                <div className="text-sm text-purple-700 space-y-2">
                  <div>
                    <label className="block font-medium">文件名</label>
                    <input type="text" className="w-full px-2 py-1 border rounded text-xs" defaultValue="example.jpg" />
                  </div>
                  <div>
                    <label className="block font-medium">标签</label>
                    <input type="text" className="w-full px-2 py-1 border rounded text-xs" placeholder="添加标签..." />
                  </div>
                </div>
              </div>
              <div className="bg-purple-200 p-3 rounded">
                <h3 className="font-medium text-purple-800 mb-2">操作</h3>
                <div className="space-y-1">
                  <button className="w-full bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700">
                    重命名
                  </button>
                  <button className="w-full bg-purple-100 text-purple-700 px-3 py-1 rounded text-sm hover:bg-purple-200">
                    删除
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ResizableGrid>
      </div>

      {/* 说明文字 */}
      <div className="mt-4 bg-white rounded-lg shadow-sm p-4">
        <h3 className="font-semibold text-gray-900 mb-2">使用说明</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• 将鼠标悬停在分隔线上，光标会变为调整大小样式</p>
          <p>• 按住鼠标左键并拖动来调整面板大小</p>
          <p>• 每个面板的最小宽度为15%，最大宽度为60%</p>
          <p>• 可以通过上方的下拉菜单切换布局方向</p>
        </div>
      </div>
    </div>
  );
}
