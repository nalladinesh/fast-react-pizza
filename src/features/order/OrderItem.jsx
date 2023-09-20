import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3 space-y-2">
      <div className="flex items-center justify-between text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="italic capitalize text-sm text-stone-500">{isLoadingIngredients ? 'loading...' : ingredients.join(', ')} </p>
    </li>
  );
}

export default OrderItem;
