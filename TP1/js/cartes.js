///
/// Auteur : Xavier Côté-Daviau, Michael Meilleur et Mahdi Ellili
/// Description : Gestion des informations sur les cartes.
/// Date : 2022-10-02
///

export class Cartes {
    //Champs privées
    #_Numéro = 0;
    #_Valeur = 0;

    //Propriétés
    get Numéro() {
        return this.#_Numéro;
    }
    set Numéro(numero) {
        this.#_Numéro = numero;
    }
    get Valeur() {
        return this.#_Valeur;
    }

    constructor(numero) {
        this.#_Numéro = numero;
        this.#_Valeur = numero;
    }
}

export class Coeur extends Cartes {
    #_Suite = "";

    get Suite() {
        return this.#_Suite;
    }

    constructor(numero) {
        super(numero);
        this.#_Suite = "Coeur";
    }
}

export class Pique extends Cartes {
    #_Suite = "";

    get Suite() {
        return this.#_Suite;
    }

    constructor(numero) {
        super(numero);
        this.#_Suite = "Pique";
    }
}


export class Carreau extends Cartes {
    #_Suite = "";

    get Suite() {
        return this.#_Suite;
    }

    constructor(numero) {
        super(numero);
        this.#_Suite = "Carreau";
    }
}

export class Trèfle extends Cartes {
    #_Suite = "";

    get Suite() {
        return this.#_Suite;
    }

    constructor(numero) {
        super(numero);
        this.#_Suite = "Trefle";
    }
}
