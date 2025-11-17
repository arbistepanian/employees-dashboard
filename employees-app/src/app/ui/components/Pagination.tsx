"use client";

import { useEffect, useState } from "react";
import Button from "./Button";

export default function Pagination({
    currentPage,
    pageSize,
    total,
    onPageChange,
}: {
    currentPage: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
}) {
    const [page, setPage] = useState(currentPage);
    const [totalPages, setTotalPages] = useState(Math.ceil(total / pageSize));

    useEffect(() => {
        setTotalPages(Math.ceil(total / pageSize));
    }, [total, pageSize]);

    const handlePrevPage = function () {
        if (page > 1) {
            onPageChange(page - 1);
            setPage((prev) => prev - 1);
        }
    };

    const handleNextPage = function () {
        if (page < totalPages) {
            onPageChange(page + 1);
            setPage((prev) => prev + 1);
        }
    };

    return (
        <div className="w-full flex justify-between items-center">
            <Button
                variation="secondary"
                icon="arrowLeft"
                disabled={page == 1}
                onClick={handlePrevPage}></Button>
            <Button
                variation="secondary"
                icon="arrowRight"
                disabled={page == totalPages}
                onClick={handleNextPage}></Button>
        </div>
    );
}
