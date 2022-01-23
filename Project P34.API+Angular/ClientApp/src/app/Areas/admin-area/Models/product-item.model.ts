export class ProductItem{
    public id: string;
    public name: string;
    public image: string;
    public price: number;
    public countryMade: string;
    public size: string;
    public description: string;
    public rating: number;
    public count: number;
    public subcategoryId: string;
    public images: [];

    constructor(){
        this.id=null;
        this.name=null;
        this.image=null;
        this.price=null;
        this.countryMade=null;
        this.description=null;
        this.rating=null;
        this.size=null;
        this.count=null;
        this.subcategoryId=null;
        this.images=[];
    }
}

