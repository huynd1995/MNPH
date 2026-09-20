/**
 * Kindergarten A4 & A5 Poem & Media QR Card Generator - Main Application Controller
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
  
  // Format & Mode
  paperFormat: 'a4', // 'a4' or 'a5'
  qrMode: '2', // '1' or '2'
  qrSizeLevel: 'large', // 'normal', 'large', 'xlarge'
  qrScaleMultiplier: 1.0, // 0.8 to 1.35
  
  singleSubtitle: 'Xem tranh bài thơ',
  poemSubtitle: 'Xem tranh bài thơ',
  musicSubtitle: 'Nghe nhạc YouTube',
  scale: 1,
  activeModel: 'gemini-1.5-flash',
  mobileView: 'editor', // 'editor' or 'preview'

  // Style Settings
  theme: 'default',
  cardRadius: '28px',
  subtitleFontSize: '24px',
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
  // Navigation & Tabs
  sidebarTabBtns: document.querySelectorAll('.sidebar-tab-btn'),
  tabPanels: document.querySelectorAll('.tab-panel'),
  btnMobileTabEdit: document.getElementById('btnMobileTabEdit'),
  btnMobileTabPreview: document.getElementById('btnMobileTabPreview'),
  btnMobileBackToEdit: document.getElementById('btnMobileBackToEdit'),
  mobilePaperLabel: document.getElementById('mobilePaperLabel'),
  
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
  
  // Paper Size & QR Sizing Controls
  btnPaperA4: document.getElementById('btnPaperA4'),
  btnPaperA5: document.getElementById('btnPaperA5'),
  qrSizePresetBtns: document.querySelectorAll('.size-preset-btn'),
  qrSizeSlider: document.getElementById('qrSizeSlider'),
  qrSizeSliderVal: document.getElementById('qrSizeSliderVal'),
  qrSizeDisplayBadge: document.getElementById('qrSizeDisplayBadge'),
  
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
  
  // Sheet Preview Elements
  previewArea: document.getElementById('previewArea'),
  sheetViewport: document.getElementById('sheetViewport'),
  sheetScaler: document.getElementById('sheetScaler'),
  printSheet: document.getElementById('printSheet'),
  previewToolbarTitle: document.getElementById('previewToolbarTitle'),
  paperBadgePill: document.getElementById('paperBadgePill'),
  btnPrintText: document.getElementById('btnPrintText'),
  btnMobilePrintText: document.getElementById('btnMobilePrintText'),
  
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
  
  // Subtitle Displays
  subtitleSingleDisplay: document.getElementById('subtitleSingleDisplay'),
  subtitlePoemDisplay: document.getElementById('subtitlePoemDisplay'),
  subtitleMusicDisplay: document.getElementById('subtitleMusicDisplay'),
  
  // Actions & Modals
  btnPrint: document.getElementById('btnPrint'),
  btnDownloadPng: document.getElementById('btnDownloadPng'),
  btnMobilePrint: document.getElementById('btnMobilePrint'),
  btnMobileDownloadPng: document.getElementById('btnMobileDownloadPng'),
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
  if (window.lucide) {
    lucide.createIcons();
  }
  document.body.classList.add('mobile-view-editor');
  bindEvents();
  loadInitialPoem();
  setPaperFormat('a4'); // Mặc định A4
  setupResponsiveScale();
  checkApiHealth();
  
  // Lắng nghe resize và orientationchange để auto-scale điện thoại mượt mà
  window.addEventListener('resize', debounce(setupResponsiveScale, 100));
  window.addEventListener('orientationchange', () => {
    setTimeout(setupResponsiveScale, 200);
  });
}

/**
 * Tiện ích Debounce
 */
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

/**
 * Nạp bài thơ mẫu ban đầu
 */
function loadInitialPoem() {
  if (typeof POEMS_DATABASE !== 'undefined' && POEMS_DATABASE.length > 0) {
    selectPoem(POEMS_DATABASE[0]);
  } else {
    updateCardDisplay();
  }
}

/**
 * Gán sự kiện tương tác
 */
