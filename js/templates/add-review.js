//which id(s)???? review, snack, user
function addReviewForm(){
  return `<form>
    <textarea name="review-text" id="review-text" placeholder="What do you think?"></textarea>
    <p class="review-stars">
      <i class="material-icons star" data-star="1">star_border</i>
      <i class="material-icons star" data-star="2">star_border</i>
      <i class="material-icons star" data-star="3">star_border</i>
      <i class="material-icons star" data-star="4">star_border</i>
      <i class="material-icons star" data-star="5">star_border</i>
    </p>
    <div class="save-cancel-buttons mt-4">
      <button class="cancel">Cancel</button>
      <button class="save-edit">Save Review</button>
    </div>
  </form>`
}
