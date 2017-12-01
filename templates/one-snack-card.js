function oneSnackCard(id, name, description, img) {
  return `<!--First row-->
            <div class="row one-snack-container wow fadeIn" data-wow-delay="0.2s">
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
                      <i class="material-icons star">star</i>
                      <i class="material-icons star">star</i>
                      <i class="material-icons star">star</i>
                      <i class="material-icons star">star_half</i>
                      <i class="material-icons star">star_border</i>
                    </p>
                    <!--Button-->
                    <a href="#" class="btn review-button">Leave your own review</a>
                </div>
                <!--/.Post excerpt-->
            </div>
            <!--/.First row-->
            <!-- REVIEW SECTION -->
            <div class="row review-container">
              <div class="col">

                <div class="reviews-list mt-4">
                  <h4 class="mb-3">WHAT OTHER TASTEBUDS SAY:</h4>
                  <p>alkfjaslkfj asdlfkjasdlfjkasdlf
                  aldkfsja slsadlkfj sldfj sldfj sllksdafj asdlfk jsdf lksdf
                  <!--Stars-->
                  <div class="reviewer-stars mb-1">
                    <i class="material-icons star">star</i>
                    <i class="material-icons star">star</i>
                    <i class="material-icons star">star</i>
                    <i class="material-icons star">star_border</i>
                    <i class="material-icons star">star_border</i>
                  </div>
                  <span class="review-author">– Luke Skywalker</span>
                  </p>
                  <hr>
                  <p>kjfdslk fjasdlf jasdlf jsa
                  sldfkjasdl kfl dslfk alskfdj
                  sadflk sdf sldkfj s sadlfjsldf
                  <!--Stars-->
                  <div class="reviewer-stars mb-1">
                    <i class="material-icons star">star</i>
                    <i class="material-icons star">star</i>
                    <i class="material-icons star">star</i>
                    <i class="material-icons star">star</i>
                    <i class="material-icons star">star_border</i>
                  </div>
                  <span class="review-author">– Rey</span>
                  </p>
                  <hr>
                  <p>aaarrraagghaa r haraaahhh
                  <!--Stars-->
                  <div class="reviewer-stars mb-1">
                    <i class="material-icons star">star</i>
                    <i class="material-icons star">star</i>
                    <i class="material-icons star">star_border</i>
                    <i class="material-icons star">star_border</i>
                    <i class="material-icons star">star_border</i>
                  </div>
                  <span class="review-author">– Chewbacca</span>
                  </p>
                </div>
              </div>
            </div>
            `
}
