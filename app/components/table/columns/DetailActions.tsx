import useModal from "@/hooks/useModal";
import { Product } from "@/network/service/product.service";
import { formatCurrency } from "@/utils/currency";
import { EyeOutlined } from "@ant-design/icons";
import { Button, Image, Modal } from "antd";
import { useMemo } from "react";

type DetailActionsProps = {
  product?: Product;
};

const DetailActions = ({ product }: DetailActionsProps) => {
  const { show, openModal, closeModal } = useModal();

  const images = useMemo(() => {
    try {
      const imageLen = product?.images?.length;
      if (imageLen) {
        if (imageLen === 1) {
          const imgs = product?.images?.map(
            (image) => (JSON.parse(image) as string[])?.[0]
          );
          return imgs;
        }

        const img = product?.images?.join(",");
        const parsed = JSON.parse(img || "[]") as string[];
        return parsed;
      }

      return [];
    } catch (error) {
      return [];
    }
  }, [product]);

  console.log({ images });

  return (
    <>
      <Button icon={<EyeOutlined />} onClick={openModal} />

      <Modal open={show} title="Detail Product" onCancel={closeModal}>
        <div>
          <h3 className="font-bold text-lg">{product?.title}</h3>
          <p>{formatCurrency(product?.price || 0)}</p>
          <h3 className="font-semibold mt-4">Description</h3>
          <p>{product?.description || "-"}</p>
          <h3 className="font-semibold mt-4">Category</h3>
          <p>{product?.category?.name || "-"}</p>
          <div className="mt-4">
            <Image.PreviewGroup items={images}>
              <Image
                src={images?.[0]}
                width={200}
                height={200}
                className="object-cover"
              />
            </Image.PreviewGroup>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DetailActions;
