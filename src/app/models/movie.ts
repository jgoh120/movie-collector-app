/*export type Movie = {
    id: number;
    title: string;
    posterUrl: string;
    genre: string;
    rating: number;
}*/

export class Movie {
    public id:Number;
    public title: String;
    public posterUrl: String;
    public genre: String;
    public rating: Number;
    public creatorId: String;
    public createdDate: Date;
    public updatedDate: Date;
    
    constructor(id: Number, title: String, posterUrl: String, genre: String, rating: Number, creatorId: String){
        this.id = id;
        this.title = title;
        this.posterUrl = posterUrl;
        this.genre = genre;
        this.rating = rating;
        this.creatorId = creatorId;
    }

}