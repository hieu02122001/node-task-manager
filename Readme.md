# NODEJS

## 12.API Authentication and Security

### 14. Authenticating Task Endpoints

Chỉnh lại Task router (thêm middleware auth, sửa hàm tìm kiếm thành tìm theo id của task và id người dùng).

### 15. Cascade Delete Tasks

Xử lý xoá các task mà khi owner của chúng tự xoá bản thân.

Bằng cách thêm middleware vào router delete user:

* Tạo middleware ở user model để tiền xử lý (pre) việc xoá (remove) user.
dùng Task.deleteMany

## 13. Sorting, Pagination, and Filtering

### 2. Working with Timestamps

Thêm thời gian (timestamp) của một sự kiện xảy ra vào model (VD: tạo người dùng mới, ...)

* Thêm timestamps: true vào tham số thứ 2 của Schema