Để tạo ấn tượng mạnh với nhà tuyển dụng (đặc biệt là GEEK UP, một công ty định vị họ là "Product Partner"), bạn cần cho thấy mình không chỉ là một coder biết gõ code theo yêu cầu, mà là một Product Developer có tư duy sản phẩm, kỹ năng giải quyết vấn đề và sự tỉ mỉ.

Dưới đây là các chiến lược giúp bài test của bạn nổi bật hơn hẳn so với các ứng viên khác:

### 1. Xây dựng Dữ liệu Mockoon mang đậm tính "Travel"

Thay vì các trường dữ liệu chung chung như `name` hay `description`, hãy thiết kế JSON của bạn giống một hệ thống booking thực thụ.

- **Cấu trúc 1 item (Tour):** Gồm `id`, `tourName` (VD: "Khám phá Sapa mùa lúa chín"), `destination` (Điểm đến), `duration` (VD: "3 Ngày 2 Đêm"), `price` (Giá tiền), `departureDate` (Ngày khởi hành), và `itinerary` (Lịch trình tóm tắt).
- **Xử lý hình ảnh (Điểm cộng tư duy):** Đề bài yêu cầu dùng `ui-avatars` hoặc `dicebear`. Các tool này thường sinh ra ảnh avatar người, không hợp với phong cảnh du lịch.
- **Mẹo ăn điểm:** Hãy dùng API của `ui-avatars` để tạo ảnh Placeholder chứa chữ cái đầu của Điểm đến (VD: "DL" cho Đà Lạt) kết hợp với các mã màu xanh dương/xanh lá mang cảm giác thiên nhiên.
- Ghi chú ngay điều này vào `DECISION_LOG.md` để nhà tuyển dụng thấy bạn có tư duy linh hoạt nhưng vẫn tuân thủ tuyệt đối yêu cầu đề bài.

### 2. Tối ưu UX/UI cho Trang Danh Sách Tour (Product List)

Du lịch là ngành bán "cảm xúc", nên giao diện cần phải trực quan và dễ thao tác.

- **Card Design (Thẻ sản phẩm):** Sử dụng Tailwind CSS để làm nổi bật các thông tin quan trọng nhất: Tên tour (chữ to, in đậm), Giá tiền (màu nổi bật như cam hoặc đỏ, format chuẩn VNĐ), và Thời gian (badge nhỏ góc thẻ).
- **Chức năng Filter & Search:**
- **Search:** Cho phép tìm kiếm theo `tourName` hoặc `destination`.
- **Filter:** Thay vì filter chung chung, hãy làm bộ lọc thiết thực cho người đi tour: Lọc theo **Mức giá** (Dưới 3 triệu, 3 - 5 triệu, Trên 5 triệu) và lọc theo **Khu vực** (Trong nước, Quốc tế).

- **Empty State:** Khi khách hàng search "Tour đi sao Hỏa" và không có kết quả, đừng chỉ để một màn hình trắng. Hãy hiển thị một hình minh họa nhỏ kèm dòng chữ: _"Rất tiếc, hiện chưa có chuyến đi nào phù hợp. Bạn thử xóa bộ lọc xem sao nhé!"_ kèm nút "Xóa bộ lọc".

### 3. Tối ưu Trang Chi Tiết Tour (Product Detail)

- Sử dụng Grid/Flexbox của Tailwind để chia layout Desktop (>= 1280px) thành 2 cột: Cột trái hiển thị ảnh lớn và lịch trình chi tiết; Cột phải được ghim (sticky) chứa Giá tiền và nút CTA (Call to Action) lớn: **"Xem chi tiết / Đặt Tour"**.
- Trên Mobile (< 1280px), tự động xếp chồng (stack) các khối lên nhau, giữ nút CTA luôn hiển thị ở mép dưới cùng của màn hình.

### 4. Ghi điểm tuyệt đối với `DECISION_LOG.md`

Hãy dùng file này để kể câu chuyện bạn đã đóng vai một "Product Developer" như thế nào. Dưới đây là ví dụ bạn có thể tham khảo viết vào log:

> **## - Lựa chọn tiêu chí Filter cho danh sách Tour**
> **### Tình huống**
> Cần thiết kế chức năng Filter cho danh sách hơn 100 tour du lịch.
> **### Các phương án đã cân nhắc**
>
> - Phương án A: Filter theo đánh giá (Rating từ 1 đến 5 sao).
> - Phương án B: Filter theo Khoảng giá (Dưới 3tr, 3-5tr, v.v.) và Khu vực.
>   **### Quyết định**
>   Chọn phương án B. Dựa trên insight thực tế của người dùng khi tìm kiếm sản phẩm du lịch, ngân sách (budget) và điểm đến là hai yếu tố quan trọng nhất để thu hẹp phạm vi lựa chọn. Lọc theo giá sẽ mang lại UX tốt hơn cho một trang Showcase.
>   **### Kết quả**
>   Giao diện bộ lọc trực quan, logic lọc chạy mượt mà bằng Zustand để quản lý state của danh sách hiển thị.

### 5. Cấu trúc Code và Containerization (Docker)

- Tạo các Custom Hook riêng biệt như `useTours.ts` để gọi API lấy danh sách, tách biệt hoàn toàn phần xử lý dữ liệu khỏi giao diện hiển thị.
- Kiểm tra kỹ file `docker-compose.yml`. Đảm bảo Frontend container của bạn gọi đúng vào port `3000` của Mockoon container, để người chấm chỉ việc gõ `docker-compose up -d` là cả thế giới du lịch ảo của bạn sẽ hiện ra trơn tru.
