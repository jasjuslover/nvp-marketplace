import { useGetListProduct } from "@/network/query/product/product.api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useMemo, useRef } from "react";
import { productColumns } from "./columns/productColumns";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { cva } from "class-variance-authority";
import { Button, Flex, Input, Skeleton, Spin } from "antd";
import { LeftOutlined, RightOutlined, SearchOutlined } from "@ant-design/icons";
import { buttonIcon } from "@/components/button";

const thead = cva([
  "text-xs",
  "text-gray-700",
  "uppercase",
  "bg-gray-50",
  "dark:bg-gray-700",
  "dark:text-gray-400",
]);

const th = cva(["py-3", "px-6"]);

const trBody = cva([
  "bg-white",
  "border-b",
  "dark:bg-gray-800",
  "dark:border-gray-700",
]);

const td = cva(["py-4", "px-6"]);

const ProductTable = () => {
  const router = useRouter();
  const param = useSearchParams();
  const pathname = usePathname();
  const searchDebounceRef = useRef<NodeJS.Timeout>();

  const search = useMemo(() => {
    return param.get("search") || "";
  }, [param]);

  const page = useMemo(() => {
    return param.get("page");
  }, [param]);

  const offset = useMemo(() => {
    const currentPage = Number(page || "1");
    return String((currentPage - 1) * 5);
  }, [param]);

  const { data: productData, isLoading } = useGetListProduct([
    "product",
    offset,
    search,
  ]);

  const data = useMemo(() => productData?.data || [], [productData]);
  const columns = useMemo(() => productColumns, []);

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageIndex: Number(page) || 1,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const goToNextPage = () => {
    const nextPage = Number(page || "1") + 1;
    router.push(`/?page=${nextPage}&search=${search}`);
  };

  const goToPrevPage = () => {
    const prevPage = Number(page || "1") - 1;
    router.push(`/?page=${prevPage}&search=${search}`);
  };

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }

    searchDebounceRef.current = setTimeout(() => {
      let url = pathname;
      if (page) {
        url = `${url}?page=${1}&search=${value}`;
      } else {
        url = `${url}?search=${value}`;
      }
      router.push(url);
    }, 800);
  };

  return (
    <>
      <Flex justify="end" align="center" className="mb-5">
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search product"
          className="max-w-64"
          onChange={onSearch}
        />
      </Flex>
      <div className="relative overflow-x-auto">
        <table className="min-w-full table">
          <thead className={thead()}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className={th()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getCoreRowModel().rows.length === 0 && !isLoading && (
              <tr className={trBody()}>
                <td colSpan={columns.length} align="center" className="p-5">
                  Data is empty
                </td>
              </tr>
            )}
            {table.getCoreRowModel().rows.map((row) => {
              return (
                <tr key={row.id} className={trBody()}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id} className={td()}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            {isLoading && (
              <tr className={trBody()}>
                <td className={td()} align="center" colSpan={columns.length}>
                  <Flex justify="center">
                    <Spin />
                  </Flex>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Flex justify="end" align="center" className="mt-5">
          <Button
            className={buttonIcon()}
            disabled={Number(page) <= 1}
            onClick={goToPrevPage}
          >
            <LeftOutlined />
          </Button>
          <span className="px-5">{Number(page) || "1"}</span>
          <Button
            className={buttonIcon()}
            onClick={goToNextPage}
            disabled={data?.length < 5}
          >
            <RightOutlined />
          </Button>
        </Flex>
      </div>
    </>
  );
};

export default ProductTable;
