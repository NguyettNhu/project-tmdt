'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter, BookmarkPlus, Tag, ChevronRight } from 'lucide-react';

// Mock data chi tiết bài viết
const newsArticles = [
  {
    id: 1,
    title: 'Xu hướng thời trang Xuân Hè 2025: Những gam màu pastel lên ngôi',
    excerpt: 'Khám phá những xu hướng thời trang hot nhất mùa Xuân Hè 2025 với sự trở lại mạnh mẽ của các gam màu pastel nhẹ nhàng, thanh lịch.',
    content: `
      <p>Mùa Xuân Hè 2025 đánh dấu sự trở lại mạnh mẽ của những gam màu pastel nhẹ nhàng, mang đến làn gió mới cho tủ đồ của các tín đồ thời trang. Từ các sàn runway Paris, Milan đến New York, các nhà thiết kế đều đồng loạt lựa chọn palette màu sắc tươi sáng, nữ tính này.</p>

      <h2>1. Lavender - Màu sắc của năm</h2>
      <p>Màu tím lavender tiếp tục khẳng định vị thế của mình, từ các thiết kế haute couture đến street style. Sự kết hợp giữa vẻ thanh lịch và hiện đại khiến lavender trở thành lựa chọn hoàn hảo cho mọi dịp.</p>

      <h2>2. Mint Green - Sự tươi mát của mùa hè</h2>
      <p>Xanh mint mang đến cảm giác mát mẻ, tươi mới - hoàn hảo cho những ngày hè nóng bức. Kết hợp với trắng hoặc be để tạo look nhẹ nhàng, hoặc layer với các tông màu đậm hơn cho outfit ấn tượng.</p>

      <h2>3. Butter Yellow - Ấm áp và sang trọng</h2>
      <p>Vàng bơ (butter yellow) là sự lựa chọn tinh tế cho những ai yêu thích sự ấm áp nhưng không quá chói. Màu sắc này đặc biệt phù hợp với làn da châu Á.</p>

      <h2>4. Baby Pink - Cổ điển không bao giờ lỗi mốt</h2>
      <p>Hồng baby luôn là màu sắc "an toàn" nhưng không hề nhàm chán. Năm nay, baby pink được làm mới với các thiết kế hiện đại, từ blazer oversized đến váy midi thanh lịch.</p>

      <h2>Cách phối đồ với màu pastel</h2>
      <p>Để tạo outfit hài hòa với màu pastel, bạn có thể:</p>
      <ul>
        <li>Kết hợp 2-3 màu pastel cùng tông để tạo look monochrome</li>
        <li>Mix pastel với trắng/be để outfit nhẹ nhàng hơn</li>
        <li>Thêm accessories màu trung tính (đen, nâu, camel) để cân bằng</li>
        <li>Layer các lớp pastel khác nhau để tạo chiều sâu</li>
      </ul>

      <p>Xu hướng pastel không chỉ dừng lại ở quần áo mà còn lan tỏa sang cả phụ kiện như túi xách, giày dép, và trang sức. Hãy để STYLA đồng hành cùng bạn trong việc cập nhật những item pastel hot nhất mùa này!</p>
    `,
    image: '/images/news-1.jpg',
    category: 'Xu hướng',
    author: 'Nguyễn Thị Mai',
    authorAvatar: '/images/author-1.jpg',
    date: '2025-03-15',
    readTime: '5 phút đọc',
  },
  {
    id: 2,
    title: 'Cách phối đồ công sở thanh lịch cho phái đẹp',
    excerpt: 'Hướng dẫn chi tiết cách mix & match trang phục công sở vừa chuyên nghiệp vừa thời thượng cho các nàng công sở.',
    content: `
      <p>Trang phục công sở không nhất thiết phải nhàm chán. Với những tips phối đồ thông minh, bạn hoàn toàn có thể vừa chuyên nghiệp vừa thời thượng mỗi ngày đến văn phòng.</p>

      <h2>1. Đầu tư vào những item cơ bản chất lượng</h2>
      <p>Blazer, áo sơ mi trắng, quần âu đen, váy bút chì - đây là những món đồ "xương sống" của tủ đồ công sở. Hãy chọn chất liệu tốt, form dáng chuẩn để mix được nhiều outfit khác nhau.</p>

      <h2>2. Thêm màu sắc qua phụ kiện</h2>
      <p>Nếu dress code công ty nghiêm ngặt, hãy thêm điểm nhấn qua túi xách, giày, thắt lưng hoặc trang sức. Một chiếc túi màu đỏ hay đôi giày nude có thể làm sáng cả outfit.</p>

      <h2>3. Layering thông minh</h2>
      <p>Kết hợp áo trong với blazer, cardigan hoặc vest để tạo chiều sâu cho outfit. Đây cũng là cách giữ ấm hiệu quả trong phòng máy lạnh.</p>

      <h2>4. Chọn giày phù hợp</h2>
      <p>Giày cao gót không phải lựa chọn duy nhất. Loafers, mules, hoặc sneakers trắng sạch sẽ đều có thể mix được với đồ công sở nếu biết cách phối.</p>

      <h2>5. Makeup & tóc gọn gàng</h2>
      <p>Makeup nhẹ nhàng, tự nhiên và tóc gọn gàng sẽ hoàn thiện look công sở chuyên nghiệp của bạn.</p>
    `,
    image: '/images/news-2.jpg',
    category: 'Hướng dẫn',
    author: 'Trần Văn Hùng',
    authorAvatar: '/images/author-2.jpg',
    date: '2025-03-12',
    readTime: '7 phút đọc',
  },
  {
    id: 3,
    title: 'Top 10 phụ kiện không thể thiếu trong tủ đồ mùa hè',
    excerpt: 'Điểm danh những món phụ kiện must-have giúp bạn tỏa sáng trong mùa hè năm nay.',
    content: `
      <p>Phụ kiện là yếu tố quan trọng giúp nâng tầm outfit. Dưới đây là 10 món phụ kiện bạn nên sở hữu cho mùa hè 2025.</p>

      <h2>1. Kính mát oversized</h2>
      <p>Vừa bảo vệ mắt vừa tạo điểm nhấn thời trang, kính mát oversized là must-have mùa hè.</p>

      <h2>2. Túi cói/Túi đan</h2>
      <p>Hoàn hảo cho những chuyến đi biển hay dạo phố cuối tuần.</p>

      <h2>3. Sandal quai ngang</h2>
      <p>Thoải mái, dễ phối và cực kỳ trendy.</p>

      <h2>4. Mũ cói rộng vành</h2>
      <p>Che nắng hiệu quả và cực kỳ sang chảnh.</p>

      <h2>5. Vòng cổ choker</h2>
      <p>Điểm nhấn cho những outfit đơn giản.</p>

      <h2>6. Belt bag / Crossbody bag</h2>
      <p>Tiện lợi cho những chuyến du lịch.</p>

      <h2>7. Hoa tai statement</h2>
      <p>Một đôi hoa tai to bản có thể thay đổi hoàn toàn outfit.</p>

      <h2>8. Khăn lụa</h2>
      <p>Đa năng - có thể làm headband, buộc tóc, hay quấn túi.</p>

      <h2>9. Anklet (vòng chân)</h2>
      <p>Điểm nhấn nhỏ xinh cho những đôi sandal.</p>

      <h2>10. Đồng hồ dây vải/da</h2>
      <p>Phụ kiện classic không bao giờ lỗi mốt.</p>
    `,
    image: '/images/news-3.jpg',
    category: 'Phụ kiện',
    author: 'Lê Thị Hương',
    authorAvatar: '/images/author-3.jpg',
    date: '2025-03-10',
    readTime: '4 phút đọc',
  },
  {
    id: 4,
    title: 'Bí quyết chọn size quần áo online không bao giờ sai',
    excerpt: 'Những mẹo hay giúp bạn chọn đúng size khi mua sắm online, tránh tình trạng đổi trả phiền phức.',
    content: `
      <p>Mua sắm online tiện lợi nhưng việc chọn size luôn là nỗi lo của nhiều người. Dưới đây là những bí quyết giúp bạn chọn đúng size ngay từ lần đầu.</p>

      <h2>1. Đo số đo cơ thể chính xác</h2>
      <p>Dùng thước dây đo vòng ngực, vòng eo, vòng hông và chiều dài cần thiết. Ghi lại để so sánh với bảng size.</p>

      <h2>2. Tham khảo bảng size của từng shop</h2>
      <p>Mỗi thương hiệu có bảng size riêng. Đừng assume size M ở shop này giống size M ở shop khác.</p>

      <h2>3. Đọc review và xem ảnh thực tế</h2>
      <p>Review từ người mua trước sẽ cho bạn thông tin quý giá về form dáng thực tế.</p>

      <h2>4. Chat với shop để hỏi tư vấn</h2>
      <p>Cung cấp số đo và yêu cầu shop tư vấn size phù hợp.</p>

      <h2>5. Biết form dáng bạn thích</h2>
      <p>Bạn thích mặc ôm hay rộng? Điều này ảnh hưởng đến việc chọn size.</p>

      <h2>6. Chọn shop có chính sách đổi trả tốt</h2>
      <p>Phòng trường hợp size không vừa, hãy chọn shop cho phép đổi size dễ dàng.</p>
    `,
    image: '/images/news-4.jpg',
    category: 'Mẹo hay',
    author: 'Phạm Minh Tuấn',
    authorAvatar: '/images/author-4.jpg',
    date: '2025-03-08',
    readTime: '6 phút đọc',
  },
  {
    id: 5,
    title: 'STYLA ra mắt BST mới: "Urban Chic" - Phong cách đô thị hiện đại',
    excerpt: 'Giới thiệu bộ sưu tập mới nhất của STYLA với những thiết kế mang đậm phong cách đô thị năng động.',
    content: `
      <p>STYLA tự hào giới thiệu bộ sưu tập "Urban Chic" - lấy cảm hứng từ nhịp sống năng động của đô thị hiện đại.</p>

      <h2>Concept</h2>
      <p>Urban Chic kết hợp giữa sự thanh lịch cổ điển và vẻ phóng khoáng của street style. BST hướng đến những người trẻ yêu thời trang, muốn tự tin thể hiện cá tính trong cuộc sống hàng ngày.</p>

      <h2>Điểm nhấn</h2>
      <ul>
        <li>Blazer oversize với cut-out độc đáo</li>
        <li>Quần ống rộng với chi tiết xẻ tà</li>
        <li>Áo crop top phối layer</li>
        <li>Váy midi với họa tiết graphic</li>
        <li>Phụ kiện statement: belt chain, túi bucket</li>
      </ul>

      <h2>Bảng màu</h2>
      <p>Neutral tones (be, nâu, đen, trắng) kết hợp với điểm nhấn màu neon tạo sự tương phản thú vị.</p>

      <h2>Giá thành</h2>
      <p>BST Urban Chic có mức giá từ 299.000đ - 1.299.000đ, phù hợp với đa số khách hàng.</p>

      <p>Khám phá ngay BST Urban Chic tại website STYLA hoặc ghé thăm cửa hàng gần nhất!</p>
    `,
    image: '/images/news-5.jpg',
    category: 'Bộ sưu tập',
    author: 'STYLA Team',
    authorAvatar: '/images/styla-logo.jpg',
    date: '2025-03-05',
    readTime: '3 phút đọc',
  },
  {
    id: 6,
    title: 'Chương trình khuyến mãi lớn nhất năm - Sale up to 50%',
    excerpt: 'Đừng bỏ lỡ cơ hội sở hữu những item thời trang yêu thích với mức giá siêu hấp dẫn.',
    content: `
      <p>STYLA chính thức khởi động chương trình SALE LỚN NHẤT NĂM với mức giảm giá lên đến 50%!</p>

      <h2>Thời gian</h2>
      <p>Từ 01/03/2025 - 31/03/2025</p>

      <h2>Ưu đãi</h2>
      <ul>
        <li>Giảm 30-50% tất cả sản phẩm</li>
        <li>Mua 2 giảm thêm 10%</li>
        <li>Mua 3 giảm thêm 15%</li>
        <li>Free ship đơn từ 500.000đ</li>
        <li>Tặng voucher 100.000đ cho đơn từ 1.000.000đ</li>
      </ul>

      <h2>Sản phẩm áp dụng</h2>
      <p>Áp dụng cho TẤT CẢ sản phẩm trên website và cửa hàng (trừ BST mới ra mắt).</p>

      <h2>Cách thức tham gia</h2>
      <p>Mua sắm trực tiếp tại website hoặc cửa hàng STYLA. Ưu đãi áp dụng tự động, không cần nhập mã.</p>

      <p>Số lượng có hạn - Nhanh tay kẻo lỡ!</p>
    `,
    image: '/images/news-6.jpg',
    category: 'Khuyến mãi',
    author: 'STYLA Team',
    authorAvatar: '/images/styla-logo.jpg',
    date: '2025-03-01',
    readTime: '2 phút đọc',
  },
];

