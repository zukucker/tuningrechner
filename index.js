$(document).ready(function() {
    $('.option-checkbox').change(function() {
        updateReceipt();
    });
    function updateReceipt() {
        let totalPrice = 0;
        let selectedOptions = [];

        $('.tuningTable tbody tr').each(function() {
            let section = $(this).closest('table').prev('h2').text();
            let optionText = $(this).find('td:first').text();
            let rowTotal = 0;
            let count = 0;

            $(this).find('.option-checkbox').each(function() {
                if ($(this).is(':checked')) {
                    let price = parseInt($(this).data('price'));
                    rowTotal += price;
                    totalPrice += price;
                    count++;
                    
                    if (!selectedOptions[optionText]) {
                        selectedOptions[optionText] = { section: section, count: 0, price: price };
                    }
                    
                    selectedOptions[optionText].count += 1;
                }
            });

            $(this).find('.price').text(rowTotal + ' €');
        });

        $('#totalPrice').text(totalPrice + ' €');
        $('#selectedOptions').empty();
        for (let option in selectedOptions) {
            let item = selectedOptions[option];
            $('#selectedOptions').append('<tr><td>' + item.section + '</td><td>' + option + '</td><td>' + item.count + '</td><td>' + (item.count * item.price) + ' €</td></tr>');
        }
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
