function snackCard(id, name, description, img){
  return `<div class="col-lg-4 mb-4" data-id="${id}">
            <!--Card-->
            <div class="card wow fadeIn" data-wow-delay="0.6s">
                <!--Card image-->
                <div class="view overlay hm-zoom" style="display: flex; align-items: center; overflow: hidden; height: 180px;">
                    <img class="img-fluid" src="${img}" alt="Image of snack">
                </div>
                <!--Card content-->
                <div class="card-body text-center">
                    <!--Title-->
                    <h4 class="card-title"><a data-id="${id}" class="snackLink" href="${baseURL}/${id}">${name}</a></h4>
                    <!--Text-->
                    <p class="card-text">${description}</p>
                    <!--Stars-->
                    <p>
                      <i class="material-icons star">star</i>
                      <i class="material-icons star">star</i>
                      <i class="material-icons star">star</i>
                      <i class="material-icons star">star_half</i>
                      <i class="material-icons star">star_border</i>
                    </p>
                </div>
            </div>
            <!--/.Card-->
        </div>`
}
