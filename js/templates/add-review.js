//which id(s)???? review, snack, user
function addReviewForm(){
  return `<form>
    <input type="text" name="review-title" class="review-title" placeholder="Title your feelings"></title>
    <textarea name="review-text" id="review-text" placeholder="Tell people what's up with this snack" class="mt-4"></textarea>
    <p class="review-stars">
      <i class="material-icons star" data-star="1">star_border</i>
      <i class="material-icons star" data-star="2">star_border</i>
      <i class="material-icons star" data-star="3">star_border</i>
      <i class="material-icons star" data-star="4">star_border</i>
      <i class="material-icons star" data-star="5">star_border</i>
    </p>
    <div class="save-cancel-buttons mt-4">
      <button class="cancel">Cancel</button>
      <button class="save-review">Save Review</button>
    </div>
    <div class="review-error-message">
    </div>
  </form>`
}
