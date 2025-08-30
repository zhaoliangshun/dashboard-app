'use client';

import { useState } from 'react';
import ResizableSidebar from '../../ui/resizable-sidebar';
import ResizableSidebarAdvanced from '../../ui/resizable-sidebar-advanced';
import { 
  HomeIcon, 
  UserGroupIcon, 
  DocumentTextIcon, 
  CogIcon, 
  ChartBarIcon,
  FolderIcon,
  CalendarIcon,
  BellIcon
} from '@heroicons/react/24/outline';

export default function AdvancedResizableSidebarDemo() {
  const [activeTab, setActiveTab] = useState<'basic' | 'advanced'>('basic');
  const [snapToGrid, setSnapToGrid] = useState(false);

  return (
    <div className="h-screen flex bg-gray-50">
      {/* 控制面板 */}
      <div className="absolute top-4 left-4 z-50 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">控制面板</h3>
        
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-600 block mb-1">选择版本</label>
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('basic')}
                className={`px-3 py-1 text-xs rounded-md transition-colors ${
                  activeTab === 'basic'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                基础版
              </button>
              <button
                onClick={() => setActiveTab('advanced')}
                className={`px-3 py-1 text-xs rounded-md transition-colors ${
                  activeTab === 'advanced'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                高级版
              </button>
            </div>
          </div>

          {activeTab === 'advanced' && (
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={snapToGrid}
                  onChange={(e) => setSnapToGrid(e.target.checked)}
                  className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                />
                <span className="text-xs text-gray-600">网格对齐 (10px)</span>
              </label>
            </div>
          )}
        </div>
      </div>

      {/* 侧边栏 */}
      {activeTab === 'basic' ? (
        <ResizableSidebar
          minWidth={180}
          maxWidth={350}
          defaultWidth={250}
          collapsedWidth={60}
          className="shadow-lg"
        >
          <SidebarContent />
        </ResizableSidebar>
      ) : (
        <ResizableSidebarAdvanced
          minWidth={180}
          maxWidth={350}
          defaultWidth={250}
          collapsedWidth={60}
          className="shadow-lg"
          enableTouch={true}
          snapToGrid={snapToGrid}
          gridSize={10}
        >
          <SidebarContent />
        </ResizableSidebarAdvanced>
      )}

      {/* 主内容区域 */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {activeTab === 'basic' ? '基础版' : '高级版'} 可拖动菜单栏演示
          </h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">功能特性</h2>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                左右拖动分隔线调整菜单宽度
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                点击折叠按钮收起/展开菜单
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                平滑的动画过渡效果
              </li>
              {activeTab === 'advanced' && (
                <>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    支持触摸设备拖动
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    网格对齐功能
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// 侧边栏内容组件
function SidebarContent() {
  return (
    <>
      {/* 菜单头部 */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-gray-900 truncate">Dashboard</h2>
            <p className="text-sm text-gray-500 truncate">管理面板</p>
          </div>
        </div>
      </div>

      {/* 菜单项 */}
      <nav className="flex-1 p-4 space-y-2">
        <MenuItem icon={HomeIcon} label="首页" active />
        <MenuItem icon={ChartBarIcon} label="数据统计" />
        <MenuItem icon={UserGroupIcon} label="用户管理" />
        <MenuItem icon={DocumentTextIcon} label="文档管理" />
        <MenuItem icon={FolderIcon} label="文件管理" />
        <MenuItem icon={CalendarIcon} label="日程安排" />
        <MenuItem icon={BellIcon} label="通知中心" />
        <MenuItem icon={CogIcon} label="系统设置" />
      </nav>

      {/* 底部用户信息 */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 font-medium text-sm">U</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">用户名</p>
            <p className="text-xs text-gray-500 truncate">user@example.com</p>
          </div>
        </div>
      </div>
    </>
  );
}

// 菜单项组件
function MenuItem({ 
  icon: Icon, 
  label, 
  active = false 
}: { 
  icon: any; 
  label: string; 
  active?: boolean; 
}) {
  return (
    <button
      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
        active 
          ? 'bg-blue-50 text-blue-700 border border-blue-200' 
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span className="text-sm font-medium truncate">{label}</span>
    </button>
  );
}
