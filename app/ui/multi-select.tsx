"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";

export type MultiSelectOption = {
    label: string;
    value: string;
    disabled?: boolean;
};

export type MultiSelectProps = {
    options: MultiSelectOption[];
    value: string[];
    onChange: (nextValues: string[]) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    maxDropdownHeightPx?: number;
    searchable?: boolean;
    selectAllEnabled?: boolean;
};

export default function MultiSelect({
    options,
    value,
    onChange,
    placeholder = "请选择…",
    disabled = false,
    className,
    maxDropdownHeightPx = 240,
    searchable = true,
    selectAllEnabled = true,
}: MultiSelectProps) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const containerRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const listRef = useRef<HTMLUListElement | null>(null);
    const [activeIndex, setActiveIndex] = useState<number>(-1);

    const filtered = useMemo(() => {
        if (!query.trim()) return options;
        const q = query.trim().toLowerCase();
        return options.filter((opt) =>
            [opt.label, opt.value].some((t) => t.toLowerCase().includes(q))
        );
    }, [options, query]);

    const isAllSelectableChecked = useMemo(() => {
        const selectable = filtered.filter((o) => !o.disabled).map((o) => o.value);
        if (selectable.length === 0) return false;
        return selectable.every((v) => value.includes(v));
    }, [filtered, value]);

    const toggle = useCallback(() => {
        if (disabled) return;
        setOpen((v) => !v);
    }, [disabled]);

    const close = useCallback(() => setOpen(false), []);

    useEffect(() => {
        function onClickOutside(e: MouseEvent) {
            if (!containerRef.current) return;
            if (!containerRef.current.contains(e.target as Node)) {
                close();
            }
        }
        if (open) {
            document.addEventListener("mousedown", onClickOutside);
        }
        return () => document.removeEventListener("mousedown", onClickOutside);
    }, [open, close]);

    useEffect(() => {
        if (open) {
            setActiveIndex(filtered.findIndex((o) => !o.disabled));
        } else {
            setQuery("");
        }
    }, [open, filtered]);

    const handleSelect = useCallback(
        (option: MultiSelectOption) => {
            if (option.disabled) return;
            const exists = value.includes(option.value);
            const next = exists
                ? value.filter((v) => v !== option.value)
                : [...value, option.value];
            onChange(next);
        },
        [onChange, value]
    );

    const handleSelectAll = useCallback(() => {
        const selectable = filtered.filter((o) => !o.disabled).map((o) => o.value);
        if (selectable.length === 0) return;
        if (isAllSelectableChecked) {
            onChange(value.filter((v) => !selectable.includes(v)));
        } else {
            const merged = Array.from(new Set([...value, ...selectable]));
            onChange(merged);
        }
    }, [filtered, isAllSelectableChecked, onChange, value]);

    const onKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (!open) return;
            if (!filtered.length) return;
            if (e.key === "ArrowDown") {
                e.preventDefault();
                let next = activeIndex;
                for (let i = 0; i < filtered.length; i += 1) {
                    next = (next + 1) % filtered.length;
                    if (!filtered[next]?.disabled) break;
                }
                setActiveIndex(next);
                listRef.current?.children[next]?.scrollIntoView({ block: "nearest" });
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                let next = activeIndex;
                for (let i = 0; i < filtered.length; i += 1) {
                    next = (next - 1 + filtered.length) % filtered.length;
                    if (!filtered[next]?.disabled) break;
                }
                setActiveIndex(next);
                listRef.current?.children[next]?.scrollIntoView({ block: "nearest" });
            } else if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                const option = filtered[activeIndex];
                if (option) handleSelect(option);
            } else if (e.key === "Escape") {
                e.preventDefault();
                close();
                buttonRef.current?.focus();
            }
        },
        [activeIndex, close, filtered, handleSelect, open]
    );

    const selectedLabels = useMemo(() => {
        if (!value.length) return placeholder;
        const map = new Map(options.map((o) => [o.value, o.label] as const));
        return value
            .map((v) => map.get(v))
            .filter(Boolean)
            .join(", ");
    }, [options, value, placeholder]);

    return (
        <div ref={containerRef} className={clsx("relative", className)}>
            <button
                ref={buttonRef}
                type="button"
                className={clsx(
                    "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-left text-sm shadow-sm",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500",
                    disabled && "opacity-60 cursor-not-allowed"
                )}
                aria-haspopup="listbox"
                aria-label="多选下拉开关"
                onClick={toggle}
                disabled={disabled}
            >
                <div className="flex items-center justify-between gap-2">
                    <span className={clsx(!value.length && "text-gray-400")}>{selectedLabels}</span>
                    <svg
                        className={clsx("h-4 w-4 text-gray-500 transition-transform", open && "rotate-180")}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.188l3.71-3.957a.75.75 0 111.08 1.04l-4.24 4.52a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </button>

            {open && (
                <div
                    className={clsx(
                        "absolute z-20 mt-2 w-full rounded-md border border-gray-200 bg-white shadow-lg"
                    )}
                    onKeyDown={onKeyDown}
                >
                    {searchable && (
                        <div className="p-2 border-b border-gray-200">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="搜索…"
                                className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    )}

                    {selectAllEnabled && (
                        <button
                            type="button"
                            className={clsx(
                                "flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-gray-50",
                                "border-b border-gray-100"
                            )}
                            onClick={handleSelectAll}
                            aria-label="全选"
                        >
                            <span
                                aria-hidden
                                className={clsx(
                                    "flex h-4 w-4 items-center justify-center rounded border",
                                    isAllSelectableChecked
                                        ? "border-blue-600 bg-blue-600 text-white"
                                        : "border-gray-300 bg-white text-transparent"
                                )}
                            >
                                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor">
                                    <path d="M16.704 5.29a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25A1 1 0 016.504 9.29l2.543 2.543 6.543-6.543a1 1 0 011.114 0z" />
                                </svg>
                            </span>
                            <span>全选</span>
                        </button>
                    )}

                    <div
                        ref={listRef as unknown as React.RefObject<HTMLDivElement>}
                        role="listbox"
                        aria-label="多选列表"
                        className={clsx("overflow-auto py-1", "max-h-60")}
                    >
                        {filtered.length === 0 && (
                            <div className="px-3 py-2 text-sm text-gray-500">无匹配结果</div>
                        )}
                        {filtered.map((opt, idx) => {
                            const checked = value.includes(opt.value);
                            const isActive = idx === activeIndex;
                            return (
                                <div key={opt.value} role="option">
                                    <div
                                        role="button"
                                        tabIndex={opt.disabled ? -1 : 0}
                                        aria-label={opt.label}
                                        className={clsx(
                                            "flex w-full items-center gap-2 px-3 py-2 text-left text-sm",
                                            isActive && "bg-blue-50",
                                            !opt.disabled && "hover:bg-gray-50",
                                            opt.disabled && "opacity-50 cursor-not-allowed"
                                        )}
                                        onClick={() => !opt.disabled && handleSelect(opt)}
                                        onKeyDown={(e) => {
                                            if (opt.disabled) return;
                                            if (e.key === "Enter" || e.key === " ") {
                                                e.preventDefault();
                                                handleSelect(opt);
                                            }
                                        }}
                                        onMouseEnter={() => setActiveIndex(idx)}
                                    >
                                        <span
                                            aria-hidden
                                            className={clsx(
                                                "flex h-4 w-4 items-center justify-center rounded border",
                                                checked
                                                    ? "border-blue-600 bg-blue-600 text-white"
                                                    : "border-gray-300 bg-white text-transparent"
                                            )}
                                        >
                                            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor">
                                                <path d="M16.704 5.29a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25A1 1 0 016.504 9.29l2.543 2.543 6.543-6.543a1 1 0 011.114 0z" />
                                            </svg>
                                        </span>
                                        <span className="truncate">{opt.label}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}


