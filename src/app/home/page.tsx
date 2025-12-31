import { redirect } from 'next/navigation';

// This page catches users who have a cached 301 redirect to /home
// and redirects them to the proper default locale
export default function HomePage() {
    redirect('/en');
}
