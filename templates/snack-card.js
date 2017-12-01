function snackCard(id, name, description, img){
  return `            <div class="col-lg-4 mb-4">
                  <!--Card-->
                  <div class="card wow fadeIn" data-wow-delay="0.6s">
                      <!--Card image-->
                      <img class="img-fluid" src="${img}" alt="Cinnamon Apple Sticks">
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
                          <!--Button-->
                          <a href="#" class="btn btn-info" data-id="${id}">Read more</a>
                      </div>
                  </div>
                  <!--/.Card-->
              </div>`
}
