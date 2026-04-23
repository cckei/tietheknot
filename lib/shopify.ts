// Shopify Storefront API client
// Copy .env.example → .env.local and set your store credentials to connect.

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const endpoint = domain ? `https://${domain}/api/2024-01/graphql.json` : null;

export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
  };
  images: { edges: Array<{ node: { url: string; altText: string | null } }> };
  collections: { edges: Array<{ node: { title: string } }> };
  variants: {
    edges: Array<{
      node: { id: string; title: string; availableForSale: boolean; price: { amount: string; currencyCode: string } };
    }>;
  };
};

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T | null> {
  if (!endpoint || !token) return null;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;
  const json = await res.json();
  return (json.data as T) ?? null;
}

const PRODUCTS_QUERY = `
  query Products($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
          priceRange {
            minVariantPrice { amount currencyCode }
          }
          images(first: 5) {
            edges { node { url altText } }
          }
          collections(first: 1) {
            edges { node { title } }
          }
          variants(first: 10) {
            edges { node { id title availableForSale price { amount currencyCode } } }
          }
        }
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      handle
      title
      description
      priceRange {
        minVariantPrice { amount currencyCode }
      }
      images(first: 5) {
        edges { node { url altText } }
      }
      collections(first: 1) {
        edges { node { title } }
      }
      variants(first: 10) {
        edges { node { id title availableForSale price { amount currencyCode } } }
      }
    }
  }
`;

export async function getShopifyProducts() {
  return shopifyFetch<{ products: { edges: Array<{ node: ShopifyProduct }> } }>(
    PRODUCTS_QUERY,
    { first: 24 },
  );
}

export async function getShopifyProductByHandle(handle: string) {
  return shopifyFetch<{ productByHandle: ShopifyProduct | null }>(
    PRODUCT_BY_HANDLE_QUERY,
    { handle },
  );
}
