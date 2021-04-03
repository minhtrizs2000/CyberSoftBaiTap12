

function Validation(){
    this.checkEmpty = function(inputVal, spandID, message){
        //trim(): xóa dấu khoảng trắng trước và sau nội dung chữ
        if(inputVal.trim() != ""){
            //Dữ liệu hợp lệ
            document.getElementById(spandID).innerHTML = "";
            return true;
        }else{
            //Dữ liệu k hợp lệ
            document.getElementById(spandID).innerHTML = message;
            return false;
        }
    }

    this.checkTK = function(inputVal, spandID, message, mangNhanVien){
        //Kiểm tra mã có tồn tại trong mảng nv chưa?
        var isExist = false;

        //some: duyệt mảng + return kq so sánh (true/false)
        isExist = mangNhanVien.some(function(item){
            return item.taiKhoan === inputVal;
        });

        if(isExist){
            //nếu isExist == true => mã bị trùng
            document.getElementById(spandID).innerHTML = message;
            return false;
        }else{
            //Mã không trùng => hợp lệ
            document.getElementById(spandID).innerHTML = "";
            return true;
        }
    }

    this.checkNum = function(inputVal, spandID, message){
        var taiKhoanPattern = new RegExp("^[0-9]+$");

        if(taiKhoanPattern.test(inputVal)){
            //Tai khoan hop le
            document.getElementById(spandID).innerHTML = "";
            return true;
        }else{
            document.getElementById(spandID).innerHTML = message;
            return false;
        }
    }

    this.checkMK = function(inputVal, spandID, message, mangMK){
        var passwordPattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");

        if(passwordPattern.test(inputVal)){
            //pass hop le
            document.getElementById(spandID).innerHTML = "";
            return true;
        }else{
            document.getElementById(spandID).innerHTML = message;
            return false;
        }
    }

    this.checkName = function(inputVal, spandID, message){
        //chứa giá trị cả chuỗi name cần kiểm tra
        //C1: dùng đối tượng RegExp
        var namePattern = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$");
        
        if(namePattern.test(inputVal)){
            //tên hợp lệ
            document.getElementById(spandID).innerHTML = "";
            return true;
        }else{
            document.getElementById(spandID).innerHTML = message;
            return false;
        }
    }

    this.checkMail = function(inputVal, spandID, message){
        //C2: sử dụng trực tiếp biểu thức
        var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(inputVal.match(emailPattern)){
            //Đúng định dạng email
            document.getElementById(spandID).innerHTML = "";
            return true;
        }else{
            document.getElementById(spandID).innerHTML = message;
            return false;
        }
    }

    this.checkLength = function(inputVal, spandID, message, min, max){
        if(inputVal.length >= min && inputVal.length <= max){
            //dữ liệu hợp lệ
            document.getElementById(spandID).innerHTML = "";
            return true;
        }else{
            document.getElementById(spandID).innerHTML = message;
            return false;
        }
    }

    this.checkMinMax = function(inputVal, spandID, message, min, max){
        if(inputVal >= min && inputVal <= max){
            //Dữ liêu hợp lệ
            document.getElementById(spandID).innerHTML = "";
            return true;
        }else{
            document.getElementById(spandID).innerHTML = message;
            return false;
        }
    }

    this.checkDropDown = function(selectID, spandID, message){
        if(document.getElementById(selectID).selectedIndex != 0){
            //co chon cac khoa hoc
            document.getElementById(spandID).innerHTML = "";
            return true;
        }else{
            document.getElementById(spandID).innerHTML = message;
            return false;
        }
    }
}