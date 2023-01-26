import api from "./api.js";

export default {
    userLogin: (id, password) => {
        return api.post('auth/login', {
            ident: null,
            pass: password,
            uid: id
        });
    },
    checkToken: async () => {
        let res = await api.get('auth/status');
        return res.status === 200 ? true : false;
    }
}