/**
 * QR Engine & Data Encoder for Kindergarten A5 Poem & Media QR Card Generator
 */

const QREngine = {
  /**
   * Tạo URL cho trang đọc thơ di động (reader.html)
   * Toàn bộ nội dung bài thơ được nén trực tiếp vào URL (#p=...), tồn tại vĩnh viễn không hết hạn
   */
  generateReaderUrl(poem) {
    let baseUrl = '';
    
    // 1. Nếu chạy trên web online (HTTP/HTTPS)
    if (window.location.protocol.startsWith('http')) {
      baseUrl = window.location.origin + window.location.pathname.replace(/index\.html$/, '') + 'reader.html';
    } else {
      // 2. Nếu mở file offline trực tiếp (file:///), tự động trỏ về GitHub Pages để in ra QR quét được trên mọi điện thoại
      baseUrl = 'https://huynd1995.github.io/MNPH/reader.html';
    }
    
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
   * @param {Object} options - Tùy biến màu sắc, kích thước, icon tâm QR
   */
  renderQR(targetElement, text, options = {}) {
    const container = typeof targetElement === 'string' ? document.querySelector(targetElement) : targetElement;
    if (!container) return;

    container.innerHTML = ''; // Xóa QR cũ
    container.style.position = 'relative';

    const size = options.size || 180;
    const colorDark = options.colorDark || '#1e3a8a';
    const colorLight = options.colorLight || '#ffffff';
    // Sử dụng mức sửa lỗi M hoặc H để khi chèn icon ở tâm vẫn quét siêu nhạy
    const correctLevel = (QRCode && QRCode.CorrectLevel) ? (options.centerIcon ? QRCode.CorrectLevel.H : QRCode.CorrectLevel.M) : 0;

    // 1. Sinh QR Code
    let qrRendered = false;
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
        qrRendered = true;
      } catch (e) {
        console.error("QRCode.js render error:", e);
      }
    }

    // Fallback nếu QRCode.js gặp lỗi
    if (!qrRendered) {
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

    // 2. Chèn icon/sticker ở tâm mã QR nếu được kích hoạt
    if (options.centerIcon) {
      const badgeSize = Math.max(24, Math.round(size * 0.22));
      const iconSize = Math.round(badgeSize * 0.6);
      const badge = document.createElement('div');
      badge.className = 'qr-center-badge';
      badge.style.position = 'absolute';
      badge.style.top = '50%';
      badge.style.left = '50%';
      badge.style.transform = 'translate(-50%, -50%)';
      badge.style.width = `${badgeSize}px`;
      badge.style.height = `${badgeSize}px`;
      badge.style.borderRadius = '50%';
      badge.style.backgroundColor = '#ffffff';
      badge.style.border = `2.5px solid ${colorDark}`;
      badge.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
      badge.style.display = 'flex';
      badge.style.alignItems = 'center';
      badge.style.justifyContent = 'center';
      badge.style.pointerEvents = 'none';
      badge.style.zIndex = '3';

      let svgIcon = '';
      if (options.centerIcon === 'book') {
        // Biểu tượng sách đọc thơ
        svgIcon = `<svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="${colorDark}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>`;
      } else if (options.centerIcon === 'music') {
        // Biểu tượng nốt nhạc YouTube
        svgIcon = `<svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="${colorDark}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`;
      } else if (options.centerIcon === 'star') {
        // Biểu tượng ngôi sao mầm non
        svgIcon = `<svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="${colorDark}" stroke="${colorDark}" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
      } else {
        // Mặc định nốt nhạc hoặc bông hoa
        svgIcon = `<svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="${colorDark}" stroke-width="2.5"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
      }

      badge.innerHTML = svgIcon;
      container.appendChild(badge);
    }
  }
};
