# Decision Log

## [09:00] - Lựa chọn Build Tool (Vite vs Create React App)
### Tình huống
Khởi tạo một dự án React mới cho ứng dụng Product Showcase. Cần một công cụ giúp build nhanh, dễ cấu hình và đáp ứng các tiêu chuẩn hiện đại của Hệ sinh thái Web.
### Các phương án đã cân nhắc
- Phương án A: Create React App (CRA). Ưu điểm: Phổ biến, có cộng đồng tài liệu siêu lớn nhiều năm nay. Nhược điểm: Đã bị lỗi thời, tốc độ build và Hot Module Replacement (HMR) rất chậm, cấu hình Webpack bị ẩn khó tùy biến linh hoạt.
- Phương án B: Vite. Ưu điểm: HMR siêu tốc, build nhanh bằng công cụ core Rust/Go, tuân thủ chuẩn ES Modules, là lựa chọn được đội ngũ React chính thức khuyên dùng hiện nay.
### Quyết định
Chọn phương án B (Vite) để có trải nghiệm phát triển (Developer Experience) mượt mà nhất, tiết kiệm bộ nhớ máy tính và tối ưu tốc độ build CI/CD sau này.
### Kết quả
Quá trình code rất thoải mái nhờ HMR cập nhật giao diện ngay tức thì khi thay đổi code UI.

## [10:30] - Lựa chọn Thư viện State Management
### Tình huống
Cần quản lý trạng thái xác thực (Authentication - lưu trữ việc Đăng nhập/Đăng xuất) để chia sẻ Data toàn cục giữa các Component (như Header và Login).
### Các phương án đã cân nhắc
- Phương án A: Redux / Redux Toolkit. Ưu điểm: Cấu trúc rõ ràng, chuẩn mực cho dự án khổng lồ. Nhược điểm: Boilerplate (code thừa) rườm rà, quá cồng kềnh cho một ứng dụng showcase đơn giản.
- Phương án B: Zustand. Ưu điểm: Kích thước thư viện siêu nhẹ, API đơn giản (hook-based), không cần dùng `<Provider>` bọc ngoài file App, cực kì phù hợp để lưu trữ Token ngắn gọn.
### Quyết định
Chọn phương án B (Zustand). Tránh việc "over-engineering" (làm phức tạp hoá vấn đề) cho một dự án cần tốc độ triển khai và code base tinh gọn, sắc bén.
### Kết quả
Store Authentication được tạo chỉ trong 20 dòng code, tự động sync Token với `localStorage` qua middleware `persist` một cách trong suốt.

## [14:15] - Lựa chọn tiêu chí Filter cho danh sách Tour
### Tình huống
Cần thiết kế chức năng Filter cho danh sách hơn 100 tour du lịch trên trang Product List.
### Các phương án đã cân nhắc
- Phương án A: Filter theo đánh giá (Rating từ 1 đến 5 sao).
- Phương án B: Filter theo Khoảng giá (Dưới 3tr, 3-5tr, v.v.) và Thời lượng đi (Ngắn ngày, Dài ngày).
### Quyết định
Chọn phương án B. Dựa trên insight thực tế của khách du lịch, ngân sách (budget) và thời gian nghỉ phép (duration) là hai yếu tố mang tính quyết định nhất để thu hẹp phạm vi lựa chọn. Lọc theo giá/thời gian sẽ mang lại UX tốt hơn cho một trang bán tour.
### Kết quả
Giao diện bộ lọc trực quan, logic lọc đa điều kiện chạy mượt mà trên state Frontend. Người dùng dễ dàng tra cứu nhanh chóng hành trình phù hợp với túi tiền.

## [15:00] - Nếu dùng AI: Khởi tạo hàng loạt dữ liệu Mockoon
### Prompt đã dùng
"Viết một đoạn script Node.js đọc cấu trúc JSON của Mockoon gồm 6 tour du lịch mẫu của tôi, tự động nhân bản và xáo trộn các thuộc tính (giá, độ dài) để tạo ra chính xác 100 sản phẩm tour. Giữ nguyên các hình ảnh thật của phong cảnh thay vì dùng avatar giả (ui-avatars) để đảm bảo UI đẹp nhất. Lưu kết quả ra file mockoon-data.json."
### Kết quả AI trả về
AI cung cấp một đoạn script tự động đọc file JSON, dùng vòng lặp để thay đổi linh hoạt ID, mức giá theo biên độ, và phân bổ lặp lại các hình ảnh chất lượng cao để sinh ra một mảng chứa đủ 100 tours. Script sau đó tự động lưu đè cấu trúc chuẩn xác lại vào Mockoon JSON.
### Đánh giá của tôi
Kết quả vô cùng xuất sắc, tôi chỉ cần chạy lệnh `node generate-mockoon.js` một lần là có ngay 100 dữ liệu. Giải quyết triệt để bài toán tốn quá nhiều thời gian ngồi copy/paste nhập liệu tay, đảm bảo đủ khối lượng data để demo mượt mà chức năng Lọc (Filter) và Phân trang (Pagination) mà vẫn giữ được chất lượng thẩm mỹ 100% thay vì xài placeholder xấu xí.
