function noAccessCard() {
  return `
    <!-- Card -->
    <div class="card card-cascade align-items-center wider reverse my-4" style="background-color: rgb(31,31,31)">
        <!-- Content -->
        <div class="text-white text-center d-flex align-items-center py-5 px-4">
            <div>
                <h1><i class="material-icons grey-text animated slideInDown" style="font-size: 4em">error</i></h1>
                <h3 class="card-title pt-2"><strong>No Access</strong></h3>
                <p>Sorry, but you are not authorized to access this page!</p>
            </div>
        </div>
        <!-- Content -->
    </div>
    <!-- Card -->
  `
}