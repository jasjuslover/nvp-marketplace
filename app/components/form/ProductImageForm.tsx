import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Button, Flex, Form, Input } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { buttonIcon } from "@/components/button";

const ProductImageForm = () => {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: "images" });

  return (
    <>
      <Form.Item label="Images">
        {fields.map((field, index) => (
          <Flex key={field.id} className="gap-x-3">
            <Controller
              control={control}
              name={`images.${index}`}
              render={({ field: { value, onChange } }) => (
                <Input value={value} onChange={onChange} />
              )}
            />
            <Button onClick={() => remove(index)} className={buttonIcon()}>
              <CloseOutlined />
            </Button>
          </Flex>
        ))}
        <Button onClick={() => append("")} className="mt-3">
          Add Image
        </Button>
      </Form.Item>
    </>
  );
};

export default ProductImageForm;
