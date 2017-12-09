function snackCard(id, name, description, img){
    // shorten description
    let shortDescription = description
    if (shortDescription.length > 100) {
        shortDescription = shortDescription.substring(0, 100)
        let lastSpace = shortDescription.lastIndexOf(' ')
        if (lastSpace > 0) shortDescription = shortDescription.substring(0, lastSpace)
        shortDescription = shortDescription + `<a href="${baseURL}/${id}"> ...(more)</a>`
    }
    // return template
    return `<div class="col-lg-4 mb-4">
            <!--Card-->
            <div data-id="${id}" class="card wow fadeIn" data-wow-delay="0.6s">
                <!--Card image-->
                <div class="view overlay hm-zoom" style="display: flex; align-items: center; overflow: hidden; height: 180px;">
                    <img class="img-fluid" src="${img}" alt="Image of snack">
                </div>
                <!--Card content-->
                <div class="card-body text-center">
                    <!--Title-->
                    <h4 class="card-title"><a data-id="${id}" class="snackLink" href="${baseURL}/${id}">${name}</a></h4>
                    <!--Text-->
                    <p class="card-text">${shortDescription}</p>
                    <!--Stars-->
                    <p>
                      <i class="material-icons star">star</i>
                      <i class="material-icons star">star</i>
                      <i class="material-icons star">star</i>
                      <i class="material-icons star">star_half</i>
                      <i class="material-icons star">star_border</i>
                    </p>
                </div>
            </div>
            <!--/.Card-->
        </div>`
}
