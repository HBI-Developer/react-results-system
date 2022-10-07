import $ from 'jquery';
export default function checkFromInputs () {
    $(".inputs input").map(function () {
        if ($(this).val().trim() === "") {
          $(this).css("border-color", "#f44336");
          $(this).next().text('لا يمكنك ترك هذا الحقل فارغاً.').css("display", "block");
        }

        return 0;
    });
}