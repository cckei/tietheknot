import { getCollections } from '@/lib/products';
import { Nav, type NavPage } from './Nav';

export async function NavShell({ page }: { page?: NavPage }) {
  const collections = await getCollections();
  return <Nav page={page} collections={collections} />;
}
