let mobiles=[];
let dsNhom=[];
let dsTmp=[];

const timTheoTen = (event) => {
    //console.log(event.keyCode)
    if(event.keyCode==13){
        // Enter
        //console.log(event.target.value) // Get value Input Search
        let gtTim = event.target.value;
        let ds = dsTmp.filter(x => x.Ten.toLowerCase().includes(gtTim.toLowerCase()));
        xuatMobile(ds,tagMobile);
    }
}


const sapXepGia=(btn)=>{
    let sort=Number(btn.getAttribute("sort"));
    let lbl="";
    if(sort==1){
        sort=-1;
        lbl=`Giá &Uparrow;`;
        // Tăng
        dsTmp.sort((a,b)=>{
            return Number(a.Don_gia_Ban) - Number(b.Don_gia_Ban)
        })
    }else{
        sort=1
        lbl=`Giá &Downarrow;`;
        // Giảm
        dsTmp.sort((a,b)=>{
            return Number(b.Don_gia_Ban) - Number(a.Don_gia_Ban)
        })
    }
    btn.setAttribute("sort",sort)
    btn.innerHTML=lbl;
    xuatMobile(dsTmp, tagMobile);
}

const sapXepTen=(btn)=>{
    let sort=Number(btn.getAttribute("sort"));
    let lbl="";
    if(sort==1){
        sort=-1;
        lbl=`Tên &Uparrow;`;
        // Tăng
        dsTmp.sort((a, b) => {
            return a.Ten.toLowerCase().localeCompare(b.Ten.toLowerCase())
        })
    }else{
        sort=1
        lbl=`Tên &Downarrow;`;
        // Giảm
        dsTmp.sort((a, b) => {
            return b.Ten.toLowerCase().localeCompare(a.Ten.toLowerCase())
        })
    }
    btn.setAttribute("sort",sort)
    btn.innerHTML=lbl;
    xuatMobile(dsTmp, tagMobile);
}



const xuatMobile=(src=[],tag)=>{
    let html=``;
    src.forEach((item)=>{
        html+=`
            <div class="col-12 col-md-6 col-xl-3 mb-2 mt-2">
                <div class="card border-primary h-100">
                    <img class="card-img-top" src="${urlImages}/${item.Ma_so}.png" alt="">
                    <div class="card-body">
                        <h5 class="card-title text-info">${item.Ten}</h5>
                        <p class="card-text text-danger">Giá ${item.Don_gia_Ban.toLocaleString()}<sup>đ</sup></p>
                    </div>
                    <div class="card-footer text-right">
                        <a href="javaScript:void(0)" class="btn btn-sm btn-info" onclick="showModal(this)">
                            <i class="fa fa-reddit-square" aria-hidden="true"></i>
                            Chi tiết
                        </a>
                        <a href="javaScript:void(0)"  class="btn btn-outline-danger btn-sm" onclick="addToCart('${item.Ma_so}',2)">
                            <i class="fa fa-shopping-basket" aria-hidden="true"></i> Giỏ hàng
                        </a>
                    </div>
                </div>
            </div>
        `
    })
    tag.innerHTML=html;
    tagTieude.innerHTML=`Mobile (${src.length})`
}

const taoNhomMobile = () => {
    dsNhom = Array.from(new Set(mobiles.map(x => x.Nhom.Ma_so))).map(Ma_so => {
        nhom = {
            Ma_so: Ma_so,
            Ten: mobiles.find(x => x.Nhom.Ma_so == Ma_so).Nhom.Ten.toUpperCase(),
            Soluong: mobiles.filter(x => x.Nhom.Ma_so == Ma_so).length
        }
        return nhom
    })

    dsNhom.unshift({
        "Ma_so": "ALL",
        "Ten": "ALL",
        "Soluong": mobiles.length
    })
}

const xuatNhomMobile = (ds = [], tag) => {
    let html = ``;
    ds.forEach((item, index) => {
        let clsActive = (index == 0) ? "activeLstMobile" : "";
        html += `
        <li class="list-group-item d-flex justify-content-between align-items-center ${clsActive}">
            <a href="javaScript:void(0)" onclick="xuatMobileTheoNhom('${item.Ma_so}',this)">${item.Ten}</a>
            <span class="badge badge-secondary badge-pill">${item.Soluong}</span>
        </li>
        `
    })
    tag.innerHTML = html;
}

const xuatMobileTheoNhom = (maNhom,x) => {
    if (maNhom != "ALL") {
        dsTmp = mobiles.filter(x => x.Nhom.Ma_so == maNhom);
    } else {
        dsTmp = mobiles
    }

    
    document.querySelectorAll(".activeLstMobile")[0].classList.remove("activeLstMobile")
    x.parentNode.classList.add('activeLstMobile');
    updateSlider(dsTmp);
    xuatMobile(dsTmp, tagMobile);
    
}


/*
getAPI("listSTORE").then((result)=>{
    store=result[0];
    xuatCuahang(store,tagStore);
    getAPI("listMOBILE").then((result)=>{
        mobiles=result;
        dsTmp=result;
        
        taoNhomMobile();
        xuatQuangcao(dsTmp,tagCarousel);
        xuatNhomMobile(dsNhom,tagLstNhom);
        xuatMobile(mobiles,tagMobile)
        updateSlider(dsTmp);
    })
})
*/

dbPromise=idb.open(db,1);
idbObjStore.getAll("store").then((result)=>{
    store=result[0];
    xuatCuahang(store,tagStore);
      xuatEmnaiphone(store, th_email_phone);
    idbObjStore.getAll("mobile").then((result)=>{
        mobiles=result;
        dsTmp=result;
        lst.mobile=result;
        taoNhomMobile();
        xuatQuangcao(dsTmp,tagCarousel);
        xuatNhomMobile(dsNhom,tagLstNhom);
        xuatMobile(mobiles,tagMobile)
        updateSlider(dsTmp);
    })
    
})

if (sessionStorage.getItem("carts") != undefined) {
    carts = JSON.parse(sessionStorage.getItem("carts"))
    Th_Gio_hang.innerHTML = carts.length;
}





