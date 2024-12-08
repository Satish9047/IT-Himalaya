taskManager.controller("footerDateController", [
  "$scope",
  function ($scope) {
    const $DateCtrl = this;
    this.fullYear = null;

    const currentDate = new Date();
    $DateCtrl.fullYear = currentDate.getFullYear();
    console.log($DateCtrl.fullYear);
  },
]);
