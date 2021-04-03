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

    this.layNV = function(tk){
        var viTri = this.timViTri(tk);
        if(viTri >= 0){
            return this.mangNV[viTri];
        }
    }

    this.capNhatNV = function(tk,nv){
        var viTri = this.timViTri(tk);
        this.mangNV[viTri] = nv;
    }

}

//Prototype: giúp thêm property, method vào trong classObject mà k cần chỉnh sửa trực tiếp
DanhSachNhanVien.prototype.timKiemNV = function(chuoiKT){
    var mangKQ = [];
    var chuoiThuong = chuoiKT.toLowerCase();

    this.mangNV.map(function(item, index){
        var tenThuong = item.loaiNhanVien.toLowerCase();
        var viTriChuoi = tenThuong.indexOf(chuoiThuong);

        if(viTriChuoi >= 0){
            mangKQ.push(item);
        }
    });

    return mangKQ;
}