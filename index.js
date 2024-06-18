$(document).ready(function() {
    $('.option-checkbox').change(function() {
        updateReceipt();
    });
    function updateReceipt() {
        let totalPrice = 0;
        let selectedOptions = [];

        $('.option-checkbox').each(function() {
            if ($(this).is(':checked')) {
                let price = parseInt($(this).data('price'));
                totalPrice += price;
                let optionText = $(this).closest('tr').find('td:first').text();
                selectedOptions.push(optionText + ' - ' + price + ' €');
                $(this).closest('tr').find('.price').text(price + ' €');
            } else {
                $(this).closest('tr').find('.price').text('0');
            }
        });

        $('#totalPrice').text(totalPrice + ' €');
        $('#selectedOptions').empty();
        selectedOptions.forEach(function(option) {
            $('#selectedOptions').append('<li>' + option + '</li>');
        });
    }
    $('#printReceipt').click(function() {
        html2canvas(document.querySelector("#receipt")).then(canvas => {
            let link = document.createElement('a');
            link.href = canvas.toDataURL();
            link.download = 'beleg.png';
            link.click();
        });
    });
});
