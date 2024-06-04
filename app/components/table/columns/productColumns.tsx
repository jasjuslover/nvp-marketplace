import { Product } from "@/network/service/product.service";
import { ColumnDef } from "@tanstack/react-table";
import NumberCell from "./NumberCell";
import ActionCell from "./ActionsCell";
import { formatCurrency } from "@/utils/currency";

export const productColumns: ColumnDef<Product, any>[] = [
  {
    id: "no",
    header: "No",
    cell: (props) => <NumberCell index={props.row.index} />,
  },
  {
    id: "title",
    accessorKey: "title",
  },
  {
    id: "price",
    header: "Price",
    cell: (props) => <>{formatCurrency(props.row.original.price || 0)}</>,
  },
  {
    id: "category",
    header: "Category",
    accessorKey: "category.name",
  },
  {
    id: "action",
    header: "Action",
    cell: (props) => <ActionCell product={props.row.original} />,
  },
];
