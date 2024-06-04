import useModal from "@/hooks/useModal";
import { Breadcrumb, Button, Flex, Modal } from "antd";
import { lazy } from "react";

const ProductForm = lazy(() => import("@/app/components/form/ProductForm"));

const ProductHeader = () => {
  const { show, openModal, closeModal } = useModal();

  return (
    <>
      <div className="pt-3 pb-5">
        <Flex align="center" justify="space-between">
          <div>
            <h1>Product</h1>
            <Breadcrumb>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Product</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <Button type="primary" onClick={openModal}>
            Create New Product
          </Button>
        </Flex>
      </div>

      <ProductForm open={show} onCancel={closeModal} />
    </>
  );
};

export default ProductHeader;
