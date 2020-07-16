export class ProductModel{
    constructor
    (
        public productId:number,
        public productName:string,
        public productCode:string,
        public releaseDate:Date,
        public description:string,
        public price:number,
        public starRating:number,
        public imgUrl:string
    )
    {}
}