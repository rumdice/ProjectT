export let isLogin = false;
export const ADMIN_ID = "admin"; 
export const ADMIN_PWD = "pass"; 

export function setLogin() {
    isLogin = true;
}

export function checkLogin() {
    return isLogin;
}

export function checkAdminInfo(id:string, pwd:string) {
    return  (id === ADMIN_ID && pwd === ADMIN_PWD) ? true : false;
}