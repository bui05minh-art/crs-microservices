import { useState, useEffect } from 'react';

interface SearchBoxProps {
    onSearch: (keyword: string) => void;
    placeholder?: string;
}

export default function SearchBox({
                                      onSearch,
                                      placeholder,
                                  }: SearchBoxProps) {
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(inputValue.trim());
        }, 400);

        return () => clearTimeout(timer);
    }, [inputValue, onSearch]);

    return (
        <div className="search-box">
            <span className="search-icon">
                🔍
            </span>

            <input
                className="search-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                    placeholder ??
                    'Tìm kiếm theo tên môn học...'
                }
            />

            {inputValue && (
                <button
                    type="button"
                    className="clear-search"
                    onClick={() => setInputValue('')}
                    title="Xóa tìm kiếm"
                >
                    ×
                </button>
            )}
        </div>
    );
}