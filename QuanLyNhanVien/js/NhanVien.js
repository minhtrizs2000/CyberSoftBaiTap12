/**
 * Lưu trữ thông tin chung của nhân viên
 */

//Object Class
function NhanVien(taiKhoan, hoTen, email, matKhau, ngayLam, luongCB, chucVu, gioLamTrongThang){
    //Property
    //this: giúp instance truy xuất đến thuộc tính, phương thức
    //this đại diện cho sv
    this.taiKhoan = taiKhoan;
    this.hoTen = hoTen;
    this.email = email;
    this.matKhau = matKhau;
    this.ngayLam = ngayLam;
    this.luongCB = luongCB;
    this.chucVu = chucVu;
    this.gioLamTrongThang = gioLamTrongThang;
    this.tongLuong = 0;
    this.loaiNhanVien = "";

    //Method
    this.tinhTongLuong = function(){
        if(this.chucVu === "Sếp"){
            this.tongLuong = this.luongCB * 3;
        }else if(this.chucVu === "Trưởng phòng"){
            this.tongLuong = this.luongCB * 2;
        }else if(this.chucVu === "Nhân viên"){
            this.tongLuong = this.luongCB * 1;
        }else{
            console.log("Lỗi khi tính tổng lương nhân viên");
        }
    }

    this.xepLoaiNV = function(){
        if(this.gioLamTrongThang >= 192){
            this.loaiNhanVien = "Nhân viên xuất sắc";
        }else if(this.gioLamTrongThang >= 176){
            this.loaiNhanVien = "Nhân viên tốt";
        }else if(this.gioLamTrongThang >= 160){
            this.loaiNhanVien = "Nhân viên khá";
        }else if(this.gioLamTrongThang < 160){
            this.loaiNhanVien = "Nhân viên trung bình";
        }else{
            console.log("Có lỗi khi tính xếp loại nhân viên");
        }
    }
}