// Bài viết liên quan
const relatedArticles = [
  {
    id: 2,
    title: 'Cách phối đồ công sở thanh lịch cho phái đẹp',
    category: 'Hướng dẫn',
    date: '2025-03-12',
  },
  {
    id: 3,
    title: 'Top 10 phụ kiện không thể thiếu trong tủ đồ mùa hè',
    category: 'Phụ kiện',
    date: '2025-03-10',
  },
  {
    id: 5,
    title: 'STYLA ra mắt BST mới: "Urban Chic"',
    category: 'Bộ sưu tập',
    date: '2025-03-05',
  },
];

export default function NewsDetailPage() {
  const params = useParams();
  const articleId = parseInt(params.id as string);
  
  const article = newsArticles.find(a => a.id === articleId);

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📰</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy bài viết</h1>
          <p className="text-gray-500 mb-6">Bài viết này có thể đã bị xóa hoặc không tồn tại.</p>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-6 py-3 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Quay lại trang tin tức
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-pink-500">Trang chủ</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/news" className="text-gray-500 hover:text-pink-500">Tin tức</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium truncate">{article.title}</span>
          </nav>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-4 h-4 text-pink-500" />
            <span className="text-pink-500 font-medium">{article.category}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-bold">
                {article.author.charAt(0)}
              </div>
              <span className="font-medium text-gray-900">{article.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(article.date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
            <span className="text-white text-8xl">📰</span>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="flex items-center gap-4 mb-8 pb-8 border-b">
          <span className="text-gray-500 font-medium">Chia sẻ:</span>
          <button className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">
            <Facebook className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full bg-sky-400 text-white hover:bg-sky-500 transition-colors">
            <Twitter className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors ml-auto">
            <BookmarkPlus className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div 
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-pink-500 prose-strong:text-gray-900 prose-ul:text-gray-600 prose-li:marker:text-pink-500"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags */}
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-wrap gap-2">
            <span className="text-gray-500 font-medium mr-2">Tags:</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-pink-50 hover:text-pink-500 cursor-pointer transition-colors">
              Thời trang
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-pink-50 hover:text-pink-500 cursor-pointer transition-colors">
              {article.category}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-pink-50 hover:text-pink-500 cursor-pointer transition-colors">
              STYLA
            </span>
          </div>
        </div>

        {/* Author Box */}
        <div className="mt-8 p-6 bg-white rounded-2xl border">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
              {article.author.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{article.author}</h3>
              <p className="text-gray-500 text-sm">Fashion Editor tại STYLA</p>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Bài viết liên quan</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedArticles.filter(a => a.id !== articleId).map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.id}`}
                className="group bg-white rounded-xl overflow-hidden border hover:shadow-lg transition-all duration-300"
              >
                <div className="h-32 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <span className="text-4xl text-gray-400">📄</span>
                </div>
                <div className="p-4">
                  <span className="text-xs text-pink-500 font-medium">{item.category}</span>
                  <h3 className="font-semibold text-gray-900 mt-1 group-hover:text-pink-500 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">{formatDate(item.date)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-full hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Quay lại trang tin tức
          </Link>
        </div>
      </article>
    </div>
  );
}
