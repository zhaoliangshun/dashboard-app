"use client";

import { useState } from "react";
import MultiSelect, { MultiSelectOption } from "../ui/multi-select";

const OPTIONS: MultiSelectOption[] = [
    { label: "苹果", value: "apple" },
    { label: "香蕉", value: "banana" },
    { label: "樱桃", value: "cherry" },
    { label: "榴莲（禁选）", value: "durian", disabled: true },
    { label: "葡萄", value: "grape" },
    { label: "哈密瓜", value: "hami" },
    { label: "橘子", value: "orange" },
    { label: "西瓜", value: "watermelon" },
];

export default function MultiSelectDemoPage() {
    const [selected, setSelected] = useState<string[]>([]);
    return (
        <div className="p-6 space-y-6">
            <h1 className="text-xl font-semibold">多选下拉选择器 Demo</h1>
            <div className="max-w-md">
                <MultiSelect
                    options={OPTIONS}
                    value={selected}
                    onChange={setSelected}
                    placeholder="选择水果…"
                />
            </div>
            <div className="text-sm text-gray-600">
                已选择：{selected.length ? selected.join(", ") : "无"}
            </div>
        </div>
    );
}



