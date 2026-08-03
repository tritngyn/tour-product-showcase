# Giao diện Wandor - UI Style Guide

Tài liệu này ghi lại các pattern giao diện "chuẩn" được sử dụng trong Landing Page (Hero section) để bạn có thể tái sử dụng (reusable) ở bất kỳ đâu trong project.

## 1. Typography (Phông chữ)
- **Wordmark / Logo:** Sử dụng font `Special Elite` (chữ máy đánh chữ). Tailwind config: `font-display`.
- **UI & Content:** Sử dụng font `Geist` (sans-serif) gọn gàng, hiện đại. Trọng lượng (weight): `400` (Normal), `500` (Medium), `600` (Semibold), `700` (Bold). Tailwind config: `font-sans`.

## 2. Hệ màu sắc (Color Palette)
Được cấu hình trong Tailwind `@theme` (ở file `index.css`) qua hệ biến `--color-wandor-*`:
- `text-wandor-dark` (`#0f766e` - Teal 700): Dùng cho màu nền nút chính (CTA), hoặc màu text nhấn mạnh.
- `text-wandor-text` (`#0f766e` - Teal 700): Màu chữ tiêu đề (Headline) để đồng bộ với theme biển/rừng của Wanderlust.
- `text-wandor-muted` (`#115e59` - Teal 800): Dùng cho text phụ (Subtitle) hoặc các đoạn văn bản dài cần giảm sự tương phản.
- `text-wandor-prompt` (`#0d9488` - Teal 600): Dùng cho text bên trong khối Liquid Glass (kính mờ).

## 3. Các Hiệu ứng Nổi bật (Core Effects)

### A. Hiệu ứng Liquid Glass (Kính mờ Frosted-glass)
Hiệu ứng cực kì bắt mắt dùng cho các Card nổi trên nền Video hoặc ảnh nền sinh động.
**Tailwind Classes:**
```html
<div className="bg-white/[0.15] border-[3px] border-white/80 rounded-[44px] shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] overflow-hidden backdrop-blur-[24px]">
  <!-- Nội dung -->
</div>
```
- `bg-white/[0.15]`: Nền trắng với độ trong suốt 15%.
- `border-white/80`: Viền trắng sắc nét để tạo khối 3D cho mép kính.
- `backdrop-blur-[24px]`: Blur nền đằng sau một cách mạnh mẽ (Frosted Glass).

### B. Nút Bấm (Button Micro-interactions)
Tất cả các nút đều phải có hiệu ứng `hover` (di chuột) và `active` (khi bấm vào) để tạo cảm giác "chạm" vật lý.
**Ví dụ Nút Chính (Solid Button):**
```html
<button className="bg-wandor-dark text-[#fafafa] rounded-full px-5 py-3.5 transition-all hover:bg-teal-900 hover:shadow-xl hover:-translate-y-1 active:scale-95">
  Bắt đầu
</button>
```
**Ví dụ Nút Phụ (Transparent Button / Nav Link):**
```html
<button className="bg-transparent uppercase font-semibold transition-opacity hover:opacity-55">
  Khám phá
</button>
```

### C. Gradient "Xóa mờ" cho Video (Fading Top Gradient)
Nếu bạn đặt Video chạy ngầm, text thường khó đọc ở phía trên (Navigation). Ta dùng một lớp Gradient mờ dần từ Trắng (trên đỉnh) xuống Trong suốt.
**Cách làm:**
```html
<div 
  className="absolute inset-x-0 top-0 h-[687px] pointer-events-none z-[1]"
  style={{ background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)' }}
/>
```
- `pointer-events-none`: Đảm bảo layer này không chặn các cú click chuột vào video hay nút bấm bên dưới.
