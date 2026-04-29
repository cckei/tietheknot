import { getShopifyProductByHandle, getShopifyProducts, type ShopifyProduct } from './shopify';

export type Product = {
  id: string;
  handle: string;
  title: string;
  collection: string;
  price: string;
  currencyCode: string;
  rawPrice: number;
  img?: string;
  images?: string[];
  variants?: Array<{
    id: string;
    title: string;
    availableForSale: boolean;
    price: string;
    rawPrice: number;
    currencyCode: string;
  }>;
  placeholder?: { tone: string; accent: string };
  description?: string;
  tall?: boolean;
};

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 'cottage-spring',
    handle: 'cottage-spring',
    title: 'Cottage in Spring',
    collection: 'Framed Gardens',
    price: '£48',
    currencyCode: 'GBP',
    rawPrice: 48,
    img: '/assets/product-03.png',
    tall: true,
    description:
      'A framed miniature landscape of a whitewashed cottage behind a meadow of cotton and mustard-yellow statice. Composed by hand behind museum-grade glass, signed on the reverse.',
  },
  {
    id: 'seaside-cottage',
    handle: 'seaside-cottage',
    title: 'Seaside Cottage',
    collection: 'Framed Gardens',
    price: '£52',
    currencyCode: 'GBP',
    rawPrice: 52,
    img: '/assets/product-02.png',
    tall: true,
    description:
      'A cottage at the edge of a windswept bay, rendered in layered preserved stems and torn Japanese paper. Clouds are hydrangea; the sea is hand-mixed indigo ink on cotton.',
  },
  {
    id: 'meadow-house',
    handle: 'meadow-house',
    title: 'Meadow House No. II',
    collection: 'Framed Gardens',
    price: '£54',
    currencyCode: 'GBP',
    rawPrice: 54,
    img: '/assets/product-05.png',
    tall: true,
    description:
      'A pastoral scene of a farmhouse set in a broad meadow of dried grasses and pressed wildflowers. Museum glass, oak frame.',
  },
  {
    id: 'cotton-wreath',
    handle: 'cotton-wreath',
    title: 'Cotton & Fern Wreath',
    collection: 'Wreaths',
    price: '£36',
    currencyCode: 'GBP',
    rawPrice: 36,
    img: '/assets/product-04.png',
    tall: true,
    description:
      'A full wreath of dried cotton bolls, preserved fern fronds, and eucalyptus. Mounted on a natural grapevine base.',
  },
  {
    id: 'mustard-shelf',
    handle: 'mustard-shelf',
    title: 'Mustard Shelf Garden',
    collection: 'Home Accessories',
    price: '£28',
    currencyCode: 'GBP',
    rawPrice: 28,
    img: '/assets/product-01.png',
    tall: true,
    description:
      'A small shelf arrangement of dried mustard stems, cotton, and preserved moss in a hand-thrown ceramic vessel.',
  },
  {
    id: 'autumn-field',
    handle: 'autumn-field',
    title: 'Autumn Field',
    collection: 'Framed Gardens',
    price: '£46',
    currencyCode: 'GBP',
    rawPrice: 46,
    placeholder: { tone: 'ivory', accent: 'mustard' },
  },
  {
    id: 'fern-hollow',
    handle: 'fern-hollow',
    title: 'Fern Hollow',
    collection: 'Framed Gardens',
    price: '£50',
    currencyCode: 'GBP',
    rawPrice: 50,
    placeholder: { tone: 'sage', accent: 'fern' },
  },
  {
    id: 'rose-statice',
    handle: 'rose-statice',
    title: 'Rose & Statice',
    collection: 'Dried Bouquets',
    price: '£24',
    currencyCode: 'GBP',
    rawPrice: 24,
    placeholder: { tone: 'rose', accent: 'clay' },
  },
  {
    id: 'linen-cotton',
    handle: 'linen-cotton',
    title: 'Linen & Cotton',
    collection: 'Wreaths',
    price: '£32',
    currencyCode: 'GBP',
    rawPrice: 32,
    placeholder: { tone: 'mist', accent: 'cotton' },
  },
  {
    id: 'morning-meadow',
    handle: 'morning-meadow',
    title: 'Morning Meadow',
    collection: 'Framed Gardens',
    price: '£49',
    currencyCode: 'GBP',
    rawPrice: 49,
    placeholder: { tone: 'taupe', accent: 'sage' },
  },
  {
    id: 'goldenrod-vase',
    handle: 'goldenrod-vase',
    title: 'Goldenrod Vase',
    collection: 'Dried Bouquets',
    price: '£26',
    currencyCode: 'GBP',
    rawPrice: 26,
    placeholder: { tone: 'mustard', accent: 'mustard' },
  },
  {
    id: 'small-garden-shelf',
    handle: 'small-garden-shelf',
    title: 'Small Garden Shelf',
    collection: 'Home Accessories',
    price: '£21',
    currencyCode: 'GBP',
    rawPrice: 21,
    placeholder: { tone: 'ivory', accent: 'sage' },
  },
];

function formatPrice(amount: string, currencyCode: string): string {
  const numericAmount = Number(amount);
  if (Number.isNaN(numericAmount)) return `${currencyCode} ${amount}`;
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(numericAmount);
}

function mapShopifyProduct(product: ShopifyProduct): Product {
  const images = product.images.edges.map((edge) => edge.node.url);
  const variants = product.variants.edges.map((edge) => ({
    id: edge.node.id,
    title: edge.node.title,
    availableForSale: edge.node.availableForSale,
    price: formatPrice(edge.node.price.amount, edge.node.price.currencyCode),
    rawPrice: Number(edge.node.price.amount),
    currencyCode: edge.node.price.currencyCode,
  }));

  const minVariant = product.priceRange.minVariantPrice;

  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    collection: product.collections.edges[0]?.node.title ?? 'Shop',
    price: formatPrice(minVariant.amount, minVariant.currencyCode),
    currencyCode: minVariant.currencyCode,
    rawPrice: Number(minVariant.amount),
    img: images[0],
    images,
    variants,
    description: product.description,
    tall: true,
  };
}

export async function getProducts(): Promise<Product[]> {
  const response = await getShopifyProducts();
  if (!response?.products?.edges?.length) return FALLBACK_PRODUCTS;

  return response.products.edges.map((edge) => mapShopifyProduct(edge.node));
}

export async function getProductByHandle(handle: string): Promise<Product | undefined> {
  const response = await getShopifyProductByHandle(handle);
  const shopifyProduct = response?.productByHandle;
  if (shopifyProduct) return mapShopifyProduct(shopifyProduct);

  return FALLBACK_PRODUCTS.find((p) => p.handle === handle);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.slice(0, 4);
}
