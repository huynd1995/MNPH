/**
 * Kindergarten A5 Poem & Media QR Card Generator - Main Application Controller
 */

// Preset Theme Palettes
const PRESET_THEMES = {
  default: {
    name: "Chuẩn Mầm Non",
    qrPoem: '#1d4ed8',
    textPoem: '#1e40af',
    bgPoem: '#eff6ff',
    borderPoem: '#bfdbfe',
    qrMusic: '#be123c',
    textMusic: '#9f1239',
    bgMusic: '#fff1f2',
    borderMusic: '#fecdd3'
  },
  nature: {
    name: "Thiên Nhiên",
    qrPoem: '#15803d',
    textPoem: '#166534',
    bgPoem: '#f0fdf4',
    borderPoem: '#bbf7d0',
    qrMusic: '#c2410c',
    textMusic: '#9a3412',
    bgMusic: '#fff7ed',
    borderMusic: '#fed7aa'
  },
  pastel: {
    name: "Kẹo Ngọt",
    qrPoem: '#7c3aed',
    textPoem: '#6d28d9',
    bgPoem: '#f5f3ff',
    borderPoem: '#ddd6fe',
    qrMusic: '#db2777',
    textMusic: '#be185d',
    bgMusic: '#fdf2f8',
    borderMusic: '#fbcfe8'
  },
  ocean: {
    name: "Đại Dương",
    qrPoem: '#0284c7',
    textPoem: '#0369a1',
    bgPoem: '#f0f9ff',
    borderPoem: '#bae6fd',
    qrMusic: '#0d9488',
    textMusic: '#0f766e',
    bgMusic: '#f0fdfa',
    borderMusic: '#99f6e4'
  },
  mono: {
    name: "Đen Trắng",
    qrPoem: '#111827',
    textPoem: '#1f2937',
    bgPoem: '#f9fafb',
    borderPoem: '#d1d5db',
    qrMusic: '#111827',
    textMusic: '#1f2937',
    bgMusic: '#f9fafb',
    borderMusic: '#d1d5db'
  }
};

