/**
 * Đọc kích thước pixel PNG/JPEG từ header — thuần TS, không cần thư viện ảnh.
 * Nuôi underlay ảnh: cần biết w×h px để đặt đúng mm trên plan.
 */

export type ImageInfo = { width: number; height: number; mime: "image/png" | "image/jpeg" };

export function imageSize(buf: Buffer): ImageInfo {
  // PNG: 8 byte chữ ký, IHDR bắt đầu ở offset 8 (length+type), width/height big-endian ở 16/20
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20), mime: "image/png" };
  }
  // JPEG: quét marker tới SOF0/1/2 (C0/C1/C2) — height/width big-endian sau precision
  if (buf.length > 4 && buf.readUInt16BE(0) === 0xffd8) {
    let off = 2;
    while (off + 9 < buf.length) {
      if (buf[off] !== 0xff) {
        off += 1;
        continue;
      }
      const marker = buf[off + 1]!;
      if (marker === 0xc0 || marker === 0xc1 || marker === 0xc2) {
        return { width: buf.readUInt16BE(off + 7), height: buf.readUInt16BE(off + 5), mime: "image/jpeg" };
      }
      if (marker === 0xd8 || (marker >= 0xd0 && marker <= 0xd9)) {
        off += 2; // marker không payload
        continue;
      }
      off += 2 + buf.readUInt16BE(off + 2);
    }
  }
  throw new Error("Không đọc được kích thước ảnh — chỉ hỗ trợ PNG/JPEG.");
}
