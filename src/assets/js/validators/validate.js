module.exports = {
    luhnCheck: function (value) {
        // JS Luhn Check for card validation
        // Taken from: https://gist.github.com/DiegoSalazar/4075533
        // accept only digits, dashes or spaces
        if (/[^0-9-\s]+/.test(value)) {
            return false;
        }

        var nCheck = 0, nDigit = 0, bEven = false;
        value = value.replace(/\D/g, "");

        for (var n = value.length - 1; n >= 0; n--) {
            var cDigit = value.charAt(n);

            nDigit = parseInt(cDigit, 10);

            if (bEven) {
                if ((nDigit *= 2) > 9) {
                    nDigit -= 9;
                }
            }

            nCheck += nDigit;
            bEven = !bEven;
        }
        return (nCheck % 10) === 0;
    },
    creditCardNumber: function (value) {
        return !!value && this.luhnCheck(value);
    },
    name: function (value) {
        var re = /^[A-Za-z\ \-\']{2,128}$/;
        return re.test(value);
    },
    fullName: function (value) {
        var re = /^[A-Za-z\ \-\'\\.]{1,128}$/,
            re2 = /^[^\- \.]/,
            valueArray = value.trim().split(" ");
        if (valueArray.length < 2) { return false; }
        for (var i = 0; i < valueArray.length; i++ ) {
            /* istanbul ignore else */
            if (valueArray[i] !== "") {
                if (!re2.test(valueArray[i]) || !re.test(valueArray[i]) || valueArray[i] === "'") {
                    return false;
                }
            }
        }
        return true;
    },
    title: function (accepted, value) {
        return accepted.indexOf(value) !== -1;
    },
    email: function (value) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value) && value.length <= 60;
    },
    voucherCode: function (value) {
        var re = /^[a-zA-Z0-9]{4}\-[a-zA-Z0-9]{4}\-[a-zA-Z0-9]{4}$/;
        return re.test(value);
    },
    cardExpiryMonth: function (value) {
        return +value > 0 && +value < 13;
    },
    cardExpiryYear: function (value) {
        var currentYear = new Date().getFullYear(),
            inputYear = parseInt("20" + value),
            validYearInterval = (inputYear >= currentYear) && (inputYear <= 2040);

        return typeof value === "string" && value.length === 2 && parseInt(value) !== 0 && validYearInterval;
    },
    cardExpiryDate: function (value) {
        var dateArray = value.split("/");
        return (dateArray.length === 2) &&  this.cardExpiryMonth(dateArray[0]) &&
        this.cardExpiryYear(dateArray[1]);
    },
    phone: function (value) {
        /*jslint maxlen: 1000*/
        var noDashOrSpaces = value.replace(/[-\s\s+]/g, "");
        if (value.charAt(0) === "+") {
            noDashOrSpaces = "+" + noDashOrSpaces;
        }
        var hasNoAreaCode = (/^0[0-9]{10}$/).test(noDashOrSpaces) || (/^[1-9]{1}[0-9]{9}$/).test(noDashOrSpaces);
        var hasAreaCode = (/^\+[0-9]{1,3}[0-9]{10}$/).test(noDashOrSpaces) || (/^00[0-9]{1,3}[0-9]{10}$/).test(noDashOrSpaces);

        return hasNoAreaCode || hasAreaCode;
    },
    cardCSC: function (value) {
        return (/^[0-9]{3}$/).test(value);
    },
    postcode: function (value) {
        // eslint-disable-next-line max-len
        return (/^(GIR 0AA|[A-PR-UWYZ]([A-HK-Y]([0-9][A-Z]?|[1-9][0-9])|[1-9]([0-9]|[A-HJKPSTUW])?) ?[0-9][ABD-HJLNP-UW-Z]{2})$/ig).test(value);
    },
    checked: function (value) {
        // Assumes [type=checkbox][value=true]
        return value;
    },
    freeFormText: function (value) {
        var re = /^[ -~\u00a1-\uffff]{1,128}$/;
        return re.test(value);
    },
    isInArray: function (accepted, value) {
        return accepted.indexOf(value) !== -1;
    },
    dateDD: function (value) {
        return +value > 0 && +value < 32 && value.length === 2;
    },
    dateMM: function (value) {
        return +value > 0 && +value < 13 && value.length === 2;
    },
    dateYYYY: function (value) {
        var currYear = new Date().getFullYear();
        return +value >= 1850 && +value <= currYear && value.length === 4;
    },
    dateDDMMYYYY: function (value) {
        var dateArray = value.split("/");
        return (dateArray.length === 3) &&  this.dateDD(dateArray[0]) &&
        this.dateMM(dateArray[1]) && this.dateYYYY(dateArray[2]);
    },
    referenceCode: function (value) {
        return (/^[0-9A-Z]{1,12}$/).test(value);
    }
};
