$(document).ready(function() {
    $('.option-checkbox, .discount-radio').change(function() {
        updateReceipt();
    });
    function updateReceipt() {
        let totalPrice = 0;
        let selectedOptions = [];
        let discountPercentage = 0;
        

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

        $('.discount-radio').each(function() {
            if ($(this).is(':checked')) {
                discountPercentage = Math.max(discountPercentage, parseInt($(this).data('discount')));
            }
        });

        let discountAmount = totalPrice * (discountPercentage / 100);
        let finalPrice = totalPrice - discountAmount;
        
        $('#totalPrice').text(totalPrice + ' €');
        $('#discountAmount').text('-' + discountAmount.toFixed(2) + ' €');
        $('#finalPrice').text(finalPrice.toFixed(2) + ' €');
        $('#selectedOptions').empty();
        for (let option in selectedOptions) {
            let item = selectedOptions[option];
            $('#selectedOptions').append('<tr><td>' + item.section + '</td><td>' + option + '</td><td>' + item.count + '</td><td>' + (item.count * item.price) + ' €</td></tr>');
        }
    }
    $('#printReceipt').click(function() {
        html2canvas(document.querySelector("#receipt")).then(canvas => {
            let newCanvas = document.createElement('canvas');
            newCanvas.width = canvas.width;
            newCanvas.height = canvas.height;
            let context = newCanvas.getContext('2d');

            context.fillStyle = 'black';
            context.fillRect(0, 0, newCanvas.width, newCanvas.height);
            context.drawImage(canvas, 0, 0);
            
            newCanvas.toBlob(function(blob) {
                navigator.clipboard.write([
                    new ClipboardItem({
                        'image/png': blob
                    })
                ]).then(function() {
                    alertify.success('Beleg wurde in die Zwischenablage kopiert.');
                }).catch(function(error) {
                    alertify.error('Fehler beim Kopieren in die Zwischenablage:', error);
                });
            }, 'image/png');

            let link = document.createElement('a');
            link.href = newCanvas.toDataURL('image/png');
            link.download = 'beleg.png';
            link.click();
        }).catch(function(error) {
            alertify.error('Fehler beim Erstellen des Screenshots:', error);
        });
    });
});
