# Cinemakom Download Website (`cinemakom-website`)

Official download portal and landing page for **Cinemakom (سينماكم)**, built with vanilla **HTML5, CSS3, and JavaScript** following the **Marquee** and **Bordeaux Curtain** design system (`docs/DESIGN.md` and `lib/app/theme/marquee_colors.dart` from the Cinemakom project).

## Features

- **Smart OS & Architecture Detection:** Automatically detects the visitor's device (`macOS`, `Windows`, `Linux`, `Android`, `Android TV`, `iOS`) and configures the hero download button for one-click download.
- **All 7 Cinemakom Platforms:**
  - **Android (Phones & Tablets):** Split-per-ABI selector (`arm64-v8a`, `armeabi-v7a`, `x86_64`) matching `cinemakom-<tag>-android-<abi>.apk`.
  - **Android TV & Google TV:** Remote-driven 10-foot UI (`lib/tv`) with 64-bit (`arm64-v8a`) and 32-bit (`armeabi-v7a`) APK selector.
  - **macOS:** `cinemakom-<tag>-macos.dmg` universal DMG installer + Gatekeeper quick command.
  - **Windows:** `cinemakom-<tag>-windows-x64.zip` portable 64-bit bundle.
  - **Linux:** `cinemakom-<tag>-linux-x64.tar.gz` bundle + desktop packaging.
  - **iOS (iPhone & iPad):** `cinemakom-<tag>-ios-unsigned.ipa` for AltStore / SideStore / TrollStore.
  - **Apple TV (tvOS):** `lib/main_tvos.dart` (`flutter-tvos`) build & deployment guide.
- **Marquee & Bordeaux Curtain Themes:** Live toggle between the original warm cocoa & bulb-gold **Marquee** palette and the obsidian & ruby **Bordeaux Curtain** palette.
- **Bilingual English (LTR) & Arabic (RTL):** Full script-aware typography (`Big Shoulders Display` + `Reem Kufi` and `IBM Plex Sans` + `IBM Plex Sans Arabic`) and directional logo lockup flipping.

## Running Locally

Open `index.html` directly in any browser, or serve the folder locally:

```bash
cd ~/cinemakom-website
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Serving Local Builds from `tool/build_all.sh`

If you want to host the built APK/tarball files directly from this website instead of GitHub Releases:

1. In your `cinemakom` Flutter repository, run:
   ```bash
   tool/build_all.sh -o ~/cinemakom-website/releases
   ```
2. In `js/app.js`, set `useLocalDist: true` in `CINEMAKOM_CONFIG`.
