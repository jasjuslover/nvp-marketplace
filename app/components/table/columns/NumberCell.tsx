import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

type NumberCellProps = {
  index: number;
};

const NumberCell = ({ index }: NumberCellProps) => {
  const param = useSearchParams();

  const page = useMemo(() => {
    return Number(param.get("page")) || 1;
  }, [param]);

  const currentNumber = useMemo(() => {
    return (page - 1) * 5 + index + 1;
  }, [page]);

  return <>{currentNumber}</>;
};

export default NumberCell;
