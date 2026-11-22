/**
 * Cinemakom Download Portal — app.js
 *
 * Handles:
 * 1. Configuration for Cinemakom GitHub Releases & local `releases/` artifacts
 * 2. Smart OS & architecture detection (macOS, Windows, Linux, Android, iOS, Android TV)
 * 3. Split-per-ABI selector for Android & Android TV (`arm64-v8a`, `armeabi-v7a`, `x86_64`)
 * 4. Platform category filter tabs (All, Mobile, Desktop, TV)
 * 5. Interactive form-factor preview switcher (Desktop, Mobile, 10-Foot TV UI)
 * 6. Live theme switcher ("Marquee" & "Bordeaux Curtain")
 * 7. Full English (LTR) & Arabic (RTL) localization
 * 8. Marquee bulb sequence animation (respecting prefers-reduced-motion)
 */

const CINEMAKOM_CONFIG = {
  repoOwner: 'hussainhacko-svg',
  repoName: 'cinemakom',
  fallbackVersion: 'v1.0.0',
  // Set useLocalDist to true if hosting built binaries directly inside ./releases/
  useLocalDist: false,
  localDistPath: './releases',
};

/**
 * Generates the download URL for a specific artifact matching `.github/workflows/release.yml`
 * and `tool/build_all.sh`.
 */
function buildArtifactUrl(version, suffix) {
  const filename = `cinemakom-${version}-${suffix}`;
  if (CINEMAKOM_CONFIG.useLocalDist) {
    return {
      filename,
      url: `${CINEMAKOM_CONFIG.localDistPath}/${filename}`,
    };
  }
  return {
    filename,
    url: `https://github.com/${CINEMAKOM_CONFIG.repoOwner}/${CINEMAKOM_CONFIG.repoName}/releases/latest/download/${filename}`,
  };
}

/**
 * Localization Dictionary (English & Arabic)
 */
