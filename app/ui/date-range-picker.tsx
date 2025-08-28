"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { clsx } from "clsx";

type DateLike = Date | null;

export type DateRange = {
    startDate: DateLike;
    endDate: DateLike;
};

export type DateRangePickerProps = {
    value?: DateRange;
    defaultValue?: DateRange;
    onChange?: (range: DateRange) => void;
    minDate?: Date;
    maxDate?: Date;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
};

function startOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function isSameDay(a: Date, b: Date): boolean {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

function clamp(date: Date, minDate?: Date, maxDate?: Date): Date {
    let d = date;
    if (minDate && d < minDate) d = minDate;
    if (maxDate && d > maxDate) d = maxDate;
    return d;
}

function addMonths(date: Date, months: number): Date {
    const d = new Date(date);
    d.setMonth(d.getMonth() + months);
    return d;
}

function format(date: Date): string {
    const y = date.getFullYear();
    const m = `${date.getMonth() + 1}`.padStart(2, "0");
    const d = `${date.getDate()}`.padStart(2, "0");
    return `${y}-${m}-${d}`;
}

function inRange(day: Date, start: DateLike, end: DateLike): boolean {
    if (!start || !end) return false;
    const startTime = start.getTime();
    const endTime = end.getTime();
    const current = day.getTime();
    return current >= Math.min(startTime, endTime) && current <= Math.max(startTime, endTime);
}

export default function DateRangePicker({
    value,
    defaultValue,
    onChange,
    minDate,
    maxDate,
    placeholder = "选择日期范围",
    className,
    disabled,
}: DateRangePickerProps) {
    const isControlled = value !== undefined;
    const [uncontrolled, setUncontrolled] = useState<DateRange>(
        defaultValue ?? { startDate: null, endDate: null }
    );
    const range = isControlled ? value! : uncontrolled;

    const [open, setOpen] = useState(false);
    const [viewDate, setViewDate] = useState<Date>(() => {
        const base = range.startDate ?? new Date();
        return clamp(base, minDate, maxDate);
    });
    const [hoverDate, setHoverDate] = useState<DateLike>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function onDocClick(e: MouseEvent) {
            if (!containerRef.current) return;
            if (!containerRef.current.contains(e.target as Node)) {
                setOpen(false);
                setHoverDate(null);
            }
        }
        if (open) document.addEventListener("mousedown", onDocClick);
        return () => document.removeEventListener("mousedown", onDocClick);
    }, [open]);

    const monthStart = useMemo(() => startOfMonth(viewDate), [viewDate]);
    const monthEnd = useMemo(() => endOfMonth(viewDate), [viewDate]);

    const days: Date[] = useMemo(() => {
        const firstWeekday = monthStart.getDay();
        const daysInMonth = monthEnd.getDate();
        const result: Date[] = [];

        // Fill previous month's tail to start from Sunday
        for (let i = 0; i < firstWeekday; i++) {
            const d = new Date(monthStart);
            d.setDate(d.getDate() - (firstWeekday - i));
            result.push(d);
        }
        // Current month
        for (let i = 1; i <= daysInMonth; i++) {
            result.push(new Date(viewDate.getFullYear(), viewDate.getMonth(), i));
        }
        // Next month's head to complete 6 rows (42 cells)
        while (result.length % 7 !== 0) {
            const d = new Date(result[result.length - 1]);
            d.setDate(d.getDate() + 1);
            result.push(d);
        }
        while (result.length < 42) {
            const d = new Date(result[result.length - 1]);
            d.setDate(d.getDate() + 1);
            result.push(d);
        }
        return result;
    }, [monthStart, monthEnd, viewDate]);

    const displayText = useMemo(() => {
        if (range.startDate && range.endDate) {
            return `${format(range.startDate)} ~ ${format(range.endDate)}`;
        }
        if (range.startDate) return `${format(range.startDate)} ~`;
        return "";
    }, [range.startDate, range.endDate]);

    const setRange = useCallback(
        (next: DateRange) => {
            if (isControlled) onChange?.(next);
            else setUncontrolled(next);
        },
        [isControlled, onChange]
    );

    const handleSelect = useCallback(
        (day: Date) => {
            if (disabled) return;
            const d = clamp(day, minDate, maxDate);
            const { startDate, endDate } = range;
            if (!startDate || (startDate && endDate)) {
                setRange({ startDate: d, endDate: null });
                setHoverDate(null);
            } else if (startDate && !endDate) {
                const start = startDate;
                const end = d;
                const normalized = start <= end ? { startDate: start, endDate: end } : { startDate: end, endDate: start };
                setRange(normalized);
                setOpen(false);
                setHoverDate(null);
            }
        },
        [disabled, minDate, maxDate, range, setRange]
    );

    const handleClear = useCallback(() => {
        setRange({ startDate: null, endDate: null });
        setHoverDate(null);
    }, [setRange]);

    const isDisabled = useCallback(
        (day: Date) => {
            if (minDate && day < startOfDay(minDate)) return true;
            if (maxDate && day > startOfDay(maxDate)) return true;
            return false;
        },
        [minDate, maxDate]
    );

    function startOfDay(date: Date): Date {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    const weekdays = ["日", "一", "二", "三", "四", "五", "六"];

    return (
        <div ref={containerRef} className={clsx("relative", className)}>
            <button
                type="button"
                disabled={disabled}
                onClick={() => setOpen((v) => !v)}
                className={clsx(
                    "w-full inline-flex items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500",
                    disabled && "opacity-50 cursor-not-allowed"
                )}
            >
                <span className={clsx(!displayText && "text-gray-400")}>{displayText || placeholder}</span>
                {range.startDate || range.endDate ? (
                    <span
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClear();
                        }}
                        className="ml-2 text-gray-400 hover:text-gray-600"
                        aria-label="清除"
                    >
                        ×
                    </span>
                ) : (
                    <span className="ml-2 text-gray-400">📅</span>
                )}
            </button>

            {open && (
                <div className="absolute z-50 mt-2 w-[320px] rounded-md border border-gray-200 bg-white p-3 shadow-lg">
                    <div className="mb-2 flex items-center justify-between">
                        <button
                            type="button"
                            className="rounded p-1 text-gray-600 hover:bg-gray-100"
                            onClick={() => setViewDate((d) => addMonths(d, -1))}
                        >
                            ←
                        </button>
                        <div className="text-sm font-medium text-gray-900">
                            {viewDate.getFullYear()}年 {viewDate.getMonth() + 1}月
                        </div>
                        <button
                            type="button"
                            className="rounded p-1 text-gray-600 hover:bg-gray-100"
                            onClick={() => setViewDate((d) => addMonths(d, 1))}
                        >
                            →
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500">
                        {weekdays.map((w) => (
                            <div key={w} className="py-1">
                                {w}
                            </div>
                        ))}
                    </div>
                    <div className="mt-1 grid grid-cols-7 gap-1">
                        {days.map((day, idx) => {
                            const isCurrentMonth = day.getMonth() === viewDate.getMonth();
                            const disabledDay = isDisabled(day);
                            const isStart = range.startDate ? isSameDay(day, range.startDate) : false;
                            const isEnd = range.endDate ? isSameDay(day, range.endDate) : false;
                            const previewEnd = range.startDate && !range.endDate && hoverDate ? hoverDate : null;
                            const inSelectedRange = inRange(day, range.startDate, range.endDate);
                            const inPreviewRange = previewEnd ? inRange(day, range.startDate, previewEnd) : false;

                            const isRangeMiddle = (inSelectedRange || inPreviewRange) && !isStart && !isEnd;

                            return (
                                <button
                                    key={idx}
                                    type="button"
                                    disabled={disabledDay}
                                    onMouseEnter={() => setHoverDate(day)}
                                    onMouseLeave={() => setHoverDate(null)}
                                    onClick={() => handleSelect(day)}
                                    className={clsx(
                                        "relative h-9 rounded text-sm",
                                        !isCurrentMonth && "text-gray-400",
                                        disabledDay && "opacity-40 cursor-not-allowed",
                                        isStart || isEnd ? "bg-blue-600 text-white" :
                                            isRangeMiddle ? "bg-blue-100 text-blue-900" :
                                                "hover:bg-gray-100",
                                    )}
                                >
                                    {day.getDate()}
                                </button>
                            );
                        })}
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs text-gray-600">
                        <div>
                            {range.startDate ? format(range.startDate) : "开始日期"} ~ {range.endDate ? format(range.endDate) : "结束日期"}
                        </div>
                        <div className="space-x-2">
                            <button
                                type="button"
                                className="rounded border border-gray-200 px-2 py-1 hover:bg-gray-50"
                                onClick={() => handleClear()}
                            >
                                清除
                            </button>
                            <button
                                type="button"
                                className="rounded bg-blue-600 px-2 py-1 text-white hover:bg-blue-700"
                                onClick={() => setOpen(false)}
                            >
                                确定
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


