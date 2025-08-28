'use client';

import React from 'react';
import Triangle, {
    TriangleUp,
    TriangleDown,
    TriangleLeft,
    TriangleRight,
    EquilateralTriangle,
    IsoscelesTriangle,
    GradientTriangle
} from './triangle';

export default function TriangleDemo() {
    return (
        <div className="p-8 space-y-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">CSS 三角形函数演示</h1>

            {/* React 组件示例 */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">React 组件使用</h2>
                <div className="space-y-6">
                    {/* 基础组件 */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-700 mb-3">基础组件</h3>
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col items-center gap-2">
                                <TriangleUp size="md" color="#3b82f6" />
                                <span className="text-sm text-gray-600">TriangleUp</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <TriangleDown size="md" color="#ef4444" />
                                <span className="text-sm text-gray-600">TriangleDown</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <TriangleLeft size="md" color="#10b981" />
                                <span className="text-sm text-gray-600">TriangleLeft</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <TriangleRight size="md" color="#8b5cf6" />
                                <span className="text-sm text-gray-600">TriangleRight</span>
                            </div>
                        </div>
                    </div>

                    {/* 不同尺寸 */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-700 mb-3">不同尺寸</h3>
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col items-center gap-2">
                                <TriangleUp size="xs" color="#3b82f6" />
                                <span className="text-sm text-gray-600">XS</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <TriangleUp size="sm" color="#3b82f6" />
                                <span className="text-sm text-gray-600">SM</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <TriangleUp size="md" color="#3b82f6" />
                                <span className="text-sm text-gray-600">MD</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <TriangleUp size="lg" color="#3b82f6" />
                                <span className="text-sm text-gray-600">LG</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <TriangleUp size="xl" color="#3b82f6" />
                                <span className="text-sm text-gray-600">XL</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <TriangleUp size="2xl" color="#3b82f6" />
                                <span className="text-sm text-gray-600">2XL</span>
                            </div>
                        </div>
                    </div>

                    {/* 特殊三角形 */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-700 mb-3">特殊三角形</h3>
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col items-center gap-2">
                                <EquilateralTriangle color="#f97316" />
                                <span className="text-sm text-gray-600">等边三角形</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <IsoscelesTriangle color="#ec4899" />
                                <span className="text-sm text-gray-600">等腰三角形</span>
                            </div>
                        </div>
                    </div>

                    {/* 高级三角形 */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-700 mb-3">高级三角形</h3>
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col items-center gap-2">
                                <Triangle type="advanced" direction="up" size="md" color="#3b82f6" />
                                <span className="text-sm text-gray-600">高级向上</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Triangle type="advanced" direction="down" size="md" color="#ef4444" />
                                <span className="text-sm text-gray-600">高级向下</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <GradientTriangle direction="up" size="md" />
                                <span className="text-sm text-gray-600">渐变向上</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <GradientTriangle direction="down" size="md" />
                                <span className="text-sm text-gray-600">渐变向下</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 基础方向三角形 */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">基础方向三角形</h2>
                <div className="flex items-center gap-8">
                    <div className="flex flex-col items-center gap-2">
                        <div className="triangle-up text-blue-500"></div>
                        <span className="text-sm text-gray-600">向上</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="triangle-down text-red-500"></div>
                        <span className="text-sm text-gray-600">向下</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="triangle-left text-green-500"></div>
                        <span className="text-sm text-gray-600">向左</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="triangle-right text-purple-500"></div>
                        <span className="text-sm text-gray-600">向右</span>
                    </div>
                </div>
            </section>

            {/* 不同尺寸的三角形 */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">不同尺寸的三角形</h2>
                <div className="flex items-center gap-8">
                    <div className="flex flex-col items-center gap-2">
                        <div className="triangle-up triangle-sm text-blue-500"></div>
                        <span className="text-sm text-gray-600">小号</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="triangle-up triangle-md text-blue-500"></div>
                        <span className="text-sm text-gray-600">中号</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="triangle-up triangle-lg text-blue-500"></div>
                        <span className="text-sm text-gray-600">大号</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="triangle-up triangle-xl text-blue-500"></div>
                        <span className="text-sm text-gray-600">超大号</span>
                    </div>
                </div>
            </section>

            {/* 特殊三角形 */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">特殊三角形</h2>
                <div className="flex items-center gap-8">
                    <div className="flex flex-col items-center gap-2">
                        <div className="triangle-equilateral text-orange-500"></div>
                        <span className="text-sm text-gray-600">等边三角形</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="triangle-isosceles text-pink-500"></div>
                        <span className="text-sm text-gray-600">等腰三角形</span>
                    </div>
                </div>
            </section>

            {/* 高级三角形函数 */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">高级三角形函数 (CSS自定义属性)</h2>
                <div className="space-y-6">
                    {/* 不同尺寸的高级三角形 */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-700 mb-3">不同尺寸</h3>
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col items-center gap-2">
                                <div className="triangle-advanced text-blue-500" data-direction="up" data-size="xs"></div>
                                <span className="text-sm text-gray-600">XS</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="triangle-advanced text-blue-500" data-direction="up" data-size="sm"></div>
                                <span className="text-sm text-gray-600">SM</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="triangle-advanced text-blue-500" data-direction="up" data-size="md"></div>
                                <span className="text-sm text-gray-600">MD</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="triangle-advanced text-blue-500" data-direction="up" data-size="lg"></div>
                                <span className="text-sm text-gray-600">LG</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="triangle-advanced text-blue-500" data-direction="up" data-size="xl"></div>
                                <span className="text-sm text-gray-600">XL</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="triangle-advanced text-blue-500" data-direction="up" data-size="2xl"></div>
                                <span className="text-sm text-gray-600">2XL</span>
                            </div>
                        </div>
                    </div>

                    {/* 不同方向的高级三角形 */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-700 mb-3">不同方向</h3>
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col items-center gap-2">
                                <div className="triangle-advanced text-green-500" data-direction="up" data-size="md"></div>
                                <span className="text-sm text-gray-600">向上</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="triangle-advanced text-red-500" data-direction="down" data-size="md"></div>
                                <span className="text-sm text-gray-600">向下</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="triangle-advanced text-purple-500" data-direction="left" data-size="md"></div>
                                <span className="text-sm text-gray-600">向左</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="triangle-advanced text-orange-500" data-direction="right" data-size="md"></div>
                                <span className="text-sm text-gray-600">向右</span>
                            </div>
                        </div>
                    </div>

                    {/* 渐变三角形 */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-700 mb-3">渐变三角形</h3>
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col items-center gap-2">
                                <div className="triangle-gradient" data-direction="up"></div>
                                <span className="text-sm text-gray-600">渐变向上</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="triangle-gradient" data-direction="down"></div>
                                <span className="text-sm text-gray-600">渐变向下</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 实际应用示例 */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">实际应用示例</h2>
                <div className="space-y-4">
                    {/* 下拉箭头 */}
                    <div className="flex items-center gap-2">
                        <span className="text-gray-700">下拉菜单</span>
                        <TriangleDown size="sm" color="#6b7280" />
                    </div>

                    {/* 展开箭头 */}
                    <div className="flex items-center gap-2">
                        <span className="text-gray-700">展开内容</span>
                        <TriangleRight size="sm" color="#6b7280" />
                    </div>

                    {/* 面包屑导航 */}
                    <div className="flex items-center gap-2">
                        <span className="text-gray-700">首页</span>
                        <TriangleRight size="sm" color="#9ca3af" />
                        <span className="text-gray-700">产品</span>
                        <TriangleRight size="sm" color="#9ca3af" />
                        <span className="text-gray-700">详情</span>
                    </div>

                    {/* 提示框 */}
                    <div className="relative inline-block">
                        <div className="bg-blue-100 border border-blue-300 rounded-lg p-3">
                            <p className="text-blue-800">这是一个提示框</p>
                            <div className="absolute top-full left-4 triangle-up text-blue-100"></div>
                        </div>
                    </div>

                    {/* 高级应用示例 */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-700">高级应用</h3>

                        {/* 可折叠面板 */}
                        <div className="border border-gray-200 rounded-lg">
                            <button className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50">
                                <span className="font-medium">可折叠面板</span>
                                <TriangleDown size="sm" color="#6b7280" />
                            </button>
                            <div className="p-4 border-t border-gray-200 bg-gray-50">
                                <p className="text-gray-700">这是面板的内容...</p>
                            </div>
                        </div>

                        {/* 进度指示器 */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">步骤 1</span>
                            <TriangleRight size="xs" color="#10b981" />
                            <span className="text-sm text-gray-600">步骤 2</span>
                            <TriangleRight size="xs" color="#d1d5db" />
                            <span className="text-sm text-gray-400">步骤 3</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 使用说明 */}
            <section className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">使用方法</h2>
                <div className="space-y-4 text-sm text-gray-700">
                    <div>
                        <h3 className="font-medium text-gray-800 mb-2">React 组件：</h3>
                        <p><code className="bg-gray-200 px-1 rounded">&lt;TriangleUp size="md" color="#3b82f6" /&gt;</code></p>
                        <p><code className="bg-gray-200 px-1 rounded">&lt;Triangle type="advanced" direction="down" size="xl" color="#ef4444" /&gt;</code></p>
                        <p><code className="bg-gray-200 px-1 rounded">&lt;GradientTriangle direction="up" size="lg" /&gt;</code></p>
                    </div>

                    <div>
                        <h3 className="font-medium text-gray-800 mb-2">CSS 类：</h3>
                        <p><code className="bg-gray-200 px-1 rounded">triangle</code> - 基础三角形类</p>
                        <p><code className="bg-gray-200 px-1 rounded">triangle-up</code>, <code className="bg-gray-200 px-1 rounded">triangle-down</code>, <code className="bg-gray-200 px-1 rounded">triangle-left</code>, <code className="bg-gray-200 px-1 rounded">triangle-right</code> - 方向类</p>
                        <p><code className="bg-gray-200 px-1 rounded">triangle-sm</code>, <code className="bg-gray-200 px-1 rounded">triangle-md</code>, <code className="bg-gray-200 px-1 rounded">triangle-lg</code>, <code className="bg-gray-200 px-1 rounded">triangle-xl</code> - 尺寸类</p>
                    </div>

                    <div>
                        <h3 className="font-medium text-gray-800 mb-2">高级类：</h3>
                        <p><code className="bg-gray-200 px-1 rounded">triangle-advanced</code> - 使用CSS自定义属性的高级三角形</p>
                        <p><code className="bg-gray-200 px-1 rounded">triangle-gradient</code> - 渐变三角形</p>
                        <p><code className="bg-gray-200 px-1 rounded">triangle-equilateral</code>, <code className="bg-gray-200 px-1 rounded">triangle-isosceles</code> - 特殊三角形</p>
                    </div>

                    <div>
                        <h3 className="font-medium text-gray-800 mb-2">CSS 示例：</h3>
                        <p><code className="bg-gray-200 px-1 rounded">&lt;div className="triangle-up text-blue-500 triangle-lg"&gt;&lt;/div&gt;</code></p>
                        <p><code className="bg-gray-200 px-1 rounded">&lt;div className="triangle-advanced text-red-500" data-direction="down" data-size="xl"&gt;&lt;/div&gt;</code></p>
                        <p><code className="bg-gray-200 px-1 rounded">&lt;div className="triangle-gradient" data-direction="up"&gt;&lt;/div&gt;</code></p>
                    </div>
                </div>
            </section>
        </div>
    );
}
