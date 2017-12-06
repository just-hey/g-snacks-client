function editSnackForm(id, name, description, img){
  return `
  <div class="edit-form">
  <label for="snack-name">Name</label>
        <input type="text" name="snack-name" id="snack-name" value="${name}" class="mb-4"></input>
        <label for="snack-description">Description</label>
        <textarea rows="4" name="snack-description" "snack-description" class="mb-4" >${description}</textarea>
        <label for="snack-image">Image URL</label>
        <input type="text" name="snack-image" id="snack-image" value="img" class="mb-4"></input>
        <div class="save-cancel-buttons mt-4">
        <button class="cancel">Cancel</button>
        <button class="save-edit" data-id="${id}">Save Changes</button>
        </div></div>`
}
