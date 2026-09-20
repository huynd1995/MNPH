/**
 * QR Engine & Data Encoder for Kindergarten A5 Poem & Media QR Card Generator
 */

const QREngine = {
  /**
   * Tạo URL cho trang đọc thơ di động (reader.html)
   * Sử dụng LZString (nếu có) hoặc encodeURIComponent để nhúng dữ liệu trực tiếp vào URL
   */
  generateReaderUrl(poem) {
    const baseUrl = window.location.origin + window.location.pathname.replace(/index\.html$/, '') + 'reader.html';
    
    // Tạo payload thu gọn
    const payload = {
      id: poem.id || 'custom',
      t: poem.title,
      a: poem.author || 'Sưu tầm',
      c: poem.content,
      img: poem.coverImage || '',
      yt: poem.youtubeUrl || '',
      ytTitle: poem.youtubeTitle || ''
    };

    try {
      if (window.LZString) {
        const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(payload));
        return `${baseUrl}#p=${compressed}`;
      } else {
        const encoded = encodeURIComponent(JSON.stringify(payload));
        return `${baseUrl}#d=${encoded}`;
      }
    } catch (e) {
      console.warn("Error compressing poem payload:", e);
      if (poem.id) {
        return `${baseUrl}?id=${encodeURIComponent(poem.id)}`;
      }
      return baseUrl;
    }
  },

  /**
   * Giải mã dữ liệu từ URL hash hoặc query string
   */
  parseReaderUrl() {
    const hash = window.location.hash;
    const search = window.location.search;

    // 1. Kiểm tra nén LZString
    if (hash && hash.startsWith('#p=')) {
      try {
        const compressed = hash.substring(3);
        if (window.LZString) {
          const jsonStr = LZString.decompressFromEncodedURIComponent(compressed);
          if (jsonStr) {
            const raw = JSON.parse(jsonStr);
            return {
              id: raw.id,
              title: raw.t,
              author: raw.a,
              content: raw.c,
              coverImage: raw.img,
              youtubeUrl: raw.yt,
              youtubeTitle: raw.ytTitle
            };
          }
        }
      } catch (err) {
        console.error("Error decoding LZString hash:", err);
      }
    }

    // 2. Kiểm tra JSON URI
    if (hash && hash.startsWith('#d=')) {
      try {
        const rawStr = decodeURIComponent(hash.substring(3));
        const raw = JSON.parse(rawStr);
        return {
          id: raw.id,
          title: raw.t,
          author: raw.a,
          content: raw.c,
          coverImage: raw.img,
          youtubeUrl: raw.yt,
          youtubeTitle: raw.ytTitle
        };
      } catch (err) {
        console.error("Error decoding URI hash:", err);
      }
    }

    // 3. Kiểm tra query param ID
    const urlParams = new URLSearchParams(search);
    const id = urlParams.get('id');
    if (id && typeof POEMS_DATABASE !== 'undefined') {
      const found = POEMS_DATABASE.find(p => p.id === id);
      if (found) return found;
    }

    // Default fallback: Bài thơ đầu tiên
    if (typeof POEMS_DATABASE !== 'undefined' && POEMS_DATABASE.length > 0) {
      return POEMS_DATABASE[0];
    }

    return null;
  },

  /**
   * Sinh mã QR vào container
   * @param {HTMLElement|string} targetElement - DOM element hoặc selector
   * @param {string} text - Đường dẫn/nội dung mã QR
   * @param {Object} options - Tùy biến màu sắc, kích thước
   */
  renderQR(targetElement, text, options = {}) {
    const container = typeof targetElement === 'string' ? document.querySelector(targetElement) : targetElement;
    if (!container) return;

    container.innerHTML = ''; // Xóa QR cũ

    const size = options.size || 180;
    const colorDark = options.colorDark || '#1e3a8a';
    const colorLight = options.colorLight || '#ffffff';
    const correctLevel = QRCode.CorrectLevel ? QRCode.CorrectLevel.M : 0;

    // Sử dụng QRCode.js nếu có sẵn
    if (window.QRCode) {
      try {
        new QRCode(container, {
          text: text || 'https://example.com',
          width: size,
          height: size,
          colorDark: colorDark,
          colorLight: colorLight,
          correctLevel: correctLevel
        });
        return;
      } catch (e) {
        console.error("QRCode.js render error:", e);
      }
    }

    // Fallback: Sử dụng Google Chart API hoặc QRServer API nếu QRCode.js chưa tải xong
    const encodedText = encodeURIComponent(text);
    const img = document.createElement('img');
    const fgColorHex = colorDark.replace('#', '');
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}&color=${fgColorHex}&bgcolor=FFFFFF&margin=0`;
    img.alt = "QR Code";
    img.style.width = size + 'px';
    img.style.height = size + 'px';
    img.style.display = 'block';
    container.appendChild(img);
  }
};