const I18N = {
  en: {
    nav_downloads: 'Downloads',
    nav_screens: 'Interface',
    nav_features: 'Features',
    nav_install: 'Install Guide',
    theme_marquee: 'Marquee',
    theme_bordeaux: 'Bordeaux',
    hero_eyebrow: 'NOW SHOWING ON EVERY SCREEN',
    hero_title: 'YOUR TICKET. YOUR CINEMA.',
    hero_subtitle:
      'A native, zero-censorship streaming frontend for the Cinemana catalog. Built with the warm Marquee picture-palace design system for phones, desktops, and living-room TVs at up to 4K 120Hz.',
    hero_meta_platforms: 'Android · iOS · macOS · Windows · Linux · TV',
    cta_download_default: 'Download Cinemakom',
    cta_all_platforms: 'All Platforms & Architectures',
    detected_prefix: 'Detected platform:',
    choose_another_os: 'Choose another build',
    mock_tab_home: 'Home',
    mock_tab_search: 'Search',
    mock_tab_library: 'Library',
    mock_tab_downloads: 'Downloads',
    mock_tab_settings: 'Settings',
    mock_now_showing: 'NOW SHOWING',
    mock_featured_title: 'AL-RASHEED AFTER DARK',
    mock_featured_meta: '2026 · Drama · 2h 34m',
    mock_play: 'Play',
    mock_continue_watching: 'CONTINUE WATCHING',
    mock_see_all: 'See all',
    mock_continue_title: 'Dune: Part Two',
    mock_continue_ep: '1080p · Arabic (Styled ASS)',
    mock_continue_left: '42 min left',
    dl_eyebrow: 'DIRECT RELEASE PACKAGES',
    dl_title: 'DOWNLOAD CINEMAKOM',
    dl_subtitle: 'Choose your device below. No store telemetry, no ads, no account required.',
    filter_all: 'All (7)',
    filter_mobile: 'Mobile',
    filter_desktop: 'Desktop',
    filter_tv: 'TV',
    release_latest_ready: 'Latest release build:',
    view_checksums: 'SHA256 Checksums',
    github_releases: 'GitHub Releases',
    tag_detected: 'Recommended for your device',
    plat_android_title: 'Android',
    plat_android_meta: 'Android 8.0+ · ExoPlayer 4K · 120Hz High Refresh',
    plat_android_desc:
      'Split-per-ABI release APKs with hardware-accelerated 4K playback, background downloads with pause/resume, and brightness/volume gestures.',
    arch_modern: 'Recommended',
    arch_older: '32-bit phones',
    arch_emulator: 'Chromebook / x86',
    btn_dl_android_arm64: 'Download APK (arm64-v8a)',
    btn_dl_android_arm32: 'Download APK (armeabi-v7a)',
    btn_dl_android_x64: 'Download APK (x86_64)',
    plat_atv_title: 'Android TV & Google TV',
    plat_atv_meta: 'Leanback Launcher · D-Pad Focus Engine · 4K Posters',
    plat_atv_desc:
      'Dedicated 10-foot living-room UI (lib/tv) engineered for D-pad remotes with zero focus traps, two-pane episodes, and instant OK-to-skip intros.',
    arch_tv_64: '4K Google TV / Shield',
    arch_tv_32: 'TCL / Mi Box / 32-bit TVs',
    btn_dl_atv_arm64: 'Download TV APK (arm64-v8a)',
    btn_dl_atv_arm32: 'Download TV APK (armeabi-v7a)',
    plat_macos_title: 'macOS',
    plat_macos_meta: 'Apple Silicon & Intel · media_kit (mpv) · Styled ASS',
    plat_macos_desc:
      'Native macOS disk image with full keyboard shortcuts, extended navigation rail, custom download folder, and styled libass anime subtitles.',
    arch_macos_universal: 'macOS 12.0+ (DMG Installer)',
    btn_dl_macos: 'Download for macOS (.dmg)',
    plat_windows_title: 'Windows',
    plat_windows_meta: 'Windows 10 & 11 (64-bit) · Bundled libmpv',
    plat_windows_desc:
      'Self-contained portable 64-bit Windows build with bundled mpv video engine, SQLite FFI offline library, and desktop fullscreen controls.',
    arch_win_x64: 'x86_64 Portable Archive',
    btn_dl_windows: 'Download for Windows (.zip)',
    plat_linux_title: 'Linux',
    plat_linux_meta: 'Linux x86_64 · GTK3 + libmpv · Freedesktop Icons',
    plat_linux_desc:
      'Native Linux bundle with hicolor icons and io.github.sharon_xa.cinemakom.desktop entry. Also supports --dart-define=CINEMAKOM_TV=true TV mode.',
    arch_linux_x64: 'x86_64 Tarball + Desktop Packaging',
    btn_dl_linux: 'Download for Linux (.tar.gz)',
    plat_ios_title: 'iOS (iPhone & iPad)',
    plat_ios_meta: 'iOS 14.0+ · Unsigned IPA · media_kit + libass',
    plat_ios_desc:
      'Unsigned IPA package ready for sideloading via AltStore, SideStore, Sideloadly, or TrollStore with offline downloads and styled Arabic subtitles.',
    arch_ios_arm64: 'ARM64 Unsigned IPA (Sideload)',
    btn_dl_ios: 'Download Unsigned IPA (.ipa)',
    plat_tvos_title: 'Apple TV (tvOS)',
    plat_tvos_meta: 'Apple TV 4K & HD · Siri Remote · Custom flutter-tvos Engine',
    plat_tvos_desc:
      'Built via lib/main_tvos.dart with federated tvOS plugins (video_player_tvos, sqflite_tvos) and the 10-foot Marquee TV interface.',
    arch_tvos_arm64: 'tvOS ARM64 (flutter-tvos / Xcode DeviceHub)',
    btn_dl_tvos: 'Download / Build for Apple TV',
    prev_eyebrow: 'ONE CODEBASE · TAILORED INTERFACES',
    prev_title: 'DESIGNED FOR EVERY DISTANCE',
    prev_tab_desktop: 'Desktop (1200dp+)',
    prev_tab_mobile: 'Phone (<600dp)',
    prev_tab_tv: '10-Foot TV UI (960×540)',
    prev_mode_desktop_title: 'Extended Navigation Rail (232dp) + Two-Column Details',
    prev_mode_desktop_spec: 'Keyboard shortcuts · Mouse hover · Custom download folder',
    prev_mode_mobile_title: 'Bottom NavigationBar (72dp) + Portrait Browse / Landscape Player',
    prev_mode_mobile_spec: '120Hz display mode · Brightness & volume swipes · Double-tap seek',
    prev_mode_tv_title: 'Top Tab Bar + Explicit D-Pad Focus Graph (lib/tv)',
    prev_mode_tv_spec: '1.08× focus ring · Two-pane episodes · OK skips intro automatically',
    mock_series_eyebrow: 'SERIES · 1,179 EPISODES',
    mock_details_title: 'ONE PIECE',
    mock_details_meta: '1999 · Animation · Japanese · Arabic (Styled ASS)',
    mock_details_desc:
      'Long seasons of 50+ episodes automatically split into 50-episode range chips so Cast & Crew and More Like This stay within immediate reach.',
    mock_resume_btn: '▶ Resume · S1 E1089 · 14 min left',
    mock_fav_btn: 'In favorites',
    mock_dl_season_btn: 'Download season',
    mock_ep_1088: 'Episode 1088',
    mock_ep_1089: 'Episode 1089',
    feat_eyebrow: 'BUILT WITHOUT COMPROMISE',
    feat_title: 'INSIDE CINEMAKOM',
    feat_1_title: '4K 2160p & Dual Engines',
    feat_1_desc:
      'ExoPlayer on Android for butter-smooth 4K hardware decoding and 120Hz frame pacing; media_kit (libmpv) on Desktop and iOS with full styled ASS anime subtitles.',
    feat_2_title: 'Resilient Offline Downloads',
    feat_2_desc:
      'Download individual movies, episodes, or entire seasons with quality & size selection. Automatically refreshes expired signed CDN URLs (HTTP 403) and resumes cleanly.',
    feat_3_title: 'Zero Censorship · Zero Ratings',
    feat_3_desc:
      'Always requests the unrestricted stream without scene skipping or parental filters. No star ratings, no fake view counts, and zero calls to telemetry or ad servers.',
    feat_4_title: 'Skip Intro & Sprite Previews',
    feat_4_desc:
      'Instant Skip Intro button during opening credits, sprite-sheet frame thumbnails while scrubbing the seek bar, and automatic 10-second Up Next episode countdown.',
    feat_5_title: 'True Bilingual RTL & LTR',
    feat_5_desc:
      'Script-aware typography pairing Big Shoulders Display & IBM Plex Sans with Reem Kufi & IBM Plex Sans Arabic, with bidirectional isolation for mixed metadata.',
    feat_6_title: 'Marquee & Bordeaux Palettes',
    feat_6_desc:
      'Switch live between the warm cocoa & bulb-gold Marquee theme and the deep obsidian & ruby Bordeaux Curtain theme—engineered for OLED screens with zero eye strain.',
    inst_eyebrow: 'INSTALLATION & VERIFICATION',
    inst_title: 'QUICK SETUP GUIDE',
    btn_copy: 'Copy',
    btn_copied: 'Copied ✓',
    inst_android_desc:
      'Open the downloaded APK on your phone, or sideload to your Android TV / Google TV over network ADB:',
    inst_macos_desc:
      'Open the .dmg and drag Cinemakom to Applications. Since builds are unsigned, clear macOS Gatekeeper quarantine once:',
    inst_linux_desc:
      'Ensure mpv / libmpv is installed (sudo pacman -S mpv or sudo apt install libmpv2), extract the bundle, and launch:',
    inst_source_desc:
      'In the cinemakom repository, run the unified release script to build split-ABI Android APKs and Linux tarballs into dist/:',
    footer_note: 'App ID: io.github.sharon_xa.cinemakom · Marquee Design System · Flutter 3.47.9',
    cta_for_os: {
      macos: 'Download for macOS (.dmg)',
      windows: 'Download for Windows (.zip)',
      linux: 'Download for Linux (.tar.gz)',
      android: 'Download for Android (ARM64 APK)',
      'android-tv': 'Download for Android TV (APK)',
      ios: 'Download for iOS (Unsigned .ipa)',
    },
  },
  ar: {
    nav_downloads: 'التحميلات',
    nav_screens: 'الواجهة',
    nav_features: 'المميزات',
    nav_install: 'دليل التثبيت',
    theme_marquee: 'ماركي (Marquee)',
    theme_bordeaux: 'بوردو (Bordeaux)',
    hero_eyebrow: 'يُعرض الآن على جميع الشاشات',
    hero_title: 'تذكرتك. سينماك.',
    hero_subtitle:
      'واجهة بث أصلية متعددة المنصات لمكتبة سينمانا بدون أي حجب أو إعلانات. مصممة بنظام "ماركي" المستوحى من قاعات السينما الكلاسيكية للهواتف والحواسيب وشاشات التلفاز بدقة تصل إلى 4K وبمعدل 120Hz.',
    hero_meta_platforms: 'أندرويد · iOS · ماك · ويندوز · لينكس · التلفاز',
    cta_download_default: 'تحميل سينماكم',
    cta_all_platforms: 'جميع المنصات والمعماريات',
    detected_prefix: 'النظام المكتشف:',
    choose_another_os: 'اختر نسخة أخرى',
    mock_tab_home: 'الرئيسية',
    mock_tab_search: 'البحث',
    mock_tab_library: 'المكتبة',
    mock_tab_downloads: 'التنزيلات',
    mock_tab_settings: 'الإعدادات',
    mock_now_showing: 'يُعرض الآن',
    mock_featured_title: 'شارع الرشيد بعد الظلام',
    mock_featured_meta: '2026 · دراما · 2 س 34 د',
    mock_play: 'تشغيل',
    mock_continue_watching: 'متابعة المشاهدة',
    mock_see_all: 'عرض الكل',
    mock_continue_title: 'Dune: Part Two',
    mock_continue_ep: '1080p · ترجمة عربية منسقة (ASS)',
    mock_continue_left: 'متبقي 42 د',
    dl_eyebrow: 'حزم الإصدار المباشرة',
    dl_title: 'تحميل تطبيق سينماكم',
    dl_subtitle: 'اختر جهازك أدناه. بدون تتبع، بدون إعلانات، وبدون الحاجة لحساب.',
    filter_all: 'الكل (7)',
    filter_mobile: 'الهواتف',
    filter_desktop: 'الحاسوب',
    filter_tv: 'التلفاز',
    release_latest_ready: 'أحدث إصدار متاح:',
    view_checksums: 'بصمات التحقق SHA256',
    github_releases: 'إصدارات GitHub',
    tag_detected: 'موصى به لجهازك',
    plat_android_title: 'أندرويد (Android)',
    plat_android_meta: 'Android 8.0+ · مشغل ExoPlayer 4K · دعم 120Hz',
    plat_android_desc:
      'حزم APK مقسمة حسب المعالج مع تسريع عتادي لدقة 4K، تنزيل بالخلفية مع الإيقاف والاستئناف، وإيماءات السطوع والصوت.',
    arch_modern: 'موصى به',
    arch_older: 'هواتف 32-بت',
    arch_emulator: 'كروم بوك / محاكي',
    btn_dl_android_arm64: 'تحميل APK (arm64-v8a)',
    btn_dl_android_arm32: 'تحميل APK (armeabi-v7a)',
    btn_dl_android_x64: 'تحميل APK (x86_64)',
    plat_atv_title: 'أندرويد تي في (Android TV)',
    plat_atv_meta: 'واجهة تلفاز مخصصة · تحكم كامل بالريموت · ملصقات 4K',
    plat_atv_desc:
      'واجهة تلفاز مستقلة (lib/tv) مصممة للتحكم عن بُعد بدون أي عوائق تركيز، مع عرض الحلقات بعمودين وتخطي المقدمة بزر OK.',
    arch_tv_64: 'أجهزة Google TV 4K / Shield',
    arch_tv_32: 'شاشات TCL / Mi Box / 32-bit',
    btn_dl_atv_arm64: 'تحميل APK للتلفاز (arm64-v8a)',
    btn_dl_atv_arm32: 'تحميل APK للتلفاز (armeabi-v7a)',
    plat_macos_title: 'ماك (macOS)',
    plat_macos_meta: 'Apple Silicon & Intel · محرك mpv · ترجمة ASS',
    plat_macos_desc:
      'نسخة ماك أصلية بصيغة DMG مع اختصارات لوحة المفاتيح، شريط تنقل موسع، وتخصيص مجلد التنزيلات وترجمات الأنمي المنسقة.',
    arch_macos_universal: 'macOS 12.0+ (مثبت DMG)',
    btn_dl_macos: 'تحميل لنظام ماك (.dmg)',
    plat_windows_title: 'ويندوز (Windows)',
    plat_windows_meta: 'Windows 10 & 11 (64-bit) · مدمج مع libmpv',
    plat_windows_desc:
      'نسخة محمولة متكاملة لنظام ويندوز 64-بت تتضمن محرك الفيديو mpv وقاعدة بيانات SQLite للمشاهدة دون اتصال.',
    arch_win_x64: 'أرشيف محمول x86_64',
    btn_dl_windows: 'تحميل لنظام ويندوز (.zip)',
    plat_linux_title: 'لينكس (Linux)',
    plat_linux_meta: 'Linux x86_64 · GTK3 + libmpv · أيقونات سطح المكتب',
    plat_linux_desc:
      'حزمة لينكس أصلية مع ملف سطح المكتب والأيقونات، وتدعم كذلك تشغيل واجهة التلفاز عبر الخيار CINEMAKOM_TV=true.',
    arch_linux_x64: 'حزمة x86_64 Tarball',
    btn_dl_linux: 'تحميل لنظام لينكس (.tar.gz)',
    plat_ios_title: 'آيفون وآيباد (iOS)',
    plat_ios_meta: 'iOS 14.0+ · ملف IPA غير موقع · محرك media_kit',
    plat_ios_desc:
      'ملف IPA جاهز للتثبيت الجانبي عبر AltStore أو SideStore أو Sideloadly أو TrollStore مع دعم التنزيل دون اتصال.',
    arch_ios_arm64: 'ملف IPA لمعمارية ARM64',
    btn_dl_ios: 'تحميل ملف IPA لنظام iOS',
    plat_tvos_title: 'آبل تي في (Apple TV)',
    plat_tvos_meta: 'Apple TV 4K & HD · ريموت Siri · محرك flutter-tvos',
    plat_tvos_desc:
      'مبني عبر lib/main_tvos.dart مع إضافات tvOS المخصصة (video_player_tvos و sqflite_tvos) وواجهة التلفاز الكاملة.',
    arch_tvos_arm64: 'tvOS ARM64 (عبر flutter-tvos / Xcode)',
    btn_dl_tvos: 'تحميل / بناء لنظام Apple TV',
    prev_eyebrow: 'كود موحد · واجهات مصممة لكل شاشة',
    prev_title: 'مصمم لكل مسافة مشاهدة',
    prev_tab_desktop: 'الحاسوب (1200dp+)',
    prev_tab_mobile: 'الهاتف (<600dp)',
    prev_tab_tv: 'واجهة التلفاز (960×540)',
    prev_mode_desktop_title: 'شريط تنقل جانبي موسع (232dp) + تفاصيل بعمودين',
    prev_mode_desktop_spec: 'اختصارات الكيبورد · تمرير الماوس · مجلد تنزيل مخصص',
    prev_mode_mobile_title: 'شريط تنقل سفلي (72dp) + تصفح عمودي ومشغل أفقي',
    prev_mode_mobile_spec: 'معدل تحديث 120Hz · سحب للسطوع والصوت · نقر مزدوج للتقديم',
    prev_mode_tv_title: 'تبويبات علوية + نظام تركيز صريح للريموت (lib/tv)',
    prev_mode_tv_spec: 'إطار تركيز 1.08× · حلقات بعمودين · زر OK يتخطى المقدمة فوراً',
    mock_series_eyebrow: 'مسلسل · 1,179 حلقة',
    mock_details_title: 'ONE PIECE',
    mock_details_meta: '1999 · أنميشن · ياباني · ترجمة عربية منسقة (ASS)',
    mock_details_desc:
      'المواسم الطويلة (أكثر من 50 حلقة) تقسم تلقائياً إلى شرائح من 50 حلقة ليبقى طاقم العمل والأعمال المشابهة في متناول اليد.',
    mock_resume_btn: '▶ استئناف · م1 ح1089 · متبقي 14 د',
    mock_fav_btn: 'في المفضلة',
    mock_dl_season_btn: 'تنزيل الموسم',
    mock_ep_1088: 'الحلقة 1088',
    mock_ep_1089: 'الحلقة 1089',
    feat_eyebrow: 'بُني بلا تنازلات',
    feat_title: 'ما الذي يميز سينماكم؟',
    feat_1_title: 'دقة 4K 2160p ومحركان للتشغيل',
    feat_1_desc:
      'محرك ExoPlayer على أندرويد لتشغيل 4K بسلاسة تامة وبمعدل 120Hz؛ ومحرك media_kit (libmpv) على الحاسوب وiOS لدعم ترجمات الأنمي المنسقة ASS.',
    feat_2_title: 'تنزيلات موثوقة للمشاهدة دون اتصال',
    feat_2_desc:
      'نزّل الأفلام أو الحلقات أو المواسم الكاملة مع اختيار الجودة والحجم. يجدد روابط التحميل المنتهية (403) تلقائياً ويستأنف من حيث توقف.',
    feat_3_title: 'بدون حجب · بدون تقييمات',
    feat_3_desc:
      'يعرض المحتوى كاملاً بدون حذف مشاهد أو فلاتر رقابية. بدون تقييمات نجوم أو أرقام مشاهدات، وبدون أي اتصال بخوادم الإعلانات أو التتبع.',
    feat_4_title: 'تخطي المقدمة ومعاينة الشريط',
    feat_4_desc:
      'زر فوري لتخطي شارة البداية، صور مصغرة للمشاهد أثناء تحريك شريط التقدم، وعد تنازلي (10 ثوانٍ) لتشغيل الحلقة التالية تلقائياً.',
    feat_5_title: 'ثنائي اللغة بالكامل (RTL و LTR)',
    feat_5_desc:
      'خطوط مخصصة تجمع بين Big Shoulders Display و IBM Plex Sans للإنجليزية و Reem Kufi و IBM Plex Sans Arabic للعربية.',
    feat_6_title: 'ثيم ماركي وثيم بوردو',
    feat_6_desc:
      'بدّل فورياً بين ثيم "ماركي" الدافئ بلون الكاكاو والذهب، وثيم "بوردو" الأسود والياقوتي المصمم لشاشات OLED.',
    inst_eyebrow: 'التثبيت والتحقق',
    inst_title: 'دليل الإعداد السريع',
    btn_copy: 'نسخ',
    btn_copied: 'تم النسخ ✓',
    inst_android_desc:
      'افتح ملف APK مباشرة على هاتفك، أو ثبّته على تلفاز Android TV / Google TV عبر أوامر ADB:',
    inst_macos_desc:
      'افتح ملف .dmg واسحب Cinemakom إلى مجلد Applications، ثم نفّذ الأمر التالي مرة واحدة لتجاوز فحص Gatekeeper:',
    inst_linux_desc:
      'تأكد من تثبيت حزمة mpv / libmpv على توزيعتك، ثم فك الضغط وشغّل التطبيق:',
    inst_source_desc:
      'من داخل مستودع cinemakom، شغّل سكربت البناء الموحد لإنتاج حزم أندرويد ولينكس في مجلد dist/:',
    footer_note: 'معرف التطبيق: io.github.sharon_xa.cinemakom · نظام تصميم Marquee · Flutter 3.47.9',
    cta_for_os: {
      macos: 'تحميل لنظام ماك (.dmg)',
      windows: 'تحميل لنظام ويندوز (.zip)',
      linux: 'تحميل لنظام لينكس (.tar.gz)',
      android: 'تحميل لأندرويد (ARM64 APK)',
      'android-tv': 'تحميل لتلفاز أندرويد (APK)',
      ios: 'تحميل لنظام iOS (.ipa)',
    },
  },
};

