import {user} from '../modal/user'
import {resdata, errdata} from '../../utils/serve'

const logUtil = require('../../utils/logUtil');

exports.getUserList = async (ctx, next) => {
    try {
        let list = await user.find();
        return resdata('0000', 'success', list);
    } catch (err) {
        return errdata(err);
    }
}
exports.register = async (reqBody) => {
    let dataArr = {
        username: reqBody.username,
        userid: reqBody.userid,
        password: '123456',
        phone: '',
        emial: '',
        content: '123123'
    }
    try {
        let list = await user.find({userid: reqBody.userid});
        let respon = {};
        if(list && list.length > 0) {
            respon = resdata('0000', 'the user is exicet', list);
        }else {
            let newUser = await user.create(dataArr);
            console.log(newUser);
            respon = resdata('0000', 'success', newUser);
        }
        return respon;
    } catch (err) {
        console.log(err)
        throw new Error(err);
        return errdata(err);
    }
}
exports.removeUser = async (reqBody) => {
    let dataArr = {
        id: reqBody.id,
    }
    try {
        let list = await user.find({username: reqBody.uname});
        let respon = {}
        if(list && list.length > 0) {
            let list = await user.delete(dataArr);
            respon = resdata('0000', 'success', list);
        }else {
            respon = resdata('0000', 'the id is not exicet', list);
        }
        return respon;
    } catch (err) {
        throw new Error(err);
        return errdata(err);
    }
}
