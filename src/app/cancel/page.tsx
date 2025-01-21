export default function page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Checkout Canceled</h1>
      <p>It seems you canceled the checkout. Feel free to browse more!</p>
      <a href="/" className="mt-4 text-blue-500 underline">
        Return to Home
      </a>
    </div>
  );
}
