import useModal from "@/hooks/useModal";
import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Product } from "@/network/service/product.service";
import { lazy } from "react";

const ProductForm = lazy(() => import("@/app/components/form/ProductForm"));

type EditActionsProps = {
  product?: Product;
};

const EditActions = ({ product }: EditActionsProps) => {
  const { show, openModal, closeModal } = useModal();
  return (
    <>
      <Button icon={<EditOutlined />} onClick={openModal} />
      {show && (
        <ProductForm open={show} onCancel={closeModal} id={product?.id} />
      )}
    </>
  );
};

export default EditActions;
