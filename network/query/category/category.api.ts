import categoryService from "@/network/service/category.service";
import { useQuery } from "@tanstack/react-query";

const getListCategory = () => {
  return categoryService.list();
};

export const useGetListCategory = (queryKey: string[]) => {
  return useQuery({
    queryKey,
    queryFn: getListCategory,
  });
};
