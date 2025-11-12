'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Fix TypeScript: ép kiểu Variants + ease array
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const, // easeOut cubic-bezier
    },
  },
};

const staggerChildren: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function AboutPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [missionRef, missionInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [teamRef, teamInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="w-full bg-white overflow-hidden">

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-pink-50">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FFE8F4]/30 to-transparent"></div>
        <div className="absolute top-32 left-10 w-96 h-96 bg-[#D9006C]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#FF1A7A]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <motion.div
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="relative text-center px-6 max-w-5xl mx-auto"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="inline-block px-6 py-3 bg-white/90 backdrop-blur-md text-[#D9006C] text-sm font-bold rounded-full shadow-xl mb-8 border border-pink-100"
          >
            Về STYLA – Nơi phong cách bắt đầu
          </motion.span>

          <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black mb-8 leading-tight">
            <motion.span variants={fadeUp}>Câu chuyện</motion.span>
            <br />
            <motion.span
              className="bg-gradient-to-r from-[#D9006C] via-[#FF1A7A] to-[#FF69B4] bg-clip-text text-transparent"
              variants={fadeUp}
            >
              của chúng tôi
            </motion.span>
          </h1>

          <motion.p
            variants={fadeUp}
            className="text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-light"
          >
            STYLA không chỉ là thời trang. Đó là sự tôn vinh cá tính, 
            là những thiết kế tối giản nhưng đầy cảm xúc, 
            được tạo ra để đồng hành cùng bạn trong mọi khoảnh khắc.
          </motion.p>
        </motion.div>
      </section>

      {/* Mission */}
      <section ref={missionRef} className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial="hidden"
            animate={missionInView ? "visible" : "hidden"}
            variants={staggerChildren}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeUp} className="space-y-12">
              <div>
                <h2 className="text-5xl font-black text-gray-900 mb-6">Sứ mệnh của chúng tôi</h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Mang đến những thiết kế tinh tế, bền vững và dễ dàng hòa quyện vào cuộc sống thường nhật. 
                  Chúng tôi tin rằng trang phục đẹp nhất là trang phục khiến bạn cảm thấy <span className="text-[#D9006C] font-semibold">là chính mình</span>.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  "Thiết kế tối giản, không lỗi thời",
                  "Chất lượng vượt trội trong từng đường kim mũi chỉ",
                  "Cam kết minh bạch và thân thiện với môi trường",
                  "Luôn lắng nghe và đồng hành cùng khách hàng"
                ].map((value, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex items-start gap-4 group">
                    <div className="w-3 h-3 rounded-full bg-[#FF1A7A] mt-2 shrink-0 group-hover:scale-150 transition-transform"></div>
                    <p className="text-gray-700 text-lg">{value}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={fadeUp} className="pt-8">
                <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-2xl">
                  <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                    <span className="text-3xl">Email</span> Liên hệ ngay
                  </h3>
                  <p className="text-pink-200 mb-4">Chúng tôi luôn ở đây để lắng nghe bạn</p>
                  <a href="mailto:hello@styla.vn" className="text-[#FF69B4] hover:text-white font-bold text-lg">
                    hello@styla.vn
                  </a>
                </div>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeUp} className="relative h-[700px] rounded-3xl overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D9006C] to-[#FF69B4] opacity-80 group-hover:opacity-90 transition-opacity"></div>
              <div className="absolute inset-0 bg-black/20"></div>
              
              <div className="relative h-full flex flex-col justify-between p-12 text-white">
                <div className="text-center pt-20">
                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ repeat: Infinity, duration: 6 }}
                    className="text-9xl mb-8"
                  >
                    Dress
                  </motion.div>
                  <h3 className="text-4xl font-black mb-4">Tinh tế trong từng chi tiết</h3>
                  <p className="text-xl opacity-90">Từ ý tưởng đến sản phẩm hoàn thiện</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <p className="text-lg leading-relaxed">
                    Mỗi sản phẩm STYLA đều được chọn lọc từ chất liệu cao cấp, 
                    gia công tỉ mỉ tại các xưởng uy tín và kiểm định nghiêm ngặt 
                    trước khi đến tay bạn.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section ref={teamRef} className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial="hidden"
            animate={teamInView ? "visible" : "hidden"}
            variants={fadeUp}
            className="text-center mb-20"
          >
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">
              Đội ngũ đằng sau STYLA
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Những con người tận tâm, sáng tạo và luôn đặt trải nghiệm khách hàng lên hàng đầu.
            </p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="hidden"
            animate={teamInView ? "visible" : "hidden"}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { name: "Như Nguyệt", role: "Creative Director", emoji: "Founder", color: "from-[#D9006C] to-[#FF1A7A]" },
              { name: "Đức Cường", role: "Head of Production", emoji: "Co-Founder", color: "from-[#FF1A7A] to-[#FF69B4]" },
              { name: "Khánh Ly", role: "Sustainability Lead", emoji: "Co-Founder", color: "from-[#FF69B4] to-[#FFC0E0]" },
              { name: "Chat Bot", role: "Customer Happiness", emoji: "Leaf", color: "from-[#FFE8F4] to-[#D9006C]" }
            ].map((member, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -12, scale: 1.05 }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-20 transition-opacity`}></div>
                <div className="p-10 text-center">
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-500">
                    {member.emoji}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
                <div className="h-2 bg-gradient-to-r from-[#D9006C] to-[#FF1A7A] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-linear-to-br from-[#D9006C] to-[#FF1A7A]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center px-6"
        >
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-8">
            Bạn đã sẵn sàng để
            <br />
            <span className="text-[#FFF0F6]">tỏa sáng theo cách riêng?</span>
          </h2>
          <p className="text-xl text-pink-100 mb-12 max-w-2xl mx-auto">
            Hãy để STYLA đồng hành cùng bạn trên hành trình khám phá phong cách đích thực.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/collections"
              className="px-12 py-5 bg-white text-[#D9006C] font-bold text-lg rounded-full shadow-2xl hover:shadow-pink-300 hover:scale-105 transition-all duration-300 flex items-center gap-3"
            >
              Khám phá bộ sưu tập
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            
            <Link
              href="/"
              className="px-12 py-5 border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
            >
              Về trang chủ
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}