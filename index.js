$(document).ready(function() {
    $('.option-checkbox').change(function() {
        updateReceipt();
    });
    function updateReceipt() {
        let totalPrice = 0;
        let selectedOptions = [];

        $('.tuningTable').each(function() {
            let section = $(this).prev('h2').text();

            $(this).find('.option-checkbox').each(function() {
                if ($(this).is(':checked')) {
                    let price = parseInt($(this).data('price'));
                    totalPrice += price;
                    let optionText = $(this).closest('tr').find('td:first').text();
                    selectedOptions.push({ section: section, option: optionText, price: price });
                    $(this).closest('tr').find('.price').text(price + ' €');
                } else {
                    $(this).closest('tr').find('.price').text('0');
                }
            });
        });

        $('#totalPrice').text(totalPrice + ' €');
        $('#selectedOptions').empty();
        selectedOptions.forEach(function(option) {
            $('#selectedOptions').append('<tr><td>' + option.section + '</td><td>' + option.option + '</td><td>' + option.price + ' €</td></tr>');
        });
        // selectedOptions.forEach(function(option) {
        //     $('#selectedOptions').append('<li>' + option + '</li>');
        // });
    }
    $('#printReceipt').click(function() {
        html2canvas(document.querySelector("#receipt")).then(canvas => {
            let newCanvas = document.createElement('canvas');
            newCanvas.width = canvas.width;
            newCanvas.height = canvas.height;
            let context = newCanvas.getContext('2d');

            // Hintergrund zeichnen
            context.fillStyle = 'black';
            context.fillRect(0, 0, newCanvas.width, newCanvas.height);

            // Gerendertes Bild auf neues Canvas zeichnen
            context.drawImage(canvas, 0, 0);

            // Herunterladen des Bildes
            let link = document.createElement('a');
            link.href = newCanvas.toDataURL('image/png');
            link.download = 'beleg.png';
            link.click();
        }).catch(function(error) {
            alert('Fehler beim Erstellen des Screenshots:', error);
        });
    });
});
