//which id(s)???? review, snack, user
function addReviewForm(){
  return `<form>
    <textarea name="review-text" id="review-text" placeholder="What do you think?"></textarea>
    <p class="review-stars">
      <i class="material-icons star one-star">star_border</i>
      <i class="material-icons star two-star">star_border</i>
      <i class="material-icons star three-star">star_border</i>
      <i class="material-icons star four-star">star_border</i>
      <i class="material-icons star five-star">star_border</i>
    </p>
    <div class="save-cancel-buttons mt-4">
      <button class="cancel">Cancel</button>
      <button class="save-edit">Save Review</button>
    </div>
  </form>`
}
