import slugify from 'slugify';

export function createSlug(name: string): string {
  return slugify(name, {
    lower: true, // chuyển đổi thành chữ thường
    strict: true, // loại bỏ các ký tự đặc biệt không mong muốn
    remove: /[*+~.()'"!:@]/g, // loại bỏ các ký tự cụ thể
    locale: 'vi', // hỗ trợ tiếng Việt (loại bỏ dấu)
    trim: true, // loại bỏ khoảng trắng đầu cuối
  });
}