function bindEvents() {
  // 1. Chuyển Tab Sidebar (Nội Dung vs Khổ Giấy & QR)
  if (DOM.sidebarTabBtns) {
    DOM.sidebarTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        switchSidebarTab(targetTab);
      });
    });
  }

  // Mobile View Navigation Toggle
  if (DOM.btnMobileTabEdit) {
    DOM.btnMobileTabEdit.addEventListener('click', () => setMobileView('editor'));
  }
  if (DOM.btnMobileTabPreview) {
    DOM.btnMobileTabPreview.addEventListener('click', () => setMobileView('preview'));
  }
  if (DOM.btnMobileBackToEdit) {
    DOM.btnMobileBackToEdit.addEventListener('click', () => setMobileView('editor'));
  }

  // 2. Tìm kiếm & Gợi ý (Autocomplete & AI Search)
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

  // 3. Thay đổi thông tin bài thơ
  if (DOM.poemTitleInput) {
    DOM.poemTitleInput.addEventListener('input', (e) => {
      appState.title = e.target.value.trim() || 'Tên Bài Thơ';
      updateCardDisplay();
    });
  }

  if (DOM.poemAuthorInput) {
    DOM.poemAuthorInput.addEventListener('input', (e) => {
      appState.author = e.target.value.trim();
      updateCardDisplay();
    });
  }

  if (DOM.poemContentInput) {
    DOM.poemContentInput.addEventListener('input', (e) => {
      appState.content = e.target.value;
      updateCardDisplay();
    });
  }

  if (DOM.coverImageInput) {
    DOM.coverImageInput.addEventListener('input', (e) => {
      appState.coverImage = e.target.value.trim();
      if (DOM.imagePreviewThumb) DOM.imagePreviewThumb.src = appState.coverImage;
      updateCardDisplay();
    });
  }

  // 4. Upload ảnh từ máy tính
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
          updateCardDisplay();
          showToast('Đã tải ảnh lên thành công!');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // 5. Nhạc YouTube
  if (DOM.youtubeUrlInput) {
    DOM.youtubeUrlInput.addEventListener('input', (e) => {
      appState.youtubeUrl = e.target.value.trim();
      updateCardDisplay();
    });
  }

  if (DOM.youtubeTitleInput) {
    DOM.youtubeTitleInput.addEventListener('input', (e) => {
      appState.youtubeTitle = e.target.value.trim();
      updateCardDisplay();
    });
  }

  // 6. Chọn khổ giấy A4 / A5
  if (DOM.btnPaperA4) DOM.btnPaperA4.addEventListener('click', () => setPaperFormat('a4'));
  if (DOM.btnPaperA5) DOM.btnPaperA5.addEventListener('click', () => setPaperFormat('a5'));

  // 7. Chọn kích thước QR (Presets & Slider)
  if (DOM.qrSizePresetBtns) {
    DOM.qrSizePresetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const sizeLevel = btn.getAttribute('data-size');
        setQrSizePreset(sizeLevel);
      });
    });
  }

  if (DOM.qrSizeSlider) {
    DOM.qrSizeSlider.addEventListener('input', handleQrSlider);
  }

  // 8. Chuyển đổi Toggle 1 QR / 2 QR
  if (DOM.btnToggle1QR) DOM.btnToggle1QR.addEventListener('click', () => setQRMode('1'));
  if (DOM.btnToggle2QR) DOM.btnToggle2QR.addEventListener('click', () => setQRMode('2'));

  // 9. Nút Hành Động Lớn (Cập nhật mã QR, Đổi bài mẫu, Reset)
  if (DOM.btnGenerateQR) {
    DOM.btnGenerateQR.addEventListener('click', () => {
      updateCardDisplay();
      showToast('✨ Đã tạo & cập nhật mã QR thành công!');
    });
  }

  if (DOM.btnRefreshPreview) {
    DOM.btnRefreshPreview.addEventListener('click', () => {
      updateCardDisplay();
      setupResponsiveScale();
      showToast('Đã làm mới mã QR!');
    });
  }

  if (DOM.btnQuickSample) {
    DOM.btnQuickSample.addEventListener('click', loadRandomSample);
  }

  // 10. Phụ đề dưới QR & Kích thước chữ
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
      updateCardDisplay();
    });
  }

  // 11. Bộ màu chủ đề & Color Pickers
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
      updateCardDisplay();
    });
  }

  if (DOM.colorQrMusic) {
    DOM.colorQrMusic.addEventListener('input', (e) => {
      const hex = e.target.value;
      appState.colorQrMusic = hex;
      appState.colorTextMusic = hex;
      appState.colorBgMusic = hexToLightBg(hex);
      appState.colorBorderMusic = hexToLightBorder(hex);
      updateCardDisplay();
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
      updateCardDisplay();
    });
  });

  if (DOM.btnResetStyles) {
    DOM.btnResetStyles.addEventListener('click', resetDefaultStyles);
  }

  // 12. In & Tải ảnh PNG
  if (DOM.btnPrint) DOM.btnPrint.addEventListener('click', printCard);
  if (DOM.btnMobilePrint) DOM.btnMobilePrint.addEventListener('click', printCard);
  if (DOM.btnDownloadPng) DOM.btnDownloadPng.addEventListener('click', downloadCardAsPng);
  if (DOM.btnMobileDownloadPng) DOM.btnMobileDownloadPng.addEventListener('click', downloadCardAsPng);

  // 13. Modal xem trước trên điện thoại
  if (DOM.btnPreviewPhone) DOM.btnPreviewPhone.addEventListener('click', openPhonePreview);
  if (DOM.btnCloseModal) DOM.btnCloseModal.addEventListener('click', closePhonePreview);
  if (DOM.phoneModal) {
    DOM.phoneModal.addEventListener('click', (e) => {
      if (e.target === DOM.phoneModal) closePhonePreview();
    });
  }
}

