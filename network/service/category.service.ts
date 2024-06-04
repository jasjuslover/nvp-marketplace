import { axios } from "../Axios";
import { LIST_CATEGORY } from "../const/category";

export type Category = {
  id?: number;
  name?: string;
  image?: string;
};

class CategoryService {
  list() {
    return axios.get<Category[]>(LIST_CATEGORY);
  }
}

export default new CategoryService();
