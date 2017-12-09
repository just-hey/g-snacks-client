function oneSnackCard(id, name, description, img, stars) {
  return `<!--First row-->
            <div class="container goHome">
              <a href="index.html">Back</a>
            </div>
            <div class="row one-snack-container wow fadeIn" data-id="${id}" data-wow-delay="0.2s">
                <!--Featured image-->
                <div class="col-lg-7">
                    <div class="view overlay hm-white-light z-depth-1-half">
                        <img class="one-snack-img" src="${img}" class="img-fluid" alt="">
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
                      <i class="material-icons star">${stars[0]}</i>
                      <i class="material-icons star">${stars[1]}</i>
                      <i class="material-icons star">${stars[2]}</i>
                      <i class="material-icons star">${stars[3]}</i>
                      <i class="material-icons star">${stars[4]}</i>
                    </p>
                    <!--Button-->
                    <span class="snack-review-button">
                    </span>

                </div>
                <!--/.Post excerpt-->
            </div>
            <!--/.First row-->

            <!--Add Review Container-->
            <div class="add-review-container mt-4">
            </div>

            <!-- REVIEW SECTION -->
            <div class="row review-container">
              <div class="col">

                <div class="reviews-list mt-4">

                </div>
              </div>
            </div>
            `
}
