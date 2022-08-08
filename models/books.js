class Book {

    constructor(title, author, company, category) {

        this._title = title;
        this._author = author;
        this._company = company;
        this._category = category;

    } 

    get title() {
        return this._title;
    }

    get author(){
        return this._author;
    }

    get company() {
        return this._company;
    }

    get category() {
        return this._category;
    }

}