"use client";

import { useState } from "react";
import Select, { SelectOption } from "../ui/select";

const countryOptions: SelectOption[] = [
    { label: "中国", value: "china" },
    { label: "美国", value: "usa" },
    { label: "日本", value: "japan" },
    { label: "韩国", value: "korea" },
    { label: "英国", value: "uk" },
    { label: "法国", value: "france" },
    { label: "德国", value: "germany" },
    { label: "意大利", value: "italy" },
    { label: "西班牙", value: "spain" },
    { label: "加拿大", value: "canada" },
    { label: "澳大利亚", value: "australia" },
    { label: "巴西", value: "brazil" },
    { label: "印度", value: "india" },
    { label: "俄罗斯", value: "russia" },
    { label: "墨西哥", value: "mexico" },
];

const statusOptions: SelectOption[] = [
    { label: "活跃", value: "active" },
    { label: "非活跃", value: "inactive" },
    { label: "待审核", value: "pending" },
    { label: "已禁用", value: "disabled" },
];

const sizeOptions: SelectOption[] = [
    { label: "小", value: "small" },
    { label: "中", value: "medium" },
    { label: "大", value: "large" },
    { label: "超大", value: "extra-large" },
];

export default function SelectDemo() {
    const [selectedCountry, setSelectedCountry] = useState<string>("");
    const [selectedStatus, setSelectedStatus] = useState<string>("active");
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [disabledSelect, setDisabledSelect] = useState<string>("");

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="mx-auto max-w-4xl px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">下拉选择器演示</h1>
                    <p className="mt-2 text-gray-600">
                        一个功能完整的单选下拉选择器组件，支持搜索、清除、键盘导航等功能。
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    {/* 基础用法 */}
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-xl font-semibold text-gray-900">基础用法</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    选择国家
                                </label>
                                <Select
                                    options={countryOptions}
                                    value={selectedCountry}
                                    onChange={setSelectedCountry}
                                    placeholder="请选择国家..."
                                />
                                <p className="mt-1 text-xs text-gray-500">
                                    当前选择: {selectedCountry || "未选择"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 带默认值 */}
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-xl font-semibold text-gray-900">带默认值</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    状态
                                </label>
                                <Select
                                    options={statusOptions}
                                    value={selectedStatus}
                                    onChange={setSelectedStatus}
                                    placeholder="请选择状态..."
                                />
                                <p className="mt-1 text-xs text-gray-500">
                                    当前选择: {selectedStatus}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 禁用状态 */}
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-xl font-semibold text-gray-900">禁用状态</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    禁用的选择器
                                </label>
                                <Select
                                    options={sizeOptions}
                                    value={disabledSelect}
                                    onChange={setDisabledSelect}
                                    placeholder="此选择器已禁用"
                                    disabled={true}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 不可清除 */}
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-xl font-semibold text-gray-900">不可清除</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    尺寸 (不可清除)
                                </label>
                                <Select
                                    options={sizeOptions}
                                    value={selectedSize}
                                    onChange={setSelectedSize}
                                    placeholder="请选择尺寸..."
                                    clearable={false}
                                />
                                <p className="mt-1 text-xs text-gray-500">
                                    当前选择: {selectedSize || "未选择"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 不可搜索 */}
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-xl font-semibold text-gray-900">不可搜索</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    状态 (不可搜索)
                                </label>
                                <Select
                                    options={statusOptions}
                                    value={selectedStatus}
                                    onChange={setSelectedStatus}
                                    placeholder="请选择状态..."
                                    searchable={false}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 自定义样式 */}
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-xl font-semibold text-gray-900">自定义样式</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    自定义宽度
                                </label>
                                <Select
                                    options={countryOptions}
                                    value={selectedCountry}
                                    onChange={setSelectedCountry}
                                    placeholder="请选择国家..."
                                    className="w-64"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 功能说明 */}
                <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold text-gray-900">功能特性</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <h3 className="mb-2 font-medium text-gray-900">基础功能</h3>
                            <ul className="space-y-1 text-sm text-gray-600">
                                <li>• 单选下拉选择</li>
                                <li>• 支持搜索过滤</li>
                                <li>• 支持清除选择</li>
                                <li>• 键盘导航支持</li>
                                <li>• 禁用状态支持</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-2 font-medium text-gray-900">键盘操作</h3>
                            <ul className="space-y-1 text-sm text-gray-600">
                                <li>• ↑/↓ 键导航选项</li>
                                <li>• Enter/Space 选择选项</li>
                                <li>• Escape 关闭下拉框</li>
                                <li>• 输入字符进行搜索</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 代码示例 */}
                <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold text-gray-900">使用示例</h2>
                    <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 text-sm">
                        <code>{`import Select, { SelectOption } from "./ui/select";

const options: SelectOption[] = [
  { label: "选项1", value: "option1" },
  { label: "选项2", value: "option2" },
  { label: "选项3", value: "option3" },
];

function MyComponent() {
  const [value, setValue] = useState("");
  
  return (
    <Select
      options={options}
      value={value}
      onChange={setValue}
      placeholder="请选择..."
      searchable={true}
      clearable={true}
    />
  );
}`}</code>
                    </pre>
                </div>
            </div>
        </div>
    );
}
