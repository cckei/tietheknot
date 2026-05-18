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

async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  noCache = false,
): Promise<T | null> {
  if (!endpoint || !token) return null;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
    ...(noCache ? { cache: 'no-store' as const } : { next: { revalidate: 60 } }),
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

export type ShopifyCollection = {
  handle: string;
  title: string;
};

const COLLECTIONS_QUERY = `
  query Collections($first: Int!) {
    collections(first: $first, sortKey: TITLE) {
      edges {
        node {
          handle
          title
        }
      }
    }
  }
`;

export async function getShopifyCollections() {
  return shopifyFetch<{ collections: { edges: Array<{ node: ShopifyCollection }> } }>(
    COLLECTIONS_QUERY,
    { first: 24 },
  );
}

// ─── Cart API ────────────────────────────────────────────────────────────────

export type ShopifyCartLine = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: { amount: string; currencyCode: string };
    product: {
      id: string;
      title: string;
      handle: string;
      images: { edges: Array<{ node: { url: string; altText: string | null } }> };
    };
  };
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  lines: { edges: Array<{ node: ShopifyCartLine }> };
  cost: {
    totalAmount: { amount: string; currencyCode: string };
    subtotalAmount: { amount: string; currencyCode: string };
  };
};

type CartLineInput = { merchandiseId: string; quantity: number };

const CART_FRAGMENT = `
  id
  checkoutUrl
  lines(first: 100) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            price { amount currencyCode }
            product {
              id
              title
              handle
              images(first: 1) { edges { node { url altText } } }
            }
          }
        }
      }
    }
  }
  cost {
    totalAmount { amount currencyCode }
    subtotalAmount { amount currencyCode }
  }
`;

export async function createCart(lines: CartLineInput[]): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart } }>(
    `mutation cartCreate($lines: [CartLineInput!]) {
      cartCreate(input: { lines: $lines }) {
        cart { ${CART_FRAGMENT} }
      }
    }`,
    { lines },
    true,
  );
  return data?.cartCreate?.cart ?? null;
}

export async function addCartLines(cartId: string, lines: CartLineInput[]): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart } }>(
    `mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ${CART_FRAGMENT} }
      }
    }`,
    { cartId, lines },
    true,
  );
  return data?.cartLinesAdd?.cart ?? null;
}

export async function removeCartLines(cartId: string, lineIds: string[]): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart } }>(
    `mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ${CART_FRAGMENT} }
      }
    }`,
    { cartId, lineIds },
    true,
  );
  return data?.cartLinesRemove?.cart ?? null;
}

export async function updateCartLines(
  cartId: string,
  lines: { id: string; quantity: number }[],
): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCart } }>(
    `mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ${CART_FRAGMENT} }
      }
    }`,
    { cartId, lines },
    true,
  );
  return data?.cartLinesUpdate?.cart ?? null;
}

export async function fetchCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ cart: ShopifyCart | null }>(
    `query getCart($cartId: ID!) {
      cart(id: $cartId) { ${CART_FRAGMENT} }
    }`,
    { cartId },
    true,
  );
  return data?.cart ?? null;
}
