// Khai báo biến lưu số lượng sản phẩm
let soLuongMobiles = 0;
let soLuongTivi = 0;
let soLuongFood = 0;

// Hàm xuất khuyến mãi
const xuatKhuyenMai = (src = [], tag, nhom) => {
  let html = ``;
  src.slice(0, 4).forEach((item) => {
    // Chỉ lấy 2 sản phẩm từ mỗi danh sách
    html += `
      <div class="col-12 col-md-6 col-xl-3 mb-2">
        <div class="card border-primary">
          <img class="card-img-top" src="${urlImages}/${item.Ma_so}.png" alt="">
          <div class="card-body">
            <h5 class="card-title text-info">${item.Ten}</h5>
            <p class="card-text text-danger">Giá ${item.Don_gia_Ban.toLocaleString()}<sup>đ</sup></p>
          </div>
          <div class="card-footer text-right">
            <a href="javaScript:void(0)" class="btn btn-sm btn-info" onclick="showModal(this)">
              <i class="fa fa-reddit-square" aria-hidden="true"></i> Chi tiết
            </a>
            <a href="javaScript:void(0)" onclick="addToCart('${
              item.Ma_so
            }', ${nhom})" class="btn btn-outline-danger btn-sm">
              <i class="fa fa-shopping-basket" aria-hidden="true"></i> Giỏ hàng
            </a>
          </div>
        </div>
      </div>
    `;
  });
  tag.innerHTML = html;
};

// Hàm render carousel quảng cáo
const renderCarousel = (srcTivi = [], srcMobile = [], srcFood = [], tag) => {
  let html = ``;
  html += `<div id="carouselId" class="carousel slide text-center" data-ride="carousel">`;
  html += `<div class="carousel-inner" role="listbox">`;

  // Thêm 2 sản phẩm từ tivi
  srcTivi.slice(0, 2).forEach((item, index) => {
    let clsActive = index == 0 ? "active" : "";
    html += `
      <div class="carousel-item ${clsActive}">
        <img src="${urlImages}/${item.Ma_so}.png" alt="Slide ${
      index + 1
    }" class="img-fluid">
        <div class="carousel-caption d-none d-md-block">
          <h3>${item.Ten}</h3>
          <p>Giá ${item.Don_gia_Ban.toLocaleString()}<sup>đ</sup></p>
        </div>
      </div>
    `;
  });

  // Thêm 2 sản phẩm từ mobile
  srcMobile.slice(0, 2).forEach((item, index) => {
    let clsActive = index == 0 && srcTivi.length === 0 ? "active" : "";
    html += `
      <div class="carousel-item ${clsActive}">
        <img src="${urlImages}/${item.Ma_so}.png" alt="Slide ${
      index + 1
    }" class="img-fluid">
        <div class="carousel-caption d-none d-md-block">
          <h3>${item.Ten}</h3>
          <p>Giá ${item.Don_gia_Ban.toLocaleString()}<sup>đ</sup></p>
        </div>
      </div>
    `;
  });

  srcFood.slice(0, 2).forEach((item, index) => {
    let clsActive =
      index == 0 && srcTivi.length === 0 && srcMobile.length === 0
        ? "active"
        : "";
    html += `
      <div class="carousel-item ${clsActive}">
        <img src="${urlImages}/${item.Ma_so}.png" alt="Slide ${
      index + 1
    }" class="img-fluid food-img" style="width: 80%;">
        <div class="carousel-caption d-none d-md-block">
          <h3>${item.Ten}</h3>
          <p>Giá ${item.Don_gia_Ban.toLocaleString()}<sup>đ</sup></p>
        </div>
      </div>
    `;
  });

  html += `
    </div>
    <a class="carousel-control-prev" href="#carouselId" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselId" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
  `;
  tag.innerHTML = html;
};

// Hàm render số lượng sản phẩm
const renderSoluong = () => {
  const tagSoluong = document.getElementById("tagSoluong");

  const soluongItems = [
    { label: "MOBILE", quantity: soLuongMobiles },
    { label: "TIVI", quantity: soLuongTivi },
    { label: "FOOD", quantity: soLuongFood },
  ];

  // Tạo danh sách ul
  const ul = document.createElement("ul");
  ul.classList.add("list-group");

  // Tạo từng item trong danh sách
  soluongItems.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );
    // if (item.label === "Mobile") {
    //   li.classList.add("active");
    // }

    // Tạo nội dung của từng item
    li.innerHTML = `
      ${item.label}
      <span class="badge badge-secondary badge-pill">${item.quantity}</span>
    `;

    // Thêm item vào danh sách ul
    ul.appendChild(li);
  });

  // Gán danh sách ul vào thẻ tagSoluong
  tagSoluong.innerHTML = "";
  tagSoluong.appendChild(ul);
};

// Lấy dữ liệu từ IndexedDB và xử lý
dbPromise = idb.open(db, 1);
idbObjStore.getAll("store").then((result) => {
  store = result[0];
  xuatCuahang(store, tagStore);
  xuatEmnaiphone(store, th_email_phone);
  idbObjStore.getAll("tivi").then((result) => {
    lst.tivi = result;
    soLuongTivi = lst.tivi.length;
    xuatKhuyenMai(result, tagTivi, 1);
  });
  idbObjStore.getAll("mobile").then((result) => {
    lst.mobile = result;
    soLuongMobiles = lst.mobile.length;
    xuatKhuyenMai(result, tagMobile, 2);
  });
  idbObjStore.getAll("food").then((result) => {
    lst.food = result;
    soLuongFood = lst.food.length;
    xuatKhuyenMai(result, tagFood, 3);
    renderCarousel(
      lst.tivi,
      lst.mobile,
      lst.food,
      document.getElementById("tagCarousel")
    );
    renderSoluong();
  });
});

// Kiểm tra và cập nhật số lượng sản phẩm trong giỏ hàng
if (sessionStorage.getItem("carts") != undefined) {
  carts = JSON.parse(sessionStorage.getItem("carts"));
  Th_Gio_hang.innerHTML = carts.length;
}
