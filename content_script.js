// content_script.js (Đã sửa lỗi)
try {
    let accessToken = null;
    const htmlContent = document.documentElement.innerHTML;

    // Biểu thức chính quy (regex) này được thiết kế để linh hoạt hơn.
    // Nó tìm kiếm một chuỗi ký tự được bao trong dấu ngoặc kép ("), bắt đầu bằng "EAAG",
    // và chứa các ký tự hợp lệ cho một token.
    // Phần (EAAG[^"]+) là một "capture group", nó sẽ lấy chính xác phần token mà chúng ta cần.
    const tokenPattern = /"(EAAG[^"]+)"/;
    const match = htmlContent.match(tokenPattern);

    // Nếu tìm thấy kết quả và capture group (match[1]) tồn tại
    if (match && match[1]) {
        accessToken = match[1];
    }

    // Gửi kết quả (token hoặc null nếu không tìm thấy) về lại popup
    chrome.runtime.sendMessage({ type: "ACCESS_TOKEN_RESULT", token: accessToken });

} catch (e) {
    // Nếu có lỗi xảy ra trong quá trình tìm kiếm, gửi về kết quả null
    console.error("Lỗi khi tìm token trong sMeta Tool:", e);
    chrome.runtime.sendMessage({ type: "ACCESS_TOKEN_RESULT", token: null });
}