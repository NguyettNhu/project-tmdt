import { getProductById, getImageUrl } from '@/lib/api';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton';
import ReviewSection from '@/components/ReviewSection';

type Props = {
  params: { id: string } | Promise<{ id: string }>;
};

export default async function ProductPage({ params }: Props) {
  const resolved = (await params) as { id: string };
  const id = Number(resolved.id);
  const product = await getProductById(id);
  if (!product) return notFound();

  const imageUrl = getImageUrl(product.avatar);
  const price = product.sale_price || product.price;

  return (
    <div className="w-full bg-gray-50">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Product Details Section */}
        <div className="bg-white rounded-2xl p-8 mb-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="w-full bg-[#FFF0F6] rounded-xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt={product.name} className="w-full h-auto object-cover" />
            </div>

            <div>
              <h1 className="text-3xl font-black mb-4">{product.name}</h1>
              <div className="flex items-center gap-3 mb-6">
                <p className="text-2xl font-semibold text-[#D9006C]">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}
                </p>
                {product.sale_price && (
                  <p className="text-lg text-gray-400 line-through">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                  </p>
                )}
              </div>
              <p className="text-sm text-[#1A1A1A]/70 mb-6">{product.description}</p>

              <div className="flex items-center gap-4">
                <AddToCartButton id={product.id} name={product.name} price={price} image={imageUrl} />
                <a href="/cart" className="px-4 py-2 border rounded-full text-sm hover:bg-gray-50 transition-colors">Xem giỏ hàng</a>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewSection productId={id} />
      </main>
    </div>
  );
}
