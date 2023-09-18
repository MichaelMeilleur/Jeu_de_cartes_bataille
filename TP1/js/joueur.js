///
/// Auteur : Xavier Côté-Daviau, Michael Meilleur et Mahdi Ellili
/// Description : Gestion des informations sur les joueurs.
/// Date : 2022-10-02
///
export class Joueur {
    //Champs privées 
    #_Source = new Array();
    #_Destination = new Array();
    //Champs public
    NbCartesPile = 0;
    NbCartesTournées = 0;
    NbCartesTotal = 0;

    //Propriétés
    get Source() {
        return this.#_Source;
    }

    set Source(nombre) {
        this.#_Source = nombre;
    }
    get Destination() {
        return this.#_Destination;

    }
    set Destination(nombre) {
        this.#_Destination = nombre;
    }

    get NbCartesPile() {
        return this.NbCartesPile;
    }
    get NbCartesTournées() {
        return this.NbCartesTournées;
    }
    get NbCartesTotal() {
        return this.NbCartesTotal;

    }

}