/**
 * Chuyển tab trong Sidebar
 */
function switchSidebarTab(tabId) {
  if (DOM.sidebarTabBtns) {
    DOM.sidebarTabBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });
  }
  if (DOM.tabPanels) {
    DOM.tabPanels.forEach(panel => {
      panel.classList.toggle('active', panel.id === tabId);
    });
  }
}

/**
 * Chuyển đổi giao diện Mobile (Soạn thảo vs Xem thẻ)
 */
function setMobileView(view) {
  appState.mobileView = view;
  if (view === 'preview') {
    document.body.classList.remove('mobile-view-editor');
    document.body.classList.add('mobile-view-preview');
    if (DOM.btnMobileTabEdit) DOM.btnMobileTabEdit.classList.remove('active');
    if (DOM.btnMobileTabPreview) DOM.btnMobileTabPreview.classList.add('active');
    setTimeout(setupResponsiveScale, 50);
  } else {
    document.body.classList.remove('mobile-view-preview');
    document.body.classList.add('mobile-view-editor');
    if (DOM.btnMobileTabEdit) DOM.btnMobileTabEdit.classList.add('active');
    if (DOM.btnMobileTabPreview) DOM.btnMobileTabPreview.classList.remove('active');
  }
}

/**
 * Chuyển đổi khổ giấy A4 / A5
 */
function setPaperFormat(format) {
  appState.paperFormat = format;
  
  // Cập nhật class body cho print stylesheet
  document.body.classList.remove('paper-a4', 'paper-a5');
  document.body.classList.add(`paper-${format}`);

  // Cập nhật class khung tờ in
  if (DOM.printSheet) {
    DOM.printSheet.classList.remove('paper-sheet-a4', 'paper-sheet-a5');
    DOM.printSheet.classList.add(`paper-sheet-${format}`);
  }

  // Cập nhật trạng thái nút
  if (DOM.btnPaperA4) DOM.btnPaperA4.classList.toggle('active', format === 'a4');
  if (DOM.btnPaperA5) DOM.btnPaperA5.classList.toggle('active', format === 'a5');

  // Cập nhật labels
  const formatName = format.toUpperCase();
  const formatDims = format === 'a4' ? '297mm × 210mm' : '210mm × 148mm';
  
  if (DOM.mobilePaperLabel) DOM.mobilePaperLabel.innerText = formatName;
  if (DOM.paperBadgePill) DOM.paperBadgePill.innerText = `${formatName} Nằm Ngang`;
  if (DOM.previewToolbarTitle) DOM.previewToolbarTitle.innerText = `Bản xem trước Khổ ${formatName} Ngang (${formatDims})`;
  if (DOM.btnPrintText) DOM.btnPrintText.innerText = `In Thẻ ${formatName}`;
  if (DOM.btnMobilePrintText) DOM.btnMobilePrintText.innerText = `In Thẻ ${formatName}`;

  updateCardDisplay();
  setupResponsiveScale();
  showToast(`Đã chuyển sang Khổ ${formatName} (${formatDims})`);
}

/**
 * Thiết lập kích thước QR theo preset (Normal, Large, XLarge)
 */