// Application State
const appState = {
  id: 'ngoi-nha',
  title: 'Ngôi Nhà',
  author: 'Mai Ngọc Thể',
  category: 'Gia đình',
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
Cười trong nắng vàng.`,
  coverImage: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80',
  youtubeUrl: 'https://www.youtube.com/watch?v=F0f18y4Jt9I',
  youtubeTitle: 'Nhạc: Nhà Của Tôi',
  qrMode: '2', // '1' or '2'
  singleSubtitle: 'Xem tranh bài thơ',
  poemSubtitle: 'Xem tranh bài thơ',
  musicSubtitle: 'Nghe nhạc YouTube',
  scale: 1,
  activeModel: 'gemini-1.5-flash',

  // Style Settings
  theme: 'default',
  cardRadius: '28px',
  subtitleFontSize: '20px',
  colorQrPoem: '#1d4ed8',
  colorTextPoem: '#1e40af',
  colorBgPoem: '#eff6ff',
  colorBorderPoem: '#bfdbfe',
  colorQrMusic: '#be123c',
  colorTextMusic: '#9f1239',
  colorBgMusic: '#fff1f2',
  colorBorderMusic: '#fecdd3'
};

// DOM Elements Cache
const DOM = {
  // Search & Autocomplete
  searchInput: document.getElementById('searchPoemInput'),
  autocompleteDropdown: document.getElementById('autocompleteDropdown'),
  btnAiSearch: document.getElementById('btnAiSearch'),
  aiSearchIcon: document.getElementById('aiSearchIcon'),
  aiSearchText: document.getElementById('aiSearchText'),
  searchModeBadge: document.getElementById('searchModeBadge'),
  
  // API Status & Modal
  btnApiKeySettings: document.getElementById('btnApiKeySettings'),
  btnInlineApiKey: document.getElementById('btnInlineApiKey'),
  apiStatusDot: document.getElementById('apiStatusDot'),
  apiHelperText: document.getElementById('apiHelperText'),
  apiKeyModal: document.getElementById('apiKeyModal'),
  btnCloseApiKeyModal: document.getElementById('btnCloseApiKeyModal'),
  btnCancelApiKey: document.getElementById('btnCancelApiKey'),
  btnSaveApiKey: document.getElementById('btnSaveApiKey'),
  btnClearApiKey: document.getElementById('btnClearApiKey'),
  btnTestApiKeyOnly: document.getElementById('btnTestApiKeyOnly'),
  apiKeyTestStatus: document.getElementById('apiKeyTestStatus'),
  btnToggleApiKeyVisibility: document.getElementById('btnToggleApiKeyVisibility'),
  iconApiKeyVisibility: document.getElementById('iconApiKeyVisibility'),
  inputApiKey: document.getElementById('inputApiKey'),
  
  // Form Inputs
  poemTitleInput: document.getElementById('inputPoemTitle'),
  poemAuthorInput: document.getElementById('inputPoemAuthor'),
  poemContentInput: document.getElementById('inputPoemContent'),
  coverImageInput: document.getElementById('inputCoverImage'),
  imageFileInput: document.getElementById('inputImageFile'),
  imagePreviewThumb: document.getElementById('imagePreviewThumb'),
  btnUploadImage: document.getElementById('btnUploadImage'),
  
  // YouTube Fields
  youtubeUrlInput: document.getElementById('inputYoutubeUrl'),
  youtubeTitleInput: document.getElementById('inputYoutubeTitle'),
  
  // Big Action Buttons
  btnGenerateQR: document.getElementById('btnGenerateQR'),
  btnRefreshPreview: document.getElementById('btnRefreshPreview'),
  btnQuickSample: document.getElementById('btnQuickSample'),
  
  // Subtitle Customization
  singleSubtitleInput: document.getElementById('inputSingleSubtitle'),
  poemSubtitleInput: document.getElementById('inputPoemSubtitle'),
  musicSubtitleInput: document.getElementById('inputMusicSubtitle'),
  selectSubtitleFontSize: document.getElementById('selectSubtitleFontSize'),
  
  // Styling Controls
  themePills: document.querySelectorAll('.theme-pill'),
  colorQrPoem: document.getElementById('colorQrPoem'),
  colorQrMusic: document.getElementById('colorQrMusic'),
  btnRadiusRound: document.getElementById('btnRadiusRound'),
  btnRadiusSemi: document.getElementById('btnRadiusSemi'),
  btnRadiusSquare: document.getElementById('btnRadiusSquare'),
  btnResetStyles: document.getElementById('btnResetStyles'),
  
  // Toggle Buttons
  btnToggle1QR: document.getElementById('btnToggle1QR'),
  btnToggle2QR: document.getElementById('btnToggle2QR'),
  
  // A5 Sheet Preview Elements
  a5Sheet: document.getElementById('a5Sheet'),
  a5Scaler: document.getElementById('a5Scaler'),
  a5TitleDisplay: document.getElementById('a5TitleDisplay'),
  
  // Layout Containers & Cards
  layoutSingle: document.getElementById('layoutSingle'),
  layoutDual: document.getElementById('layoutDual'),
  cardSingle: document.getElementById('cardSingle'),
  cardPoem: document.getElementById('cardPoem'),
  cardMusic: document.getElementById('cardMusic'),
  
  // QR Targets
  qrSingleContainer: document.getElementById('qrSingleContainer'),
  qrPoemContainer: document.getElementById('qrPoemContainer'),
  qrMusicContainer: document.getElementById('qrMusicContainer'),
  
  // A5 Subtitle Displays
  subtitleSingleDisplay: document.getElementById('subtitleSingleDisplay'),
  subtitlePoemDisplay: document.getElementById('subtitlePoemDisplay'),
  subtitleMusicDisplay: document.getElementById('subtitleMusicDisplay'),
  
  // Actions & Modals
  btnPrint: document.getElementById('btnPrint'),
  btnDownloadPng: document.getElementById('btnDownloadPng'),
  btnPreviewPhone: document.getElementById('btnPreviewPhone'),
  phoneModal: document.getElementById('phoneModal'),
  btnCloseModal: document.getElementById('btnCloseModal'),
  phoneIframe: document.getElementById('phoneIframe'),
  toastContainer: document.getElementById('toastContainer')
};

/**
 * Khởi tạo ứng dụng
 */
function initApp() {
  bindEvents();
  loadInitialPoem();
  setupResponsiveScale();
  checkApiHealth();
  window.addEventListener('resize', setupResponsiveScale);
}

/**
 * Nạp bài thơ mẫu ban đầu
 */
function loadInitialPoem() {
  if (typeof POEMS_DATABASE !== 'undefined' && POEMS_DATABASE.length > 0) {
    selectPoem(POEMS_DATABASE[0]);
  } else {
    updateA5Card();
  }
}

/**
 * Gán sự kiện tương tác
 */
function bindEvents() {
  // 1. Tìm kiếm & Gợi ý (Autocomplete & AI Search)
  if (DOM.searchInput) {
    DOM.searchInput.addEventListener('input', handleSearchInput);
    DOM.searchInput.addEventListener('focus', handleSearchInput);
    DOM.searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (DOM.autocompleteDropdown) DOM.autocompleteDropdown.style.display = 'none';
        triggerAiSearch();
      }
    });
  }

  if (DOM.btnAiSearch) {
    DOM.btnAiSearch.addEventListener('click', () => {
      if (DOM.autocompleteDropdown) DOM.autocompleteDropdown.style.display = 'none';
      triggerAiSearch();
    });
  }

  // API Key Settings Modal
  if (DOM.btnApiKeySettings) DOM.btnApiKeySettings.addEventListener('click', openApiKeyModal);
  if (DOM.btnInlineApiKey) DOM.btnInlineApiKey.addEventListener('click', openApiKeyModal);
  if (DOM.btnCloseApiKeyModal) DOM.btnCloseApiKeyModal.addEventListener('click', closeApiKeyModal);
  if (DOM.btnCancelApiKey) DOM.btnCancelApiKey.addEventListener('click', closeApiKeyModal);
  if (DOM.btnTestApiKeyOnly) DOM.btnTestApiKeyOnly.addEventListener('click', testApiKeyConnection);
  if (DOM.btnSaveApiKey) DOM.btnSaveApiKey.addEventListener('click', saveApiKey);
  if (DOM.btnClearApiKey) DOM.btnClearApiKey.addEventListener('click', clearApiKey);
  if (DOM.btnToggleApiKeyVisibility) DOM.btnToggleApiKeyVisibility.addEventListener('click', toggleApiKeyVisibility);
  if (DOM.apiKeyModal) {
    DOM.apiKeyModal.addEventListener('click', (e) => {
      if (e.target === DOM.apiKeyModal) closeApiKeyModal();
    });
  }

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container') && DOM.autocompleteDropdown) {
      DOM.autocompleteDropdown.style.display = 'none';
    }
  });

  // 2. Thay đổi thông tin bài thơ
  if (DOM.poemTitleInput) {
    DOM.poemTitleInput.addEventListener('input', (e) => {
      appState.title = e.target.value.trim() || 'Tên Bài Thơ';
      updateA5Card();
    });
  }

  if (DOM.poemAuthorInput) {
    DOM.poemAuthorInput.addEventListener('input', (e) => {
      appState.author = e.target.value.trim();
      updateA5Card();
    });
  }

  if (DOM.poemContentInput) {
    DOM.poemContentInput.addEventListener('input', (e) => {
      appState.content = e.target.value;
      updateA5Card();
    });
  }

  if (DOM.coverImageInput) {
    DOM.coverImageInput.addEventListener('input', (e) => {
      appState.coverImage = e.target.value.trim();
      if (DOM.imagePreviewThumb) DOM.imagePreviewThumb.src = appState.coverImage;
      updateA5Card();
    });
  }

  // 3. Upload ảnh từ máy tính
  if (DOM.btnUploadImage && DOM.imageFileInput) {
    DOM.btnUploadImage.addEventListener('click', () => DOM.imageFileInput.click());
    DOM.imageFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          appState.coverImage = event.target.result;
          if (DOM.imagePreviewThumb) DOM.imagePreviewThumb.src = appState.coverImage;
          if (DOM.coverImageInput) DOM.coverImageInput.value = '(Ảnh tùy chỉnh từ máy)';
          updateA5Card();
          showToast('Đã tải ảnh lên thành công!');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // 4. Nhạc YouTube
  if (DOM.youtubeUrlInput) {
    DOM.youtubeUrlInput.addEventListener('input', (e) => {
      appState.youtubeUrl = e.target.value.trim();
      updateA5Card();
    });
  }

  if (DOM.youtubeTitleInput) {
    DOM.youtubeTitleInput.addEventListener('input', (e) => {
      appState.youtubeTitle = e.target.value.trim();
      updateA5Card();
    });
  }

  // 5. Nút Hành Động Lớn (Tạo & Cập Nhật Mã QR)
  if (DOM.btnGenerateQR) {
    DOM.btnGenerateQR.addEventListener('click', () => {
      updateA5Card();
      showToast('✨ Đã tạo & cập nhật mã QR thành công!');
    });
  }

  if (DOM.btnRefreshPreview) {
    DOM.btnRefreshPreview.addEventListener('click', () => {
      updateA5Card();
      showToast('Đã làm mới mã QR!');
    });
  }

  if (DOM.btnQuickSample) {
    DOM.btnQuickSample.addEventListener('click', loadRandomSample);
  }

  // 6. Phụ đề dưới QR
  if (DOM.poemSubtitleInput) {
    DOM.poemSubtitleInput.addEventListener('input', (e) => {
      appState.poemSubtitle = e.target.value;
      if (DOM.subtitlePoemDisplay) DOM.subtitlePoemDisplay.innerText = appState.poemSubtitle;
    });
  }

  if (DOM.musicSubtitleInput) {
    DOM.musicSubtitleInput.addEventListener('input', (e) => {
      appState.musicSubtitle = e.target.value;
      if (DOM.subtitleMusicDisplay) DOM.subtitleMusicDisplay.innerText = appState.musicSubtitle;
    });
  }

  if (DOM.selectSubtitleFontSize) {
    DOM.selectSubtitleFontSize.addEventListener('change', (e) => {
      appState.subtitleFontSize = e.target.value;
      updateA5Card();
    });
  }

  // 7. Chủ Đề Màu Sắc & Kiểu Dáng QR
  if (DOM.themePills) {
    DOM.themePills.forEach(pill => {
      pill.addEventListener('click', () => {
        const themeKey = pill.getAttribute('data-theme');
        applyTheme(themeKey);
      });
    });
  }

  if (DOM.colorQrPoem) {
    DOM.colorQrPoem.addEventListener('input', (e) => {
      const hex = e.target.value;
      appState.colorQrPoem = hex;
      appState.colorTextPoem = hex;
      appState.colorBgPoem = hexToLightBg(hex);
      appState.colorBorderPoem = hexToLightBorder(hex);
      updateA5Card();
    });
  }

  if (DOM.colorQrMusic) {
    DOM.colorQrMusic.addEventListener('input', (e) => {
      const hex = e.target.value;
      appState.colorQrMusic = hex;
      appState.colorTextMusic = hex;
      appState.colorBgMusic = hexToLightBg(hex);
      appState.colorBorderMusic = hexToLightBorder(hex);
      updateA5Card();
    });
  }

  // Bo góc
  const shapeBtns = [DOM.btnRadiusRound, DOM.btnRadiusSemi, DOM.btnRadiusSquare];
  shapeBtns.forEach(btn => {
    if (!btn) return;
    btn.addEventListener('click', () => {
      shapeBtns.forEach(b => b && b.classList.remove('active'));
      btn.classList.add('active');
      const radius = btn.getAttribute('data-radius') + 'px';
      appState.cardRadius = radius;
      updateA5Card();
    });
  });

  if (DOM.btnResetStyles) {
    DOM.btnResetStyles.addEventListener('click', resetDefaultStyles);
  }

  // 8. Chuyển đổi Toggle 1 QR / 2 QR
  if (DOM.btnToggle1QR) DOM.btnToggle1QR.addEventListener('click', () => setQRMode('1'));
  if (DOM.btnToggle2QR) DOM.btnToggle2QR.addEventListener('click', () => setQRMode('2'));

  // 9. Nút In & Tải ảnh
  if (DOM.btnPrint) DOM.btnPrint.addEventListener('click', () => window.print());
  if (DOM.btnDownloadPng) DOM.btnDownloadPng.addEventListener('click', downloadCardAsPng);

  // 10. Modal xem trước trên điện thoại
  if (DOM.btnPreviewPhone) DOM.btnPreviewPhone.addEventListener('click', openPhonePreview);
  if (DOM.btnCloseModal) DOM.btnCloseModal.addEventListener('click', closePhonePreview);
  if (DOM.phoneModal) {
    DOM.phoneModal.addEventListener('click', (e) => {
      if (e.target === DOM.phoneModal) closePhonePreview();
    });
  }
}

/**
 * Đổi bài mẫu ngẫu nhiên
 */
function loadRandomSample() {
  if (typeof POEMS_DATABASE === 'undefined' || POEMS_DATABASE.length === 0) return;
  const filtered = POEMS_DATABASE.filter(p => p.id !== appState.id);
  const nextPoem = filtered[Math.floor(Math.random() * filtered.length)] || POEMS_DATABASE[0];
  selectPoem(nextPoem);
  showToast(`Đã chuyển sang bài thơ mẫu: "${nextPoem.title}"`);
}

/**
 * Áp dụng Preset Theme màu
 */
function applyTheme(themeKey) {
  const theme = PRESET_THEMES[themeKey] || PRESET_THEMES.default;
  appState.theme = themeKey;
  
  appState.colorQrPoem = theme.qrPoem;
  appState.colorTextPoem = theme.textPoem;
  appState.colorBgPoem = theme.bgPoem;
  appState.colorBorderPoem = theme.borderPoem;

  appState.colorQrMusic = theme.qrMusic;
  appState.colorTextMusic = theme.textMusic;
  appState.colorBgMusic = theme.bgMusic;
  appState.colorBorderMusic = theme.borderMusic;

  // Cập nhật Color Pickers
  if (DOM.colorQrPoem) DOM.colorQrPoem.value = theme.qrPoem;
  if (DOM.colorQrMusic) DOM.colorQrMusic.value = theme.qrMusic;

  // Cập nhật active pill
  if (DOM.themePills) {
    DOM.themePills.forEach(pill => {
      pill.classList.toggle('active', pill.getAttribute('data-theme') === themeKey);
    });
  }

  updateA5Card();
  showToast(`Đã áp dụng chủ đề: ${theme.name}`);
}

function resetDefaultStyles() {
  applyTheme('default');
  appState.cardRadius = '28px';
  appState.subtitleFontSize = '20px';
  
  if (DOM.selectSubtitleFontSize) DOM.selectSubtitleFontSize.value = '20px';
  if (DOM.btnRadiusRound) {
    [DOM.btnRadiusRound, DOM.btnRadiusSemi, DOM.btnRadiusSquare].forEach(b => b && b.classList.remove('active'));
    DOM.btnRadiusRound.classList.add('active');
  }

  updateA5Card();
  showToast('Đã khôi phục kiểu dáng mặc định');
}

/**
 * Chuyển mã màu Hex sang tone nền Pastel nhạt
 */
function hexToLightBg(hex) {
  return hex + '15'; // ~8% opacity
}

function hexToLightBorder(hex) {
  return hex + '40'; // ~25% opacity
}

/**
 * Xử lý Autocomplete bài thơ
 */
function handleSearchInput() {
  if (!DOM.searchInput || !DOM.autocompleteDropdown) return;
  const query = DOM.searchInput.value;
  const matches = searchPoems(query);

  if (matches.length === 0) {
    DOM.autocompleteDropdown.innerHTML = '<div class="autocomplete-item" style="color:#94a3b8;">Không tìm thấy bài thơ nào</div>';
    DOM.autocompleteDropdown.style.display = 'block';
    return;
  }

  DOM.autocompleteDropdown.innerHTML = '';
  matches.forEach(poem => {
    const item = document.createElement('div');
    item.className = 'autocomplete-item';
    item.innerHTML = `
      <div class="autocomplete-item-title">${escapeHtml(poem.title)}</div>
      <div class="autocomplete-item-meta">
        <span>Tác giả: ${escapeHtml(poem.author || 'Sưu tầm')}</span>
        <span>•</span>
        <span>${escapeHtml(poem.category || 'Mầm non')}</span>
      </div>
    `;
    item.addEventListener('click', () => {
      selectPoem(poem);
      DOM.autocompleteDropdown.style.display = 'none';
      DOM.searchInput.value = '';
      showToast(`Đã chọn bài thơ "${poem.title}"`);
    });
    DOM.autocompleteDropdown.appendChild(item);
  });

  DOM.autocompleteDropdown.style.display = 'block';
}

/**
 * Điền toàn bộ thông tin bài thơ được chọn
 */
function selectPoem(poem) {
  appState.id = poem.id || ('poem-' + Date.now());
  appState.title = poem.title;
  appState.author = poem.author || 'Sưu tầm';
  appState.category = poem.category || 'Mầm non';
  appState.content = poem.content;
  appState.coverImage = poem.coverImage;
  appState.youtubeUrl = poem.youtubeUrl || '';
  appState.youtubeTitle = poem.youtubeTitle || 'Nhạc Thiếu Nhi';

  // Cập nhật Form Controls
  if (DOM.poemTitleInput) DOM.poemTitleInput.value = appState.title;
  if (DOM.poemAuthorInput) DOM.poemAuthorInput.value = appState.author;
  if (DOM.poemContentInput) DOM.poemContentInput.value = appState.content;
  if (DOM.coverImageInput) DOM.coverImageInput.value = appState.coverImage;
  if (DOM.imagePreviewThumb) DOM.imagePreviewThumb.src = appState.coverImage;
  if (DOM.youtubeUrlInput) DOM.youtubeUrlInput.value = appState.youtubeUrl;
  if (DOM.youtubeTitleInput) DOM.youtubeTitleInput.value = appState.youtubeTitle;

  updateA5Card();
}

/**
 * Đổi chế độ 1 QR hoặc 2 QR
 */
function setQRMode(mode) {
  appState.qrMode = mode;
  if (mode === '1') {
    if (DOM.btnToggle1QR) DOM.btnToggle1QR.classList.add('active');
    if (DOM.btnToggle2QR) DOM.btnToggle2QR.classList.remove('active');
    if (DOM.layoutSingle) DOM.layoutSingle.style.display = 'flex';
    if (DOM.layoutDual) DOM.layoutDual.style.display = 'none';
  } else {
    if (DOM.btnToggle1QR) DOM.btnToggle1QR.classList.remove('active');
    if (DOM.btnToggle2QR) DOM.btnToggle2QR.classList.add('active');
    if (DOM.layoutSingle) DOM.layoutSingle.style.display = 'none';
    if (DOM.layoutDual) DOM.layoutDual.style.display = 'grid';
  }
  updateA5Card();
}

/**
 * Cập nhật toàn bộ khung tờ A5 và vẽ lại các mã QR
 */
function updateA5Card() {
  // 1. Cập nhật Title tờ in (nếu có element)
  if (DOM.a5TitleDisplay) {
    DOM.a5TitleDisplay.innerText = `Bài Thơ: ${appState.title}`;
  }

  // 2. Cập nhật phụ đề & Font Size
  if (DOM.subtitleSingleDisplay) {
    DOM.subtitleSingleDisplay.innerText = appState.singleSubtitle;
    DOM.subtitleSingleDisplay.style.fontSize = appState.subtitleFontSize;
    DOM.subtitleSingleDisplay.style.color = appState.colorTextPoem;
  }
  if (DOM.subtitlePoemDisplay) {
    DOM.subtitlePoemDisplay.innerText = appState.poemSubtitle;
    DOM.subtitlePoemDisplay.style.fontSize = appState.subtitleFontSize;
    DOM.subtitlePoemDisplay.style.color = appState.colorTextPoem;
  }
  if (DOM.subtitleMusicDisplay) {
    DOM.subtitleMusicDisplay.innerText = appState.musicSubtitle;
    DOM.subtitleMusicDisplay.style.fontSize = appState.subtitleFontSize;
    DOM.subtitleMusicDisplay.style.color = appState.colorTextMusic;
  }

  // 3. Áp dụng Màu Sắc & Kiểu Dáng Thẻ A5
  if (DOM.cardSingle) {
    DOM.cardSingle.style.borderRadius = appState.cardRadius;
    DOM.cardSingle.style.backgroundColor = appState.colorBgPoem;
    DOM.cardSingle.style.borderColor = appState.colorBorderPoem;
  }
  if (DOM.cardPoem) {
    DOM.cardPoem.style.borderRadius = appState.cardRadius;
    DOM.cardPoem.style.backgroundColor = appState.colorBgPoem;
    DOM.cardPoem.style.borderColor = appState.colorBorderPoem;
  }
  if (DOM.cardMusic) {
    DOM.cardMusic.style.borderRadius = appState.cardRadius;
    DOM.cardMusic.style.backgroundColor = appState.colorBgMusic;
    DOM.cardMusic.style.borderColor = appState.colorBorderMusic;
  }

  // 4. Tạo URL đọc thơ cho mã QR
  const poemPayload = {
    id: appState.id,
    title: appState.title,
    author: appState.author,
    content: appState.content,
    coverImage: appState.coverImage,
    youtubeUrl: appState.youtubeUrl,
    youtubeTitle: appState.youtubeTitle
  };
  const readerUrl = QREngine.generateReaderUrl(poemPayload);

  // 5. Sinh QR Code theo chế độ
  if (appState.qrMode === '1') {
    // Chế độ 1 QR lớn ở giữa (~200px)
    if (DOM.qrSingleContainer) {
      QREngine.renderQR(DOM.qrSingleContainer, readerUrl, {
        size: 200,
        colorDark: appState.colorQrPoem,
        colorLight: '#ffffff'
      });
    }
  } else {
    // Chế độ 2 QR Song Song
    if (DOM.qrPoemContainer) {
      QREngine.renderQR(DOM.qrPoemContainer, readerUrl, {
        size: 154,
        colorDark: appState.colorQrPoem,
        colorLight: '#ffffff'
      });
    }

    // QR Phải (YouTube)
    const musicUrl = appState.youtubeUrl || 'https://www.youtube.com';
    if (DOM.qrMusicContainer) {
      QREngine.renderQR(DOM.qrMusicContainer, musicUrl, {
        size: 154,
        colorDark: appState.colorQrMusic,
        colorLight: '#ffffff'
      });
    }
  }
}

/**
 * Tự động scale khung A5 vừa vặn với màn hình
 */
function setupResponsiveScale() {
  const container = document.querySelector('.preview-area');
  if (!container || !DOM.a5Scaler) return;

  const availableWidth = container.clientWidth - 48;
  const availableHeight = container.clientHeight - 120;
  const sheetWidth = 794;
  const sheetHeight = 559;

  let scale = Math.min(availableWidth / sheetWidth, availableHeight / sheetHeight, 1);
  if (scale < 0.4) scale = 0.4;

  appState.scale = scale;
  DOM.a5Scaler.style.transform = `scale(${scale})`;
}

/**
 * Mở modal giả lập điện thoại đọc thơ
 */
function openPhonePreview() {
  const poemPayload = {
    id: appState.id,
    title: appState.title,
    author: appState.author,
    content: appState.content,
    coverImage: appState.coverImage,
    youtubeUrl: appState.youtubeUrl,
    youtubeTitle: appState.youtubeTitle
  };
  const readerUrl = QREngine.generateReaderUrl(poemPayload);
  
  if (DOM.phoneIframe) DOM.phoneIframe.src = readerUrl;
  if (DOM.phoneModal) DOM.phoneModal.classList.add('active');
}

function closePhonePreview() {
  if (DOM.phoneModal) DOM.phoneModal.classList.remove('active');
  if (DOM.phoneIframe) DOM.phoneIframe.src = 'about:blank';
}

/**
 * Tải thẻ A5 dưới dạng ảnh PNG chất lượng cao
 */
function downloadCardAsPng() {
  if (!window.html2canvas) {
    alert("Thư viện xuất ảnh đang tải, vui lòng thử lại sau 2 giây.");
    return;
  }

  showToast('Đang tạo ảnh A5 chất lượng cao...');

  const oldTransform = DOM.a5Scaler ? DOM.a5Scaler.style.transform : '';
  if (DOM.a5Scaler) DOM.a5Scaler.style.transform = 'none';

  html2canvas(DOM.a5Sheet, {
    scale: 2.5,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false
  }).then(canvas => {
    if (DOM.a5Scaler) DOM.a5Scaler.style.transform = oldTransform;
    
    const link = document.createElement('a');
    const cleanTitle = (appState.title || 'The_A5').replace(/[^a-zA-Z0-9\u00C0-\u1EF9]/g, '_');
    link.download = `The_A5_Bai_Tho_${cleanTitle}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast('Đã tải ảnh thẻ A5 thành công!');
  }).catch(err => {
    if (DOM.a5Scaler) DOM.a5Scaler.style.transform = oldTransform;
    console.error("Export PNG error:", err);
    showToast('Lỗi khi xuất ảnh!');
  });
}

