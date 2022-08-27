function Service() {

    this.getListMember = function () {
        return axios({
            url: 'https://62ff796334344b6431fa3ac2.mockapi.io/api/members',
            method: 'GET',
        });
    };

    //Xóa Member
    this.deleteMember = function (idMember) {
        return axios({
            url: `https://62ff796334344b6431fa3ac2.mockapi.io/api/members/${idMember}`,
            method: 'DELETE',
        });
    };

    //Thêm mới Member
    this.addMemberAPI = function (newMember) {
        return axios({
            url: `https://62ff796334344b6431fa3ac2.mockapi.io/api/members`,
            method: 'POST',
            data: newMember,
        });
    };

    //lấy thông tin Member để cập nhật lại 
    this.getMemberById = function (idMember) {
        return axios({
            url: `https://62ff796334344b6431fa3ac2.mockapi.io/api/members/${idMember}`,
            method: 'GET',
        });
    };

    this.updateMemberAPI = function (member) {
        return axios({
            url: `https://62ff796334344b6431fa3ac2.mockapi.io/api/members/${member.id}`,
            method: 'PUT',
            data: member,
        });
    };

    // CẦN PHÁT TRIỂN CHỨC NĂNG TÌM KIẾM


}