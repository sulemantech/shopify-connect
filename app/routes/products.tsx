import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// Helper function to fetch Shopify products
async function fetchShopifyProducts(shop: string, accessToken: string) {
  const endpoint = `https://${shop}/admin/api/2023-10/products.json`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "X-Shopify-Access-Token": accessToken,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();
  return data.products;
}

// Remix loader to fetch Shopify data
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");

  if (!shop) {
    throw new Response("Shop parameter is missing", { status: 400 });
  }

  // 🔐 Replace this with your actual app's access token
  const accessToken = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error("Missing Shopify access token in environment variables");
  }

  const products = await fetchShopifyProducts(shop, accessToken);

  return json({ products });
};

// Page component
export default function ProductsPage() {
  const { products } = useLoaderData<typeof loader>();

  return (
    <div style={{ padding: 20 }}>
      <h1>Products</h1>
      <ul>
        {products.map((product: any) => (
          <li key={product.id}>
            <strong>{product.title}</strong> – {product.variants[0]?.price} {product.variants[0]?.currency || ""}
          </li>
        ))}
      </ul>
    </div>
  );
}