function setQrSizePreset(level) {
  appState.qrSizeLevel = level;
  
  let multiplier = 1.0;
  let label = 'Lớn';
  let sliderVal = 100;

  if (level === 'normal') {
    multiplier = 0.85;
    label = 'Vừa';
    sliderVal = 85;
  } else if (level === 'large') {
    multiplier = 1.0;
    label = 'Lớn ⭐';
    sliderVal = 100;
  } else if (level === 'xlarge') {
    multiplier = 1.25;
    label = 'Cực Đại';
    sliderVal = 125;
  }

  appState.qrScaleMultiplier = multiplier;

  if (DOM.qrSizeSlider) DOM.qrSizeSlider.value = sliderVal;
  if (DOM.qrSizeSliderVal) DOM.qrSizeSliderVal.innerText = `${sliderVal}%`;
  if (DOM.qrSizeDisplayBadge) DOM.qrSizeDisplayBadge.innerText = label;

  if (DOM.qrSizePresetBtns) {
    DOM.qrSizePresetBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-size') === level);
    });
  }

  document.documentElement.style.setProperty('--qr-scale-multiplier', multiplier);
  updateCardDisplay();
}

/**
 * Xử lý thanh trượt kích thước QR Slider
 */
function handleQrSlider(e) {
  const val = parseInt(e.target.value, 10);
  const multiplier = val / 100;
  appState.qrScaleMultiplier = multiplier;

  if (DOM.qrSizeSliderVal) DOM.qrSizeSliderVal.innerText = `${val}%`;

  let label = 'Tùy chỉnh';
  if (val <= 85) label = 'Vừa';
  else if (val >= 95 && val <= 105) label = 'Lớn';
  else if (val >= 120) label = 'Cực Đại';

  if (DOM.qrSizeDisplayBadge) DOM.qrSizeDisplayBadge.innerText = `${label} (${val}%)`;

  if (DOM.qrSizePresetBtns) {
    DOM.qrSizePresetBtns.forEach(btn => {
      const btnSize = btn.getAttribute('data-size');
      if (btnSize === 'normal') btn.classList.toggle('active', val <= 85);
      else if (btnSize === 'large') btn.classList.toggle('active', val >= 95 && val <= 105);
      else if (btnSize === 'xlarge') btn.classList.toggle('active', val >= 120);
    });
  }

  document.documentElement.style.setProperty('--qr-scale-multiplier', multiplier);
  updateCardDisplay();
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

  updateCardDisplay();
  showToast(`Đã áp dụng chủ đề: ${theme.name}`);
}

function resetDefaultStyles() {
  applyTheme('default');
  setPaperFormat('a4');
  setQrSizePreset('large');
  appState.cardRadius = '28px';
  appState.subtitleFontSize = '24px';
  
  if (DOM.selectSubtitleFontSize) DOM.selectSubtitleFontSize.value = '24px';
  if (DOM.btnRadiusRound) {
    [DOM.btnRadiusRound, DOM.btnRadiusSemi, DOM.btnRadiusSquare].forEach(b => b && b.classList.remove('active'));
    DOM.btnRadiusRound.classList.add('active');
  }

  updateCardDisplay();
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

  updateCardDisplay();
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
  updateCardDisplay();
}

/**
 * Cập nhật toàn bộ khung tờ in và vẽ lại các mã QR
 */
