//Global Variable
var danhSachNV = new DanhSachNhanVien();
var validaton = new Validation;
getLocalStorage();

document.getElementById("btnThem").onclick = function(){
    document.getElementById("tknv").removeAttribute('readonly');
    document.getElementById("tbThanhCong").innerHTML = "";
}

//bắt sự kiện click btn thêm sv
document.getElementById("btnThemNV").addEventListener("click", function () {
    console.log("run");

    //get all value of input
    var taiKhoan = document.getElementById("tknv").value;
    var hoTen = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var matKhau = document.getElementById("password").value;
    var ngayLam = document.getElementById("datepicker").value;
    var luongCB = document.getElementById("luongCB").value;
    var chucVu = document.getElementById("chucvu").value;
    var gioLam = document.getElementById("gioLam").value;

    //Kiểm tra dữ liệu
    var isValid = true;

    //   &: cộng gtri binary
    //  &&: so sánh AND (gtri boolean)
    // true => 1 (bit)
    //false => 0 (bit)



    /**==================================
     *      KIỂM TRA TÀI KHOẢN
     * ==================================
     */

    //Không được để trống.
    isValid &= validaton.checkEmpty(taiKhoan, "tbTKNV", "Tài khoản nhân viên không được để trống!");
    //Không được trùng.
    isValid &= validaton.checkTK(taiKhoan, "tbTKNV", "Tài khoản nhân viên không được trùng!", danhSachNV.mangNV);
    //Độ dài từ 4-6 ký số.
    isValid &= validaton.checkLength(taiKhoan,"tbTKNV", "Tài khoản phải từ 4 đến 6 ký số!", 4, 6);
    //Only number
    isValid &= validaton.checkNum(taiKhoan,"tbTKNV","Tài khoản chỉ được dùng ký số!");



    /**==================================
     *      KIỂM TRA TÊN NHÂN VIÊN
     * ==================================
     */

    //Không được để trống.
    isValid &= validaton.checkEmpty(hoTen, "tbTen", "Tên nhân viên không được để trống!");
    //Không chứa ký tự đặc biệt.
    isValid &= validaton.checkName(hoTen, "tbTen", "Tên nhân viên không được chứa số hoặc ký tự đặc biệt!");



    /**==================================
     *      KIỂM TRA MAIL NHÂN VIÊN
     * ==================================
     */
    
    //Không được để trống.
    isValid &= validaton.checkEmpty(email, "tbEmail", "Email nhân viên không được để trống!");
    //Đúng cú pháp.
    isValid &= validaton.checkMail(email, "tbEmail", "Email không hợp lệ!");



    /**==================================
     *      KIỂM TRA MẬT KHẨU
     * ==================================
     */

    //Không để trống
    isValid &= validaton.checkEmpty(matKhau, "tbMatKhau", "Password không được để trống!");
    //phải từ 6-10 ký tự
    isValid &= validaton.checkLength(matKhau, "tbMatKhau", "Pass phải có từ 6-10 ký tự!", 6, 10);
    //Chứa ít nhất một ký tự đặc biệt, một ký tự số, một ký tự in hoa và một ký tự thường
    isValid &= validaton.checkMK(matKhau, "tbMatKhau", "Pass phải chứa ít nhất một ký tự đặc biệt, một ký số, một ký tự thường và một ký tự in hoa !");


    /**==================================
     *      KIỂM TRA NGÀY LÀM
     * ==================================
     */
    
    //không để trống
    isValid &= validaton.checkEmpty(ngayLam, "tbNgay", "Ngày làm không được để trống!");


    /**==================================
     *      KIỂM TRA LƯƠNG CƠ BẢN
     * ==================================
     */

    //Không để trống
    isValid &= validaton.checkEmpty(luongCB, "tbLuongCB",  "Lương cơ bản không được để trống!");
    //nằm trong khoảng 1.000.000 đến 20.000.000
    isValid &= validaton.checkMinMax(luongCB, "tbLuongCB",  "Lương cơ bản phải từ 1.000.000 đến 20.000.000!",1000000,20000000);
    

    /**==================================
     *      KIỂM TRA CHỨC VỤ
     * ==================================
     */

    //Phải chọn 1 trong 3 chức vụ
    isValid &= validaton.checkDropDown("chucvu", "tbChucVu", "Vui lòng chọn Chức vụ!");


    /**==================================
     *      KIỂM TRA GIỜ LÀM
     * ==================================
     */

    //không để trống
    isValid &= validaton.checkEmpty(gioLam, "tbGiolam", "Vui lòng nhập số giờ làm!")

    //giờ làm phải từ 80-200 giờ 
    isValid &= validaton.checkMinMax(gioLam, "tbGiolam", "Giờ làm phải trong khoảng 80-200 giờ!",80,200);



    if(isValid){
        //create object sinhVien by using ObjectClass SinhVien
        //new: Tạo thể hiện của lớp ( instant ) của lớp đối tượng ( để truy suất tới các thuộc tính, phương thức)
        var nv = new NhanVien(taiKhoan, hoTen, email, matKhau, ngayLam, luongCB, chucVu, gioLam);
        nv.tinhTongLuong();
        nv.xepLoaiNV();
        console.table(nv);

        danhSachNV.themNV(nv);
        console.log(danhSachNV.mangNV);
        hienThiDSNV(danhSachNV.mangNV);
        setLocalStorage();
        document.getElementById("tbThanhCong").innerHTML = "Thêm nhân viên mới thành công !";
        
        resetForm();
    }


});

