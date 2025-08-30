import ResizablePanel from '../ui/resizable-panel';

export default function ResizablePanelDemo() {
  return (
    <div className="h-screen bg-gray-50">
      <ResizablePanel
        minLeftWidth={200}
        maxLeftWidth={600}
        defaultLeftWidth={300}
        className="h-full"
      >
        {/* 左侧面板内容 */}
        <div className="h-full bg-white border-r border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">左侧面板</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">文件列表</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  document-1.pdf
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  image-2.jpg
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  spreadsheet.xlsx
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  presentation.pptx
                </li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium text-green-900 mb-2">快速操作</h3>
              <div className="space-y-2">
                <button className="w-full bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 transition-colors">
                  新建文件
                </button>
                <button className="w-full bg-green-100 text-green-700 px-3 py-2 rounded text-sm hover:bg-green-200 transition-colors">
                  上传文件
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧面板内容 */}
        <div className="h-full bg-white p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">右侧面板</h2>
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">使用说明</h3>
              <p className="text-gray-600 text-sm mb-3">
                这是一个可拖动分隔线的演示。你可以通过拖动中间的分隔线来调整左右两个面板的大小。
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 将鼠标悬停在分隔线上，光标会变为调整大小样式</li>
                <li>• 按住鼠标左键并左右拖动来调整面板宽度</li>
                <li>• 左侧面板宽度限制在 200px 到 600px 之间</li>
                <li>• 右侧面板会自动填充剩余空间</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-medium text-purple-900 mb-2">功能特性</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    平滑拖动
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    宽度限制
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    响应式设计
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    可自定义样式
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-medium text-orange-900 mb-2">代码示例</h3>
              <pre className="text-xs text-orange-800 bg-orange-100 p-3 rounded overflow-x-auto">
{`<ResizablePanel
  minLeftWidth={200}
  maxLeftWidth={600}
  defaultLeftWidth={300}
>
  <div>左侧内容</div>
  <div>右侧内容</div>
</ResizablePanel>`}
              </pre>
            </div>
          </div>
        </div>
      </ResizablePanel>
    </div>
  );
}


