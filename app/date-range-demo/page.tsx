"use client";

import { useState } from "react";
import DateRangePicker, { DateRange } from "@/app/ui/date-range-picker";

export default function Page() {
    const [range, setRange] = useState<DateRange>({ startDate: null, endDate: null });

    return (
        <div className="flex min-h-[60vh] flex-col gap-6 p-6">
            <h1 className="text-xl font-semibold">日期范围选择器示例</h1>
            <div className="max-w-sm">
                <DateRangePicker value={range} onChange={setRange} />
            </div>
            <div className="text-sm text-gray-700">
                当前选择：{range.startDate?.toDateString() || "-"} ~ {range.endDate?.toDateString() || "-"}
            </div>
        </div>
    );
}


