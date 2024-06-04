import { Product } from "@/network/service/product.service";
import { clearProduct, removeProduct } from "@/redux/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Layout, Space } from "antd";

type CartItemProps = {
  product?: Product;
};

const Cart = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.cart);

  const handleClearCart = () => {
    dispatch(clearProduct());
  };

  return (
    <>
      <div className="w-[500px] p-5">
        <Flex justify="space-between" align="center">
          <h2 className="font-semibold text-lg">Cart</h2>
          <Button
            danger
            type="link"
            className="!px-0"
            onClick={handleClearCart}
          >
            Clear
          </Button>
        </Flex>
        <Divider className="!py-1" />
        <Space direction="vertical" className="w-full" split={<Divider />}>
          {products?.map((product) => (
            <CartItem key={`product-cart-${product.id}`} product={product} />
          ))}
        </Space>
        {products?.length === 0 && (
          <Flex justify="center" align="center" className="p-5">
            <span>Cart is empty</span>
          </Flex>
        )}
      </div>
    </>
  );
};

const CartItem = ({ product }: CartItemProps) => {
  const dispatch = useAppDispatch();

  const handleRemoveProduct = () => {
    dispatch(removeProduct(product?.id));
  };

  return (
    <Flex
      justify="space-between"
      align="center"
      className="hover:text-green-800 hover:font-semibold"
    >
      <span>{product?.title}</span>
      <Button
        danger
        icon={<CloseCircleOutlined />}
        onClick={handleRemoveProduct}
      />
    </Flex>
  );
};

Cart.Item = CartItem;
export default Cart;
