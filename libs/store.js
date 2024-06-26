let store = {};

const xuatEmnaiphone = (src, tag) => {
  let html = ``;
  html += `
    <i class="fa fa-phone mr-2"></i>
            <p class="mb-0 mr-3">${src.Dien_thoai}</p>
            <i class="fa fa-envelope mr-2" aria-hidden="true"></i>
            <p class="mb-0">${src.Email}</p>
    `;
  tag.innerHTML = html;
};
const xuatCuahang = (src, tag) => {
  let html = ``;
  html += `

      <div class="row">
        <div class="col-xl-3 col-md-3 col-sm-12 bentrai">
          <img
            class="img-fluid imglogo"
            src="${urlImages}/Logo.png"
            alt=""
          />
        </div>
        <div class="col-xl-6 col-md-6 col-sm-12 storename">
          <div class="row">
            <div class="col-xl-7 col-md-7 col-sm-12">
              <h1 class="display-3">${src.Ten}</h1>
              <span class="lead">
                <i>${src.Slogan}</i>
              </span>
            </div>
            <div class="col-xl-5 col-md-5 col-sm-12 address">
            <p class="lead  text-white">${src.Dia_chi}</p>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-3 col-sm-12 text-right">
          <img
            src="${urlImages}/en.png"
            alt=""
            class="img-thumbnail"
            style="width: 15%"
            onclick="sessionStorage.setItem('LANG','EN');window.location.reload()"
          />
          <img
            src="${urlImages}/vn.png"
            alt=""
            class="img-thumbnail"
            style="width: 15%"
            onclick="sessionStorage.setItem('LANG','VI');window.location.reload()"
          />
        </div>
      </div>
    </div>
    `;
  tag.innerHTML = html;
};
