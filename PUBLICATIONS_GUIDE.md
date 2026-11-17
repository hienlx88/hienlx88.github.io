# Cách bổ sung công bố

Dr. Lê chỉ cần chỉnh **một tệp**: `publications.js`. Không sửa các trang HTML.

## Thêm bài mới

1. Mở `publications.js`.
2. Sao chép một mục có sẵn.
3. Điền năm, tiêu đề, tác giả, tên tạp chí, DOI và loại tạp chí.
4. Lưu thay đổi; danh sách VI/EN, bộ lọc năm và bộ lọc loại tạp chí sẽ tự cập nhật.

Ví dụ:

```js
{
  "year": 2026,
  "title": "Tên bài báo",
  "authors": "Tên các tác giả",
  "journal": "Tên tạp chí",
  "category": "international",
  "doi": "10.xxxx/xxxxx",
  "video": "",
  "editorChoice": false,
  "featured": true
}
```

## Chọn loại tạp chí

Trường `category` có ba giá trị:

- `international`: tạp chí quốc tế.
- `vietnam`: tạp chí Việt Nam.
- `korea`: tạp chí Hàn Quốc.

Chọn theo nhóm tạp chí, không theo quốc tịch hoặc nơi công tác của tác giả. Sáu bài hiện có đều được xếp vào nhóm tạp chí quốc tế; hai nhóm Việt Nam và Hàn Quốc đang để trống cho đến khi có bài phù hợp. Nếu không khai báo `category`, hệ thống mặc định xếp bài vào nhóm quốc tế.

## Đưa bài lên trang chủ

- `featured: true`: bài xuất hiện trên trang chủ và trang Publications.
- `featured: false`: bài chỉ xuất hiện trên trang Publications.

Giữ dấu phẩy giữa các mục trong mảng. Có thể xem trước bằng cách mở gói xem thử. Khi cập nhật repo, kiểm tra trang VI và EN trước khi đưa thay đổi lên nhánh GitHub Pages. Không đưa mật khẩu, token, dữ liệu riêng tư hoặc nội dung chưa công bố vào tệp công khai.