function updateCardDisplay() {
  // 1. Cập nhật phụ đề & Font Size
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

  // 2. Áp dụng Màu Sắc & Kiểu Dáng Thẻ (Nền trắng tinh khiết, không nền mờ)
  if (DOM.cardSingle) {
    DOM.cardSingle.style.borderRadius = appState.cardRadius;
    DOM.cardSingle.style.backgroundColor = '#ffffff';
    DOM.cardSingle.style.borderColor = appState.colorBorderPoem;
  }
  if (DOM.cardPoem) {
    DOM.cardPoem.style.borderRadius = appState.cardRadius;
    DOM.cardPoem.style.backgroundColor = '#ffffff';
    DOM.cardPoem.style.borderColor = appState.colorBorderPoem;
  }
  if (DOM.cardMusic) {
    DOM.cardMusic.style.borderRadius = appState.cardRadius;
    DOM.cardMusic.style.backgroundColor = '#ffffff';
    DOM.cardMusic.style.borderColor = appState.colorBorderMusic;
  }

  // 3. Tạo URL đọc thơ cho mã QR
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
  const isA4 = appState.paperFormat === 'a4';
  const multiplier = appState.qrScaleMultiplier || 1.0;

  // 4. Sinh QR Code với kích cỡ phù hợp theo khổ giấy và thanh trượt
  if (appState.qrMode === '1') {
    // 1 QR Mode: A4: 310px, A5: 210px
    const baseSize = isA4 ? 310 : 210;
    const qrPx = Math.round(baseSize * multiplier);

    if (DOM.qrSingleContainer) {
      QREngine.renderQR(DOM.qrSingleContainer, readerUrl, {
        size: qrPx,
        colorDark: appState.colorQrPoem,
        colorLight: '#ffffff'
      });
    }
  } else {
    // 2 QR Mode: A4: 230px, A5: 156px
    const baseSize = isA4 ? 230 : 156;
    const qrPx = Math.round(baseSize * multiplier);

    // QR Trái (Bài thơ)
    if (DOM.qrPoemContainer) {
      QREngine.renderQR(DOM.qrPoemContainer, readerUrl, {
        size: qrPx,
        colorDark: appState.colorQrPoem,
        colorLight: '#ffffff'
      });
    }

    // QR Phải (YouTube)
    const musicUrl = appState.youtubeUrl || 'https://www.youtube.com';
    if (DOM.qrMusicContainer) {
      QREngine.renderQR(DOM.qrMusicContainer, musicUrl, {
        size: qrPx,
        colorDark: appState.colorQrMusic,
        colorLight: '#ffffff'
      });
    }
  }
}

/**
 * Tự động scale khung A4/A5 vừa vặn hoàn hảo với màn hình máy tính & điện thoại
 */
function setupResponsiveScale() {
  const container = DOM.previewArea;
  if (!container || !DOM.sheetScaler || !DOM.printSheet) return;

  // Kích thước chuẩn của tờ in dựa trên khổ giấy
  const isA4 = appState.paperFormat === 'a4';
  const sheetWidth = isA4 ? 1080 : 794;
  const sheetHeight = isA4 ? 764 : 559;

  // Kích thước vùng khả dụng
  const containerWidth = container.clientWidth || window.innerWidth;
  const containerHeight = container.clientHeight || (window.innerHeight - 65);

  // Khoảng đệm an toàn
  const horizontalPadding = window.innerWidth <= 768 ? 20 : 48;
  const verticalPadding = window.innerWidth <= 768 ? 100 : 90;

  const availableWidth = Math.max(containerWidth - horizontalPadding, 200);
  const availableHeight = Math.max(containerHeight - verticalPadding, 200);

  // Tính tỷ lệ scale hoàn hảo không bị méo và không bị tràn viền
  let scale = Math.min(availableWidth / sheetWidth, availableHeight / sheetHeight);

  // Giới hạn scale
  if (scale > 1.05) scale = 1.0;
  if (scale < 0.25) scale = 0.25;

  appState.scale = scale;
  DOM.sheetScaler.style.transform = `scale(${scale})`;
}

/**
 * In thẻ trực tiếp qua hộp thoại trình duyệt
 */
