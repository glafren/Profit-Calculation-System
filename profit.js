
        $(document).ready(function () {
            $('.profit-button').on('click', function () {
                var profitPercent = $(this).data('profit');
                var purchasePrice = parseFloat($('#purchasePrice').val());
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

                var purchasePrice = parseFloat($('#purchasePrice').val());
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
                var purchasePrice = parseFloat($('#purchasePrice').val());
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
});