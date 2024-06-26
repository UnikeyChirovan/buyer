let about = {};
dbPromise = idb.openDB(db, 1);
idbObjStore.getAll("store").then((result) => {
  store = result[0];
  xuatCuahang(store, tagStore);
  xuatEmnaiphone(store, th_email_phone);
  xuatAbout(about, tagAbout);
});
if (sessionStorage.getItem("carts") != undefined) {
  carts = JSON.parse(sessionStorage.getItem("carts"));
  Th_Gio_hang.innerHTML = carts.length;
}
const xuatAbout = (src, tag) => {
  let html = ``;
  html += `
   <h2 class="mt-5 mb-4 text-primary">Khám Phá Thế Giới Của Cáo</h2>
      <div class="row">
        <div class="col-md-3">
          <div class="card">
            <img src="${urlImages}/tivi.png" alt="Tivi" />
            <div class="card-body bg-danger">
              <h5 class="card-title">Tivi - Kết Nối Với Thế Giới Giải Trí</h5>
              <p class="card-text">
                Thưởng thức những bộ phim và chương trình yêu thích với công
                nghệ hiện đại.
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card">
            <img
              src="${urlImages}/dienthoai.png"
              class="card-img-top"
              alt="Điện Thoại"
            />
            <div class="card-body bg-success">
              <h5 class="card-title">Điện Thoại - Luôn Kết Nối Cùng Bạn</h5>
              <p class="card-text">
                Giữ liên lạc mọi lúc mọi nơi với các dòng điện thoại hàng đầu.
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card">
            <img src="${urlImages}/doan.png" alt="Đồ Ăn" />
            <div class="card-body bg-danger">
              <h5 class="card-title">Đồ Ăn - Nâng Cấp Bữa Ăn Hàng Ngày</h5>
              <p class="card-text">
                Khám phá hương vị độc đáo và dinh dưỡng của các sản phẩm tươi
                ngon.
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card">
            <img
              src="${urlImages}/douong.png"
              class="card-img-top"
              alt="Thức Uống"
            />
            <div class="card-body bg-success">
              <h5 class="card-title">Thức Uống - Khám Phá Hương Vị Mới Mẻ</h5>
              <p class="card-text">
                Tận hưởng cảm giác sảng khoái với đa dạng loại thức uống tươi
                mát.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h2 class="mt-5 mb-4 text-primary">Chúng Tôi Tạo Ra Sự Khác Biệt</h2>
      <h4>
        Tại Cửa Hàng Của Cáo, chúng tôi không chỉ bán sản phẩm mà còn tạo ra
        trải nghiệm đáng nhớ:
      </h4>
      <div class="row text-center">
        <div class="col-md-3">
          <img
            src="${urlImages}/active1.png"
            class="img-fluid mb-3"
            alt="Hoạt Động 1" 
          />
          <p>
            <strong>Giao Lưu Với Các Công Ty Công Nghệ Hàng Đầu</strong> - Một
            cơ hội để tìm hiểu và chia sẻ kinh nghiệm với các đối tác uy tín như
            Samsung, Sony, Google, Microsoft.
          </p>
        </div>
        <div class="col-md-3">
          <img
            src="${urlImages}/active2.png"
            class="img-fluid mb-3"
            alt="Hoạt Động 2"
          />
          <p>
            <strong>Tham Dự Đại Hội Doanh Nghiệp Xuất Sắc Trong Năm</strong> -
            Tự hào 10 năm liền nằm trong nhóm 30 doanh nghiệp xuất sắc nhất năm
            của tờ báo uy tín Redfox.
          </p>
        </div>
        <div class="col-md-3">
          <img
            src="${urlImages}/active3.png"
            class="img-fluid mb-3"
            alt="Hoạt Động 3"
          />
          <p>
            <strong>Phát Tặng Quà Cho Trẻ Em Miền Núi</strong> - Hoạt động
            thường niên của Cáo's Store, một hành động nhỏ nhưng ý nghĩa, mang
            lại niềm vui cho những em nhỏ khó khăn.
          </p>
        </div>
        <div class="col-md-3">
          <img
            src="${urlImages}/active4.png"
            class="img-fluid mb-3"
            alt="Hoạt Động 4"
          />
          <p>
            <strong>Khuyến Học Toàn Cầu</strong> - Chúng tôi hỗ trợ giáo dục và
            phát triển tương lai thông qua các chương trình khuyến học.
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-md-5 mx-auto text-center">
            <img
                src="${urlImages}/sales.png"
                class="img-fluid mb-3"
                alt="sales"
            />
            <p>
                <strong>Ngày Hội Giảm Giá</strong> - Mỗi thứ 7 cuối cùng trong tháng
                sẽ có sale off từ 15% - 30% các mặt hàng.
            </p>
        </div>

      </div>
    `;
  tag.innerHTML = html;
};
