var service = new Service();
var valid = new Validation();

function getEle(id) {
    return document.getElementById(id);
}

function fetchDataMember() {
    service.getListMember()
        .then(function (result) {
            // khai báo mảng Member, để sử dụng trong việc kiểm tra Tài khoản có tồn tại hay không?
            service.arrMember = result.data;
            renderMember(result.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}
fetchDataMember();

// Hiển thị Danh sách GV & HV 
function renderMember(dataMember) {
    var content = '';
    dataMember.forEach(function (itemMember, indexMember) {
        content += `
        <tr>
                <td>${indexMember + 1}</td>
                <td>${itemMember.account}</td>
                <td>${itemMember.password}</td>
                <td>${itemMember.fullName}</td>
                <td>${itemMember.email}</td>
                <td>${itemMember.language}</td>
                <td>${itemMember.userType}</td>
                <td>
                <button class="btn btn-warning" onclick="editMember(${itemMember.id})" data-toggle="modal"
								data-target="#myModal">Edit</button>
                <button class="btn btn-danger" onclick="deleteMember(${itemMember.id})">Delete</button>
                </td>
            </tr>
        `;
    });
    getEle('tblDanhSachNguoiDung').innerHTML = content;
}

// DOM tới nút thêm mới =>>tạo nút thêm mới
getEle('btnThemNguoiDung').addEventListener('click', function () {
    //Edit Title
    document.getElementsByClassName('modal-title')[0].innerHTML = "Thêm thành viên";

    //Create button Add Member
    var btnAddMember = `
    <button class="btn btn-success" onclick="addMember()">Thêm thành viên</button>
    `;
    document.getElementsByClassName('modal-footer')[0].innerHTML = btnAddMember;
});

// DELETE Member
function deleteMember(id) {
    service.deleteMember(id)
        .then(function () {
            fetchDataMember();
        })
        .catch(function (error) {
            console.log(error);
        });
}

// Add Member
function addMember() {
    var taiKhoan = getEle('TaiKhoan').value;
    var hoTen = getEle('HoTen').value;
    var matKhau = getEle('MatKhau').value;
    var email = getEle('Email').value;
    var hinhAnh = getEle('HinhAnh').value;
    var nguoiDung = getEle('loaiNguoiDung').value;
    var ngonNgu = getEle('loaiNgonNgu').value;
    var moTa = getEle('MoTa').value;
    var member = new Members("", taiKhoan, hoTen, matKhau, email, nguoiDung, ngonNgu, moTa, hinhAnh);

    // Kiểm tra dữ liệu đầu vào
    var isValidation = true;

    //Tài Khoản
    isValidation &=
        valid.checkNull(taiKhoan, 'tbTaiKhoan', '(*) Nhập tài khoản thành viên')
        && valid.checkLengthString(taiKhoan, 'tbTaiKhoan', '(*) Tài khoản:  Độ dài 4 - 10 ký tự', 4, 10)
        && valid.checkAccount(taiKhoan, 'tbTaiKhoan', '(*) Mã tài khoản đã tồn tại', service.arrMember);
    console.log(service.arrMember);
    //Họ Tên
    isValidation &=
        valid.checkNull(hoTen, 'tbTen', '(*) Nhập tên thành viên')
        && valid.checkString(hoTen, 'tbTen', '(*) Vui lòng nhập chuỗi ký tự');

    //Mật Khẩu
    isValidation &=
        valid.checkNull(matKhau, 'tbMatKhau', '(*) Nhập Mật Khẩu')
        && valid.checkPass(matKhau, 'tbMatKhau', 'Mật khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)');

    //Email
    isValidation &=
        valid.checkNull(email, 'tbEmail', '(*) Nhập email')
        && valid.checkEmail(email, 'tbEmail', '(*) Vui lòng nhập đúng định dạng Email');

    //Hình Ảnh
    isValidation &= valid.checkNull(hinhAnh, 'tbHinhAnh', '(*) Thêm hình ảnh');

    //Mô Tả
    isValidation &=
        valid.checkNull(moTa, 'tbMoTa', '(*) Nhập Mô Tả')
        && valid.checkLengthString(moTa, 'tbMoTa', '(*) Độ dài tối đa 60 ký tự', 1, 60);

    // Loại Người Dùng
    isValidation &= valid.checkSelect('loaiNguoiDung', 'tbNguoiDung', '(*) Chọn người dùng');
    // Ngôn Ngữ
    isValidation &= valid.checkSelect('loaiNgonNgu', 'tbNgonNgu', '(*) Chọn Ngôn ngữ');

    //fasle => return null
    //true => khởi tạo đối tượng Thành viên
    // if (!isValidation) return null;

    if (!isValidation) return null;
    service.addMemberAPI(member)
        .then(function (result) {
            fetchDataMember();
            console.log(result.data);
            //close modal button
            document.getElementsByClassName('close')[0].click();
        })
        .catch(function (error) {
            console.log(error);
        });

    // Sau khi thêm thông tin người dùng, Reset lại tất cả Input
    getEle("formNguoiDung").reset();
}

//EDIT MEMBER
function editMember(id) {
    document.getElementsByClassName('modal-title')[0].innerHTML = "Cập nhật Thành viên";
    // Tạo nút "Edit Member"
    var btnUpdate = `
    <button class="btn btn-info" onclick="updateMember(${id})">Sửa thành viên</button>
    `;
    document.getElementsByClassName('modal-footer')[0].innerHTML = btnUpdate;

    service.getMemberById(id)
        .then(function (result) {
            getEle('TaiKhoan').value = result.data.account;
            getEle('TaiKhoan').disabled = true;
            getEle('HoTen').value = result.data.fullName;
            getEle('MatKhau').value = result.data.password;
            getEle('Email').value = result.data.email;
            getEle('HinhAnh').value = result.data.avatar;
            getEle('loaiNguoiDung').value = result.data.userType
            getEle('loaiNgonNgu').value = result.data.language;
            getEle('MoTa').value = result.data.description;
            fetchDataMember();
        })
        .catch(function (error) {
            console.log(error);
        });
}

//Update Info Member
function updateMember(id) {

    var taiKhoan = getEle('TaiKhoan').value;
    var hoTen = getEle('HoTen').value;
    var matKhau = getEle('MatKhau').value;
    var email = getEle('Email').value;
    var hinhAnh = getEle('HinhAnh').value;
    var nguoiDung = getEle('loaiNguoiDung').value;
    var ngonNgu = getEle('loaiNgonNgu').value;
    var moTa = getEle('MoTa').value;

    var member = new Members(id, taiKhoan, hoTen, matKhau, email, nguoiDung, ngonNgu, moTa, hinhAnh);
    service.updateMemberAPI(member)
        .then(function () {
            // thành công ==> gọi lại DATA Member
            fetchDataMember();
            document.getElementsByClassName('close')[0].click();
        })
        .catch(function (error) {
            console.log(error);
        })
}

/**
 * TÌM KIẾM THÀNH VIÊN
 */

// getEle('searchName').addEventListener('keyup', function () {
//     var keyword = getEle('searchName').value;
//     var mangTimKiem = service.arrMember._timKiemNhanVien(keyword);
//     renderTable(mangTimKiem);

// });


