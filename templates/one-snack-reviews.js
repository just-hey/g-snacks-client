function loadUserReviews(title, first_name, last_name, text, stars) {
  return   `<h5>${title}</h5>
            <p>${text}
            <!--Stars-->
            <div class="reviewer-stars mb-1">
              <i class="material-icons star">${stars[0]}</i>
              <i class="material-icons star">${stars[1]}</i>
              <i class="material-icons star">${stars[2]}</i>
              <i class="material-icons star">${stars[3]}</i>
              <i class="material-icons star">${stars[4]}</i>
            </div>
            <span class="review-author">– ${first_name} ${last_name}</span>
            </p>
            <hr>`
}
