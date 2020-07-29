export class Cart {
    public id: number;
    public bookId: number; 
    title: string;
    imageUrl: string;
    rating: number;
    quantity: number;
    price: number;

    constructor(id: number,bookId:number,title:string,imageUrl:string,
        rating:number,quantity:number,price:number) {
            this.id=id;
            this.bookId=bookId;
            this.title=title;
            this.imageUrl=imageUrl;
            this.rating=rating;
            this.quantity=quantity;
            this.price=price;
    }
}