import ResizableSidebar from '../ui/resizable-sidebar';
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

export default function ResizableSidebarDemo() {
  return (
    <div className="h-screen flex bg-gray-50">
      <ResizableSidebar
        minWidth={180}
        maxWidth={350}
        defaultWidth={250}
        collapsedWidth={60}
        className="shadow-lg"
      >
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
      </ResizableSidebar>

      {/* 主内容区域 */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">可拖动菜单栏演示</h1>
          
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
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                响应式设计，支持最小/最大宽度限制
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                可自定义配置参数
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">使用说明</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                <strong>拖动调整：</strong>将鼠标悬停在菜单右侧边缘，当光标变为调整大小时，按住鼠标左键并左右拖动即可调整菜单宽度。
              </p>
              <p>
                <strong>折叠菜单：</strong>点击菜单右上角的折叠按钮可以收起菜单，再次点击可展开。
              </p>
              <p>
                <strong>宽度限制：</strong>菜单宽度在 180px 到 350px 之间可调，折叠时宽度为 60px。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
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
