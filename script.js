$(document).ready(function () {
    $('#taxForm').submit(function (e) {
        e.preventDefault();
        if ($(this)[0].checkValidity()) {
            calculateTax();
        } else {
            $(this).find('input[type="number"]').each(function () {
                if (!$(this).get(0).validity.valid) {
                    $(this).siblings('.error-icon').show();
                }
            });
            if ($('#age').val() === '') {
                $('#age').siblings('.error-icon').show();
            }
        }
    });

    function calculateTax() {
        var income = parseFloat($('#income').val());
        var extraIncome = parseFloat($('#extraIncome').val() || 0);
        var deductions = parseFloat($('#deductions').val() || 0);
        var age = $('#age').val();

        var taxableIncome = (income + extraIncome - deductions) - 8;
        var tax;
        if (taxableIncome <= 0) {
            tax = 0;
        } else {
            switch (age) {
                case '<40':
                    tax = 0.3 * taxableIncome;
                    break;
                case '≥40&<60':
                    tax = 0.4 * taxableIncome;
                    break;
                case '≥60':
                    tax = 0.1 * taxableIncome;
                    break;
                default:
                    tax = 0;
            }
        }

        // Redirect to a new page with calculated tax
        var url = 'result.html?tax=' + tax.toFixed(2);
        window.location.href = url;
    }
});
