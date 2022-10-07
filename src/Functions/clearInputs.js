import $ from 'jquery';
export default function clearInputs (type = 0) {
    $(".inputs input, .inputs .error").removeAttr('style');

    if (type) {
        $(".inputs input").map(function () {
            $(this).val("");
            return 0;
        });
    }
}