/**
 * Hiển thị Toast thông báo
 */
function showToast(message) {
  if (!DOM.toastContainer) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i data-lucide="check-circle" style="width:18px; height:18px; color:#10b981;"></i> <span>${escapeHtml(message)}</span>`;
  DOM.toastContainer.appendChild(toast);
  if (window.lucide) lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

/**
 * Gọi trực tiếp Google Gemini REST API từ Trình duyệt (Hỗ trợ model động)
 */
async function callGeminiDirect(apiKey, query) {
  const candidateModels = [
    appState.activeModel || 'gemini-1.5-flash',
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-flash',
    'gemini-1.5-flash-8b',
    'gemini-pro'
  ];

  // Lọc model duy nhất
  const uniqueModels = [...new Set(candidateModels)];

  const prompt = `Bạn là từ điển văn học mầm non và giáo dục thiếu nhi Việt Nam.
Nhiệm vụ: Tra cứu chính xác và đầy đủ bài thơ mầm non theo yêu cầu: "${query}".
Lưu ý quan trọng:
1. Yêu cầu tìm kiếm có thể là tên bài, một câu thơ, hoặc từ khóa không dấu. Hãy nhận diện đúng bài thơ mầm non tương ứng.
2. Trả về đúng và đủ toàn văn các khổ thơ, phân dòng chuẩn xác từng câu thơ.
3. Ghi rõ tên tác giả (nếu không rõ ghi 'Sưu tầm').
4. Gợi ý 1 bài hát thiếu nhi liên quan.

Định dạng phản hồi BẮT BUỘC là JSON duy nhất (sử dụng \\n để xuống dòng trong lời thơ) theo mẫu:
{
  "title": "Tên Bài Thơ",
  "author": "Tên Tác Giả",
  "content": "Câu thơ 1\\nCâu thơ 2\\nCâu thơ 3\\n\\nCâu thơ 4\\nCâu thơ 5",
  "category": "Chủ đề mầm non",
  "coverImage": "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
  "youtubeUrl": "https://www.youtube.com/results?search_query=nhac+thieu+nhi",
  "youtubeTitle": "Nhạc: [Tên bài hát]"
}`;

  let lastError = null;

  for (const model of uniqueModels) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2,
            topP: 0.8,
            topK: 40
          }
        })
      });

      if (resp.ok) {
        const data = await resp.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const parsed = parseAiPoemJson(text, query);
          if (parsed) {
            appState.activeModel = model;
            return parsed;
          }
        }
      } else {
        const errJson = await resp.json().catch(() => ({}));
        const errDetail = errJson?.error?.message || resp.statusText;
        lastError = new Error(`Lỗi Google (${model}): ${errDetail}`);
      }
    } catch (e) {
      lastError = e;
    }
  }

  throw lastError || new Error("Không thể kết nối đến Google Gemini API");
}

/**
 * Bộ phân tích & trích xuất thơ đa tầng siêu bền bỉ (JSON, Escaped JSON, Regex, Text)
 */
function parseAiPoemJson(rawText, query) {
  if (!rawText) return null;
  let text = rawText.trim();

  // 1. Loại bỏ markdown code fence nếu có
  const mdMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (mdMatch) text = mdMatch[1].trim();

  // 2. Thử bóc tách JSON chuẩn hoặc JSON có ký tự xuống dòng thô
  const jsonBraceMatch = text.match(/\{[\s\S]*\}/);
  if (jsonBraceMatch) {
    const candidateJson = jsonBraceMatch[0];

    // Cách A: JSON.parse trực tiếp
    try {
      const data = JSON.parse(candidateJson);
      if (data && (data.title || data.content)) {
        return formatPoemResult(data, query);
      }
    } catch (e) {
      // Cách B: Sửa lỗi unescaped newlines trong chuỗi JSON
      try {
        const sanitized = candidateJson.replace(/"([^"\\]*(?:\\.[^"\\]*)*)"/g, (match, p1) => {
          return '"' + p1.replace(/\r?\n/g, '\\n') + '"';
        });
        const data = JSON.parse(sanitized);
        if (data && (data.title || data.content)) {
          return formatPoemResult(data, query);
        }
      } catch (e2) {}
    }
  }

  // 3. Trích xuất thủ công bằng Regex từng trường dữ liệu
  let extractedTitle = extractField(text, /"(?:title|ten_bai_tho|tên_bài_thơ)"\s*:\s*"([^"]+)"/i) ||
                       extractField(text, /(?:Tên bài thơ|Bài thơ|Tựa đề)\s*:\s*([^\n\r]+)/i);

  let extractedAuthor = extractField(text, /"(?:author|tac_gia|tác_giả)"\s*:\s*"([^"]+)"/i) ||
                        extractField(text, /(?:Tác giả|Sáng tác)\s*:\s*([^\n\r]+)/i) || 'Sưu tầm';

  let extractedCategory = extractField(text, /"(?:category|chu_de|chủ_đề)"\s*:\s*"([^"]+)"/i) ||
                          extractField(text, /(?:Chủ đề|Thể loại)\s*:\s*([^\n\r]+)/i) || 'Mầm non';

  let extractedYt = extractField(text, /"(?:youtubeUrl|youtube_url|link_youtube)"\s*:\s*"([^"]+)"/i) || '';
  let extractedYtTitle = extractField(text, /"(?:youtubeTitle|youtube_title|bai_hat)"\s*:\s*"([^"]+)"/i) || '';

  // Trích xuất Lời thơ
  let extractedContent = '';
  const contentJsonMatch = text.match(/"(?:content|noi_dung|lời_thơ|loi_tho)"\s*:\s*"([\s\S]*?)"(?=\s*,\s*"\w+"|\s*})/i);
  if (contentJsonMatch) {
    extractedContent = contentJsonMatch[1].replace(/\\n/g, '\n');
  } else {
    // Nếu Gemini trả về văn bản tự nhiên
    const contentTextMatch = text.match(/(?:Lời thơ|Nội dung bài thơ|Toàn văn|Bài thơ)[\s:]*\n([\s\S]+)/i);
    if (contentTextMatch) {
      extractedContent = contentTextMatch[1].trim();
    } else if (text.split('\n').length >= 3) {
      extractedContent = text;
    }
  }

  if (extractedTitle || extractedContent) {
    return {
      title: (extractedTitle || query || 'Bài Thơ Thiếu Nhi').replace(/^"|"$/g, '').trim(),
      author: (extractedAuthor || 'Sưu tầm').replace(/^"|"$/g, '').trim(),
      category: (extractedCategory || 'Mầm non').replace(/^"|"$/g, '').trim(),
      content: cleanPoemVerses(extractedContent || text),
      coverImage: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80',
      youtubeUrl: extractedYt || `https://www.youtube.com/results?search_query=${encodeURIComponent(extractedTitle || query)}`,
      youtubeTitle: extractedYtTitle || `Nhạc: ${extractedTitle || query}`,
      isAiGenerated: true
    };
  }

  return null;
}

