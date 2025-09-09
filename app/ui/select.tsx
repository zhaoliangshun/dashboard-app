"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";

export type SelectOption = {
    label: string;
    value: string;
    disabled?: boolean;
};

export type SelectProps = {
    options: SelectOption[];
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    maxDropdownHeightPx?: number;
    searchable?: boolean;
    clearable?: boolean;
};

export default function Select({
    options,
    value,
    onChange,
    placeholder = "请选择...",
    disabled = false,
    className,
    maxDropdownHeightPx = 240,
    searchable = true,
    clearable = true,
}: SelectProps) {
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

    const selectedOption = useMemo(() => {
        return options.find((opt) => opt.value === value);
    }, [options, value]);

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
        (option: SelectOption) => {
            if (option.disabled) return;
            onChange(option.value);
            close();
        },
        [onChange, close]
    );

    const handleClear = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            onChange("");
        },
        [onChange]
    );

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
                aria-label="下拉选择器"
                onClick={toggle}
                disabled={disabled}
            >
                <div className="flex items-center justify-between gap-2">
                    <span className={clsx(!value && "text-gray-400")}>
                        {selectedOption?.label || placeholder}
                    </span>
                    <div className="flex items-center gap-1">
                        {clearable && value && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="rounded-full p-0.5 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                aria-label="清除选择"
                            >
                                <svg
                                    className="h-3 w-3 text-gray-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        )}
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
                                placeholder="搜索..."
                                className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                autoFocus
                            />
                        </div>
                    )}

                    <div
                        ref={listRef as unknown as React.RefObject<HTMLDivElement>}
                        role="listbox"
                        aria-label="选择列表"
                        className="overflow-auto py-1 max-h-60"
                    >
                        {filtered.length === 0 && (
                            <div className="px-3 py-2 text-sm text-gray-500">无匹配结果</div>
                        )}
                        {filtered.map((opt, idx) => {
                            const isSelected = value === opt.value;
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
                                            isSelected && "bg-blue-100 text-blue-900",
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
                                        {isSelected && (
                                            <svg
                                                className="h-4 w-4 text-blue-600"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.704 5.29a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25A1 1 0 016.504 9.29l2.543 2.543 6.543-6.543a1 1 0 011.114 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        )}
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
