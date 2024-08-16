export class AuthService{
    delay :number
    currentUser:null | string
    users :string[]

    constructor(){
        this.delay = 100
        this.currentUser = null
        this.users = ['rain','Doe']
    }

    login(name) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.users.includes(name)) {
                    this.currentUser = name;
                    resolve({ user: name });
                } else {
                    reject({ message: 'Invalid credentials.' });
                }
            }, this.delay);
        });
    }
  
    logout() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.currentUser = null;
                if (this.currentUser) {
                    reject({ error: 'Error logging out.' });
                } else {
                    resolve({ success: true });
                }
            }, this.delay);
        });	
    }
  
    signup(name) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!this.users.includes(name)) {
                    this.users.push(name);
                    this.currentUser = name;
                    resolve({ user: name });
                } else {
                    resolve({ error: 'This user already exists.' });
                }
            }, this.delay);
        });		
    }
}
