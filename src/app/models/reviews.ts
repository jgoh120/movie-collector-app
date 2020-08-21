export class Review {
    public id:Number;
    public comment: String;
    public rating: Number;
    public creatorId: String;
    public createdDate: Date;
    public updatedDate: Date;
    
    constructor(id: Number, comment: String, rating: Number, creatorId: String){
        this.id = id;
        this.comment = this.comment;
        this.rating = rating;
        this.creatorId = creatorId;
    }

}