import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrderPriority() {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH">
      <Button type="primary">
      
        {fetcher.state === "submitting"
          ? "Updating priority..."
          : "Make priority"}
      </Button>
    </fetcher.Form>
  );
}

export async function action({ params, request }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}

export default UpdateOrderPriority;
