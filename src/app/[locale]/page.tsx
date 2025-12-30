import { redirect } from 'next/navigation';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function LocaleRoot({ params }: PageProps) {
  const { locale } = await params;
  // Redirect /en or /ar to /en/home or /ar/home
  redirect(`/${locale}/home`);
}
