import {Injectable} from 'angular2/core';
import {R} from '../core/r';
import {Router} from 'angular2/router';
import {JLocalStorage} from "../core/localstorage";

@Injectable()
export class JAuth {
    navs:any;
    Name:string;
    constructor(private localstorage:JLocalStorage, private r:R,private router:Router) {
    }

    getNav() {
        this.r.get('/api/auth')
            .subscribe(data => this._logon(data), error => this.r.onErr(error));
    }

    login(m){
        this.r.post('/api/auth',m).subscribe(
            data=>{
                if (data.Err) {
                    alert(data.Err);
                }else{
                    this._logon(data);
                }
            }
        )
    }
    logout(){
        this.r.delete('/api/auth').subscribe(
            data=>{
                if (data.Err) {
                    alert(data.Err);
                }else{
                    this._logout(data);
                }
            }
        )
    }
    isLogin(){
        return this.localstorage.getItem('jbreak.token')!=null;
    }

    _logon(data){
        this.localstorage.setItem('jbreak.token',data.Id);
        this.navs = data;
        this.Name=this.navs.Name;

        //TODO 当前为login，则跳转到/home
    }
    _logout(data){
        this.localstorage.removeItem('jbreak.token');
        this.navs =null;
        this.Name=null;
        this.router.navigateByUrl('/login')
    }
}