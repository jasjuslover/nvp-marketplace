import { ProductFormScheme } from "@/app/components/form/validator/ProductScheme";
import productService, { Product } from "@/network/service/product.service";
import { useMutation, useQuery } from "@tanstack/react-query";

/**
 * Product List
 */
const getListProduct = ({ queryKey }: Payload) => {
  const [_, offset, title] = queryKey;
  return productService.list({
    offset: Number(offset) || 0,
    limit: 5,
    title,
  });
};

export const useGetListProduct = (queryKey: string[]) => {
  return useQuery({
    queryKey,
    queryFn: getListProduct,
  });
};

/**
 * Product By ID
 */
const getProduct = ({ queryKey }: Payload) => {
  const [_, id] = queryKey;
  return productService.get(Number(id));
};

export const useGetProduct = (queryKey: string[]) => {
  const [_, id] = queryKey;
  return useQuery({
    queryKey,
    queryFn: getProduct,
    enabled: Boolean(Number(id)),
  });
};

/**
 * Create Product
 */
export const useCreateProduct = ({
  onSuccess,
  onError,
}: AppMutationCallback<Product>) =>
  useMutation({
    mutationFn: (body: ProductFormScheme) => productService.create(body),
    onSuccess: (data) => onSuccess(data.data),
    onError: (error) => onError(error?.message),
  });

/**
 * Update Product
 */
export const useUpdateProduct = ({
  onSuccess,
  onError,
}: AppMutationCallback<Product>) =>
  useMutation({
    mutationFn: (body: ProductFormScheme) => productService.update(body),
    onSuccess: (data) => onSuccess(data.data),
    onError: (error) => onError(error?.message),
  });

/**
 * Delete Product
 */
export const useDeleteProduct = ({
  onSuccess,
  onError,
}: AppMutationCallback<boolean>) =>
  useMutation({
    mutationFn: (id: number) => productService.delete(id),
    onSuccess: (data) => onSuccess(data.data),
    onError: (error) => onError(error?.message),
  });
