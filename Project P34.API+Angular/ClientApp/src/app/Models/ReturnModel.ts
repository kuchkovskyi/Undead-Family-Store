export class ReturnModel {
  public nameSurname: string;
  public email: string;
  public phone: string;
  public numberOfOrder: string;

  public nameOfProduct: string;
  public articleOfProduct: string;
  public count: number;
  public reason: string;

  constructor () {
    this.nameSurname = null;
    this.email = null;
    this.phone = null;
    this.numberOfOrder = null;

    this.nameOfProduct = null;
    this.articleOfProduct = null;
    this.count = 0;
    this.reason = null;
  }
}