function extractField(text, regex) {
  const m = text.match(regex);
  return m ? m[1].trim() : null;
}

function formatPoemResult(data, query) {
  return {
    title: (data.title || query || 'Bài Thơ Thiếu Nhi').trim(),
    author: (data.author || 'Sưu tầm').trim(),
    category: (data.category || 'Mầm non').trim(),
    content: cleanPoemVerses(data.content || ''),
    coverImage: data.coverImage || 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80',
    youtubeUrl: data.youtubeUrl || `https://www.youtube.com/results?search_query=${encodeURIComponent(data.title || query)}`,
    youtubeTitle: data.youtubeTitle || `Nhạc: ${data.title || query}`,
    isAiGenerated: true
  };
}

function cleanPoemVerses(content) {
  if (!content) return '';
  return content
    .replace(/\\n/g, '\n')
    .replace(/```/g, '')
    .trim();
}

/**
 * Kích hoạt tra cứu thông minh qua Gemini AI
 */
async function triggerAiSearch() {
  const query = DOM.searchInput ? DOM.searchInput.value.trim() : '';
  if (!query) {
    showToast('Vui lòng nhập tên bài thơ hoặc câu thơ cần tìm');
    return;
  }

  const savedApiKey = (localStorage.getItem('GEMINI_API_KEY') || '').trim();

  // Bật loading UI
  setAiSearchLoading(true);
  showToast('Đang tra cứu bài thơ trực tuyến bằng Gemini AI...');

  let poemData = null;

  // 1. Thử gọi backend FastAPI nếu có
  try {
    const apiEndpoint = window.location.origin.includes('8000') 
      ? '/api/search-poem' 
      : 'http://127.0.0.1:8000/api/search-poem';

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: query, apiKey: savedApiKey }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      poemData = await response.json();
    }
  } catch (err) {
    console.log("Backend offline, chuyển sang gọi trực tiếp từ Trình duyệt...", err);
  }

  // 2. Gọi trực tiếp Gemini REST API từ Trình duyệt (nếu có key)
  if (!poemData && savedApiKey) {
    try {
      poemData = await callGeminiDirect(savedApiKey, query);
    } catch (errDirect) {
      console.warn("Direct Gemini call failed:", errDirect);
    }
  }

  // 3. Nếu chưa có API Key
  if (!poemData && !savedApiKey) {
    const localMatches = searchPoems(query);
    if (localMatches && localMatches.length > 0) {
      selectPoem(localMatches[0]);
      showToast(`Tìm thấy bài thơ "${localMatches[0].title}" trong kho mẫu.`);
    } else {
      showToast('Chưa cấu hình API Key. Vui lòng bấm "Thêm / Đổi API Key" để kích hoạt AI!');
      openApiKeyModal();
    }
    setAiSearchLoading(false);
    return;
  }

  // 4. Đổ dữ liệu nếu tìm thấy bài thơ
  if (poemData) {
    selectPoem({
      id: poemData.id || ('ai-' + Date.now()),
      title: poemData.title,
      author: poemData.author || 'Sưu tầm',
      category: poemData.category || 'Mầm non',
      content: poemData.content,
      coverImage: poemData.coverImage || 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80',
      youtubeUrl: poemData.youtubeUrl || '',
      youtubeTitle: poemData.youtubeTitle || `Nhạc: ${poemData.title}`
    });

    showToast(`Đã tìm thấy bài thơ "${poemData.title}" từ AI!`);
  } else {
    // Fallback kho dữ liệu mẫu
    const localMatches = searchPoems(query);
    if (localMatches && localMatches.length > 0) {
      selectPoem(localMatches[0]);
      showToast(`Tìm thấy bài thơ "${localMatches[0].title}" trong kho mẫu.`);
    } else {
      showToast('Không tìm thấy bài thơ. Vui lòng kiểm tra lại từ khóa hoặc API Key!');
    }
  }

  setAiSearchLoading(false);
}

function setAiSearchLoading(isLoading) {
  if (!DOM.btnAiSearch) return;
  DOM.btnAiSearch.disabled = isLoading;
  if (isLoading) {
    if (DOM.aiSearchIcon) DOM.aiSearchIcon.style.display = 'none';
    if (DOM.aiSearchText) DOM.aiSearchText.innerHTML = '<div class="spinner"></div>';
  } else {
    if (DOM.aiSearchIcon) DOM.aiSearchIcon.style.display = 'inline-block';
    if (DOM.aiSearchText) DOM.aiSearchText.innerText = 'Tìm AI';
  }
}

/**
 * Kiểm tra kết nối API Key thông minh (Lấy danh sách model từ Google)
 */
async function testApiKeyConnection() {
  const key = (DOM.inputApiKey ? DOM.inputApiKey.value.trim() : '') || (localStorage.getItem('GEMINI_API_KEY') || '').trim();
  if (!key) {
    showApiKeyTestStatus('error', 'Vui lòng nhập API Key trước khi kiểm tra!');
    return;
  }

  showApiKeyTestStatus('loading', 'Đang kiểm tra kết nối với Google Gemini...');

  // Cách 1: Gọi endpoint models để lấy danh sách model được hỗ trợ chuẩn xác 100%
  try {
    const modelsUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
    const resp = await fetch(modelsUrl);

    if (resp.ok) {
      const data = await resp.json();
      const modelsList = data.models || [];
      const supported = modelsList
        .filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent'))
        .map(m => m.name.replace('models/', ''));

      const preferred = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-flash-8b', 'gemini-pro'];
      const chosenModel = preferred.find(m => supported.includes(m)) || supported[0] || 'gemini-1.5-flash';

      appState.activeModel = chosenModel;
      showApiKeyTestStatus('success', `API Key hợp lệ và hoạt động tốt! (Đã kết nối model: ${chosenModel})`);

      if (DOM.apiStatusDot) DOM.apiStatusDot.classList.add('active');
      if (DOM.apiHelperText) DOM.apiHelperText.innerText = 'Trạng thái: AI Sẵn Sàng (Gemini)';
      return;
    } else {
      const errJson = await resp.json().catch(() => ({}));
      const errDetail = errJson?.error?.message || `Mã lỗi ${resp.status}`;
      showApiKeyTestStatus('error', `Google API từ chối Key: ${errDetail}`);
      return;
    }
  } catch (e) {
    // Thử fallback trực tiếp qua generateContent
  }

  // Cách 2: Thử trực tiếp generateContent với các model flash ổn định
  const candidateModels = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-flash-8b', 'gemini-pro'];
  let successModel = null;
  let lastErrorMsg = '';

  for (const model of candidateModels) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Xin chào! Hãy phản hồi OK.' }] }]
        })
      });

      if (resp.ok) {
        successModel = model;
        break;
      } else {
        const errJson = await resp.json().catch(() => ({}));
        lastErrorMsg = errJson?.error?.message || `Mã phản hồi ${resp.status}`;
      }
    } catch (e) {
      lastErrorMsg = e.message || 'Lỗi mạng hoặc không thể kết nối tới Google';
    }
  }

  if (successModel) {
    appState.activeModel = successModel;
    showApiKeyTestStatus('success', `API Key hợp lệ! Đã kết nối thành công với Google Gemini (${successModel}).`);
    if (DOM.apiStatusDot) DOM.apiStatusDot.classList.add('active');
    if (DOM.apiHelperText) DOM.apiHelperText.innerText = 'Trạng thái: AI Sẵn Sàng (Gemini)';
  } else {
    showApiKeyTestStatus('error', `Không thể kết nối API Key: ${lastErrorMsg}`);
  }
}

function showApiKeyTestStatus(type, message) {
  if (!DOM.apiKeyTestStatus) return;
  DOM.apiKeyTestStatus.style.display = 'block';

  if (type === 'loading') {
    DOM.apiKeyTestStatus.style.background = '#eff6ff';
    DOM.apiKeyTestStatus.style.color = '#1d4ed8';
    DOM.apiKeyTestStatus.style.border = '1px solid #bfdbfe';
    DOM.apiKeyTestStatus.innerHTML = `<span style="display:inline-flex; align-items:center; gap:6px;">⏳ ${escapeHtml(message)}</span>`;
  } else if (type === 'success') {
    DOM.apiKeyTestStatus.style.background = '#f0fdf4';
    DOM.apiKeyTestStatus.style.color = '#15803d';
    DOM.apiKeyTestStatus.style.border = '1px solid #bbf7d0';
    DOM.apiKeyTestStatus.innerHTML = `<span style="display:inline-flex; align-items:center; gap:6px;">✅ ${escapeHtml(message)}</span>`;
  } else {
    DOM.apiKeyTestStatus.style.background = '#fef2f2';
    DOM.apiKeyTestStatus.style.color = '#b91c1c';
    DOM.apiKeyTestStatus.style.border = '1px solid #fecaca';
    DOM.apiKeyTestStatus.innerHTML = `<span style="display:inline-flex; align-items:center; gap:6px;">❌ ${escapeHtml(message)}</span>`;
  }
}

/**
 * Kiểm tra trạng thái kết nối backend và Gemini API
 */
async function checkApiHealth() {
  const localSavedKey = (localStorage.getItem('GEMINI_API_KEY') || '').trim();
  try {
    const apiEndpoint = window.location.origin.includes('8000') 
      ? '/api/health' 
      : 'http://127.0.0.1:8000/api/health';

    const resp = await fetch(apiEndpoint);
    if (resp.ok) {
      const data = await resp.json();
      const isConfigured = data.geminiConfigured || Boolean(localSavedKey);
      if (DOM.apiStatusDot) {
        DOM.apiStatusDot.classList.toggle('active', isConfigured);
      }
      if (DOM.apiHelperText) {
        DOM.apiHelperText.innerText = isConfigured 
          ? 'Trạng thái: AI Sẵn Sàng (Gemini)' 
          : 'Trạng thái: Chưa nhập API Key (Dùng Database mẫu)';
      }
      return;
    }
  } catch (e) {
    // Backend offline
  }

  // Nếu Backend offline nhưng người dùng đã nhập API Key trong trình duyệt
  if (localSavedKey) {
    if (DOM.apiStatusDot) DOM.apiStatusDot.classList.add('active');
    if (DOM.apiHelperText) DOM.apiHelperText.innerText = 'Trạng thái: AI Sẵn Sàng (Trực tiếp từ Trình duyệt)';
  } else {
    if (DOM.apiStatusDot) DOM.apiStatusDot.classList.remove('active');
    if (DOM.apiHelperText) DOM.apiHelperText.innerText = 'Trạng thái: Chưa nhập API Key (Dùng Database mẫu)';
  }
}

function openApiKeyModal() {
  const savedKey = localStorage.getItem('GEMINI_API_KEY') || '';
  if (DOM.inputApiKey) {
    DOM.inputApiKey.value = savedKey;
    DOM.inputApiKey.type = 'password';
  }
  if (DOM.iconApiKeyVisibility) {
    DOM.iconApiKeyVisibility.setAttribute('data-lucide', 'eye');
    if (window.lucide) lucide.createIcons();
  }
  if (DOM.apiKeyTestStatus) {
    DOM.apiKeyTestStatus.style.display = 'none';
  }
  if (DOM.apiKeyModal) DOM.apiKeyModal.classList.add('active');
}

function closeApiKeyModal() {
  if (DOM.apiKeyModal) DOM.apiKeyModal.classList.remove('active');
}

function toggleApiKeyVisibility() {
  if (!DOM.inputApiKey) return;
  if (DOM.inputApiKey.type === 'password') {
    DOM.inputApiKey.type = 'text';
    DOM.iconApiKeyVisibility.setAttribute('data-lucide', 'eye-off');
  } else {
    DOM.inputApiKey.type = 'password';
    DOM.iconApiKeyVisibility.setAttribute('data-lucide', 'eye');
  }
  if (window.lucide) lucide.createIcons();
}

async function clearApiKey() {
  localStorage.removeItem('GEMINI_API_KEY');
  if (DOM.inputApiKey) DOM.inputApiKey.value = '';
  if (DOM.apiKeyTestStatus) DOM.apiKeyTestStatus.style.display = 'none';
  
  try {
    const apiEndpoint = window.location.origin.includes('8000') 
      ? '/api/config/api-key' 
      : 'http://127.0.0.1:8000/api/config/api-key';

    await fetch(apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey: '' })
    });
  } catch (e) {
    console.log("Cleared key locally");
  }

  closeApiKeyModal();
  checkApiHealth();
  showToast('Đã xóa Gemini API Key!');
}

async function saveApiKey() {
  const key = DOM.inputApiKey ? DOM.inputApiKey.value.trim() : '';
  if (!key) {
    clearApiKey();
    return;
  }

  localStorage.setItem('GEMINI_API_KEY', key);

  try {
    const apiEndpoint = window.location.origin.includes('8000') 
      ? '/api/config/api-key' 
      : 'http://127.0.0.1:8000/api/config/api-key';

    await fetch(apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey: key })
    });
  } catch (e) {
    console.log("Saved key locally");
  }

  closeApiKeyModal();
  checkApiHealth();
  showToast('Đã lưu cấu hình Gemini API Key thành công!');
}

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Khởi động
window.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();
  initApp();
});
