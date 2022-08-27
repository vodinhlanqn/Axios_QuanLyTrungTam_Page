function Validation() {
    // Kiểm tra Rỗng
    this.checkNull = function (valueInput, errorId, message) {
        if (valueInput === '') {
            getEle(errorId).style.display = 'block';
            getEle(errorId).innerHTML = message;
            return false;
        }
        getEle(errorId).style.display = 'none';
        getEle(errorId).innerHTML = '';
        return true;
    };

    //kiểm tra độ dài ký tự
    this.checkLengthString = function (valueInput, errorId, message, min, max) {
        if (valueInput.length >= min && valueInput.length <= max) {
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = '';
            return true;
        }
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = message;
        return false;
    };

    // kiểm tra ký tự dạng chuỗi
    this.checkString = function (valueInput, errorId, message) {
        var letter =
            "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
        if (valueInput.match(letter)) {
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = '';
            return true;
        }
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = message;
        return false;
    };

    //kiểm tra Email
    this.checkEmail = function (valueInput, errorId, message) {
        var letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (valueInput.match(letter)) {
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = '';
            return true;
        }
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = message;
        return false;
    };

    // kiểm tra Mật khẩu
    this.checkPass = function (valueInput, errorId, message) {
        var letter = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
        if (valueInput.match(letter)) {
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = '';
            return true;
        }
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = message;
        return false;
    };

    // Kiểm tra dạng Select
    this.checkSelect = function (selectId, errorId, message) {
        if (getEle(selectId).selectedIndex !== 0) {
            // true
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = '';
            return true;
        }
        //false
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = message;
        return false;
    };

    //Giới hạn ký tự
    this.checkMinMax = function (valueInput, errorId, message, min, max) {
        if (valueInput >= min && valueInput <= max) {
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = '';
            return true;
        }
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = message;
        return false;
    };

    // Kiểm tra Tài khoản
    this.checkAccount = function (valueInput, errorId, message, dataMember) {
        var status = dataMember.some(function (itemMember) {
            return valueInput === itemMember.account;
        });
        if (status) {
            getEle(errorId).style.display = "block";
            getEle(errorId).innerHTML = message;
            return false;
        }
        getEle(errorId).style.display = "none";
        getEle(errorId).innerHTML = '';
        return true;
    };
}