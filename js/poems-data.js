/**
 * Kho Dữ Liệu Bài Thơ Mầm Non Chuẩn Giáo Dục Mầm Non Việt Nam
 * Bao gồm tên bài thơ, tác giả, chủ đề, toàn văn lời thơ, ảnh minh họa mẫu và link bài hát YouTube tương ứng
 */
const POEMS_DATABASE = [
  {
    id: "ngoi-nha",
    title: "Ngôi Nhà",
    author: "Mai Ngọc Thể",
    category: "Gia đình",
    coverImage: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=F0f18y4Jt9I",
    youtubeTitle: "Nhạc: Nhà Của Tôi",
    content: `Em yêu nhà em
Hàng xoan trước ngõ
Hoa xao xuyến nở
Như mây từng chùm.

Em yêu tiếng chim
Đầu hồi lảnh lót
Mái vàng thơm phức
Rạ đầy sân phơi.

Em yêu ngôi nhà
Gỗ xoan thơm phức
Có bạn hoa cúc
Cười trong nắng vàng.`
  },
  {
    id: "dan-ga-con",
    title: "Đàn Gà Con",
    author: "Phạm Hổ",
    category: "Động vật",
    coverImage: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=nQJzW-p904g",
    youtubeTitle: "Nhạc: Đàn Gà Con",
    content: `Mười quả trứng tròn
Mẹ gà ấp ủ
Hôm nay ra lò
Mười chú gà con.

Lông trắng viền vàng
Mắt đen sáng ngời
Cái mỏ tí hon
Cái chân bé xíu.

Líu ríu líu ríu
Theo mẹ tìm mồi
Gà con vui sướng
Chạy nhảy lon ton.`
  },
  {
    id: "bap-cai-xanh",
    title: "Bắp Cải Xanh",
    author: "Phạm Hổ",
    category: "Thực vật",
    coverImage: "https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?auto=format&fit=crop&w=800&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=Q5vV0lXv2t4",
    youtubeTitle: "Nhạc: Bắp Cải Xanh",
    content: `Bắp cải xanh
Xanh man mát
Lá cải sắp
Sắp vòng tròn.

Búp cải non
Nằm ngủ giữa
Bắp cải xanh
Nấu canh ngon!`
  },
  {
    id: "yeu-me",
    title: "Yêu Mẹ",
    author: "Nguyễn Bao",
    category: "Gia đình",
    coverImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=lUfWl9m5LhE",
    youtubeTitle: "Nhạc: Mẹ Yêu Không Nào",
    content: `Mẹ đi làm
Từ sáng sớm
Dậy thổi cơm
Kho thịt cá.

Em liền thức
Chạy đến bên
Ôm cổ mẹ
Hôn đôi má.`
  },
  {
    id: "cay-day-leo",
    title: "Cây Dây Leo",
    author: "Xuân Quỳnh",
    category: "Thực vật",
    coverImage: "https://images.unsplash.com/photo-1530968464175-e7b97c0e038d?auto=format&fit=crop&w=800&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=48n9R3f7Z7s",
    youtubeTitle: "Nhạc: Em Yêu Cây Xanh",
    content: `Cây dây leo
Bé tí teo
Ở trong nhà
Lại bò ra
Ngoài cửa sổ.

Vươn cổ lên
Ngắm trời cao
Hỏi vì sao:
Cây trả lời
Ra ngoài trời
Cho dễ thở
Tắm nắng gió
Gội mưa rào
Cây mới cao
Hoa mới đẹp!`
  },
  {
    id: "rong-va-ca",
    title: "Rong Và Cá",
    author: "Phạm Hổ",
    category: "Động vật",
    coverImage: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=800&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=Kz6lE3zW2rU",
    youtubeTitle: "Nhạc: Cá Vàng Bơi",
    content: `Có cô rong xanh
Đẹp như tơ nhuộm
Giữa hồ nước trong
Nhẹ nhàng uốn lượn.

Một đàn cá nhỏ
Đuôi đỏ lụa hồng
Quanh cô rong xanh
Múa làm văn nghệ.`
  },
  {
    id: "di-dep",
    title: "Đi Dép",
    author: "Phạm Hổ",
    category: "Bản thân",
    coverImage: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=e_k9_YjF1U0",
    youtubeTitle: "Nhạc: Bé Tập Đi Dép",
    content: `Chân được đi dép
Thấy êm êm là
Dép cũng vui lắm
Được đi khắp nhà.

Dép cùng với bé
Bảo vệ đôi chân
Để chân trắng trẻo
Không dính bụi bẩn.`
  },
  {
    id: "be-an-qua",
    title: "Bé Ăn Quả",
    author: "Sưu tầm",
    category: "Thực vật / Dinh dưỡng",
    coverImage: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=n7z5c2v6KzE",
    youtubeTitle: "Nhạc: Quả Gì",
    content: `Bé ăn nhiều quả
Người mau lớn mau
Quả cam quả bưởi
Nhiều vitamin.

Bé ăn quả nho
Bé ăn quả táo
Môi hồng má đỏ
Khỏe mạnh thông minh.`
  },
  {
    id: "chiec-quat-nan",
    title: "Chiếc Quạt Nan",
    author: "Bà Cho Cháu Quạt",
    category: "Gia đình",
    coverImage: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=U0xU5XF7j2E",
    youtubeTitle: "Nhạc: Cháu Yêu Bà",
    content: `Bà cho cháu chiếc quạt nan
Gió đưa thoang thoảng nhẹ nhàng từng cơn
Trưa hè ve hót véo von
Cháu ngồi quạt mát cho tròn giấc sâu.

Bàn tay phe phẩy trên đầu
Gió êm như thể phép màu bà cho.`
  },
  {
    id: "ban-moi",
    title: "Bạn Mới",
    author: "Nguyệt Mai",
    category: "Trường mầm non",
    coverImage: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=0wQv7T1yJ_Q",
    youtubeTitle: "Nhạc: Trường Chúng Cháu Là Trường Mầm Non",
    content: `Bạn mới đến trường
Hãy còn nhút nhát
Em dạy bạn hát
Rủ bạn cùng chơi.

Cô thấy cô cười
Khen em ngoan ngoãn
Biết yêu quý bạn
Thật là trò ngoan!`
  },
  {
    id: "loi-chao-di-truoc",
    title: "Lời Chào Đi Trước",
    author: "Định Hải",
    category: "Kỹ năng sống",
    coverImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=z8XyY1qA2Bs",
    youtubeTitle: "Nhạc: Lời Chào Buổi Sáng",
    content: `Đi về con chào mẹ
Ra đường chào cô, thầy
Gặp ai cũng mỉm cười
Khoanh hai tay xinh đẹp.

Lời chào như bông hoa
Nở trên môi bé ngoan
Ai ai cũng yêu mến
Bé ngoan của mọi nhà.`
  },
  {
    id: "chu-bo-doi-hanh-quan-trong-mua",
    title: "Chú Bộ Đội Hành Quân Trong Mưa",
    author: "Vũ Thùy Hương",
    category: "Nghề nghiệp",
    coverImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=m4S8O_2aBcs",
    youtubeTitle: "Nhạc: Chú Bộ Đội",
    content: `Mưa rơi, mưa rơi
Lộp bộp, lộp bộp
Áo dù có ướt
Vẫn đi, vẫn đi.

Đường ra mặt trận
Còn dài, còn dài
Cho dù mưa rơi
Chú vẫn bước đều.`
  }
];

// Helper để tìm kiếm bài thơ
function searchPoems(keyword) {
  if (!keyword || keyword.trim() === "") return POEMS_DATABASE;
  const lower = keyword.toLowerCase().trim();
  return POEMS_DATABASE.filter(p => 
    p.title.toLowerCase().includes(lower) || 
    p.author.toLowerCase().includes(lower) || 
    p.category.toLowerCase().includes(lower) ||
    p.content.toLowerCase().includes(lower)
  );
}

// Lấy danh sách các chủ đề mầm non
function getPoemCategories() {
  const cats = new Set(POEMS_DATABASE.map(p => p.category).filter(Boolean));
  return ['Tất cả', ...Array.from(cats)];
}

