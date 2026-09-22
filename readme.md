# Ứng Dụng Tra Cứu & Tạo Thẻ Bìa Bài Thơ Mầm Non A4 / A5 Nằm Ngang (FastAPI + Gemini AI)

Hệ thống tra cứu bài thơ mầm non trực tuyến theo thời gian thực sử dụng **FastAPI** và **Gemini API (Google Search Grounding)** kết hợp **Studio tạo mã QR và thẻ bìa học liệu khổ A4 / A5 nằm ngang** chuẩn in ấn dành cho giáo viên mầm non.

---

## 🌟 Tính Năng Nổi Bật & Bản Nâng Cấp Lớn

1. **Tra cứu AI không phụ thuộc database tĩnh**: Tự động tra cứu trực tuyến qua Google Search thông qua mô hình Gemini (Gemini 2.5 / 1.5 Flash).
2. **Bộ Lọc Theo Chủ Đề Giáo Án**: Lọc nhanh kho thơ theo các chủ đề: *Gia đình, Động vật, Thực vật, Kỹ năng sống, Nghề nghiệp...*
3. **Studio Tạo Thẻ Khổ A4 / A5 Chuẩn In Ấn**:
   - Khổ in ngang **A4 (297mm x 210mm)** & **A5 (210mm x 148mm)**.
   - Chuyển đổi linh hoạt: **1 Mã QR To** hoặc **2 Mã QR Song Song** (Thơ & Nhạc YouTube).
   - Tinh chỉnh phóng đại QR từ 80% đến 135% quét siêu nhạy từ xa.
4. **Hệ Thống 8 Bảng Màu Chủ Đề Mầm Non Rực Rỡ**:
   - *Chuẩn Mầm Non, Cầu Vồng Tuổi Thơ, Mặt Trời Tươi Vui, Vườn Cổ Tích, Kẹo Bông Gòn, Đại Dương Kỳ Thú, Ngân Hà Khám Phá, Đen Trắng Siêu Nét*.
5. **Các Tính Năng Sáng Tạo Nâng Cao (Không ảnh hưởng nội dung cũ)**:
   - **Tiêu Đề & Góc Học Liệu trên thẻ in**: Tùy chọn in thêm tên góc thơ, tên bài và tác giả ở đầu thẻ.
   - **Sticker / Icon nhận diện tâm mã QR**: Gắn biểu tượng cuốn sách 📖 và nốt nhạc 🎵 ngay giữa QR (quét 100% nhạy bén).
   - **Khung viền trang trí nghệ thuật**: 4 kiểu viền (Nét đứt mầm non, Viền đôi trang nhã, Cầu vồng rực rỡ, Tối giản mực in).
   - **Thanh công cụ Zoom Preview**: Phóng to (+), thu nhỏ (-), vừa màn hình (Fit) trực quan.
   - **Chia sẻ link gửi phụ huynh**: Sao chép nhanh liên kết đọc thơ gửi trực tiếp vào nhóm Zalo/Facebook lớp.
6. **Trang Đọc Thơ Di Động Tương Tác (`reader.html`)**:
   - Giao diện sách truyện tranh thiếu nhi sống động, dễ thương.
   - Tùy chỉnh tốc độ đọc (Chậm 0.75x, Vừa 0.88x, Nhanh 1.0x), phóng to/thu nhỏ cỡ chữ.
   - Hiệu ứng pháo hoa sao chúc mừng bé khi đọc xong bài thơ.

---

## 📂 Cấu Trúc Thư Mục

```text
APP_hotrotaoqrcode/
├── main.py              # Backend FastAPI tích hợp Gemini Search Grounding & API Routes
├── index.html           # Studio chính tạo thẻ bìa A5 & Tra cứu AI
├── reader.html          # Trang đọc thơ di động (khi quét QR)
├── requirements.txt     # Danh sách thư viện Python phụ thuộc
├── .env.example         # Mẫu cấu hình biến môi trường
├── .env                 # File cấu hình API key (GEMINI_API_KEY)
├── README.md            # Tài liệu dự án
├── css/
│   ├── style.css        # Hệ thống giao diện mầm non Pastel & responsive
│   └── print.css        # Cấu hình in ấn chuẩn khổ A5 ngang
└── js/
    ├── poems-data.js    # Kho dữ liệu bài thơ mầm non mẫu
    ├── qr-engine.js     # Module sinh mã QR & nén giải mã URL payload
    └── app.js           # Bộ điều khiển logic ứng dụng & kết nối API
```

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Ứng Dụng

### 1. Cài đặt thư viện phụ thuộc
```bash
pip install -r requirements.txt
```

### 2. Cấu hình Gemini API Key
- Lấy API Key miễn phí tại: [Google AI Studio](https://aistudio.google.com/)
- Điền API Key vào file `.env`:
```env
GEMINI_API_KEY=AIzaSy...
HOST=127.0.0.1
PORT=8000
```
*(Bạn cũng có thể nhập API Key trực tiếp trên nút "AI Search" ở góc phải màn hình).*

### 3. Khởi chạy máy chủ
```bash
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

### 4. Mở ứng dụng
Truy cập trình duyệt web tại địa chỉ:
👉 **http://127.0.0.1:8000**