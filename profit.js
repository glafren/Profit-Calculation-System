$(document).ready(function () {
    // Döviz kuru API'sini kullanarak dolar kurunu çekme
    function fetchExchangeRate() {
        return $.ajax({
            url: 'https://api.exchangerate-api.com/v4/latest/USD',
            method: 'GET',
            success: function (data) {
                var exchangeRate = data.rates.TRY; // USD -> TRY oranı
                $('#exchangeRate').val(exchangeRate);
                $('#exchangeRateDisplay').text('1 Dolar = ' + exchangeRate.toFixed(2) + ' TL');
            },
            error: function () {
                alert('Döviz kuru alınamadı. Lütfen daha sonra tekrar deneyin.');
            }
        });
    }

    // Sayfa yüklendiğinde döviz kurunu çek
    fetchExchangeRate();

    // Alış fiyatının dolar karşılığını göster
    $('#purchasePrice').on('input', function () {
        var purchasePriceTL = parseFloat($(this).val());
        var exchangeRate = parseFloat($('#exchangeRate').val());
        var purchasePriceUSD = purchasePriceTL / exchangeRate; // TL'yi dolara çevir
        $('#purchasePriceInUSD').text('Alış Fiyatı (USD): $' + purchasePriceUSD.toFixed(2)).addClass('text-primary');
    });

    $('.profit-button').on('click', function () {
        var profitPercent = $(this).data('profit');
        var purchasePriceTL = parseFloat($('#purchasePrice').val());
        var exchangeRate = parseFloat($('#exchangeRate').val());
        var purchasePrice = purchasePriceTL / exchangeRate; // TL'yi dolara çevir
        var commissionRate = parseFloat($('#commissionRate').val());
        var shippingCost = parseFloat($('#shippingCost').val());

        if (!isNaN(purchasePrice) && !isNaN(commissionRate) && !isNaN(shippingCost)) {
            var desiredProfit = purchasePrice * (profitPercent / 100);
            var sellingPrice = (purchasePrice + shippingCost + desiredProfit) / (1 - (commissionRate / 100));

            $('#sellingPrice').val(sellingPrice.toFixed(2));

            showResult();
        } else {
            alert("Lütfen önce alış fiyatı, komisyon oranı ve kargo ücretini girin.");
        }
    });

    $('#profitForm').on('submit', function (e) {
        e.preventDefault();

        var purchasePriceTL = parseFloat($('#purchasePrice').val());
        var exchangeRate = parseFloat($('#exchangeRate').val());
        var purchasePrice = purchasePriceTL / exchangeRate; // TL'yi dolara çevir
        var sellingPrice = parseFloat($('#sellingPrice').val());
        var commissionRate = parseFloat($('#commissionRate').val());
        var shippingCost = parseFloat($('#shippingCost').val());

        if (!isNaN(purchasePrice) && !isNaN(sellingPrice) && !isNaN(commissionRate) && !isNaN(shippingCost)) {
            var commissionFee = sellingPrice * (commissionRate / 100);
            var totalProfit = sellingPrice - purchasePrice - commissionFee - shippingCost;
            var profitRate = (totalProfit / purchasePrice) * 100;

            var $result = $('.result');
            var $profitAmount = $('#profitAmount');
            var $profitRate = $('#profitRate');

            $profitAmount.text(totalProfit.toFixed(2));
            $profitRate.text(profitRate.toFixed(2));
            $result.removeClass('d-none alert-success alert-danger alert-primary');

            if (totalProfit > 0) {
                $result.addClass('alert-success');
            } else if (totalProfit < 0) {
                $result.addClass('alert-danger');
            } else {
                $result.addClass('alert-primary');
            }

            $result.removeClass('d-none');
        } else {
            alert("Lütfen tüm değerleri doğru bir şekilde girin.");
        }
    });

    function showResult() {
        var purchasePriceTL = parseFloat($('#purchasePrice').val());
        var exchangeRate = parseFloat($('#exchangeRate').val());
        var purchasePrice = purchasePriceTL / exchangeRate; // TL'yi dolara çevir
        var sellingPrice = parseFloat($('#sellingPrice').val());
        var commissionRate = parseFloat($('#commissionRate').val());
        var shippingCost = parseFloat($('#shippingCost').val());

        if (!isNaN(purchasePrice) && !isNaN(sellingPrice) && !isNaN(commissionRate) && !isNaN(shippingCost)) {
            var commissionFee = sellingPrice * (commissionRate / 100);
            var totalProfit = sellingPrice - purchasePrice - commissionFee - shippingCost;
            var profitRate = (totalProfit / purchasePrice) * 100;

            var $result = $('.result');
            var $profitAmount = $('#profitAmount');
            var $profitRate = $('#profitRate');

            $profitAmount.text(totalProfit.toFixed(2));
            $profitRate.text(profitRate.toFixed(2));
            $result.removeClass('d-none alert-success alert-danger alert-primary');

            if (totalProfit > 0) {
                $result.addClass('alert-success');
            } else if (totalProfit < 0) {
                $result.addClass('alert-danger');
            } else {
                $result.addClass('alert-primary');
            }

            $result.removeClass('d-none');
        }
    }

    $('.refresh-button').on('click', function () {
        location.reload(); // Sayfayı yenile
    });
});

