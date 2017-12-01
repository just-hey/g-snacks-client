function oneSnackCard(id, name, description, img) {
  return `<!--First row-->
            <div class="row mt-5 wow fadeIn" data-wow-delay="0.2s">
                <!--Featured image-->
                <div class="col-lg-7">
                    <div class="view overlay hm-white-light z-depth-1-half">
                        <img src="${img}" class="img-fluid" alt="">
                        <div class="mask"></div>
                    </div>
                </div>
                <!--/.Featured image-->
                <!--Post excerpt-->
                <div class="col-lg-5 one-snack-details">
                    <a href="#!"><h2 class="post-title font-bold">${name}</h2></a>
                    <p class="my-4">${description}</p>
                    <!--Stars-->
                    <p>
                      <i class="material-icons star">star</i>
                      <i class="material-icons star">star</i>
                      <i class="material-icons star">star</i>
                      <i class="material-icons star">star_half</i>
                      <i class="material-icons star">star_border</i>
                    </p>
                </div>
                <!--/.Post excerpt-->
            </div>
            <!--/.First row-->`
}
