app.component("appDashboard", {
  templateUrl: "./app/pages/dashboard/dashboard.template.html",
  controllerAs: "$DashboardCtrl",
  controller: [
    "$scope",
    function ($scope) {
      const $DashboardCtrl = this;
      $DashboardCtrl.message = "Welcome to Dashboard";
      console.log("This is Dashboard page");
    },
  ],
});
