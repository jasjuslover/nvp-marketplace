import { Form, Input, InputNumber, Modal, Select, message } from "antd";
import ProductImageForm from "./ProductImageForm";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormScheme, productScheme } from "./validator/ProductScheme";
import { FC, useEffect, useMemo } from "react";
import {
  useCreateProduct,
  useGetProduct,
  useUpdateProduct,
} from "@/network/query/product/product.api";
import { useGetListCategory } from "@/network/query/category/category.api";
import { useQueryClient } from "@tanstack/react-query";

type ProductFormProps = {
  open: boolean;
  id?: number;
  onCancel: () => void;
};

const ProductForm: FC<ProductFormProps> = ({
  open,
  id,
  onCancel,
}: ProductFormProps) => {
  const queryClient = useQueryClient();
  const productForm = useForm<ProductFormScheme>({
    resolver: zodResolver(productScheme),
  });
  const [messageApi, contextHolder] = message.useMessage();

  const { data: categoryData } = useGetListCategory(["category"]);

  const { data: productData, isLoading: productDataLoading } = useGetProduct([
    "product",
    String(id),
  ]);

  const { mutate: createProduct, isPending: createProductPending } =
    useCreateProduct({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["product"] });
        messageApi.success("Product successfully created");
        onCancel();
      },
      onError: (errorMessage: string) => {
        messageApi.error(errorMessage);
      },
    });

  const { mutate: updateProduct, isPending: updateProductPending } =
    useUpdateProduct({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["product"] });
        messageApi.success("Product successfully updated");
        onCancel();
      },
      onError: (errorMessage: string) => {
        messageApi.error(errorMessage);
      },
    });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = productForm;

  const categories = useMemo(
    () =>
      (categoryData?.data || []).map((category) => ({
        label: category.name,
        value: category.id,
      })),
    [categoryData]
  );

  const onSubmit: SubmitHandler<ProductFormScheme> = (values) => {
    if (Boolean(id)) {
      updateProduct(values);
      return;
    }

    createProduct(values);
  };

  useEffect(() => {
    if (productData?.data) {
      const product = productData?.data;
      reset({
        id: product?.id,
        title: product?.title,
        categoryId: product?.category?.id,
        price: product?.price,
        description: product?.description,
      });
    }
  }, [productData]);

  const modalTitle = useMemo(() => {
    if (Boolean(id)) {
      return "Update Product";
    }
    return "Create New Product";
  }, [id]);

  return (
    <>
      {contextHolder}
      <Modal
        open={open}
        centered
        title={modalTitle}
        confirmLoading={createProductPending || productDataLoading}
        onCancel={onCancel}
        onOk={handleSubmit(onSubmit)}
      >
        <div className="pt-5">
          <FormProvider {...productForm}>
            <Form layout="vertical">
              <Form.Item label="Title">
                <Controller
                  control={control}
                  name="title"
                  render={({ field: { value, onChange } }) => (
                    <Input
                      value={value}
                      onChange={onChange}
                      placeholder="Amazing T-Shirt"
                      status={errors.title?.message ? "error" : undefined}
                    />
                  )}
                />
                <span className="text-sm text-red-500">
                  {errors.title?.message}
                </span>
              </Form.Item>
              <Form.Item label="Price">
                <Controller
                  control={control}
                  name="price"
                  render={({ field: { value, onChange } }) => (
                    <Input
                      value={value}
                      onChange={onChange}
                      status={errors.price?.message ? "error" : undefined}
                    />
                  )}
                />
                <span className="text-sm text-red-500">
                  {errors.price?.message}
                </span>
              </Form.Item>
              {!Boolean(id) && (
                <>
                  <Form.Item label="Category">
                    <Controller
                      control={control}
                      name="categoryId"
                      render={({ field: { value, onChange } }) => (
                        <Select
                          value={value}
                          onChange={onChange}
                          options={categories}
                          status={
                            errors.categoryId?.message ? "error" : undefined
                          }
                        />
                      )}
                    />
                    <span className="text-sm text-red-500">
                      {errors.categoryId?.message}
                    </span>
                  </Form.Item>
                  <Form.Item label="Description">
                    <Controller
                      control={control}
                      name="description"
                      render={({ field: { value, onChange } }) => (
                        <Input.TextArea
                          value={value}
                          rows={5}
                          onChange={onChange}
                          status={
                            errors.description?.message ? "error" : undefined
                          }
                        />
                      )}
                    />
                    <span className="text-sm text-red-500">
                      {errors.description?.message}
                    </span>
                  </Form.Item>
                  <ProductImageForm />
                </>
              )}
            </Form>
          </FormProvider>
        </div>
      </Modal>
    </>
  );
};

export default ProductForm;
