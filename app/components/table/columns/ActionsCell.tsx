import { useDeleteProduct } from "@/network/query/product/product.api";
import { Product } from "@/network/service/product.service";
import { addToCart } from "@/redux/cart/cartSlice";
import { useAppDispatch } from "@/redux/hook";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Flex, Popconfirm, Tooltip, message } from "antd";
import { lazy, useState } from "react";
import EditActions from "./EditActions";
import DetailActions from "./DetailActions";

type ActionCellProps = {
  product?: Product;
};

const ActionCell = ({ product }: ActionCellProps) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();

  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  const { mutate: deleteProduct, isPending } = useDeleteProduct({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
      messageApi.success("Product successfully deleted");
      closeConfirm();
    },
    onError: (errorMessage: string) => {
      messageApi.error(errorMessage);
    },
  });

  const confirmDelete = () => {
    setOpenConfirm(true);
  };

  const closeConfirm = () => setOpenConfirm(false);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <>
      {contextHolder}
      <Flex className="gap-x-3">
        <Tooltip title="Add to Cart">
          <Button icon={<PlusOutlined />} onClick={handleAddToCart} />
        </Tooltip>
        <DetailActions product={product} />
        <EditActions product={product} />
        <Popconfirm
          open={openConfirm}
          title="Delete Product"
          description="Are you sure to delete this product?"
          onConfirm={() => deleteProduct(product?.id || -1)}
          onCancel={closeConfirm}
          disabled={isPending}
          okText="Yes"
          cancelText="No"
        >
          <Button
            danger
            icon={<DeleteOutlined />}
            loading={isPending}
            onClick={confirmDelete}
          />
        </Popconfirm>
      </Flex>
    </>
  );
};

export default ActionCell;