function printCard() {
  window.print();
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
 * Tải thẻ dưới dạng ảnh PNG chất lượng cao (Chuẩn A4 hoặc A5)
 */
function downloadCardAsPng() {
  if (!window.html2canvas) {
    alert("Thư viện xuất ảnh đang tải, vui lòng thử lại sau 2 giây.");
    return;
  }

  const paperName = appState.paperFormat.toUpperCase();
  showToast(`Đang tạo ảnh ${paperName} chất lượng cao...`);

  const oldTransform = DOM.sheetScaler ? DOM.sheetScaler.style.transform : '';
  if (DOM.sheetScaler) DOM.sheetScaler.style.transform = 'none';

  html2canvas(DOM.printSheet, {
    scale: 2.5,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false
  }).then(canvas => {
    if (DOM.sheetScaler) DOM.sheetScaler.style.transform = oldTransform;
    
    const link = document.createElement('a');
    const cleanTitle = (appState.title || 'The_Hoc_Lieu').replace(/[^a-zA-Z0-9\u00C0-\u1EF9]/g, '_');
    link.download = `The_${paperName}_Bai_Tho_${cleanTitle}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast(`Đã tải ảnh thẻ ${paperName} thành công!`);
  }).catch(err => {
    if (DOM.sheetScaler) DOM.sheetScaler.style.transform = oldTransform;
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
  toast.innerHTML = `<i data-lucide="check-circle" style="width:16px; height:16px; color:#10b981;"></i> <span>${escapeHtml(message)}</span>`;
  DOM.toastContainer.appendChild(toast);
  if (window.lucide) lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

/**
 * Escape HTML
 */
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.innerText = text;
  return div.innerHTML;
}

// ==========================================================================
// GEMINI AI & API KEY MANAGEMENT
// ==========================================================================
const API_CONFIG = {
  storageKey: 'gemini_api_key_custom',
  defaultKey: 'AIzaSyAns5lL7TT_XCcSo8AWbXBkWXXVFjuDHss', // Key tích hợp sẵn cho tất cả mọi người dùng chung
  get activeKey() {
    return localStorage.getItem(this.storageKey) || this.defaultKey;
  },
  get isCustom() {
    return !!localStorage.getItem(this.storageKey);
  }
};

function checkApiHealth() {
  const hasKey = !!API_CONFIG.activeKey;
  if (DOM.apiStatusDot) DOM.apiStatusDot.classList.toggle('active', hasKey);
  if (DOM.apiHelperText) {
    if (API_CONFIG.isCustom) {
      DOM.apiHelperText.innerText = 'Trạng thái: AI Sẵn Sàng (Key Cá Nhân)';
    } else if (API_CONFIG.activeKey) {
      DOM.apiHelperText.innerText = 'Trạng thái: AI Sẵn Sàng (Key Tích Hợp Sẵn)';
    } else {
      DOM.apiHelperText.innerText = 'Trạng thái: Chưa có API Key';
    }
  }
}

function openApiKeyModal() {
  if (DOM.inputApiKey) {
    DOM.inputApiKey.value = localStorage.getItem(API_CONFIG.storageKey) || '';
    DOM.inputApiKey.placeholder = API_CONFIG.defaultKey ? 'Đang dùng Key mặc định của web (nhập để đổi key riêng)...' : 'AIzaSy...';
  }
  if (DOM.apiKeyTestStatus) DOM.apiKeyTestStatus.style.display = 'none';
  if (DOM.apiKeyModal) DOM.apiKeyModal.classList.add('active');
}

function closeApiKeyModal() {
  if (DOM.apiKeyModal) DOM.apiKeyModal.classList.remove('active');
}

function toggleApiKeyVisibility() {
  if (!DOM.inputApiKey) return;
  const isPassword = DOM.inputApiKey.type === 'password';
  DOM.inputApiKey.type = isPassword ? 'text' : 'password';
  if (DOM.iconApiKeyVisibility) {
    DOM.iconApiKeyVisibility.setAttribute('data-lucide', isPassword ? 'eye-off' : 'eye');
    if (window.lucide) lucide.createIcons();
  }
}

function saveApiKey() {
  const key = (DOM.inputApiKey ? DOM.inputApiKey.value.trim() : '');
  if (!key) {
    clearApiKey();
    return;
  }
  localStorage.setItem(API_CONFIG.storageKey, key);
  checkApiHealth();
  closeApiKeyModal();
  showToast('Đã lưu Gemini API Key riêng thành công!');
}

function clearApiKey() {
  localStorage.removeItem(API_CONFIG.storageKey);
  if (DOM.inputApiKey) DOM.inputApiKey.value = '';
  checkApiHealth();
  closeApiKeyModal();
  showToast('Đã chuyển về dùng API Key mặc định của hệ thống');
}

async function testApiKeyConnection() {
  const key = (DOM.inputApiKey ? DOM.inputApiKey.value.trim() : '') || API_CONFIG.activeKey;
  if (!key) {
    showTestStatus("Vui lòng nhập API Key để kiểm tra", "error");
    return;
  }

  showTestStatus("Đang kiểm tra kết nối với Google Gemini...", "loading");

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
    const data = await response.json();
    if (response.ok && data.models) {
      showTestStatus("Kết nối thành công! API Key hoạt động chính xác.", "success");
    } else {
      const errMsg = data.error ? data.error.message : 'API Key không hợp lệ';
      showTestStatus(`Lỗi: ${errMsg}`, "error");
    }
  } catch (err) {
    showTestStatus("Không thể kết nối đến máy chủ Google: " + err.message, "error");
  }
}

function showTestStatus(msg, type) {
  if (!DOM.apiKeyTestStatus) return;
  DOM.apiKeyTestStatus.style.display = 'block';
  DOM.apiKeyTestStatus.innerText = msg;
  if (type === 'success') {
    DOM.apiKeyTestStatus.style.background = '#ecfdf5';
    DOM.apiKeyTestStatus.style.color = '#065f46';
    DOM.apiKeyTestStatus.style.border = '1px solid #a7f3d0';
  } else if (type === 'error') {
    DOM.apiKeyTestStatus.style.background = '#fef2f2';
    DOM.apiKeyTestStatus.style.color = '#991b1b';
    DOM.apiKeyTestStatus.style.border = '1px solid #fecaca';
  } else {
    DOM.apiKeyTestStatus.style.background = '#f8fafc';
    DOM.apiKeyTestStatus.style.color = '#334155';
    DOM.apiKeyTestStatus.style.border = '1px solid #cbd5e1';
  }
}

async function triggerAiSearch() {
  const query = DOM.searchInput ? DOM.searchInput.value.trim() : '';
  if (!query) {
    showToast('Vui lòng nhập tên hoặc câu thơ cần tìm!');
    return;
  }

  setAiSearchLoading(true);
  showToast(`Đang tra cứu bài thơ "${query}" với Gemini AI...`);

  try {
    // 1. Thử gọi backend FastAPI trước
    let resultPoem = null;
    try {
      const resp = await fetch('/api/search-poem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query, apiKey: API_CONFIG.activeKey })
      });
      if (resp.ok) {
        resultPoem = await resp.json();
      }
    } catch (e) {
      console.warn("Backend API not reachable, falling back to direct client search:", e);
    }

    // 2. Nếu không có backend, gọi trực tiếp Gemini API client-side nếu có key
    if (!resultPoem && API_CONFIG.activeKey) {
      resultPoem = await directGeminiSearch(query, API_CONFIG.activeKey);
    }

    // 3. Fallback tìm kiếm trong kho bài thơ có sẵn
    if (!resultPoem) {
      const localMatches = searchPoems(query);
      if (localMatches && localMatches.length > 0) {
        resultPoem = localMatches[0];
      }
    }

    if (resultPoem && resultPoem.title) {
      selectPoem(resultPoem);
      showToast(`Đã tìm thấy bài thơ "${resultPoem.title}"!`);
    } else {
      showToast('Không tìm thấy bài thơ phù hợp. Hãy thử câu thơ khác!');
    }
  } catch (err) {
    console.error("AI Search Error:", err);
    showToast('Lỗi khi tra cứu AI: ' + err.message);
  } finally {
    setAiSearchLoading(false);
  }
}

function setAiSearchLoading(isLoading) {
  if (!DOM.btnAiSearch) return;
  DOM.btnAiSearch.disabled = isLoading;
  if (DOM.aiSearchIcon) {
    if (isLoading) {
      DOM.aiSearchIcon.className = 'spinner';
    } else {
      DOM.aiSearchIcon.className = '';
      DOM.aiSearchIcon.setAttribute('data-lucide', 'sparkles');
      if (window.lucide) lucide.createIcons();
    }
  }
  if (DOM.aiSearchText) {
    DOM.aiSearchText.innerText = isLoading ? 'Đang tìm...' : 'Tìm AI';
  }
}

/**
 * Gọi trực tiếp Gemini API client-side
 */
async function directGeminiSearch(query, apiKey) {
  const prompt = `Bạn là chuyên gia về thơ ca mầm non Việt Nam. Hãy tìm kiếm chính xác bài thơ mầm non theo yêu cầu: "${query}".
Trả về kết quả duy nhất ở định dạng JSON hợp lệ (không kèm markdown \`\`\`json):
{
  "title": "Tên bài thơ",
  "author": "Tên tác giả hoặc Sưu tầm",
  "category": "Chủ đề (VD: Gia đình, Động vật, Thực vật...)",
  "content": "Toàn văn bài thơ có ngắt dòng giữa các câu thơ và khổ thơ",
  "coverImage": "URL tranh minh họa thích hợp hoặc để trống",
  "youtubeUrl": "URL bài hát thiếu nhi youtube liên quan hoặc để trống",
  "youtubeTitle": "Tiêu đề bài hát hiển thị"
}`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json" }
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.statusText}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (text) {
    return JSON.parse(text);
  }
  return null;
}

// Khởi chạy ứng dụng khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', initApp);
