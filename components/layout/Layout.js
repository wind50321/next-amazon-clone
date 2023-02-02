import Header from './Header';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-screen-2xl mx-auto">{children}</main>
    </div>
  );
}