function resetForm(){
    document.getElementById("tknv").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("luongCB").value = "";
    document.getElementById("gioLam").value = "";
}

function hienThiDSNV(dsnv) {
    //content chứa các thẻ tr (tr chứa thông tin 1 sv)
    var content = "";
    dsnv.map(function (item, index) {
        // ``: string template
        content += `
            <tr>
                <td>${item.taiKhoan}</td>
                <td>${item.hoTen}</td>
                <td>${item.email}</td>
                <td>${item.ngayLam}</td>
                <td>${item.chucVu}</td>
                <td>${item.tongLuong}</td>
                <td>${item.loaiNhanVien}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaNhanVien('${item.taiKhoan}')" >Xóa</button>
                </td>
                <td>
                    <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="capNhatNV('${item.taiKhoan}')" >Xem</button>
                </td>
            </tr>
        `;
    });
    document.getElementById("tableDanhSach").innerHTML = content;
}


//Local storage
function setLocalStorage() {
    localStorage.setItem("dsnv", JSON.stringify(danhSachNV.mangNV));
}

function getLocalStorage() {
    if (localStorage.getItem("dsnv") != null) {
        danhSachNV.mangNV = JSON.parse(localStorage.getItem("dsnv"));
        hienThiDSNV(danhSachNV.mangNV);
    }
}

function xoaNhanVien(tk){
    danhSachNV.xoaNV(tk);
    hienThiDSNV(danhSachNV.mangNV);
    setLocalStorage();
}

function capNhatNV(tk){
    var nv = new NhanVien();

    nv = danhSachNV.layNV(tk);

    //Điền dữ liệu muốn sửa vào form
    document.getElementById("tknv").value = nv.taiKhoan;
    document.getElementById("tknv").setAttribute('readonly', true);
    document.getElementById("name").value = nv.hoTen;
    document.getElementById("email").value = nv.email;
    document.getElementById("password").value = nv.matKhau;
    document.getElementById("datepicker").value = nv.ngayLam;
    document.getElementById("luongCB").value = nv.luongCB;
    document.getElementById("chucvu").value = nv.chucVu;
    document.getElementById("gioLam").value = nv.gioLamTrongThang;
}




