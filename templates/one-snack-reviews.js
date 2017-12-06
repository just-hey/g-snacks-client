function loadUserReviews(title, first_name, last_name, text) {
  return   `<h5>${title}</h5>
            <p>${text}
            <!--Stars-->
            <div class="reviewer-stars mb-1">
              <i class="material-icons star">star</i>
              <i class="material-icons star">star</i>
              <i class="material-icons star">star</i>
              <i class="material-icons star">star_border</i>
              <i class="material-icons star">star_border</i>
            </div>
            <span class="review-author">– ${first_name} ${last_name}</span>
            </p>
            <hr>`
}
