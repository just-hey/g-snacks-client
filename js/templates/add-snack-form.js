function addSnackForm(){
  return `
  <div class="edit-form">
    <label for="snack-name">Name</label>
    <input type="text" name="snack-name" id="snack-name" class="mb-4"></input>
    <label for="snack-description">Description</label>
    <textarea rows="4" name="snack-description" id="snack-description" class="mb-4"></textarea>
    <label for="snack-image">Image URL</label>
    <input type="text" name="snack-image" id="snack-image" class="mb-4"></input>
    <div class="save-cancel-buttons mt-4">
      <button class="cancel">Cancel</button>
      <button class="save-new">Create Snack</button>
    </div>
    <div class="snack-error-message">
    </div>
  </div>`
}