//bắt sự kiện click btn cập nhật nhân viên
document.getElementById("btnCapNhat").addEventListener("click", function () {
    console.log("run");

    //get all value of input
    var taiKhoan = document.getElementById("tknv").value;
    var hoTen = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var matKhau = document.getElementById("password").value;
    var ngayLam = document.getElementById("datepicker").value;
    var luongCB = document.getElementById("luongCB").value;
    var chucVu = document.getElementById("chucvu").value;
    var gioLam = document.getElementById("gioLam").value;

    //Kiểm tra dữ liệu
    var isValid2 = true;

    //   &: cộng gtri binary
    //  &&: so sánh AND (gtri boolean)
    // true => 1 (bit)
    //false => 0 (bit)



    /**==================================
     *      KIỂM TRA TÀI KHOẢN
     * ==================================
     */

    //Không được để trống.
    isValid2 &= validaton.checkEmpty(taiKhoan, "tbTKNV", "Tài khoản nhân viên không được để trống!");
    //Độ dài từ 4-6 ký số.
    isValid2 &= validaton.checkLength(taiKhoan,"tbTKNV", "Tài khoản phải từ 4 đến 6 ký số!", 4, 6);
    //Only number
    isValid2 &= validaton.checkNum(taiKhoan,"tbTKNV","Tài khoản chỉ được dùng ký số!");
    //Kiểm tra có tồn tại nv k
    isValid2 &= validaton.checkTKisExist(taiKhoan,"tbTKNV", "Không tồn tại nhân viên này, vui lòng thêm nhân viên mới hoặc hủy tác vụ.", danhSachNV.mangNV);



    /**==================================
     *      KIỂM TRA TÊN NHÂN VIÊN
     * ==================================
     */

    //Không được để trống.
    isValid2 &= validaton.checkEmpty(hoTen, "tbTen", "Tên nhân viên không được để trống!");
    //Không chứa ký tự đặc biệt.
    isValid2 &= validaton.checkName(hoTen, "tbTen", "Tên nhân viên không được chứa số hoặc ký tự đặc biệt!");



    /**==================================
     *      KIỂM TRA MAIL NHÂN VIÊN
     * ==================================
     */
    
    //Không được để trống.
    isValid2 &= validaton.checkEmpty(email, "tbEmail", "Email nhân viên không được để trống!");
    //Đúng cú pháp.
    isValid2 &= validaton.checkMail(email, "tbEmail", "Email không hợp lệ!");



    /**==================================
     *      KIỂM TRA MẬT KHẨU
     * ==================================
     */

    //Không để trống
    isValid2 &= validaton.checkEmpty(matKhau, "tbMatKhau", "Password không được để trống!");
    //phải từ 6-10 ký tự
    isValid2 &= validaton.checkLength(matKhau, "tbMatKhau", "Pass phải có từ 6-10 ký tự!", 6, 10);
    //Chứa ít nhất một ký tự đặc biệt, một ký tự số, một ký tự in hoa và một ký tự thường
    isValid2 &= validaton.checkMK(matKhau, "tbMatKhau", "Pass phải chứa ít nhất một ký tự đặc biệt, một ký số, một ký tự thường và một ký tự in hoa !");


    /**==================================
     *      KIỂM TRA NGÀY LÀM
     * ==================================
     */
    
    //không để trống
    isValid2 &= validaton.checkEmpty(ngayLam, "tbNgay", "Ngày làm không được để trống!");


    /**==================================
     *      KIỂM TRA LƯƠNG CƠ BẢN
     * ==================================
     */

    //Không để trống
    isValid2 &= validaton.checkEmpty(luongCB, "tbLuongCB",  "Lương cơ bản không được để trống!");
    //nằm trong khoảng 1.000.000 đến 20.000.000
    isValid2 &= validaton.checkMinMax(luongCB, "tbLuongCB",  "Lương cơ bản phải từ 1.000.000 đến 20.000.000!",1000000,20000000);
    

    /**==================================
     *      KIỂM TRA CHỨC VỤ
     * ==================================
     */

    //Phải chọn 1 trong 3 chức vụ
    isValid2 &= validaton.checkDropDown("chucvu", "tbChucVu", "Vui lòng chọn Chức vụ!");


    /**==================================
     *      KIỂM TRA GIỜ LÀM
     * ==================================
     */

    //không để trống
    isValid2 &= validaton.checkEmpty(gioLam, "tbGiolam", "Vui lòng nhập số giờ làm!")

    //giờ làm phải từ 80-200 giờ 
    isValid2 &= validaton.checkMinMax(gioLam, "tbGiolam", "Giờ làm phải trong khoảng 80-200 giờ!",80,200);

    console.log("BEFORE VALID");

    if(isValid2){
        //create object sinhVien by using ObjectClass SinhVien
        //new: Tạo thể hiện của lớp ( instant ) của lớp đối tượng ( để truy suất tới các thuộc tính, phương thức)
        console.log("VALID");
        var viTri = -1;
        viTri = danhSachNV.timViTri(taiKhoan);

        var nv = new NhanVien(taiKhoan, hoTen, email, matKhau, ngayLam, luongCB, chucVu, gioLam);

        nv.tinhTongLuong();
        nv.xepLoaiNV();
        console.table(nv);

        danhSachNV.capNhatNV(taiKhoan,nv);
        console.log(danhSachNV.mangNV);
        hienThiDSNV(danhSachNV.mangNV);
        setLocalStorage();
        document.getElementById("tbThanhCong").innerHTML = "Cập nhật nhân viên thành công !";
        
        resetForm();
    }


});



//SEARCH BOX
document.getElementById("searchName").addEventListener("keyup",function(){
    var chuoiTK = document.getElementById("searchName").value.trim();
    var mangKQ = danhSachNV.timKiemNV(chuoiTK);

    hienThiDSNV(mangKQ);
});