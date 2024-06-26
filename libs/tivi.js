let tivis = [];
let dsNhom = [];
let dsTmp = [];

const timTheoTen = (event) => {
  //console.log(event.keyCode)
  if (event.keyCode == 13) {
    // Enter
    //console.log(event.target.value) // Get value Input Search
    let gtTim = event.target.value;
    let ds = dsTmp.filter((x) =>
      x.Ten.toLowerCase().includes(gtTim.toLowerCase())
    );
    xuatTivi(ds, tagTivi);
  }
};

const sapXepGia = (btn) => {
  let sort = Number(btn.getAttribute("sort"));
  let lbl = "";
  if (sort == 1) {
    sort = -1;
    lbl = `Giá &Uparrow;`;
    // Tăng
    dsTmp.sort((a, b) => {
      return Number(a.Don_gia_Ban) - Number(b.Don_gia_Ban);
    });
  } else {
    sort = 1;
    lbl = `Giá &Downarrow;`;
    // Giảm
    dsTmp.sort((a, b) => {
      return Number(b.Don_gia_Ban) - Number(a.Don_gia_Ban);
    });
  }
  btn.setAttribute("sort", sort);
  btn.innerHTML = lbl;
  xuatTivi(dsTmp, tagTivi);
};

const sapXepTen = (btn) => {
  let sort = Number(btn.getAttribute("sort"));
  let lbl = "";
  if (sort == 1) {
    sort = -1;
    lbl = `Tên &Uparrow;`;
    // Tăng
    dsTmp.sort((a, b) => {
      return a.Ten.toLowerCase().localeCompare(b.Ten.toLowerCase());
    });
  } else {
    sort = 1;
    lbl = `Tên &Downarrow;`;
    // Giảm
    dsTmp.sort((a, b) => {
      return b.Ten.toLowerCase().localeCompare(a.Ten.toLowerCase());
    });
  }
  btn.setAttribute("sort", sort);
  btn.innerHTML = lbl;
  xuatTivi(dsTmp, tagTivi);
};

const taoNhomTivi = () => {
  dsNhom = Array.from(new Set(tivis.map((x) => x.Nhom.Ma_so))).map((Ma_so) => {
    nhom = {
      Ma_so: Ma_so,
      Ten: tivis.find((x) => x.Nhom.Ma_so == Ma_so).Nhom.Ten.toUpperCase(),
      Soluong: tivis.filter((x) => x.Nhom.Ma_so == Ma_so).length,
    };
    return nhom;
  });
  dsNhom.unshift({
    Ma_so: "ALL",
    Ten: "ALL",
    Soluong: tivis.length,
  });
};

const xuatTiviTheoNhom = (maNhom, x) => {
  if (maNhom != "ALL") {
    dsTmp = tivis.filter((x) => x.Nhom.Ma_so == maNhom);
  } else {
    dsTmp = tivis;
  }

  document
    .querySelectorAll(".activeLstMobile")[0]
    .classList.remove("activeLstMobile");
  x.parentNode.classList.add("activeLstMobile");
  updateSlider(dsTmp);
  xuatTivi(dsTmp, tagTivi);
};

const xuatNhomTivi = (ds = [], tag) => {
  let html = ``;
  ds.forEach((item, index) => {
    let clsActive = index == 0 ? "activeLstMobile" : "";
    html += `
        <li class="list-group-item d-flex justify-content-between align-items-center ${clsActive}">
            <a href="javaScript:void(0)" onclick="xuatTiviTheoNhom('${item.Ma_so}',this)">${item.Ten}</a>
            <span class="badge badge-secondary badge-pill">${item.Soluong}</span>
        </li>
        `;
  });
  tag.innerHTML = html;
};

const xuatTivi = (src = [], tag) => {
  let html = ``;
  src.forEach((item) => {
    html += `
            <div class="col-12 col-md-6 col-xl-3 mb-2 mt-2">
                <div class="card border-primary h-100">
                    <img class="card-img-top" src="${urlImages}/${
      item.Ma_so
    }.png" alt="">
                    <div class="card-body">
                        <h5 class="card-title text-info overflow-hidden">${
                          item.Ten
                        }</h5>
                        <p class="card-text text-danger">Giá ${item.Don_gia_Ban.toLocaleString()}<sup>đ</sup></p>
                    </div>
                    <div class="card-footer text-right">
                    <a href="javaScript:void(0)" class="btn btn-sm btn-info" onclick="showModal(this)">
                            <i class="fa fa-reddit-square" aria-hidden="true"></i>
                            Chi tiết
                        </a>
                        <a href="javaScript:void(0)"  class="btn btn-outline-danger btn-sm" onclick="addToCart('${
                          item.Ma_so
                        }',1)">
                            <i class="fa fa-shopping-basket" aria-hidden="true"></i> Giỏ hàng
                        </a>
                    </div>
                </div>
            </div>
        `;
  });
  tag.innerHTML = html;
  tagTieude.innerHTML = `Tivi (${src.length})`;
};

/*
getAPI("listSTORE").then((result)=>{
    store=result[0];
    xuatCuahang(store,tagStore);
    getAPI("listTIVI").then((result)=>{
        tivis=result;
        dsTmp=result;
        updateSlider(dsTmp);
        taoNhomTivi();
        xuatNhomTivi(dsNhom,tagLstNhom);
        xuatQuangcao(dsTmp,tagCarousel);
        xuatTivi(tivis,tagTivi);
    })
}).catch((err)=>{
    console.log(err);
})
*/
dbPromise = idb.open(db, 1);
idbObjStore.getAll("store").then((result) => {
  store = result[0];
  xuatCuahang(store, tagStore);
  xuatEmnaiphone(store, th_email_phone);
  idbObjStore.getAll("tivi").then((result) => {
    tivis = result;
    dsTmp = result;
    lst.tivi = result;
    updateSlider(dsTmp);
    taoNhomTivi();
    xuatNhomTivi(dsNhom, tagLstNhom);
    xuatQuangcao(dsTmp, tagCarousel);
    xuatTivi(tivis, tagTivi);
  });
});
if (sessionStorage.getItem("carts") != undefined) {
  carts = JSON.parse(sessionStorage.getItem("carts"));
  Th_Gio_hang.innerHTML = carts.length;
}
