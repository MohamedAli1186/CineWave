import React from "react";

const Pagination = ({
  pageNo,
  setPageNo,
  total_pages,
  direction,
}: {
  pageNo: number;
  setPageNo: React.Dispatch<React.SetStateAction<number>>;
  total_pages: number;
  direction: React.RefObject<HTMLHeadingElement | null>;
}) => {
  if (total_pages <= 1) return null;

  const generatePages = () => {
    const pages = [];

    const minPage = Math.max(1, pageNo - 2);
    const maxPage = Math.min(total_pages, pageNo + 2);

    if (minPage > 1) {
      if (minPage > 2) pages.push("dots-start");
    }

    for (let i = minPage; i <= maxPage; i++) {
      pages.push(i);
    }

    if (maxPage < total_pages) {
      if (maxPage < total_pages - 1) pages.push("dots-end");
    }

    return pages;
  };

  const pages = generatePages();

  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {/* Prev Button */}
      <button
        type="button"
        onClick={() => {
          setPageNo((p) => Math.max(1, p - 1));
          direction.current?.scrollIntoView({ behavior: "smooth" });
        }}
        disabled={pageNo === 1}
        className={`w-8 h-8 rounded-full flex items-center justify-center text-white cursor-pointer ${
          pageNo === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-[#40292B]"
        }`}
      >
        {"<"}
      </button>

      {/* Pages */}
      {pages.map((page, index) => {
        if (page === "dots-start" || page === "dots-end") {
          return (
            <span key={page + index} className="text-white px-1">
              ...
            </span>
          );
        }

        return (
          <button
            type="button"
            key={page}
            onClick={() => {
              setPageNo(+page);
              direction.current?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white cursor-pointer ${
              pageNo === page ? "bg-[#40292B]" : "hover:bg-[#40292B]"
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        type="button"
        onClick={() => {
          setPageNo((p) => Math.min(total_pages, p + 1));
          direction.current?.scrollIntoView({ behavior: "smooth" });
        }}
        disabled={pageNo === total_pages}
        className={`w-8 h-8 rounded-full flex items-center justify-center text-white cursor-pointer ${
          pageNo === total_pages
            ? "opacity-40 cursor-not-allowed"
            : "hover:bg-[#40292B]"
        }`}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
