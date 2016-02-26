angular
    .module('app')
    .value('toastr', toastr);

angular
    .module('app')
    .factory('notifier', notifier);

function notifier(toastr) {
    return {
        notify: notify
    }

    function notify(msg, ok) {
        if(ok) {
            toastr.success(msg);
        } else {
            toastr.error(msg);
        }
        console.log(msg);
    }
}
