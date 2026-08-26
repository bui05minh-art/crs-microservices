import { useState, useEffect } from 'react';

interface SearchBoxProps {
    onSearch: (keyword: string) => void;
    placeholder?: string;
}

export default function SearchBox({
                                      onSearch,
                                      placeholder
                                  }: SearchBoxProps) {

    const [inputValue, setInputValue] =
        useState('');

    useEffect(() => {

        const timer = setTimeout(() => {
            onSearch(inputValue.trim());
        }, 400);

        return () => clearTimeout(timer);

    }, [inputValue, onSearch]);

    return (
        <div
            style={{
                position: 'relative',
                marginBottom: '24px'
            }}
        >

            <input
                type="text"
                value={inputValue}

                onChange={(e) =>
                    setInputValue(e.target.value)
                }

                placeholder={
                    placeholder ??
                    'Tìm kiếm theo tên môn học...'
                }

                style={{
                    width: '100%',
                    height: '48px',
                    boxSizing: 'border-box',

                    padding: '0 18px',

                    border: '1px solid #d1d5db',
                    borderRadius: '10px',

                    background: '#ffffff',

                    fontSize: '15px',
                    color: '#374151',

                    outline: 'none',

                    boxShadow:
                        '0 2px 8px rgba(0, 0, 0, 0.04)'
                }}
            />

        </div>
    );
}