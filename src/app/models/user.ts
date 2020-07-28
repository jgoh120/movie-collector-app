

export class User {
    public id: Number;
    public username:String;
    public password: String;
    public firstname: String;
    public lastname: String;
    public organisation: String;
    public email: String;
    public contact: Number;
    public token?:String;
    
    constructor(id: Number, username: String, password: String, firstname: String, lastname: String,
                organisation: String, email: String, contact: Number, token: String){
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.organisation = organisation;
        this.email = email;
        this.contact= contact;
        this.token=token;
    }

}