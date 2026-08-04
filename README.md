# vivu. - Product Showcase

Dự án giới thiệu sản phẩm (Showcase Application) dành cho ứng viên ứng tuyển vào GEEK UP. Trang web là một nền tảng khám phá các tour du lịch đa dạng, trải nghiệm mượt mà với UI/UX hiện đại (giao diện Liquid Glass).

## Tech Stack
- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS (v4), Vanilla CSS (tasteskill UI)
- **State Management:** Zustand
- **Routing:** React Router DOM (v7)
- **Icons:** Lucide React
- **Mock API:** Mockoon
- **Deployment:** Docker & Nginx

---

## Cài đặt và Chạy cục bộ (Local)

### 1. Khởi động Mock API
1. Tải và cài đặt ứng dụng [Mockoon Desktop](https://mockoon.com/).
2. Mở Mockoon, chọn `File` -> `Open environment` và chọn file `mockoon-data.json` ở thư mục gốc của dự án.
3. Bấm nút **Play** màu xanh lá để khởi động server mô phỏng ở cổng `3000`.

### 2. Khởi động Frontend
Mở terminal tại thư mục gốc của dự án, cài đặt thư viện và khởi động máy chủ ảo:
```bash
npm install
npm run dev
```
Trình duyệt sẽ tự động mở trang web (thường ở địa chỉ `http://localhost:5173`).

---

## Triển khai với Docker Compose (Production Ready)

Chỉ cần một lệnh duy nhất để tự động đóng gói và chạy cả Frontend và Mock API trong các Container độc lập:

```bash
docker-compose up --build -d
```

- **Giao diện Web (Frontend):** Truy cập 👉 `http://localhost:8080`
- **Dữ liệu Mock (Backend API):** Kiểm tra tại 👉 `http://localhost:3000/api/tours`

*(Đảm bảo bạn đã tắt các ứng dụng chiếm cổng 3000 hoặc 8080 trên máy tính trước khi chạy lệnh Docker này).*