const state = {
  lang: localStorage.getItem('cinemakom_lang') || 'en',
  theme: localStorage.getItem('cinemakom_theme') || 'marquee',
  version: CINEMAKOM_CONFIG.fallbackVersion,
  detectedOs: 'macos',
  selectedArch: {
    android: 'arm64-v8a',
    'android-tv': 'arm64-v8a',
  },
  activePreview: 'desktop',
};

/**
 * Detects the visitor's OS from User-Agent / Platform
 */
function detectVisitorOs() {
  const ua = navigator.userAgent || '';
  const platform = navigator.platform || '';

  if (/AFT|Android TV|GoogleTV|BRAVIA|MIBOX|SHIELD|SmartTV|TV/i.test(ua) && /Android/i.test(ua)) {
    return 'android-tv';
  }
  if (/Android/i.test(ua)) {
    return 'android';
  }
  if (/iPhone|iPad|iPod/i.test(ua) || (platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
    return 'ios';
  }
  if (/Mac/i.test(platform) || /Macintosh/i.test(ua)) {
    return 'macos';
  }
  if (/Win/i.test(platform) || /Windows/i.test(ua)) {
    return 'windows';
  }
  if (/Linux/i.test(platform) || /X11/i.test(ua)) {
    return 'linux';
  }
  return 'macos';
}

/**
 * Updates all download card URLs & filenames for the active release version
 */
function refreshDownloadLinks() {
  const v = state.version;
  const t = I18N[state.lang];

  // Version badges
  const verBadge = document.getElementById('releaseVersionBadge');
  if (verBadge) verBadge.textContent = v;

  const releaseStatus = document.getElementById('releaseStatusText');
  if (releaseStatus) {
    releaseStatus.textContent = `${t.release_latest_ready} ${v}`;
  }

  // 1. Android
  const androidArch = state.selectedArch.android;
  const androidInfo = buildArtifactUrl(v, `android-${androidArch}.apk`);
  const androidBtn = document.getElementById('dl-btn-android');
  const androidCaption = document.getElementById('file-caption-android');
  if (androidBtn && androidCaption) {
    androidBtn.href = androidInfo.url;
    androidBtn.dataset.filename = androidInfo.filename;
    androidCaption.textContent = androidInfo.filename;
    const labelSpan = androidBtn.querySelector('.dl-btn-label');
    if (labelSpan) {
      labelSpan.textContent =
        androidArch === 'arm64-v8a'
          ? t.btn_dl_android_arm64
          : androidArch === 'armeabi-v7a'
          ? t.btn_dl_android_arm32
          : t.btn_dl_android_x64;
    }
  }

  // 2. Android TV
  const tvArch = state.selectedArch['android-tv'];
  const tvInfo = buildArtifactUrl(v, `android-${tvArch}.apk`);
  const tvBtn = document.getElementById('dl-btn-android-tv');
  const tvCaption = document.getElementById('file-caption-android-tv');
  if (tvBtn && tvCaption) {
    tvBtn.href = tvInfo.url;
    tvBtn.dataset.filename = tvInfo.filename;
    tvCaption.textContent = tvInfo.filename;
    const labelSpan = tvBtn.querySelector('.dl-btn-label');
    if (labelSpan) {
      labelSpan.textContent = tvArch === 'arm64-v8a' ? t.btn_dl_atv_arm64 : t.btn_dl_atv_arm32;
    }
  }

  // 3. macOS
  const macInfo = buildArtifactUrl(v, 'macos.dmg');
  const macBtn = document.getElementById('dl-btn-macos');
  const macCaption = document.getElementById('file-caption-macos');
  if (macBtn && macCaption) {
    macBtn.href = macInfo.url;
    macBtn.dataset.filename = macInfo.filename;
    macCaption.textContent = macInfo.filename;
  }

  // 4. Windows
  const winInfo = buildArtifactUrl(v, 'windows-x64.zip');
  const winBtn = document.getElementById('dl-btn-windows');
  const winCaption = document.getElementById('file-caption-windows');
  if (winBtn && winCaption) {
    winBtn.href = winInfo.url;
    winBtn.dataset.filename = winInfo.filename;
    winCaption.textContent = winInfo.filename;
  }

  // 5. Linux
  const linuxInfo = buildArtifactUrl(v, 'linux-x64.tar.gz');
  const linuxBtn = document.getElementById('dl-btn-linux');
  const linuxCaption = document.getElementById('file-caption-linux');
  if (linuxBtn && linuxCaption) {
    linuxBtn.href = linuxInfo.url;
    linuxBtn.dataset.filename = linuxInfo.filename;
    linuxCaption.textContent = linuxInfo.filename;
  }

  // 6. iOS
  const iosInfo = buildArtifactUrl(v, 'ios-unsigned.ipa');
  const iosBtn = document.getElementById('dl-btn-ios');
  const iosCaption = document.getElementById('file-caption-ios');
  if (iosBtn && iosCaption) {
    iosBtn.href = iosInfo.url;
    iosBtn.dataset.filename = iosInfo.filename;
    iosCaption.textContent = iosInfo.filename;
  }

  // Primary Hero CTA button matching detected OS
  const primaryBtn = document.getElementById('primaryDownloadBtn');
  const primaryText = document.getElementById('primaryDownloadText');
  const detectedName = document.getElementById('detectedOsName');
  const osNames = {
    macos: 'macOS',
    windows: 'Windows (64-bit)',
    linux: 'Linux (x86_64)',
    android: 'Android (ARM64)',
    'android-tv': 'Android TV / Google TV',
    ios: 'iOS (iPhone / iPad)',
  };

  if (detectedName) {
    detectedName.textContent = osNames[state.detectedOs] || 'macOS';
  }

  const osUrlMap = {
    macos: macInfo,
    windows: winInfo,
    linux: linuxInfo,
    android: buildArtifactUrl(v, 'android-arm64-v8a.apk'),
    'android-tv': buildArtifactUrl(v, 'android-arm64-v8a.apk'),
    ios: iosInfo,
  };

  const targetArtifact = osUrlMap[state.detectedOs] || macInfo;
  if (primaryBtn && primaryText) {
    primaryBtn.href = targetArtifact.url;
    primaryBtn.dataset.filename = targetArtifact.filename;
    primaryBtn.dataset.build = state.detectedOs;
    primaryText.textContent = t.cta_for_os[state.detectedOs] || t.cta_download_default;
  }
}

/**
 * Highlights the card corresponding to the visitor's detected OS
 */
function highlightDetectedPlatformCard() {
  document.querySelectorAll('.platform-card').forEach((card) => {
    const isMatch = card.dataset.os === state.detectedOs;
    card.classList.toggle('detected-card', isMatch);
    const badge = card.querySelector('.recommended-tag');
    if (badge) {
      badge.hidden = !isMatch;
    }
  });
}

/**
 * Applies the active language (EN LTR or AR RTL)
 */
function applyLanguage(lang) {
  state.lang = lang;
  localStorage.setItem('cinemakom_lang', lang);

  const html = document.documentElement;
  html.lang = lang;
  html.dir = lang === 'ar' ? 'rtl' : 'ltr';

  const langLabel = document.getElementById('langLabel');
  if (langLabel) {
    langLabel.textContent = lang === 'ar' ? 'English' : 'العربية';
  }

  const dict = I18N[lang];
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Update theme button label for current language
  const themeLabel = document.getElementById('themeLabel');
  if (themeLabel) {
    themeLabel.textContent = state.theme === 'bordeaux' ? dict.theme_bordeaux : dict.theme_marquee;
  }

  updatePreviewDescription(state.activePreview);
  refreshDownloadLinks();
}

/**
 * Applies the active theme ('marquee' or 'bordeaux')
 */
function applyTheme(theme) {
  state.theme = theme;
  localStorage.setItem('cinemakom_theme', theme);
  document.documentElement.setAttribute('data-theme', theme);

  const dict = I18N[state.lang];
  const themeLabel = document.getElementById('themeLabel');
  if (themeLabel) {
    themeLabel.textContent = theme === 'bordeaux' ? dict.theme_bordeaux : dict.theme_marquee;
  }
}

/**
 * Updates the form-factor preview caption bar
 */
function updatePreviewDescription(mode) {
  state.activePreview = mode;
  const dict = I18N[state.lang];
  const titleEl = document.getElementById('previewModeTitle');
  const specEl = document.getElementById('previewModeSpec');
  if (!titleEl || !specEl) return;

  if (mode === 'mobile') {
    titleEl.textContent = dict.prev_mode_mobile_title;
    specEl.textContent = dict.prev_mode_mobile_spec;
  } else if (mode === 'tv') {
    titleEl.textContent = dict.prev_mode_tv_title;
    specEl.textContent = dict.prev_mode_tv_spec;
  } else {
    titleEl.textContent = dict.prev_mode_desktop_title;
    specEl.textContent = dict.prev_mode_desktop_spec;
  }
}

/**
 * Shows the post-download helper or SHA256 checksum modal
 */
function showModal(title, htmlContent) {
  const modal = document.getElementById('infoModal');
  const titleEl = document.getElementById('modalTitle');
  const bodyEl = document.getElementById('modalBody');
  if (!modal || !titleEl || !bodyEl) return;

  titleEl.textContent = title;
  bodyEl.innerHTML = htmlContent;
  modal.hidden = false;
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  const modal = document.getElementById('infoModal');
  if (!modal) return;
  modal.hidden = true;
  modal.setAttribute('aria-hidden', 'true');
}

/**
 * Queries GitHub API for latest release tag (if available)
 */
async function syncLatestGitHubRelease() {
  const apiUrl = `https://api.github.com/repos/${CINEMAKOM_CONFIG.repoOwner}/${CINEMAKOM_CONFIG.repoName}/releases/latest`;
  try {
    const res = await fetch(apiUrl, { headers: { Accept: 'application/vnd.github+json' } });
    if (!res.ok) return;
    const data = await res.json();
    if (data && data.tag_name) {
      state.version = data.tag_name;
      refreshDownloadLinks();
    }
  } catch (_) {
    // Offline or no published GitHub release yet; fallback version stays active.
  }
}

/**
 * Animates the Marquee bulbs in sequence (DESIGN.md §4)
 */
function startMarqueeBulbAnimation() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const bulbs = document.querySelectorAll('.bulb-row .bulb-dot');
  if (!bulbs.length) return;
  let idx = 0;
  setInterval(() => {
    bulbs.forEach((b, i) => b.classList.toggle('lit', i === idx));
    idx = (idx + 1) % bulbs.length;
  }, 1400);
}

