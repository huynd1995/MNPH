# Ứng Dụng Tra Cứu & Tạo Thẻ Bìa Bài Thơ Mầm Non A5 Nằm Ngang (FastAPI + Gemini AI Search Grounding)

Hệ thống tra cứu bài thơ mầm non trực tuyến theo thời gian thực sử dụng **FastAPI** và **Gemini API (Google Search Grounding)** kết hợp **Studio tạo mã QR và thẻ bìa học liệu khổ A5 nằm ngang** chuẩn in ấn dành cho giáo viên mầm non.

---

## 🌟 Tính Năng Nổi Bật

1. **Tra cứu AI không phụ thuộc database tĩnh**: Tự động tra cứu trực tuyến qua Google Search thông qua mô hình Gemini (Gemini 2.5 / 1.5 Flash).
2. **Nhận diện thông minh**: Hỗ trợ tìm kiếm theo tên bài thơ, một hoặc nhiều câu thơ bất kỳ trong bài, từ khóa không dấu hoặc sai chính tả.
3. **Đầu ra có cấu trúc (Structured JSON)**: Chuẩn hóa tự động tên bài thơ, tác giả, lời thơ phân dòng, chủ đề, tranh minh họa và link nhạc thiếu nhi YouTube liên quan.
4. **Studio Tạo Thẻ Bìa A5 Chuẩn In Ấn**:
   - Khổ giấy chuẩn **A5 Nằm Ngang (210mm x 148mm)**, tỷ lệ 1.414.
   - Bố cục tối giản: Tiêu đề lớn và khung mã QR.
   - Chuyển đổi linh hoạt: **1 Mã QR To** (căn giữa) hoặc **2 Mã QR Song Song** (Khung xanh: Xem tranh bài thơ; Khung đỏ: Nghe nhạc YouTube).
   - In trực tiếp qua trình duyệt với `@page { size: A5 landscape; margin: 0; }` không bị nhảy trang hoặc Tải ảnh PNG chất lượng cao.
5. **Trang Đọc Thơ Di Động (Mobile Reader)**:
   - Giao diện thân thiện khi phụ huynh/học sinh quét QR.
   - Tranh minh họa sắc nét, lời thơ to rõ.
   - Tích hợp nút **"Đọc thơ cho bé nghe"** tự động phát âm tiếng Việt chuẩn.

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