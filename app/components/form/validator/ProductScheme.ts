import { z } from "zod";

export const productScheme = z
  .object({
    id: z.number().optional(),
    title: z.string(),
    price: z.coerce.number(),
    description: z.string().optional(),
    categoryId: z.number().min(0, "Category is required").optional(),
    images: z.string().array().min(1).optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.id) {
      if (!Boolean(data.categoryId)) {
        ctx.addIssue({
          code: "custom",
          path: ["categoryId"],
          fatal: true,
          message: "Category is required",
        });
      }

      if (!Boolean(data.description)) {
        ctx.addIssue({
          code: "custom",
          path: ["description"],
          fatal: true,
          message: "Description is required",
        });
      }

      if (!Boolean(data.images?.length)) {
        ctx.addIssue({
          code: "custom",
          path: ["images"],
          fatal: true,
          message: "Image cannot empty",
        });
      }
    }
  });

export type ProductFormScheme = z.infer<typeof productScheme>;

export const productInitialValue: ProductFormScheme = {
  title: "",
  price: 0,
  description: "",
  categoryId: -1,
  images: [],
};
