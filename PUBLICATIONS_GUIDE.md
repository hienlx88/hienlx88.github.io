# Cách bổ sung công bố

Dr. Lê chỉ cần chỉnh **một tệp**: `publications.js`. Không sửa các trang HTML.

## Thêm một bài mới

Mở `publications.js`, tìm dấu `]` cuối cùng của danh sách, rồi thêm một khối như sau **ngay trước dấu đó**. Nhớ đặt dấu phẩy sau khối phía trên:

```js
  {
    "year": 2026,
    "title": "Exact title of the published paper",
    "authors": "Xuan-Hien Le, Coauthor Name, et al.",
    "journal": "Journal name",
    "doi": "10.xxxx/xxxxx",
    "video": "",
    "editorChoice": false,
    "featured": true
  }
```

- `year`: năm muốn hiển thị trên website.
- `title`, `authors`, `journal`: chép theo bài đã xuất bản.
- `doi`: chỉ cần DOI, không cần gõ `https://doi.org/`. Nếu bài chưa có DOI, để chuỗi rỗng `""`.
- `video`: đường dẫn video abstract nếu có; nếu không thì để `""`.
- `editorChoice`: dùng `true` nếu bài có ghi nhận Editor’s Choice, nếu không dùng `false`.
- `featured`: `true` để bài xuất hiện cả ở trang chủ và trang Publications; `false` để chỉ xuất hiện trong danh sách Publications.

Sau khi lưu, danh sách ở trang chủ và trang con VI/EN được tạo từ cùng tệp này. Trang con có thể tìm theo tiêu đề/tạp chí và lọc theo năm; nếu thêm một năm mới, cần bổ sung nút năm trong các trang `publications.html` và `en/publications.html`. Tôi có thể tự cập nhật bước nhỏ đó khi Dr. Lê gửi thông tin bài mới.

## Xem trước và xuất bản

Có thể xem trước bằng cách mở `index.html` trong gói xem trước. Khi cập nhật repo, kiểm tra cả VI và EN rồi đưa thay đổi lên nhánh đang được GitHub Pages dùng để xuất bản. Không đưa mật khẩu, token, dữ liệu riêng tư hay nội dung chưa công bố vào tệp công khai.
