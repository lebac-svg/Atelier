import { defineConfig } from "vitest/config";

// TZ ghim Asia/Ho_Chi_Minh: i18n tự nhận ngôn ngữ theo múi giờ (detectLang),
// và test unit khẳng định chuỗi TIẾNG VIỆT ("4.200", "khe"…) — không ghim thì
// máy ngoài VN/CI (UTC) ra tiếng Anh và fail. Node đọc TZ khi tạo Intl mới nên
// set ở config (chạy trước mọi test file) là đủ. E2E tự pin riêng qua
// Playwright timezoneId (kể cả ca "máy ngoài VN" dùng Europe/Paris).
process.env.TZ = "Asia/Ho_Chi_Minh";

export default defineConfig({
  test: {
    include: [
      "packages/**/src/**/*.test.ts",
      "packages/**/rules/__tests__/**/*.test.ts",
    ],
  },
});