/**
 * Keeps `--header-offset` in sync with the actual sticky `.site-header` height
 * across all screen ratios so clicking Downloads / Interface / Features / Install Guide
 * never hides the section eyebrow or headline behind the header.
 */
function syncHeaderScrollOffset() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const pos = window.getComputedStyle(header).position;
  const offset = pos === 'sticky' || pos === 'fixed' ? header.offsetHeight + 8 : 16;
  document.documentElement.style.setProperty('--header-offset', `${offset}px`);
}

/**
 * Wire up all event listeners
 */
document.addEventListener('DOMContentLoaded', () => {
  state.detectedOs = detectVisitorOs();
  applyTheme(state.theme);
  applyLanguage(state.lang);
  highlightDetectedPlatformCard();
  startMarqueeBulbAnimation();
  syncHeaderScrollOffset();
  window.addEventListener('resize', syncHeaderScrollOffset);
  if ('ResizeObserver' in window) {
    const header = document.querySelector('.site-header');
    if (header) new ResizeObserver(syncHeaderScrollOffset).observe(header);
  }
  syncLatestGitHubRelease();

  // Theme Toggle
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      applyTheme(state.theme === 'marquee' ? 'bordeaux' : 'marquee');
    });
  }

  // Language Toggle
  const langBtn = document.getElementById('langToggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      applyLanguage(state.lang === 'en' ? 'ar' : 'en');
    });
  }

  // Architecture selector chips (Android & Android TV)
  document.querySelectorAll('.filter-chip[data-arch]').forEach((chip) => {
    chip.addEventListener('click', () => {
      const target = chip.dataset.target;
      const arch = chip.dataset.arch;
      if (!target || !arch) return;

      state.selectedArch[target] = arch;
      document
        .querySelectorAll(`.filter-chip[data-target="${target}"]`)
        .forEach((c) => c.classList.toggle('active', c === chip));
      refreshDownloadLinks();
    });
  });

  // Platform category filter tabs (All / Mobile / Desktop / TV)
  document.querySelectorAll('.segment-btn[data-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      document.querySelectorAll('.segment-btn[data-filter]').forEach((b) => {
        const active = b === btn;
        b.classList.toggle('active', active);
        b.setAttribute('aria-selected', String(active));
      });

      document.querySelectorAll('.platform-card').forEach((card) => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.hidden = !match;
      });
    });
  });

  // Form-factor preview switcher (Desktop / Mobile / TV)
  document.querySelectorAll('.segment-btn[data-preview]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.preview;
      document.querySelectorAll('.segment-btn[data-preview]').forEach((b) => {
        const active = b === btn;
        b.classList.toggle('active', active);
        b.setAttribute('aria-selected', String(active));
      });

      const viewport = document.getElementById('previewViewport');
      if (viewport && mode) {
        viewport.setAttribute('data-mode', mode);
        updatePreviewDescription(mode);
      }
    });
  });

  // Copy command buttons
  document.querySelectorAll('.copy-cmd-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copy;
      if (!text) return;
      try {
        await navigator.clipboard.writeText(text);
        const dict = I18N[state.lang];
        btn.textContent = dict.btn_copied;
        setTimeout(() => {
          btn.textContent = I18N[state.lang].btn_copy;
        }, 1800);
      } catch (_) {
        // Fallback if clipboard permission denied
      }
    });
  });

  // SHA256 Checksums Modal
  const checksumBtn = document.getElementById('checksumBtn');
  if (checksumBtn) {
    checksumBtn.addEventListener('click', () => {
      const v = state.version;
      const isAr = state.lang === 'ar';
      const sumsUrl = `https://github.com/${CINEMAKOM_CONFIG.repoOwner}/${CINEMAKOM_CONFIG.repoName}/releases/latest/download/SHA256SUMS.txt`;
      showModal(
        isAr ? 'بصمات التحقق SHA256' : 'Release Artifacts & SHA256SUMS',
        `
        <p>${
          isAr
            ? 'ينشئ سير عمل الإطلاق على GitHub ملف SHA256SUMS.txt تلقائياً لكل إصدار للتحقق من سلامة الحزم:'
            : 'Every GitHub Release automatically generates a SHA256SUMS.txt file covering all multi-platform artifacts:'
        }</p>
        <table class="checksum-table" dir="ltr">
          <thead>
            <tr>
              <th>Artifact</th>
              <th>Target</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><code>cinemakom-${v}-android-arm64-v8a.apk</code></td><td>Android &amp; Google TV (64-bit ARM)</td></tr>
            <tr><td><code>cinemakom-${v}-android-armeabi-v7a.apk</code></td><td>Android &amp; Android TV (32-bit ARM)</td></tr>
            <tr><td><code>cinemakom-${v}-android-x86_64.apk</code></td><td>Chromebooks &amp; Emulators</td></tr>
            <tr><td><code>cinemakom-${v}-macos.dmg</code></td><td>macOS Disk Image</td></tr>
            <tr><td><code>cinemakom-${v}-windows-x64.zip</code></td><td>Windows 10/11 (64-bit)</td></tr>
            <tr><td><code>cinemakom-${v}-linux-x64.tar.gz</code></td><td>Linux x86_64 Bundle</td></tr>
            <tr><td><code>cinemakom-${v}-ios-unsigned.ipa</code></td><td>iOS Unsigned IPA</td></tr>
          </tbody>
        </table>
        <pre class="code-block" dir="ltr"><code>shasum -a 256 -c SHA256SUMS.txt</code></pre>
        <div>
          <a href="${sumsUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="width:100%">
            ${isAr ? 'تنزيل SHA256SUMS.txt' : 'Download SHA256SUMS.txt'}
          </a>
        </div>
      `
      );
    });
  }

  // Close modal handlers
  const closeBtn = document.getElementById('closeModalBtn');
  const modal = document.getElementById('infoModal');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
});
