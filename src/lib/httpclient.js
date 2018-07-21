import axios from 'axios'
const baseUrl = 'http://10.3.138.243:1000'

let filterUrl = (_url) => {
  if (_url && _url.startsWith('http')) {
    return _url;
  }
  return baseUrl + _url;
}

export default {
    get(_url, _params = {}) {
        return new Promise((resolve, reject) => {
      axios({
        url: filterUrl(_url),
        method: 'get',
        params: _params,
        headers: {
          'auth': window.localStorage.getItem('management')
        }
      }).then((res) => {
      	let qty = 0;
      	res.data.allgoods.forEach((item,i)=>{
      		return qty += item.qty
      	})
      	store.state.cartLists.qty = qty;
      	resolve(res.data);
        if (!res.data.status && res.data.message == 'unauth') {
        } else {
          resolve(res.data);
        }
      }).catch((error) => {
        reject(error);
      })
    })
  },
  post(_url, _params = {}) {
    return new Promise((resolve, reject) => {
      axios({
        url: filterUrl(_url),
        method: 'post',
        data: _params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          "auth": window.localStorage.getItem('management')
        },
        transformRequest: [function(data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then((res) => {
//         if (res.data.message == 'timesout') {
//         	window.localStorage.clear();
// 					console.log("timesout")
// 					store.state.user.show = true;
// 					store.state.user.unshow = false;
// //        return false;
//         }else if(res.data.status){
//         	window.localStorage.setItem('user',JSON.stringify(res.data))
//         }
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}