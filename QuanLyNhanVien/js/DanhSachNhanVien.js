/**
 * lưu trữ danh sách nhân viên
 */

function DanhSachNhanVien(){
    //thuộc tính
    this.mangNV = [];

    //phương thức
    this.themNV = function(nv){
        this.mangNV.push(nv);
    }

    // Tìm kiếm vị trí nhân viên theo tài khoản
    // vitri = -1;
    // duyệt mảng để so sánh "ma" với từng mã nhân viên trong mảng
    // nếu tìm được return viTri (vị trí tìm thấy)
    // nếu tìm k đc return vitri = -1;
    this.timViTri = function(tk){
        var viTri = -1;
        this.mangNV.map(function(item, index){
            if(item.taiKhoan === tk){
                viTri = index;
            }
        });
        return viTri;
    }

    this.xoaNV = function(tk){
        var viTri = this.timViTri(tk);
        if(viTri >= 0){
            //Tìm thấy sv
            this.mangNV.splice(viTri, 1);
        }
    }

    this.capNhatNV = function(tk){
        var viTri = this.timViTri(tk.taiKhoan);
        if(viTri >= 0){
            this.mangNV[viTri] = tk;
        }
    }
}

//Prototype: giúp thêm property, method vào trong classObject mà k cần chỉnh sửa trực tiếp
// DanhSachSinhVien.prototype.timKiemSV = function(chuoiTK){
//     var mangKQ = [];
//     var chuoiThuong = chuoiTK.toLowerCase();

//     this.mangSV.map(function(item, index){
//         var tenThuong = item.tenSV.toLowerCase();
//         var viTriChu = tenThuong.indexOf(chuoiThuong);

//         if(viTriChu >= 0){
//             mangKQ.push(item);
//         }
//     });

//     return mangKQ;
// }