import { ProductFormScheme } from "@/app/components/form/validator/ProductScheme";
import { axios } from "../Axios";
import { LIST_PRODUCT, CUD_PRODUCT } from "../const/product";
import { Category } from "./category.service";

export type ProductListPayload = {
  offset: number;
  limit: number;
  title?: string;
};

export type Product = {
  id?: number;
  title?: string;
  price?: number;
  description?: string;
  category?: Category;
  images?: string[];
};

class ProductService {
  list({ offset = 0, limit = 5, title = "" }: ProductListPayload) {
    return axios.get<Product[]>(LIST_PRODUCT, {
      params: {
        offset,
        limit,
        title,
      },
    });
  }

  create(body: ProductFormScheme) {
    return axios.post<Product>(CUD_PRODUCT, body);
  }

  get(id: number) {
    return axios.get<Product>(`${CUD_PRODUCT}${id}`);
  }

  update(body: ProductFormScheme) {
    const id = body.id;
    return axios.put(`${CUD_PRODUCT}${id}`, body);
  }

  delete(id: number) {
    return axios.delete<boolean>(`${CUD_PRODUCT}${id}`);
  }
}

export default new ProductService();
