export type Product = {
  id: string;
  handle: string;
  title: string;
  collection: string;
  price: string;
  img?: string;
  placeholder?: { tone: string; accent: string };
  description?: string;
  tall?: boolean;
};

export const PRODUCTS: Product[] = [
  {
    id: 'cottage-spring',
    handle: 'cottage-spring',
    title: 'Cottage in Spring',
    collection: 'Framed Gardens',
    price: 'NT$ 4,800',
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
    price: 'NT$ 5,200',
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
    price: 'NT$ 5,400',
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
    price: 'NT$ 3,600',
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
    price: 'NT$ 2,800',
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
    price: 'NT$ 4,600',
    placeholder: { tone: 'ivory', accent: 'mustard' },
  },
  {
    id: 'fern-hollow',
    handle: 'fern-hollow',
    title: 'Fern Hollow',
    collection: 'Framed Gardens',
    price: 'NT$ 5,000',
    placeholder: { tone: 'sage', accent: 'fern' },
  },
  {
    id: 'rose-statice',
    handle: 'rose-statice',
    title: 'Rose & Statice',
    collection: 'Dried Bouquets',
    price: 'NT$ 2,400',
    placeholder: { tone: 'rose', accent: 'clay' },
  },
  {
    id: 'linen-cotton',
    handle: 'linen-cotton',
    title: 'Linen & Cotton',
    collection: 'Wreaths',
    price: 'NT$ 3,200',
    placeholder: { tone: 'mist', accent: 'cotton' },
  },
  {
    id: 'morning-meadow',
    handle: 'morning-meadow',
    title: 'Morning Meadow',
    collection: 'Framed Gardens',
    price: 'NT$ 4,900',
    placeholder: { tone: 'taupe', accent: 'sage' },
  },
  {
    id: 'goldenrod-vase',
    handle: 'goldenrod-vase',
    title: 'Goldenrod Vase',
    collection: 'Dried Bouquets',
    price: 'NT$ 2,600',
    placeholder: { tone: 'mustard', accent: 'mustard' },
  },
  {
    id: 'small-garden-shelf',
    handle: 'small-garden-shelf',
    title: 'Small Garden Shelf',
    collection: 'Home Accessories',
    price: 'NT$ 2,100',
    placeholder: { tone: 'ivory', accent: 'sage' },
  },
];

export function getProductByHandle(handle: string): Product | undefined {
  return PRODUCTS.find((p) => p.handle === handle);
}

export const FEATURED_PRODUCTS = PRODUCTS.slice(0, 4);
